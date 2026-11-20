
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  useProperties,
  createProperty,
  updateProperty,
  deleteProperty as deletePropertyRecord,
  updatePropertyStatus,
  uploadPropertyMedia,
} from '../data/propertyStore';

import './Admin.css';

const emptyForm = {
  title: '',
  location: '',
  category: 'Residential',
  price: '',
  units: '',
  bedrooms: '',
  landSize: '',
  titleDocument: '',
  image: '',
  description: '',
};

const fallbackImage =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80';

function getPropertyMedia(property) {
  const uploadedMedia = Array.isArray(property.media)
    ? property.media
        .filter(item => item && item.url)
        .map(item => ({
          url: item.url,
          name: item.name || 'Property media',
          type:
            item.type ||
            (/\.(mp4|webm|mov)(\?|$)/i.test(item.url)
              ? 'video'
              : 'image'),
        }))
    : [];

  const allMedia = [...uploadedMedia];

  // Include the cover image if it is not already in the media list.
  if (
    property.image &&
    !allMedia.some(item => item.url === property.image)
  ) {
    allMedia.unshift({
      url: property.image,
      name: 'Cover image',
      type: 'image',
    });
  }

  // Remove duplicate media URLs.
  return allMedia.filter(
    (item, index, array) =>
      array.findIndex(other => other.url === item.url) === index
  );
}

function AdminProperties() {
  const properties = useProperties();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  const available = properties.filter(
    property => property.status === 'Available'
  ).length;

  const sold = properties.filter(
    property => property.status === 'Sold'
  ).length;

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = [
        property.title,
        property.location,
        property.category,
        property.price,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'All' || property.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [properties, search, filter]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    setSelectedFiles(Array.from(event.target.files || []));
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSelectedFiles([]);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openEditForm(property) {
    setForm({
      title: property.title || '',
      location: property.location || '',
      category: property.category || 'Residential',
      price: property.price || '',
      units: property.units || '',
      bedrooms: property.bedrooms || '',
      landSize: property.landSize || '',
      titleDocument: property.titleDocument || '',
      image: property.image || '',
      description: property.description || '',
    });

    setSelectedFiles([]);
    setEditingId(property.id);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setSelectedFiles([]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      let savedProperty;

      if (editingId !== null) {
        savedProperty = await updateProperty(editingId, form);
      } else {
        savedProperty = await createProperty({
          ...form,
          status: 'Available',
        });
      }

      for (const file of selectedFiles) {
        await uploadPropertyMedia(savedProperty.id, file);
      }

      alert(
        editingId !== null
          ? 'Property updated successfully!'
          : 'Property added successfully!'
      );

      closeForm();

      window.location.reload();
    } catch (error) {
      console.error('Property save failed:', error);
      alert(`Unable to save property: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updatePropertyStatus(id, status);
      window.location.reload();
    } catch (error) {
      console.error('Status update failed:', error);
      alert(`Unable to update status: ${error.message}`);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this property?'
    );

    if (!confirmed) return;

    try {
      await deletePropertyRecord(id);
      alert('Property deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Property deletion failed:', error);
      alert(`Unable to delete property: ${error.message}`);
    }
  }

  return (
    <div className="sa-dashboard">

      {/* SIDEBAR */}
      <aside className="sa-sidebar">

        <Link to="/" className="sa-brand">
          <span className="sa-brand-mark">S</span>

          <span>
            SAACHIZY
            <small>THE STORY. THE VISION. THE FUTURE.</small>
          </span>
        </Link>

        <div className="sa-sidebar-label">WORKSPACE</div>

        <nav className="sa-nav">

          <Link to="/admin" className="sa-nav-link">
            <span className="sa-nav-icon">▦</span>
            Dashboard
          </Link>

          <Link
            to="/admin/properties"
            className="sa-nav-link active"
          >
            <span className="sa-nav-icon">⌂</span>
            Properties
            <span className="sa-nav-indicator" />
          </Link>

          <Link to="/admin/enquiries" className="sa-nav-link">
            <span className="sa-nav-icon">♧</span>
            Buyer Enquiries
          </Link>

        </nav>

        <div className="sa-sidebar-bottom">

          <div className="sa-sidebar-note">
            <span className="sa-sidebar-note-icon">✦</span>
            <strong>Built on vision.</strong>
            <p>Creating opportunities. Building the future.</p>
          </div>

          <Link to="/" className="sa-website-link">
            <span>↗</span>
            Visit Public Website
          </Link>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="sa-main sa-properties-main">

        <header className="sa-topbar">

          <div>
            <div className="sa-breadcrumb">
              WORKSPACE <span>/</span> PROPERTY MANAGEMENT
            </div>

            <h1>Property Portfolio</h1>
          </div>

          <div className="sa-topbar-right">
            <span className="sa-page-indicator">
              PROPERTY CONTROL CENTRE
            </span>
          </div>

        </header>

        {/* PAGE INTRO */}
        <section className="sa-property-hero">

          <div>

            <span className="sa-eyebrow">
              <span /> SAACHIZY PROPERTY PORTFOLIO
            </span>

            <h2>
              Every property.
              <br />
              <span>One clear vision.</span>
            </h2>

            <p>
              Organise your listings, manage availability
              and keep your property portfolio up to date.
            </p>

          </div>

          <button
            type="button"
            className="sa-gold-button"
            onClick={openAddForm}
          >
            + Add New Property
          </button>

        </section>

        {/* STATISTICS */}
        <section className="sa-stats-grid sa-property-stats">

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon navy">⌂</span>
              <span className="sa-stat-label">PORTFOLIO</span>
            </div>

            <strong>{properties.length}</strong>
            <span className="sa-stat-description">Total properties</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon green">✓</span>
              <span className="sa-stat-label">AVAILABLE</span>
            </div>

            <strong>{available}</strong>
            <span className="sa-stat-description">Open for enquiries</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon gold">◆</span>
              <span className="sa-stat-label">SOLD</span>
            </div>

            <strong>{sold}</strong>
            <span className="sa-stat-description">Completed listings</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon purple">▤</span>
              <span className="sa-stat-label">CATEGORIES</span>
            </div>

            <strong>
              {new Set(
                properties.map(property => property.category)
              ).size}
            </strong>

            <span className="sa-stat-description">Property categories</span>
          </article>

        </section>

        {/* PROPERTY FORM */}
        {showForm && (

          <section className="sa-property-form-panel">

            <div className="sa-form-heading">

              <div>
                <span className="sa-section-kicker">
                  PROPERTY INFORMATION
                </span>

                <h2>
                  {editingId !== null
                    ? 'Update Property'
                    : 'Create New Listing'}
                </h2>

                <p>Enter accurate details for this property.</p>
              </div>

              <button
                type="button"
                className="sa-form-close"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="sa-form-grid">

                <label>
                  Property Name *

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury 5 Bedroom Duplex"
                    required
                  />
                </label>

                <label>
                  Location *

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Maitama, Abuja"
                    required
                  />
                </label>

                <label>
                  Property Category *

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </label>

                <label>
                  Asking Price *

                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. ₦450 Million"
                    required
                  />
                </label>

                <label>
                  Number of Units

                  <input
                    name="units"
                    value={form.units}
                    onChange={handleChange}
                    placeholder="e.g. 8 Units"
                  />
                </label>

                <label>
                  Bedrooms

                  <input
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g. 5 Bedrooms"
                  />
                </label>

                <label>
                  Land Size

                  <input
                    name="landSize"
                    value={form.landSize}
                    onChange={handleChange}
                    placeholder="e.g. 2,000 sqm"
                  />
                </label>

                <label>
                  Title Document

                  <input
                    name="titleDocument"
                    value={form.titleDocument}
                    onChange={handleChange}
                    placeholder="e.g. Certificate of Occupancy"
                  />
                </label>

                <label className="sa-form-full">
                  Cover Image URL (Optional)

                  <input
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Paste a direct image URL, if available"
                  />
                </label>

                <label className="sa-form-full">
                  Property Photos and Videos

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
                    multiple
                    onChange={handleFileChange}
                  />

                  <small>
                    Select multiple photos and videos. Each file must be
                    no larger than 100 MB. Uploading requires admin access.
                  </small>

                  {selectedFiles.length > 0 && (
                    <small>
                      {selectedFiles.length} file(s) selected:
                      {' '}
                      {selectedFiles.map(file => file.name).join(', ')}
                    </small>
                  )}

                </label>

                <label className="sa-form-full">
                  Property Description

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe the property, its features, title and investment potential..."
                  />
                </label>

              </div>

              <div className="sa-form-actions">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="sa-form-save"
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : editingId !== null
                      ? 'Save Property Changes'
                      : 'Publish Property Listing'}
                </button>

              </div>

            </form>

          </section>

        )}

        {/* PORTFOLIO TOOLBAR */}
        <section className="sa-portfolio-section">

          <div className="sa-portfolio-heading">

            <div>
              <span className="sa-section-kicker">
                PROPERTY DIRECTORY
              </span>

              <h2>Your Listings</h2>

              <p>
                {filteredProperties.length} of {properties.length} properties
              </p>
            </div>

          </div>

          <div className="sa-portfolio-toolbar">

            <div className="sa-search-box">
              <span>⌕</span>

              <input
                type="search"
                placeholder="Search properties, locations or prices..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
            </div>

            <div className="sa-filter-buttons">

              {['All', 'Available', 'Sold'].map(option => (

                <button
                  key={option}
                  type="button"
                  className={filter === option ? 'selected' : ''}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          {/* PROPERTY CARDS */}
          {filteredProperties.length === 0 ? (

            <div className="sa-portfolio-empty">

              <div>⌂</div>

              <h3>
                {properties.length === 0
                  ? 'Your portfolio starts here.'
                  : 'No matching properties found.'}
              </h3>

              <p>
                {properties.length === 0
                  ? 'Add your first property to begin building your portfolio.'
                  : 'Try another search or change the availability filter.'}
              </p>

              {properties.length === 0 && (
                <button
                  type="button"
                  className="sa-gold-button"
                  onClick={openAddForm}
                >
                  + Add Your First Property
                </button>
              )}

            </div>

          ) : (

            <div className="sa-property-card-grid">

              {filteredProperties.map(property => {

                const mediaItems = getPropertyMedia(property);

                return (

                  <article className="sa-managed-card" key={property.id}>

                    {/* PROPERTY COVER */}
                    <div className="sa-managed-image">

                      <img
                        src={property.image || mediaItems[0]?.url || fallbackImage}
                        alt={property.title}
                        onError={event => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = fallbackImage;
                        }}
                      />

                      <span
                        className={`sa-managed-status ${
                          property.status === 'Sold' ? 'sold' : 'available'
                        }`}
                      >
                        {property.status || 'Available'}
                      </span>

                      <span className="sa-managed-category">
                        {property.category || 'Property'}
                      </span>

                    </div>

                    <div className="sa-managed-content">

                      <span className="sa-managed-location">
                        <span>⌖</span> {property.location}
                      </span>

                      <h3>{property.title}</h3>

                      <strong className="sa-managed-price">
                        {property.price}
                      </strong>

                      <div className="sa-managed-details">

                        {property.bedrooms && (
                          <span>⌂ {property.bedrooms}</span>
                        )}

                        {property.landSize && (
                          <span>▤ {property.landSize}</span>
                        )}

                        {property.units && (
                          <span>◇ {property.units}</span>
                        )}

                      </div>

                      {/* UPLOADED PHOTOS AND VIDEOS */}
                      <div
                        style={{
                          marginTop: '20px',
                          paddingTop: '17px',
                          borderTop: '1px solid #e8e8e8',
                        }}
                      >

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            marginBottom: '12px',
                          }}
                        >

                          <strong
                            style={{
                              fontSize: '12px',
                              letterSpacing: '1px',
                              color: '#243449',
                              textTransform: 'uppercase',
                            }}
                          >
                            Property Media
                          </strong>

                          <span
                            style={{
                              fontSize: '11px',
                              color: '#8a7650',
                              fontWeight: '600',
                            }}
                          >
                            {mediaItems.length} FILE
                            {mediaItems.length === 1 ? '' : 'S'}
                          </span>

                        </div>

                        {mediaItems.length === 0 ? (

                          <p
                            style={{
                              fontSize: '12px',
                              color: '#888',
                              margin: '0 0 8px',
                            }}
                          >
                            No photos or videos uploaded yet.
                          </p>

                        ) : (

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                              gap: '8px',
                            }}
                          >

                            {mediaItems.map((item, index) => (

                              <div
                                key={`${item.url}-${index}`}
                                style={{
                                  position: 'relative',
                                  minWidth: 0,
                                  overflow: 'hidden',
                                  borderRadius: '7px',
                                  background: '#101d2b',
                                  aspectRatio: '1 / 1',
                                }}
                              >

                                {item.type === 'video' ? (

                                  <video
                                    src={item.url}
                                    controls
                                    preload="metadata"
                                    playsInline
                                    title={item.name}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      display: 'block',
                                    }}
                                  />

                                ) : (

                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={`Open ${item.name}`}
                                    style={{
                                      display: 'block',
                                      width: '100%',
                                      height: '100%',
                                    }}
                                  >

                                    <img
                                      src={item.url}
                                      alt={`${property.title} media ${index + 1}`}
                                      loading="lazy"
                                      onError={event => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = fallbackImage;
                                      }}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                      }}
                                    />

                                  </a>

                                )}

                                {item.type === 'video' && (
                                  <span
                                    style={{
                                      position: 'absolute',
                                      top: '5px',
                                      left: '5px',
                                      padding: '3px 5px',
                                      borderRadius: '3px',
                                      background: 'rgba(9, 23, 39, 0.85)',
                                      color: '#fff',
                                      fontSize: '9px',
                                      pointerEvents: 'none',
                                    }}
                                  >
                                    VIDEO
                                  </span>
                                )}

                              </div>

                            ))}

                          </div>

                        )}

                      </div>

                      {/* PROPERTY MANAGEMENT ACTIONS */}
                      <div className="sa-managed-actions">

                        <select
                          aria-label={`Availability for ${property.title}`}
                          value={property.status || 'Available'}
                          onChange={event =>
                            changeStatus(property.id, event.target.value)
                          }
                        >
                          <option value="Available">Available</option>
                          <option value="Sold">Sold</option>
                        </select>

                        <button
                          type="button"
                          className="sa-edit-button"
                          onClick={() => openEditForm(property)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="sa-delete-button"
                          onClick={() => handleDelete(property.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>

          )}

        </section>

        <footer className="sa-dashboard-footer">
          <span>© {new Date().getFullYear()} SAACHIZY REAL ESTATE</span>
          <span>THE STORY. THE VISION. THE FUTURE.</span>
        </footer>

      </main>

    </div>
  );
}

export default AdminProperties;
