
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import SEO from '../components/SEO';
import { usePropertiesWithStatus } from '../data/propertyStore';
import Loader from '../components/Loader';
import '../App.css';
import './PropertyDetails.css';

const fallbackImage =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85';

function PropertyDetails() {
  const { id } = useParams();

  const {
    properties,
    loading,
    error,
  } = usePropertiesWithStatus();

  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const property = properties.find(
    item => String(item.id) === String(id)
  );

  // Collect all uploaded images and videos from Supabase.
  const mediaItems = useMemo(() => {
    if (!property) return [];

    const uploadedMedia = Array.isArray(property.media)
      ? property.media
          .filter(item => item && item.url)
          .map(item => ({
            url: item.url,
            type:
              item.type ||
              (item.url.match(/\.(mp4|webm|mov)(\?|$)/i)
                ? 'video'
                : 'image'),
            name: item.name || '',
          }))
      : [];

    // Support older image arrays if they exist.
    const oldImages = Array.isArray(property.images)
      ? property.images
          .filter(Boolean)
          .map(item => ({
            url: typeof item === 'string' ? item : item.url,
            type: 'image',
            name: '',
          }))
      : [];

    // Include the main cover image.
    const coverImage = property.image
      ? [
          {
            url: property.image,
            type: 'image',
            name: 'Cover image',
          },
        ]
      : [];

    const combined = [
      ...coverImage,
      ...uploadedMedia,
      ...oldImages,
    ];

    // Remove duplicate URLs.
    const unique = combined.filter(
      (item, index, array) =>
        item.url &&
        array.findIndex(other => other.url === item.url) === index
    );

    return unique.length
      ? unique
      : [
          {
            url: fallbackImage,
            type: 'image',
            name: 'Property image',
          },
        ];
  }, [property]);

  useEffect(() => {
    setActiveImage(0);
    setGalleryOpen(false);
  }, [id]);

  // Close the full-screen gallery using Escape.
  useEffect(() => {
    if (!galleryOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setGalleryOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setActiveImage(previous =>
          (previous + 1) % mediaItems.length
        );
      }

      if (event.key === 'ArrowLeft') {
        setActiveImage(previous =>
          (previous - 1 + mediaItems.length) % mediaItems.length
        );
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryOpen, mediaItems.length]);

  // Show the signature loader while Supabase retrieves properties.
  if (loading) {
    return (
      <Loader
        fullScreen
        message="Preparing your property experience..."
      />
    );
  }

  // Handle database loading errors.
  if (error) {
    return (
      <div className="sa-detail-page">
        <SignatureNavigation />

        <main className="sa-not-found">
          <p className="sa-detail-eyebrow">PROPERTY COLLECTION</p>
          <h1>Unable to Load Property.</h1>

          <p>
            We could not retrieve the property information.
            Please try again.
          </p>

          <p>{error}</p>

          <button
            type="button"
            className="sa-detail-primary-button"
            onClick={() => window.location.reload()}
          >
            Try Again <span>↗</span>
          </button>

          <Link to="/properties" className="sa-detail-primary-button">
            Explore Properties <span>↗</span>
          </Link>
        </main>

        <SignatureFooter />
      </div>
    );
  }

  // Show the 404 page only after loading has finished.
  if (!property) {
    return (
      <div className="sa-detail-page">
        <SignatureNavigation />

        <main className="sa-not-found">
          <span>404</span>
          <p className="sa-detail-eyebrow">PROPERTY NOT FOUND</p>
          <h1>This opportunity is no longer here.</h1>

          <p>
            We couldn't find the property you requested.
            Explore our collection to discover other available opportunities.
          </p>

          <Link to="/properties" className="sa-detail-primary-button">
            Explore Properties <span>↗</span>
          </Link>
        </main>

        <SignatureFooter />
      </div>
    );
  }

  const isAvailable = property.status === 'Available';
  const activeMedia = mediaItems[activeImage] || mediaItems[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Saachizy, I am interested in this property:\n\n${property.title}\nLocation: ${property.location}\nPrice: ${property.price}\n\nPlease provide more information and inspection details.`
  );

  const specifications = [
    { label: 'PROPERTY TYPE', value: property.category },
    { label: 'UNITS', value: property.units },
    { label: 'BEDROOMS', value: property.bedrooms },
    { label: 'LAND AREA', value: property.landSize },
    { label: 'LEGAL TITLE', value: property.titleDocument },
  ].filter(item => item.value);

  function showPrevious() {
    setActiveImage(previous =>
      (previous - 1 + mediaItems.length) % mediaItems.length
    );
  }

  function showNext() {
    setActiveImage(previous =>
      (previous + 1) % mediaItems.length
    );
  }

  return (
    <div className="sa-detail-page">

      <SEO
        title={`${property.title} in ${property.location || 'Abuja, Nigeria'}`}
        description={
          property.description ||
          `Explore ${property.title} in ${property.location || 'Abuja, Nigeria'} with Saachizy. Contact our team for property details, pricing and inspection arrangements.`
        }
        image={
          mediaItems.find(item => item.type === 'image')?.url ||
          fallbackImage
        }
        type="article"
      />

      <SignatureNavigation />

      <main className="sa-detail-main">

        {/* BREADCRUMB */}
        <div className="sa-detail-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties">Properties</Link>
          <span>/</span>
          <span>{property.title}</span>
        </div>

        {/* PROPERTY HEADING */}
        <header className="sa-detail-heading">
          <div>
            <p className="sa-detail-eyebrow">
              SAACHIZY EXCLUSIVE LISTING
            </p>

            <h1>{property.title}</h1>

            <p className="sa-detail-location">
              <span>⌖</span>
              {property.location || 'Location available on request'}
            </p>
          </div>

          <div className="sa-detail-status">
            <span className={isAvailable ? 'available' : 'sold'}>
              <i />
              {property.status || 'Status unavailable'}
            </span>

            <small>PROPERTY STATUS</small>
          </div>
        </header>

        {/* PROPERTY IMAGE AND VIDEO GALLERY */}
        <section className="sa-detail-gallery">

          <div className="sa-gallery-main">

            {activeMedia?.type === 'video' ? (
              <video
                key={activeMedia.url}
                src={activeMedia.url}
                controls
                playsInline
                preload="metadata"
                className="sa-gallery-main-video"
              />
            ) : (
              <button
                type="button"
                className="sa-gallery-image-button"
                onClick={() => setGalleryOpen(true)}
                aria-label="Open full-screen property gallery"
              >
                <img
                  src={activeMedia?.url || fallbackImage}
                  alt={property.title}
                  onError={event => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                />

                <span className="sa-gallery-expand">
                  VIEW FULL GALLERY ↗
                </span>
              </button>
            )}

            <span className="sa-gallery-label">
              PROPERTY GALLERY
            </span>

            <span className="sa-gallery-counter">
              {String(activeImage + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}
            </span>

          </div>

          {/* MEDIA THUMBNAILS */}
          {mediaItems.length > 1 && (
            <div className="sa-gallery-thumbnails">

              {mediaItems.map((item, index) => (
                <button
                  type="button"
                  key={`${item.url}-${index}`}
                  className={activeImage === index ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View property media ${index + 1}`}
                >
                  {item.type === 'video' ? (
                    <div className="sa-gallery-video-thumbnail">
                      <video
                        src={item.url}
                        muted
                        preload="metadata"
                      />

                      <span>▶ VIDEO</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={`${property.title} view ${index + 1}`}
                      onError={event => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  )}
                </button>
              ))}

            </div>
          )}

          {/* FULL-SCREEN GALLERY */}
          {galleryOpen && activeMedia?.type !== 'video' && (
            <div
              className="sa-gallery-lightbox"
              onClick={() => setGalleryOpen(false)}
            >

              <button
                type="button"
                className="sa-gallery-close"
                onClick={() => setGalleryOpen(false)}
                aria-label="Close gallery"
              >
                ×
              </button>

              {mediaItems.length > 1 && (
                <button
                  type="button"
                  className="sa-gallery-prev"
                  onClick={event => {
                    event.stopPropagation();
                    showPrevious();
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
              )}

              <img
                src={activeMedia.url}
                alt={property.title}
                onClick={event => event.stopPropagation()}
              />

              {mediaItems.length > 1 && (
                <button
                  type="button"
                  className="sa-gallery-next"
                  onClick={event => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              )}

              <span className="sa-gallery-lightbox-counter">
                {activeImage + 1} / {mediaItems.length}
              </span>

            </div>
          )}

        </section>

        {/* PROPERTY OVERVIEW */}
        <section className="sa-detail-overview">

          <div className="sa-detail-content">

            <div className="sa-detail-section-heading">
              <p className="sa-detail-eyebrow">PROPERTY OVERVIEW</p>
              <h2>Discover the <em>Property.</em></h2>
            </div>

            <div className="sa-detail-description">
              {property.description ? (
                <p>{property.description}</p>
              ) : (
                <p>
                  Contact Saachizy for more information about this property,
                  its features and inspection arrangements.
                </p>
              )}
            </div>

            <div className="sa-detail-spec-grid">
              {specifications.map(item => (
                <div className="sa-detail-spec" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            {/* PROPERTY INFORMATION */}
            <div className="sa-detail-information">
              <p className="sa-detail-eyebrow">PROPERTY INFORMATION</p>
              <h3>Details that matter.</h3>

              <div className="sa-information-row">
                <span>Property</span>
                <strong>{property.title}</strong>
              </div>

              <div className="sa-information-row">
                <span>Location</span>
                <strong>
                  {property.location || 'Available on request'}
                </strong>
              </div>

              <div className="sa-information-row">
                <span>Category</span>
                <strong>{property.category || 'Not specified'}</strong>
              </div>

              <div className="sa-information-row">
                <span>Title documentation</span>
                <strong>
                  {property.titleDocument || 'Contact for details'}
                </strong>
              </div>
            </div>

          </div>

          {/* ENQUIRY SIDEBAR */}
          <aside className="sa-detail-sidebar">

            <div className="sa-enquiry-card">
              <p className="sa-detail-eyebrow">INVESTMENT DETAILS</p>

              <span className="sa-enquiry-price-label">ASKING PRICE</span>
              <h2>{property.price || 'Price on request'}</h2>

              <div className="sa-enquiry-divider" />

              <div className="sa-enquiry-location">
                <span>⌖</span>

                <div>
                  <small>PROPERTY LOCATION</small>
                  <strong>
                    {property.location || 'Available on request'}
                  </strong>
                </div>
              </div>

              {isAvailable ? (
                <>
                  <a
                    href={`https://wa.me/2349060446377?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="sa-enquiry-button"
                  >
                    Enquire About Property <span>↗</span>
                  </a>

                  <a
                    href="https://wa.me/2349060446377"
                    target="_blank"
                    rel="noreferrer"
                    className="sa-enquiry-secondary"
                  >
                    Speak With Our Team
                  </a>
                </>
              ) : (
                <div className="sa-unavailable-message">
                  This property is currently not available for new enquiries.
                  Contact our team for similar opportunities.

                  <a
                    href="https://wa.me/2349060446377"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact Saachizy ↗
                  </a>
                </div>
              )}

              <p className="sa-enquiry-note">
                SAACHIZY REAL ESTATE
                <br />
                THE STORY. THE VISION. THE FUTURE.
              </p>
            </div>

            <div className="sa-detail-assistance">
              <span>NEED ASSISTANCE?</span>
              <h3>Let's help you make the right move.</h3>

              <a
                href="https://wa.me/2349060446377"
                target="_blank"
                rel="noreferrer"
              >
                Contact Our Team ↗
              </a>
            </div>

          </aside>

        </section>

        {/* MORE PROPERTIES */}
        <section className="sa-more-properties">
          <div>
            <p className="sa-detail-eyebrow">CONTINUE EXPLORING</p>
            <h2>Find your next <em>opportunity.</em></h2>
          </div>

          <Link to="/properties">
            Explore All Properties <span>↗</span>
          </Link>
        </section>

      </main>

      <SignatureFooter />

    </div>
  );
}


/* =========================================
   SAACHIZY — SHARED SIGNATURE NAVIGATION
========================================= */

function SignatureNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>

      <BrandLogo
        className="logo"
        onClick={() => setMenuOpen(false)}
      />

      <div className="nav-links">

        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="nav-index">01</span>
          <span>Home</span>
        </Link>

        <Link to="/#about" onClick={() => setMenuOpen(false)}>
          <span className="nav-index">02</span>
          <span>Our Story</span>
        </Link>

        <Link to="/properties" onClick={() => setMenuOpen(false)}>
          <span className="nav-index">03</span>
          <span>Properties</span>
        </Link>

        <Link to="/#services" onClick={() => setMenuOpen(false)}>
          <span className="nav-index">04</span>
          <span>Expertise</span>
        </Link>

        <Link to="/#contact" onClick={() => setMenuOpen(false)}>
          <span className="nav-index">05</span>
          <span>Contact</span>
        </Link>

        <div className="mobile-menu-footer">
          <span>THE STORY. THE VISION. THE FUTURE.</span>

          <a
            href="https://wa.me/2349060446377"
            target="_blank"
            rel="noreferrer"
          >
            START A CONVERSATION ↗
          </a>
        </div>

      </div>

      <Link className="nav-button" to="/#contact">
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
  );
}


/* =========================================
   SAACHIZY — SHARED SIGNATURE FOOTER
========================================= */

function SignatureFooter() {
  return (
    <footer className="sa-footer">

      <div className="sa-footer-main">

        <div className="sa-footer-brand">

          <BrandLogo
            className="sa-footer-logo"
            variant="footer"
          />

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
            href="https://wa.me/2349060446377"
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
  );
}

export default PropertyDetails;
