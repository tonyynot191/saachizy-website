
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const TABLE = 'properties';

function fromDatabase(row) {
  return {
    id: row.id,
    title: row.title || '',
    location: row.location || '',
    category: row.category || 'Residential',
    propertyUse: row.property_use || '',
    price: row.price || '',
    units: row.units || '',
    bedrooms: row.bedrooms || '',
    landSize: row.land_size || '',
    titleDocument: row.title_document || '',
    description: row.description || '',
    image: row.image || '',
    media: row.media || [],
    status: row.status || 'Available',
  };
}

function toDatabase(property) {
  return {
    title: property.title,
    location: property.location,
    category: property.category,
    property_use: property.propertyUse || null,
    price: property.price,
    units: property.units,
    bedrooms: property.bedrooms,
    land_size: property.landSize,
    title_document: property.titleDocument,
    description: property.description,
    image: property.image,
    media: property.media || [],
    status: property.status || 'Available',
  };
}

// Fetch all properties
export async function getProperties() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading properties:', error.message);
    throw error;
  }

  return data.map(fromDatabase);
}

// Fetch one page of publicly available properties
export async function getPublicPropertiesPage({
  page = 1,
  pageSize = 12,
  search = '',
  category = 'All',
} = {}) {
  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.min(
    100,
    Math.max(1, Number(pageSize) || 12)
  );

  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize - 1;

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('status', 'Available')
    .order('created_at', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const searchTerm = String(search || '').trim();

  if (searchTerm) {
    // Escape characters that could interfere with PostgREST filter syntax.
    const safeSearch = searchTerm
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');

    const pattern = `"%${safeSearch}%"`;

    query = query.or(
      [
        `title.ilike.${pattern}`,
        `location.ilike.${pattern}`,
        `description.ilike.${pattern}`,
        `category.ilike.${pattern}`,
        `property_use.ilike.${pattern}`,
        `title_document.ilike.${pattern}`,
      ].join(',')
    );
  }

  const { data, error, count } = await query.range(start, end);

  if (error) {
    console.error('Error loading property page:', error.message);
    throw error;
  }

  const totalCount = count || 0;

  return {
    properties: (data || []).map(fromDatabase),
    totalCount,
    totalPages: Math.ceil(totalCount / safePageSize),
    currentPage: safePage,
    pageSize: safePageSize,
  };
}

// Create a property
export async function createProperty(property) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(toDatabase(property))
    .select()
    .single();

  if (error) throw error;

  return fromDatabase(data);
}

// Update a property
export async function updateProperty(id, property) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(toDatabase(property))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return fromDatabase(data);
}

// Delete a property
export async function deleteProperty(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Update property availability
export async function updatePropertyStatus(id, status) {
  const { error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}

// Upload a property photo or video
export async function uploadPropertyMedia(propertyId, file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath = `${propertyId}/${crypto.randomUUID()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('property-media')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('property-media')
    .getPublicUrl(filePath);

  const { data: property, error: fetchError } = await supabase
    .from(TABLE)
    .select('media, image')
    .eq('id', propertyId)
    .single();

  if (fetchError) throw fetchError;

  const mediaItem = {
    name: file.name,
    path: filePath,
    url: data.publicUrl,
    type: file.type.startsWith('video/') ? 'video' : 'image',
  };

  const updatedMedia = [...(property.media || []), mediaItem];

  const updateData = { media: updatedMedia };

  if (mediaItem.type === 'image' && !property.image) {
    updateData.image = data.publicUrl;
  }

  const { error: updateError } = await supabase
    .from(TABLE)
    .update(updateData)
    .eq('id', propertyId);

  if (updateError) throw updateError;

  return mediaItem;
}

// Load properties and expose their loading status
function usePropertiesData() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadProperties() {
      try {
        const result = await getProperties();

        if (active) {
          setProperties(result);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load properties.');
          console.error('Property loading failed:', err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      active = false;
    };
  }, []);

  return { properties, loading, error };
}

// Existing hook — keeps other pages working
export function useProperties() {
  return usePropertiesData().properties;
}

// Existing hook — provides properties, loading and error
export function usePropertiesWithStatus() {
  return usePropertiesData();
}
