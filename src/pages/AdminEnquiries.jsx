
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import './Admin.css';

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadEnquiries();

    function refresh() {
      loadEnquiries();
    }

    window.addEventListener('storage', refresh);
    window.addEventListener('saachizy-enquiries-updated', refresh);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('saachizy-enquiries-updated', refresh);
    };
  }, []);

  function loadEnquiries() {
    try {
      const saved = JSON.parse(
        localStorage.getItem('saachizy-enquiries') || '[]'
      );

      setEnquiries(Array.isArray(saved) ? saved : []);
    } catch {
      setEnquiries([]);
    }
  }

  function saveEnquiries(updated) {
    setEnquiries(updated);
    localStorage.setItem('saachizy-enquiries', JSON.stringify(updated));
    window.dispatchEvent(new Event('saachizy-enquiries-updated'));
  }

  function updateStatus(id, status) {
    const updated = enquiries.map((item, index) =>
      (item.id ?? index) === id ? { ...item, status } : item
    );

    saveEnquiries(updated);
  }

  function deleteEnquiry(id) {
    if (!window.confirm('Delete this buyer enquiry permanently?')) return;

    const updated = enquiries.filter(
      (item, index) => (item.id ?? index) !== id
    );

    saveEnquiries(updated);
  }

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const searchText = [
        item.name,
        item.phone,
        item.email,
        item.propertyTitle,
        item.property,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesFilter =
        filter === 'All' || (item.status || 'New') === filter;

      return matchesSearch && matchesFilter;
    });
  }, [enquiries, search, filter]);

  const newCount = enquiries.filter(
    item => !item.status || item.status === 'New'
  ).length;

  const contactedCount = enquiries.filter(
    item => item.status === 'Contacted'
  ).length;

  const closedCount = enquiries.filter(
    item => item.status === 'Closed'
  ).length;

  return (
    <div className="sa-dashboard">

      {/* SIDEBAR */}
      <aside className="sa-sidebar">
        <BrandLogo
  className="sa-brand"
  variant="header"
/>

        <div className="sa-sidebar-label">WORKSPACE</div>

        <nav className="sa-nav">
          <Link to="/admin" className="sa-nav-link">
            <span className="sa-nav-icon">▦</span>
            Dashboard
          </Link>

          <Link to="/admin/properties" className="sa-nav-link">
            <span className="sa-nav-icon">⌂</span>
            Properties
          </Link>

          <Link
            to="/admin/enquiries"
            className="sa-nav-link active"
          >
            <span className="sa-nav-icon">♧</span>
            Buyer Enquiries
            <span className="sa-nav-indicator" />
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
      <main className="sa-main sa-enquiries-main">

        <header className="sa-topbar">
          <div>
            <div className="sa-breadcrumb">
              WORKSPACE <span>/</span> CLIENT MANAGEMENT
            </div>
            <h1>Buyer Enquiries</h1>
          </div>

          <div className="sa-topbar-right">
            <span className="sa-page-indicator">
              CLIENT RELATIONSHIP CENTRE
            </span>
          </div>
        </header>

        {/* PAGE INTRO */}
        <section className="sa-property-hero sa-enquiry-hero">
          <div>
            <span className="sa-eyebrow">
              <span /> SAACHIZY CLIENT RELATIONS
            </span>

            <h2>
              Every connection.
              <br />
              <span>Every opportunity.</span>
            </h2>

            <p>
              Manage prospective buyers, track conversations
              and stay connected with people interested in
              Saachizy properties.
            </p>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="sa-stats-grid sa-enquiry-stats">

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon navy">♧</span>
              <span className="sa-stat-label">TOTAL ENQUIRIES</span>
            </div>
            <strong>{enquiries.length}</strong>
            <span className="sa-stat-description">All buyer enquiries</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon gold">✦</span>
              <span className="sa-stat-label">NEW ENQUIRIES</span>
            </div>
            <strong>{newCount}</strong>
            <span className="sa-stat-description">Awaiting follow-up</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon purple">↗</span>
              <span className="sa-stat-label">CONTACTED</span>
            </div>
            <strong>{contactedCount}</strong>
            <span className="sa-stat-description">Conversations started</span>
          </article>

          <article className="sa-stat-card">
            <div className="sa-stat-top">
              <span className="sa-stat-icon green">✓</span>
              <span className="sa-stat-label">CLOSED</span>
            </div>
            <strong>{closedCount}</strong>
            <span className="sa-stat-description">Completed follow-ups</span>
          </article>

        </section>

        {/* ENQUIRIES DIRECTORY */}
        <section className="sa-portfolio-section sa-enquiry-section">

          <div className="sa-portfolio-heading">
            <div>
              <span className="sa-section-kicker">
                CLIENT RELATIONSHIP MANAGEMENT
              </span>
              <h2>Enquiry Directory</h2>
              <p>
                {filteredEnquiries.length} of {enquiries.length} enquiries
              </p>
            </div>
          </div>

          {/* SEARCH AND FILTER */}
          <div className="sa-portfolio-toolbar">

            <div className="sa-search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search clients, phone numbers or properties..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
            </div>

            <div className="sa-filter-buttons">
              {['All', 'New', 'Contacted', 'Closed'].map(option => (
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

          {/* ENQUIRIES TABLE */}
          {filteredEnquiries.length === 0 ? (
            <div className="sa-portfolio-empty">
              <div>♧</div>
              <h3>
                {enquiries.length === 0
                  ? 'Your client connections start here.'
                  : 'No matching enquiries found.'}
              </h3>
              <p>
                {enquiries.length === 0
                  ? 'Buyer enquiries submitted through your website will appear here.'
                  : 'Try another search or change the enquiry filter.'}
              </p>
            </div>
          ) : (
            <div className="sa-enquiry-table-wrap">
              <table className="sa-enquiry-table">
                <thead>
                  <tr>
                    <th>CLIENT</th>
                    <th>PROPERTY INTEREST</th>
                    <th>CONTACT INFORMATION</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.map((item, index) => {
                    const id = item.id ?? index;

                    return (
                      <tr key={id}>
                        <td>
                          <strong>{item.name || 'Unnamed Client'}</strong>
                          <small>
                            {item.date || item.createdAt || 'Date not provided'}
                          </small>
                        </td>

                        <td>
                          <span className="sa-enquiry-property">
                            {item.propertyTitle ||
                              item.property ||
                              'General Enquiry'}
                          </span>
                        </td>

                        <td>
                          <div className="sa-enquiry-contact">
                            {item.phone ? (
                              <a href={`tel:${item.phone}`}>
                                {item.phone}
                              </a>
                            ) : (
                              <span>No phone provided</span>
                            )}

                            <small>{item.email || 'No email provided'}</small>
                          </div>
                        </td>

                        <td>
                          <select
                            className={`sa-enquiry-status ${
                              (item.status || 'New').toLowerCase()
                            }`}
                            value={item.status || 'New'}
                            onChange={event =>
                              updateStatus(id, event.target.value)
                            }
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="sa-enquiry-delete"
                            onClick={() => deleteEnquiry(id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

export default AdminEnquiries;
