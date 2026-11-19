
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties, saveProperties } from '../data/propertyStore';
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

function AdminProperties() {
  const properties = useProperties();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

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

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
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

    setEditingId(property.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let updatedProperties;

    if (editingId !== null) {
      updatedProperties = properties.map(property =>
        property.id === editingId
          ? { ...property, ...form }
          : property
      );
    } else {
      const newProperty = {
        ...form,
        id: Date.now(),
        status: 'Available',
      };

      updatedProperties = [...properties, newProperty];
    }

    const saved = saveProperties(updatedProperties);

    if (saved) {
      closeForm();
    } else {
      alert('Unable to save this property. Please try again.');
    }
  }

  function changeStatus(id, status) {
    const updatedProperties = properties.map(property =>
      property.id === id ? { ...property, status } : property
    );

    saveProperties(updatedProperties);
  }

  function deleteProperty(id) {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this property?'
    );

    if (!confirmed) return;

    saveProperties(
      properties.filter(property => property.id !== id)
    );
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
              {new Set(properties.map(property => property.category)).size}
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
                  Property Image URL
                  <input
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Paste an image URL"
                  />
                  <small>
                    Use a direct image link. Image uploads can be added
                    when we connect secure file storage.
                  </small>
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
                <button type="button" onClick={closeForm}>
                  Cancel
                </button>

                <button type="submit" className="sa-form-save">
                  {editingId !== null
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
              <span className="sa-section-kicker">PROPERTY DIRECTORY</span>
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
              {filteredProperties.map(property => (
                <article className="sa-managed-card" key={property.id}>

                  <div className="sa-managed-image">
                    {property.image ? (
                      <img src={property.image} alt={property.title} />
                    ) : (
                      <div className="sa-managed-image-placeholder">
                        SAACHIZY
                      </div>
                    )}

                    <span className={`sa-managed-status ${
                      property.status === 'Sold' ? 'sold' : 'available'
                    }`}>
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
                        onClick={() => deleteProperty(property.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </article>
              ))}
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
