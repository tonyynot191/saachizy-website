
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../data/propertyStore';
import './Admin.css';

function Admin() {
  const properties = useProperties();

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('saachizy-enquiries');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function refreshEnquiries() {
      try {
        const saved = localStorage.getItem('saachizy-enquiries');
        const parsed = saved ? JSON.parse(saved) : [];
        setEnquiries(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Could not refresh enquiries:', error);
      }
    }

    window.addEventListener('storage', refreshEnquiries);
    window.addEventListener(
      'saachizy-enquiries-updated',
      refreshEnquiries
    );

    return () => {
      window.removeEventListener('storage', refreshEnquiries);
      window.removeEventListener(
        'saachizy-enquiries-updated',
        refreshEnquiries
      );
    };
  }, []);

  const available = properties.filter(
    property => property.status === 'Available'
  ).length;

  const sold = properties.filter(
    property => property.status === 'Sold'
  ).length;

  const newEnquiries = enquiries.filter(
    enquiry => enquiry.status !== 'Contacted'
  ).length;

  const recentProperties = [...properties].reverse().slice(0, 5);
  const recentEnquiries = [...enquiries].reverse().slice(0, 5);

  const today = new Intl.DateTimeFormat('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

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
          <Link to="/admin" className="sa-nav-link active">
            <span className="sa-nav-icon">▦</span>
            Dashboard
            <span className="sa-nav-indicator" />
          </Link>

          <Link to="/admin/properties" className="sa-nav-link">
            <span className="sa-nav-icon">⌂</span>
            Properties
          </Link>

          <Link to="/admin/enquiries" className="sa-nav-link">
            <span className="sa-nav-icon">♧</span>
            Buyer Enquiries
            {newEnquiries > 0 && (
              <span className="sa-nav-count">{newEnquiries}</span>
            )}
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
      <main className="sa-main">

        {/* TOP BAR */}
        <header className="sa-topbar">
          <div>
            <div className="sa-breadcrumb">
              WORKSPACE <span>/</span> DASHBOARD
            </div>
            <h1>Overview</h1>
          </div>

          <div className="sa-topbar-right">
            <div className="sa-date">
              <span>◷</span>
              {today}
            </div>

            <div className="sa-admin-profile">
              <div className="sa-avatar">S</div>
              <div>
                <strong>Administrator</strong>
                <span>Saachizy Management</span>
              </div>
            </div>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="sa-hero">
          <div className="sa-hero-content">
            <span className="sa-eyebrow">
              <span /> YOUR BUSINESS AT A GLANCE
            </span>

            <h2>
              Welcome to your
              <br />
              <span>command centre.</span>
            </h2>

            <p>
              Every opportunity begins with a vision.
              Keep track of your properties, connect with
              interested buyers and manage your growing portfolio.
            </p>

            <Link to="/admin/properties" className="sa-gold-button">
              Manage Properties <span>→</span>
            </Link>
          </div>

          <div className="sa-hero-decoration">
            <div className="sa-hero-ring sa-ring-one" />
            <div className="sa-hero-ring sa-ring-two" />
            <div className="sa-hero-monogram">S</div>
            <div className="sa-hero-caption">
              <span>SAACHIZY</span>
              <small>PROPERTY & INVESTMENT</small>
            </div>
          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="sa-section">
          <div className="sa-section-heading">
            <div>
              <span className="sa-section-kicker">PERFORMANCE</span>
              <h2>Business Overview</h2>
              <p>A snapshot of your current property portfolio.</p>
            </div>
          </div>

          <div className="sa-stats-grid">

            <article className="sa-stat-card">
              <div className="sa-stat-top">
                <span className="sa-stat-icon navy">⌂</span>
                <span className="sa-stat-label">PORTFOLIO</span>
              </div>
              <strong>{properties.length}</strong>
              <span className="sa-stat-description">Total properties</span>
              <div className="sa-stat-bottom">
                <span>All listed properties</span>
                <span className="sa-stat-arrow">↗</span>
              </div>
            </article>

            <article className="sa-stat-card">
              <div className="sa-stat-top">
                <span className="sa-stat-icon green">✓</span>
                <span className="sa-stat-label">AVAILABLE</span>
              </div>
              <strong>{available}</strong>
              <span className="sa-stat-description">Properties available</span>
              <div className="sa-stat-bottom">
                <span>Open for enquiries</span>
                <span className="sa-stat-arrow">↗</span>
              </div>
            </article>

            <article className="sa-stat-card">
              <div className="sa-stat-top">
                <span className="sa-stat-icon gold">◆</span>
                <span className="sa-stat-label">COMPLETED</span>
              </div>
              <strong>{sold}</strong>
              <span className="sa-stat-description">Sold properties</span>
              <div className="sa-stat-bottom">
                <span>Closed opportunities</span>
                <span className="sa-stat-arrow">↗</span>
              </div>
            </article>

            <article className="sa-stat-card">
              <div className="sa-stat-top">
                <span className="sa-stat-icon purple">♧</span>
                <span className="sa-stat-label">BUYER INTEREST</span>
              </div>
              <strong>{newEnquiries}</strong>
              <span className="sa-stat-description">New enquiries</span>
              <div className="sa-stat-bottom">
                <span>Awaiting follow-up</span>
                <span className="sa-stat-arrow">↗</span>
              </div>
            </article>

          </div>
        </section>

        {/* MAIN DASHBOARD COLUMNS */}
        <div className="sa-content-grid">

          {/* BUYER ACTIVITY */}
          <section className="sa-panel sa-enquiry-panel">
            <div className="sa-panel-heading">
              <div>
                <span className="sa-section-kicker">CLIENT RELATIONSHIPS</span>
                <h2>Buyer Activity</h2>
                <p>Recent interest in your properties.</p>
              </div>

              <Link to="/admin/enquiries" className="sa-text-link">
                View all <span>→</span>
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="sa-empty-state">
                <div className="sa-empty-icon">♧</div>
                <h3>No enquiries yet</h3>
                <p>
                  Buyer enquiries will appear here when visitors
                  submit the website enquiry form.
                </p>
              </div>
            ) : (
              <div className="sa-enquiry-list">
                {recentEnquiries.map((enquiry, index) => (
                  <div
                    className="sa-enquiry-item"
                    key={enquiry.id || index}
                  >
                    <div className="sa-client-avatar">
                      {(enquiry.name || 'B').charAt(0).toUpperCase()}
                    </div>

                    <div className="sa-client-info">
                      <strong>{enquiry.name || 'Interested buyer'}</strong>
                      <span>
                        {enquiry.propertyTitle ||
                          enquiry.property ||
                          'General property enquiry'}
                      </span>
                      <small>
                        {enquiry.phone || enquiry.email || 'No contact details'}
                      </small>
                    </div>

                    <span className={`sa-status-pill ${
                      enquiry.status === 'Contacted' ? 'contacted' : 'new'
                    }`}>
                      {enquiry.status || 'New'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link to="/admin/enquiries" className="sa-panel-footer">
              Open buyer enquiries <span>→</span>
            </Link>
          </section>

          {/* PORTFOLIO ACTIVITY */}
          <section className="sa-panel sa-property-panel">
            <div className="sa-panel-heading">
              <div>
                <span className="sa-section-kicker">YOUR PORTFOLIO</span>
                <h2>Recent Properties</h2>
                <p>Latest properties in your system.</p>
              </div>

              <Link to="/admin/properties" className="sa-text-link">
                View all <span>→</span>
              </Link>
            </div>

            {recentProperties.length === 0 ? (
              <div className="sa-empty-state">
                <div className="sa-empty-icon">⌂</div>
                <h3>Your portfolio is waiting</h3>
                <p>Add your first property to get started.</p>
                <Link to="/admin/properties" className="sa-small-button">
                  Add Property +
                </Link>
              </div>
            ) : (
              <div className="sa-property-list">
                {recentProperties.map(property => (
                  <div className="sa-property-item" key={property.id}>
                    <div className="sa-property-thumb">
                      {property.image ? (
                        <img src={property.image} alt={property.title} />
                      ) : (
                        <span>⌂</span>
                      )}
                    </div>

                    <div className="sa-property-info">
                      <strong>{property.title}</strong>
                      <span>{property.location}</span>
                      <small>{property.price}</small>
                    </div>

                    <span className={`sa-status-pill ${
                      property.status === 'Sold' ? 'sold' : 'available'
                    }`}>
                      {property.status || 'Available'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link to="/admin/properties" className="sa-panel-footer">
              Manage property portfolio <span>→</span>
            </Link>
          </section>

        </div>

        {/* BOTTOM FOOTER */}
        <footer className="sa-dashboard-footer">
          <span>© {new Date().getFullYear()} SAACHIZY REAL ESTATE</span>
          <span>THE STORY. THE VISION. THE FUTURE.</span>
        </footer>

      </main>
    </div>
  );
}

export default Admin;
