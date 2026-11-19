
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'saachizy-properties';

const defaultProperties = [
  {
    id: 1,
    title: 'Newly Built Luxury Terrace Duplexes',
    location: 'Guzape Main, Abuja',
    category: 'Residential',
    price: '₦4 Billion',
    units: '8 Units',
    bedrooms: '5 Bedrooms',
    landSize: '2,000 sqm',
    titleDocument: 'Certificate of Occupancy (C of O)',
    description:
      'An exclusive collection of eight newly built five-bedroom terrace duplexes with BQ, solidly constructed with quality finishing and contemporary architectural design. Ideal for luxury residential living or investment purposes.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    status: 'Available',
  },
];

// Get all properties
export function getProperties() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : defaultProperties;
    }

    return defaultProperties;
  } catch (error) {
    console.error('Error loading properties:', error);
    return defaultProperties;
  }
}

// Save properties
export function saveProperties(properties) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(properties)
    );

    window.dispatchEvent(
      new Event('saachizy-properties-updated')
    );

    return true;
  } catch (error) {
    console.error('Error saving properties:', error);
    return false;
  }
}

// Listen for property changes
export function useProperties() {
  const [properties, setProperties] = useState(getProperties);

  useEffect(() => {
    function updateProperties() {
      setProperties(getProperties());
    }

    window.addEventListener(
      'saachizy-properties-updated',
      updateProperties
    );

    window.addEventListener('storage', updateProperties);

    return () => {
      window.removeEventListener(
        'saachizy-properties-updated',
        updateProperties
      );

      window.removeEventListener('storage', updateProperties);
    };
  }, []);

  return properties;
}
