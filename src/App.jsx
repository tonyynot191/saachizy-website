
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import './App.css';

function App() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    propertyTitle: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        propertyTitle: form.propertyTitle,
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

      setForm({
        name: '',
        phone: '',
        email: '',
        propertyTitle: '',
        message: '',
      });

      setSubmitted(true);
    } catch (error) {
      alert('Your enquiry could not be submitted. Please try again.');
      console.error('Enquiry submission error:', error);
    }
  }

  return (
    <div className="website">
      <SEO
        title="Luxury Real Estate, Land & Property Investment in Abuja"
        description="Discover exceptional real estate opportunities with Saachizy. Explore luxury homes, prime land, residential and commercial properties, and property investment opportunities in Abuja, Nigeria."
      />

      {/* SAACHIZY SIGNATURE NAVIGATION */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>

        <a
          href="#home"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          SAACHIZY<span>.</span>
        </a>

        <div className="nav-links">
        
<Link to="/" onClick={() => setMenuOpen(false)}>
  <span className="nav-index">01</span>
  <span>Home</span>
</Link>

<Link to="/about" onClick={() => setMenuOpen(false)}>
  <span className="nav-index">02</span>
  <span>Our Story</span>
</Link>

<Link to="/properties" onClick={() => setMenuOpen(false)}>
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

        <a className="nav-button" href="/contact">
          Let's Talk <span>↗</span>
        </a>

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

      {/* SAACHIZY SIGNATURE HERO */}
      <header className="hero" id="home">

        <div className="sa-hero-background"></div>
        <div className="sa-hero-overlay"></div>

        <div className="sa-hero-content">

          <div className="sa-hero-kicker">
            <span></span>
            REAL ESTATE · INVESTMENT · DEVELOPMENT
          </div>

          <h1>
            Where Vision
            <br />
            Meets <span>Value.</span>
          </h1>

          <p className="sa-hero-description">
            Beyond properties, we create connections to exceptional
            opportunities. Discover a more considered approach to
            property ownership, investment and development.
          </p>

          <div className="sa-hero-actions">
            <a href="/properties" className="sa-hero-primary">
              Explore Properties
              <span>↗</span>
            </a>

            <a href="/about" className="sa-hero-secondary">
              Discover Our Story
              <span>→</span>
            </a>
          </div>

        </div>

        <div className="sa-hero-side-note">
          <span>THE SAACHIZY PERSPECTIVE</span>
          <i></i>
          <span>ABUJA · NIGERIA</span>
        </div>

        <div className="sa-hero-bottom">

          <div className="sa-hero-brand-line">
            <span>01</span>
            <span>THE STORY. THE VISION. THE FUTURE.</span>
          </div>

          <a href="#about" className="sa-hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <i>↓</i>
          </a>

        </div>

      </header>

      {/* SAACHIZY BRAND STORY */}
      <section className="intro sa-story" id="about">

        <div className="sa-story-visual">

          <div className="sa-story-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
              alt="Contemporary luxury architectural interior"
            />
          </div>

          <div className="sa-story-image-caption">
            <span>THE SAACHIZY PERSPECTIVE</span>
            <span>01 / 03</span>
          </div>

          <div className="sa-story-watermark">01</div>

          <div className="sa-story-vertical">
            THE STORY BEHIND THE VISION
          </div>

        </div>

        <div className="sa-story-content">

          <div className="sa-story-kicker">
            <span></span>
            THE SAACHIZY STORY
          </div>

          <p className="sa-story-overline">
            MORE THAN REAL ESTATE
          </p>

          <h2>
            Real estate is more than property.
            <span> It's about possibility.</span>
          </h2>

          <div className="sa-story-divider"></div>

          <p className="sa-story-description">
            At Saachizy, we see real estate as a meeting point
            between vision, opportunity and lasting value.
          </p>

          <p className="sa-story-description">
            From land investment and property marketing to luxury
            homes and real estate development, we connect people
            with opportunities that reflect their ambitions.
          </p>

          <p className="sa-story-description">
            Every property has a story. Every investment begins
            with a vision. And every opportunity deserves a
            thoughtful approach.
          </p>

          <div className="sa-story-signature">
            <span>SAACHIZY</span>
            <span>THE STORY. THE VISION. THE FUTURE.</span>
          </div>

          <a href="/about" className="sa-story-link">
            DISCOVER OUR STORY
            <span>↗</span>
          </a>

        </div>

      </section>

      {/* SAACHIZY — SIGNATURE PROPERTY COLLECTIONS */}
      <section className="sa-collections" id="properties">

        <div className="sa-collections-heading">
          <div>
            <p className="sa-collections-kicker">
              <span></span> DISCOVER THE POSSIBILITIES
            </p>

            <h2>
              A world of property.<br />
              <span>One considered vision.</span>
            </h2>
          </div>

          <div className="sa-collections-intro">
            <span>THE SAACHIZY COLLECTION</span>
            <p>
              From exceptional land opportunities to distinguished
              residences and commercial spaces, discover property
              opportunities shaped around ambition.
            </p>
            <a href="/properties">
              VIEW ALL PROPERTIES <span>↗</span>
            </a>
          </div>
        </div>

        <div className="sa-collection-grid">

          <a href="/properties" className="sa-collection-card sa-land-card">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
              alt="Expansive green land and natural landscape"
            />
            <div className="sa-collection-shade"></div>

            <div className="sa-collection-top">
              <span>01</span>
              <span>INVESTMENT</span>
            </div>

            <div className="sa-collection-bottom">
              <div>
                <p>BUILD ON POTENTIAL</p>
                <h3>Prime Land</h3>
              </div>
              <span className="sa-collection-arrow">↗</span>
            </div>
          </a>

          <a href="/properties" className="sa-collection-card sa-home-card">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary luxury residential architecture"
            />
            <div className="sa-collection-shade"></div>

            <div className="sa-collection-top">
              <span>02</span>
              <span>RESIDENTIAL</span>
            </div>

            <div className="sa-collection-bottom">
              <div>
                <p>LIVE WITH DISTINCTION</p>
                <h3>Luxury Homes</h3>
              </div>
              <span className="sa-collection-arrow">↗</span>
            </div>
          </a>

          <a href="/properties" className="sa-collection-card sa-commercial-card">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
              alt="Modern commercial building architecture"
            />
            <div className="sa-collection-shade"></div>

            <div className="sa-collection-top">
              <span>03</span>
              <span>COMMERCIAL</span>
            </div>

            <div className="sa-collection-bottom">
              <div>
                <p>POSITION FOR GROWTH</p>
                <h3>Commercial Spaces</h3>
              </div>
              <span className="sa-collection-arrow">↗</span>
            </div>
          </a>

        </div>

        <div className="sa-collections-footer">
          <span>SAACHIZY / PROPERTY PORTFOLIO</span>
          <span>THE RIGHT PROPERTY. THE RIGHT PERSPECTIVE.</span>
        </div>

      </section>

      {/* SAACHIZY — SIGNATURE FEATURED PROPERTY */}
      <section className="sa-featured" id="featured">

        <div className="sa-featured-heading">
          <div>
            <p className="sa-featured-kicker">
              <span></span> A PROPERTY WORTH DISCOVERING
            </p>

            <h2>
              Selected for its<br />
              <span>exceptional value.</span>
            </h2>
          </div>

          <p>
            A closer look at an exclusive opportunity from
            the Saachizy property portfolio.
          </p>
        </div>

        <div className="sa-featured-showcase">

          <div className="sa-featured-visual">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"
              alt="Contemporary luxury residential property"
            />

            <div className="sa-featured-image-overlay"></div>

            <div className="sa-featured-image-top">
              <span>SAACHIZY SELECT</span>
              <span>01 / FEATURED</span>
            </div>

            <div className="sa-featured-image-bottom">
              <span>GUZAPE MAIN</span>
              <span>ABUJA, NIGERIA</span>
            </div>
          </div>

          <div className="sa-featured-information">

            <div className="sa-featured-status">
              <span></span> EXCLUSIVE PROPERTY OPPORTUNITY
            </div>

            <p className="sa-featured-location">
              GUZAPE MAIN, ABUJA
            </p>

            <h3>
              Newly Built Luxury<br />
              Terrace Duplexes
            </h3>

            <p className="sa-featured-description">
              An exclusive collection of eight newly built
              five-bedroom terrace duplexes with BQ, thoughtfully
              designed with contemporary architecture and quality
              finishing. An opportunity for distinguished residential
              living or strategic property investment.
            </p>

            <div className="sa-featured-specifications">
              <div>
                <strong>08</strong>
                <span>UNITS</span>
              </div>

              <div>
                <strong>05</strong>
                <span>BEDROOMS</span>
              </div>

              <div>
                <strong>2,000</strong>
                <span>LAND AREA / SQM</span>
              </div>
            </div>

            <div className="sa-featured-price">
              <span>ASKING PRICE</span>
              <strong>₦4 Billion</strong>
            </div>

            <div className="sa-featured-title">
              <span>PROPERTY TITLE</span>
              <strong>Certificate of Occupancy (C of O)</strong>
            </div>

            <a
              href="https://wa.me/2347073874044?text=Hello%20Saachizy%2C%20I%20am%20interested%20in%20the%20Guzape%20Main%20terrace%20duplexes."
              className="sa-featured-button"
              target="_blank"
              rel="noreferrer"
            >
              ENQUIRE ABOUT THIS PROPERTY
              <span>↗</span>
            </a>

            <p className="sa-featured-reference">
              SAACHIZY / PROPERTY PORTFOLIO
            </p>

          </div>

        </div>

      </section>

      {/* SAACHIZY — SIGNATURE EXPERTISE */}
      <section className="sa-expertise" id="services">

        <div className="sa-expertise-heading">
          <div>
            <p className="sa-expertise-kicker">
              <span></span> OUR EXPERTISE
            </p>

            <h2>
              More than property.<br />
              <span>A considered approach.</span>
            </h2>
          </div>

          <p>
            Every property decision deserves clarity, insight and
            a partner who understands the value of opportunity.
            Discover the expertise behind Saachizy.
          </p>
        </div>

        <div className="sa-expertise-list">

          <article className="sa-expertise-item">
            <div className="sa-expertise-number">01</div>

            <div className="sa-expertise-image">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"
                alt="Contemporary luxury residential property"
              />
            </div>

            <div className="sa-expertise-content">
              <span>PROPERTY ADVISORY</span>
              <h3>Property Marketing & Advisory</h3>
              <p>
                Connecting property owners with serious prospects
                while helping buyers explore opportunities with
                greater clarity and confidence.
              </p>
              <a href="/contact?service=Property%20Marketing%20%26%20Advisory">
                DISCUSS YOUR PROPERTY <span>↗</span>
              </a>
            </div>

            <div className="sa-expertise-arrow">↗</div>
          </article>

          <article className="sa-expertise-item">
            <div className="sa-expertise-number">02</div>

            <div className="sa-expertise-image">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85"
                alt="Open land and natural landscape"
              />
            </div>

            <div className="sa-expertise-content">
              <span>LAND & INVESTMENT</span>
              <h3>Land Acquisition & Investment</h3>
              <p>
                Exploring land opportunities across strategic
                locations for individuals, investors and
                businesses planning for the future.
              </p>
              <a href="/contact?service=Land%20Acquisition%20%26%20Investment">
                EXPLORE OPPORTUNITIES <span>↗</span>
              </a>
            </div>

            <div className="sa-expertise-arrow">↗</div>
          </article>

          <article className="sa-expertise-item">
            <div className="sa-expertise-number">03</div>

            <div className="sa-expertise-image">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85"
                alt="Modern architectural development"
              />
            </div>

            <div className="sa-expertise-content">
              <span>PROJECTS & DEVELOPMENT</span>
              <h3>Real Estate Development</h3>
              <p>
                Supporting development opportunities and the
                creation of purposeful spaces designed around
                long-term value and vision.
              </p>
              <a href="/contact?service=Real%20Estate%20Development">
                START A CONVERSATION <span>↗</span>
              </a>
            </div>

            <div className="sa-expertise-arrow">↗</div>
          </article>

        </div>

        <div className="sa-expertise-footer">
          <span>SAACHIZY / OUR CAPABILITIES</span>
          <span>INSIGHT · OPPORTUNITY · LASTING VALUE</span>
        </div>

        <div className="sa-expertise-page-link">
  <Link to="/expertise">
    DISCOVER ALL OUR EXPERTISE <span>↗</span>
  </Link>
</div>
      </section>

      {/* CONTACT AND BUYER ENQUIRY */}
      <section className="contact" id="contact">
        <div className="sa-contact-intro">
          <p className="eyebrow">LET'S BUILD WHAT'S NEXT</p>

          <h2>
            Your next opportunity<br />
            starts with a <span>conversation.</span>
          </h2>

          <p>
            Tell us what you're looking for. Share your property
            interests with us, and let Saachizy help you explore
            the right opportunity.
          </p>

          <a href="/contact" className="sa-contact-page-link">
            VISIT OUR CONTACT PAGE ↗
          </a>
        </div>

        <div className="sa-public-enquiry">

          <div className="sa-enquiry-topline">
            <span>SAACHIZY</span>
            <span>CLIENT ENQUIRY</span>
          </div>

          {submitted && (
            <div className="sa-enquiry-success" role="status">
              <span className="sa-success-mark">✓</span>
              <div>
                <strong>Thank you for reaching out.</strong>
                <p>
                  Your enquiry has been received successfully.
                  The Saachizy team appreciates your interest.
                </p>
              </div>
            </div>
          )}

          <form
            className="sa-public-enquiry-form"
            onSubmit={handleSubmit}
          >
            <div className="sa-enquiry-form-heading">
              <span>01 — YOUR DETAILS</span>
              <p>Let us know how to reach you.</p>
            </div>

            <div className="sa-enquiry-form-grid">

              <label>
                Full Name <span>*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </label>

              <label>
                Property of Interest <span>*</span>
                <select
                  name="propertyTitle"
                  value={form.propertyTitle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your interest</option>
                  <option value="Newly Built Luxury Terrace Duplexes - Guzape Main">
                    Guzape Main Luxury Terrace Duplexes
                  </option>
                  <option value="Residential Property">
                    Residential Property
                  </option>
                  <option value="Land Investment">
                    Land Investment
                  </option>
                  <option value="Commercial Property">
                    Commercial Property
                  </option>
                  <option value="General Property Enquiry">
                    General Property Enquiry
                  </option>
                </select>
              </label>

            </div>

            <div className="sa-enquiry-message-field">
              <div className="sa-enquiry-form-heading">
                <span>02 — YOUR MESSAGE</span>
                <p>Tell us a little more about what you have in mind.</p>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the property, location, budget or opportunity you're interested in..."
              />
            </div>

            <div className="sa-enquiry-submit-row">
              <p>
                <span>*</span> Required information
              </p>

              <button type="submit" className="sa-enquiry-submit">
                Submit Your Enquiry <span>→</span>
              </button>
            </div>
          </form>

          <div className="sa-enquiry-alternative">
            <span>Prefer a direct conversation?</span>
            <a
              href="https://wa.me/2347073874044"
              target="_blank"
              rel="noreferrer"
            >
              Continue on WhatsApp ↗
            </a>
          </div>

        </div>
      </section>

      {/* SAACHIZY — SIGNATURE FOOTER */}
      <footer className="sa-footer">

        <div className="sa-footer-main">

          <div className="sa-footer-brand">
            <a href="#home" className="sa-footer-logo">
              SAACHIZY<span>.</span>
            </a>

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
            <a href="#home">Home</a>
            <a href="/about">Our Story</a>
            <a href="/properties">Properties</a>
            <a href="#featured">Featured Property</a>
          </div>

          <div className="sa-footer-column">
            <span>OUR EXPERTISE</span>
            <a href="/expertise">Property Advisory</a>
            <a href="/expertise">Land Investment</a>
            <a href="/expertise">Real Estate Development</a>
          </div>

          <div className="sa-footer-column sa-footer-contact">
            <span>START A CONVERSATION</span>
            <h3>Let's find your<br /><em>next opportunity.</em></h3>

            <a
              href="/contact"
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
          <a href="#home">BACK TO TOP ↑</a>
        </div>

      </footer>

    </div>
  );
}

export default App;
