
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import BrandLogo from '../components/BrandLogo';
import '../App.css';
import './Contact.css';

function Contact() {
  const [searchParams] = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const service = searchParams.get('service');

    if (service) {
      setForm(previous => ({
        ...previous,
        interest: service,
      }));
    }
  }, [searchParams]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const existing = JSON.parse(
        localStorage.getItem('saachizy-enquiries') || '[]'
      );

      const enquiries = Array.isArray(existing) ? existing : [];

      const newEnquiry = {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        propertyTitle: form.interest,
        property: form.interest,
        budget: form.budget,
        message: form.message.trim(),
        status: 'New',
        createdAt: new Date().toLocaleString(),
      };

      localStorage.setItem(
        'saachizy-enquiries',
        JSON.stringify([...enquiries, newEnquiry])
      );

      window.dispatchEvent(
        new Event('saachizy-enquiries-updated')
      );

      setSubmitted(true);

      setForm({
        name: '',
        phone: '',
        email: '',
        interest: '',
        budget: '',
        message: '',
      });

    } catch (error) {
      alert('Your enquiry could not be submitted. Please try again.');
      console.error('Enquiry submission error:', error);
    }
  }

  return (
    <div className="website sa-contact-page">

      <SEO
        title="Contact Saachizy | Real Estate Enquiries in Abuja"
        description="Contact Saachizy in Abuja, Nigeria, for residential and commercial properties, land investment opportunities, property marketing and real estate development enquiries. Call or WhatsApp our team."
      />

      {/* SIGNATURE NAVIGATION */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
        <BrandLogo
  className="logo"
  onClick={() => setMenuOpen(false)}
/>

        <div className="nav-links">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">01</span><span>Home</span>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">02</span><span>Our Story</span>
          </Link>
          <Link to="/properties" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">03</span><span>Properties</span>
          </Link>
          <Link to="/expertise" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">04</span><span>Expertise</span>
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">05</span><span>Contact</span>
          </Link>

          <div className="mobile-menu-footer">
            <span>THE STORY. THE VISION. THE FUTURE.</span>
            <a href="https://wa.me/2349060446377" target="_blank" rel="noreferrer">
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
          <span className="sa-menu-icon"><i></i><i></i></span>
        </button>
      </nav>

      {/* CINEMATIC CONTACT HERO */}
      <header className="sa-contact-hero">
        <div className="sa-contact-hero-image"></div>
        <div className="sa-contact-hero-overlay"></div>

        <div className="sa-contact-hero-content">
          <p className="sa-contact-hero-kicker">
            LET'S START SOMETHING MEANINGFUL
          </p>

          <h1>
            Every opportunity
            <br />
            begins with <em>a conversation.</em>
          </h1>

          <p className="sa-contact-hero-description">
            Whether you're exploring a property, considering an investment
            or looking to market your property, we're ready to hear from you.
          </p>

          <div className="sa-contact-hero-actions">
            <a href="#contact-form" className="sa-contact-primary-action">
              SEND AN ENQUIRY <span>↗</span>
            </a>

            <a
              href="https://wa.me/2349060446377"
              target="_blank"
              rel="noreferrer"
              className="sa-contact-secondary-action"
            >
              CONNECT ON WHATSAPP <span>→</span>
            </a>
          </div>
        </div>

        <div className="sa-contact-hero-side-note">
          <span>SAACHIZY</span>
          <span>CONNECT WITH US</span>
        </div>

        <div className="sa-contact-hero-bottom">
          <span>01 — CLIENT RELATIONS</span>
          <a href="#contact-form">
            SCROLL TO CONNECT <span>↓</span>
          </a>
          <span>ABUJA · NIGERIA</span>
        </div>
      </header>

      {/* CONTACT BODY */}
      <main className="sa-contact-main">

        <section className="sa-contact-information">

          <p className="sa-contact-kicker">GET IN TOUCH</p>

          <h2>
            Let's make the
            <br />
            <em>next move count.</em>
          </h2>

          <p className="sa-contact-description">
            Tell us what you're looking for. Our team is available
            to help you explore property opportunities and take
            the next step with clarity.
          </p>

          <div className="sa-contact-methods">

            <a href="tel:+2347073874044" className="sa-contact-method">
              <span className="sa-contact-method-number">01</span>
              <div>
                <small>CALL OUR TEAM</small>
                <strong>+234 707 387 4044</strong>
              </div>
              <span className="sa-contact-method-arrow">↗</span>
            </a>

            <a
              href="https://wa.me/2349060446377"
              target="_blank"
              rel="noreferrer"
              className="sa-contact-method"
            >
              <span className="sa-contact-method-number">02</span>
              <div>
                <small>WHATSAPP</small>
                <strong>Start a conversation</strong>
              </div>
              <span className="sa-contact-method-arrow">↗</span>
            </a>

            <div className="sa-contact-method">
              <span className="sa-contact-method-number">03</span>
              <div>
                <small>OUR LOCATION</small>
                <strong>Abuja, Nigeria</strong>
              </div>
            </div>

          </div>

          <div className="sa-contact-signature">
            <span>SAACHIZY</span>
            <p>THE STORY. THE VISION. THE FUTURE.</p>
          </div>

        </section>

        {/* ENQUIRY FORM */}
        <section className="sa-contact-form-panel" id="contact-form">

          <div className="sa-contact-form-heading">
            <span>01 — CLIENT ENQUIRY</span>
            <h2>Tell us what you have in mind.</h2>
            <p>
              Complete the details below and our team will be able
              to understand your enquiry.
            </p>
          </div>

          {submitted && (
            <div className="sa-contact-success" role="status">
              <span>✓</span>
              <div>
                <strong>Your enquiry has been received.</strong>
                <p>
                  Thank you for contacting Saachizy. We appreciate
                  your interest and look forward to speaking with you.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="sa-contact-form">

            <div className="sa-contact-form-grid">

              <label>
                Full Name <span>*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Phone Number <span>*</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  autoComplete="tel"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  autoComplete="email"
                />
              </label>

              <label>
                What are you interested in? <span>*</span>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an interest</option>
                  <option value="Residential Property">Residential Property</option>
                  <option value="Luxury Homes">Luxury Homes</option>
                  <option value="Land Investment">Land Investment</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Property Marketing & Advisory">Property Marketing & Advisory</option>
                  <option value="Real Estate Development">Real Estate Development</option>
                  <option value="Property Listing">I want to list my property</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </label>

              <label className="sa-contact-budget">
                Budget / Investment Range
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="">Select a range (optional)</option>
                  <option value="Below ₦50 Million">Below ₦50 Million</option>
                  <option value="₦50 Million – ₦100 Million">₦50 Million – ₦100 Million</option>
                  <option value="₦100 Million – ₦500 Million">₦100 Million – ₦500 Million</option>
                  <option value="₦500 Million – ₦1 Billion">₦500 Million – ₦1 Billion</option>
                  <option value="Above ₦1 Billion">Above ₦1 Billion</option>
                  <option value="Not yet decided">Not yet decided</option>
                </select>
              </label>

            </div>

            <label className="sa-contact-message">
              Your Message
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more about the property, location, investment or service you're interested in..."
              />
            </label>

            <div className="sa-contact-submit-row">
              <p><span>*</span> Required information</p>
              <button type="submit">
                SEND YOUR ENQUIRY <span>↗</span>
              </button>
            </div>

          </form>

          <div className="sa-contact-form-bottom">
            <span>SAACHIZY / CLIENT RELATIONS</span>
            <span>YOUR NEXT MOVE STARTS HERE.</span>
          </div>

        </section>

      </main>

      {/* FINAL CONTACT INVITATION */}
      <section className="sa-contact-closing">
        <p>THE RIGHT CONVERSATION CAN OPEN NEW POSSIBILITIES.</p>
        <h2>
          Your vision deserves
          <br />
          <em>the right connection.</em>
        </h2>
        <a
          href="https://wa.me/2349060446377"
          target="_blank"
          rel="noreferrer"
        >
          CONNECT ON WHATSAPP <span>↗</span>
        </a>
      </section>

      {/* SIGNATURE FOOTER */}
      <footer className="sa-footer">
        <div className="sa-footer-main">

          <div className="sa-footer-brand">
            <BrandLogo
  className="sa-footer-logo"
  variant="footer"
/>
            <p className="sa-footer-tagline">
              THE STORY. THE VISION.
              <br />
              THE FUTURE.
            </p>
            <p className="sa-footer-description">
              Connecting people with exceptional property opportunities
              through vision, insight and lasting value.
            </p>
          </div>

          <div className="sa-footer-column">
            <span>EXPLORE</span>
            <Link to="/">Home</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/properties">Properties</Link>
          </div>

          <div className="sa-footer-column">
            <span>OUR EXPERTISE</span>
            <Link to="/expertise">Property Advisory</Link>
            <Link to="/expertise">Land Investment</Link>
            <Link to="/expertise">Real Estate Development</Link>
          </div>

          <div className="sa-footer-column sa-footer-contact">
            <span>START A CONVERSATION</span>
            <h3>
              Let's find your
              <br />
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
          <span>© {new Date().getFullYear()} SAACHIZY. ALL RIGHTS RESERVED.</span>
          <span>THE STORY. THE VISION. THE FUTURE.</span>
          <Link to="/">BACK TO TOP ↑</Link>
        </div>
      </footer>

    </div>
  );
}

export default Contact;
