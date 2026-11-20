
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useProperties } from '../data/propertyStore';
import '../App.css';
import './Properties.css';

const fallbackImage =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85';

function Properties() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  const allProperties = useProperties();

  const availableProperties = allProperties.filter(
    property => property.status === 'Available'
  );

  const filteredProperties = useMemo(() => {
    return availableProperties.filter(property => {
      const term = search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        [
          property.title,
          property.location,
          property.description,
          property.category,
          property.titleDocument,
        ].some(value => (value || '').toLowerCase().includes(term));

      const matchesCategory =
        category === 'All' || property.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [availableProperties, search, category]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
  };

  return (
    <div className="sa-properties-page">

      <SEO
        title="Properties for Sale in Abuja | Luxury Homes, Land & Investment"
        description="Explore premium properties for sale in Abuja with Saachizy. Discover luxury homes, residential and commercial properties, and strategic land investment opportunities across Abuja, Nigeria."
      />

      {/* HOMEPAGE SIGNATURE NAVIGATION */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>

        <Link
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          SAACHIZY<span>.</span>
        </Link>

        
<div className="nav-links">

  <Link to="/" onClick={() => setMenuOpen(false)}>
    <span className="nav-index">01</span>
    <span>Home</span>
  </Link>

  <Link to="/about" onClick={() => setMenuOpen(false)}>
    <span className="nav-index">02</span>
    <span>Our Story</span>
  </Link>

  <Link
    to="/properties"
    className="active"
    onClick={() => setMenuOpen(false)}
  >
    <span className="nav-index">03</span>
    <span>Properties</span>
  </Link>

  <Link to="/expertise" onClick={() => setMenuOpen(false)}>
    <span className="nav-index">04</span>
    <span>Expertise</span>
  </Link>

  <Link to="/contact" onClick={() => setMenuOpen(false)}>
    <span className="nav-index">05</span>
    <span>Contact</span>
  </Link>

  <div className="mobile-menu-footer">
    <span>THE STORY. THE VISION. THE FUTURE.</span>
    <a
      href="https://wa.me/2347073874044"
      target="_blank"
      rel="noreferrer"
    >
      START A CONVERSATION ↗
    </a>
  </div>

</div>

        <Link className="nav-button" to="/contact">
          Let's Talk <span>↗</span>
        </Link>

        <button
          type="button"
          className="sa-menu-toggle"
          onClick={() => setMenuOpen(previous => !previous)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <span className="sa-menu-icon">
            <i></i>
            <i></i>
          </span>
        </button>

      </nav>

      
{/* SAACHIZY — CINEMATIC PROPERTIES HERO */}
<header className="hero sa-properties-page-hero">

  <div className="sa-hero-background"></div>
  <div className="sa-hero-overlay"></div>

  <div className="sa-hero-content">

    <div className="sa-hero-kicker">
      <span></span>
      THE SAACHIZY COLLECTION
    </div>

    <h1>
      Exceptional Properties.
      <br />
      <span>Extraordinary Opportunities.</span>
    </h1>

    <p className="sa-hero-description">
      Discover a carefully selected collection of premium
      properties, luxury residences and strategic real estate
      investment opportunities.
    </p>

    <div className="sa-hero-actions">

      <a href="#collection" className="sa-hero-primary">
        Explore Properties
        <span>↓</span>
      </a>

      <Link to="/#about" className="sa-hero-secondary">
        Discover Our Story
        <span>→</span>
      </Link>

    </div>

  </div>

  <div className="sa-hero-side-note">
    <span>THE SAACHIZY COLLECTION</span>
    <i></i>
    <span>ABUJA · NIGERIA</span>
  </div>

  <div className="sa-hero-bottom">

    <div className="sa-hero-brand-line">
      <span>02</span>
      <span>THE STORY. THE VISION. THE FUTURE.</span>
    </div>

    <a href="#collection" className="sa-hero-scroll">
      <span>EXPLORE THE COLLECTION</span>
      <i>↓</i>
    </a>

  </div>

</header>


      {/* PROPERTY COLLECTION */}
      <main className="sa-collection" id="collection">

        <div className="sa-collection-heading">

          <div>
            <p className="sa-section-label">DISCOVER THE DIFFERENCE</p>

            <h2>
              Explore Our <em>Properties.</em>
            </h2>

            <p className="sa-section-description">
              Every property represents an opportunity.
              Find the one that aligns with your vision.
            </p>
          </div>

          <div className="sa-listing-count">
            <strong>{filteredProperties.length.toString().padStart(2, '0')}</strong>
            <span>AVAILABLE<br />PROPERTIES</span>
          </div>

        </div>

        {/* SEARCH AND FILTER */}
        <div className="sa-filter-panel">

          <div className="sa-search-box">
            <span className="sa-search-icon">⌕</span>

            <input
              type="search"
              placeholder="Search by property name, location or keyword..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />

            {search && (
              <button type="button" onClick={() => setSearch('')}>
                ×
              </button>
            )}
          </div>

          <div className="sa-category-filter">
            <span>PROPERTY CATEGORY</span>

            <select
              value={category}
              onChange={event => setCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

        </div>

        {/* RESULTS TOOLBAR */}
        <div className="sa-results-toolbar">
          <p>
            Showing <strong>{filteredProperties.length}</strong> of{' '}
            <strong>{availableProperties.length}</strong> available properties
          </p>

          {(search || category !== 'All') && (
            <button type="button" onClick={clearFilters}>
              CLEAR ALL FILTERS ×
            </button>
          )}
        </div>

        {/* PROPERTY GRID */}
        {filteredProperties.length > 0 ? (

          <div className="sa-property-grid">

            {filteredProperties.map(property => (

              <article className="sa-property-card" key={property.id}>

                <Link
                  to={`/properties/${property.id}`}
                  className="sa-card-image"
                >
                  <img
                    src={property.image || fallbackImage}
                    alt={property.title || 'Saachizy property'}
                    loading="lazy"
                    onError={event => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />

                  <span className="sa-sale-label">AVAILABLE</span>

                  {property.category && (
                    <span className="sa-category-label">
                      {property.category}
                    </span>
                  )}

                  <span className="sa-image-arrow">↗</span>
                </Link>

                <div className="sa-card-content">

                  <p className="sa-card-location">
                    <span>⌖</span>
                    {property.location || 'Location available on request'}
                  </p>

                  <h3>
                    <Link to={`/properties/${property.id}`}>
                      {property.title || 'Premium Property'}
                    </Link>
                  </h3>

                  <div className="sa-card-specifications">

                    <div>
                      <span>UNITS</span>
                      <strong>{property.units || '—'}</strong>
                    </div>

                    <div>
                      <span>BEDROOMS</span>
                      <strong>{property.bedrooms || '—'}</strong>
                    </div>

                    <div>
                      <span>LAND AREA</span>
                      <strong>{property.landSize || '—'}</strong>
                    </div>

                  </div>

                  <div className="sa-card-title">
                    <span>TITLE DOCUMENT</span>
                    <strong>
                      {property.titleDocument || 'Available on request'}
                    </strong>
                  </div>

                  <div className="sa-card-footer">

                    <div className="sa-card-price">
                      <span>ASKING PRICE</span>
                      <strong>{property.price || 'Price on request'}</strong>
                    </div>

                    <Link
                      to={`/properties/${property.id}`}
                      className="sa-view-property"
                    >
                      VIEW DETAILS <span>↗</span>
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="sa-empty-state">
            <span className="sa-empty-icon">⌂</span>

            <p className="sa-section-label">PROPERTY COLLECTION</p>

            <h3>No Properties Found</h3>

            <p>
              {availableProperties.length === 0
                ? 'There are currently no available properties. Please check again soon.'
                : 'We could not find a property matching your search. Try another keyword or category.'}
            </p>

            {(search || category !== 'All') && (
              <button type="button" onClick={clearFilters}>
                CLEAR FILTERS
              </button>
            )}
          </div>

        )}

      </main>

      {/* CONTACT BANNER */}
      <section className="sa-property-contact">

        <div>
          <p className="sa-section-label">YOUR NEXT MOVE STARTS HERE</p>

          <h2>
            Let's Find Your <em>Next Opportunity.</em>
          </h2>

          <p>
            Speak with Saachizy for property enquiries,
            investment opportunities and professional assistance.
          </p>
        </div>

        <a
          href="https://wa.me/2347073874044"
          target="_blank"
          rel="noreferrer"
        >
          CONTACT SAACHIZY <span>↗</span>
        </a>

      </section>

      {/* HOMEPAGE SIGNATURE FOOTER */}
      <footer className="sa-footer">

        <div className="sa-footer-main">

          <div className="sa-footer-brand">
            <Link to="/" className="sa-footer-logo">
              SAACHIZY<span>.</span>
            </Link>

            <p className="sa-footer-tagline">
              THE STORY. THE VISION.<br />
              THE FUTURE.
            </p>

            <p className="sa-footer-description">
              Connecting people with exceptional property
              opportunities through vision, insight and
              lasting value.
            </p>
          </div>

          <div className="sa-footer-column">
            <span>EXPLORE</span>
            <Link to="/">Home</Link>
            <Link to="/#about">Our Story</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/#featured">Featured Property</Link>
          </div>

          <div className="sa-footer-column">
            <span>OUR EXPERTISE</span>
            <Link to="/#services">Property Advisory</Link>
            <Link to="/#services">Land Investment</Link>
            <Link to="/#services">Real Estate Development</Link>
          </div>

          <div className="sa-footer-column sa-footer-contact">
            <span>START A CONVERSATION</span>

            <h3>
              Let's find your<br />
              <em>next opportunity.</em>
            </h3>

            <a
              href="https://wa.me/2347073874044"
              target="_blank"
              rel="noreferrer"
              className="sa-footer-contact-link"
            >
              CONTACT SAACHIZY <span>↗</span>
            </a>

            <p>ABUJA, NIGERIA</p>
            <p>+234 707 387 4044</p>
          </div>

        </div>

        <div className="sa-footer-bottom">
          <span>
            © {new Date().getFullYear()} SAACHIZY. ALL RIGHTS RESERVED.
          </span>

          <span>THE STORY. THE VISION. THE FUTURE.</span>

          <Link to="/">BACK TO TOP ↑</Link>
        </div>

      </footer>

    </div>
  );
}

export default Properties;
