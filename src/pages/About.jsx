
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../App.css';
import './About.css';

function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="website sa-about-page">

      <SEO
        title="About Saachizy | Our Story, Vision & Real Estate Values"
        description="Discover the story behind Saachizy, an Abuja real estate brand connecting people with residential, commercial and land investment opportunities through vision, integrity and lasting value."
      />

      {/* SIGNATURE NAVIGATION */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          SAACHIZY<span>.</span>
        </Link>

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
            <a href="https://wa.me/2347073874044" target="_blank" rel="noreferrer">
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

      {/* CINEMATIC STORY HERO */}
      <header className="sa-about-hero">
        <div className="sa-about-hero-image"></div>
        <div className="sa-about-hero-overlay"></div>

        <div className="sa-about-hero-content">
          <span className="sa-about-kicker">
            THE PEOPLE. THE PURPOSE. THE PERSPECTIVE.
          </span>

          <h1>
            Built on vision.
            <br />
            <em>Driven by possibility.</em>
          </h1>

          <p>
            We believe real estate is not simply about buildings or land.
            It is about the opportunities, ambitions and futures they make possible.
          </p>

          <div className="sa-about-hero-actions">
            <Link to="/expertise" className="sa-about-primary-action">
              DISCOVER OUR EXPERTISE <span>↗</span>
            </Link>
            <Link to="/properties" className="sa-about-secondary-action">
              EXPLORE PROPERTIES <span>→</span>
            </Link>
          </div>
        </div>

        <div className="sa-about-hero-side-note">
          <span>SAACHIZY</span>
          <span>ABUJA · NIGERIA</span>
        </div>

        <div className="sa-about-hero-bottom">
          <span>01 — OUR STORY</span>
          <a href="#about-introduction">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
          <span>THE STORY. THE VISION. THE FUTURE.</span>
        </div>
      </header>

      <main>

        {/* WHO WE ARE */}
        <section className="sa-about-introduction" id="about-introduction">
          <div className="sa-about-intro-label">
            <span>01</span>
            <p>WHO WE ARE</p>
          </div>

          <div className="sa-about-intro-content">
            <p className="sa-about-overline">
              A DIFFERENT PERSPECTIVE ON REAL ESTATE
            </p>

            <h2>
              Property is the foundation.
              <br />
              <em>Possibility is the purpose.</em>
            </h2>

            <div className="sa-about-intro-copy">
              <p>
                Saachizy is a real estate brand built around the belief
                that every property decision should begin with clarity,
                thoughtful guidance and a vision for lasting value.
              </p>
              <p>
                We connect people with property opportunities across
                residential, commercial and land investment markets.
                Our approach brings together insight, relationships
                and a genuine understanding of what makes an opportunity
                meaningful.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE STORY */}
        <section className="sa-about-image-story">
          <div className="sa-about-image-story-photo"></div>
          <div className="sa-about-image-story-caption">
            <span>BEYOND THE ORDINARY</span>
            <span>SAACHIZY / 02</span>
          </div>
        </section>

        {/* OUR BELIEFS */}
        <section className="sa-about-beliefs">
          <div className="sa-about-beliefs-heading">
            <p className="sa-about-overline">WHAT GUIDES US</p>
            <h2>
              A clear vision.
              <br />
              <em>A meaningful direction.</em>
            </h2>
          </div>

          <div className="sa-about-belief-list">
            <article>
              <span>01</span>
              <div>
                <h3>Vision</h3>
                <p>
                  We look beyond the immediate transaction to recognise
                  the possibilities that thoughtful property decisions can create.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h3>Integrity</h3>
                <p>
                  We believe trust is built through honest communication,
                  responsible guidance and respect for every relationship.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h3>Value</h3>
                <p>
                  We focus on meaningful opportunities and the long-term
                  value that informed property decisions can offer.
                </p>
              </div>
            </article>

            <article>
              <span>04</span>
              <div>
                <h3>Progress</h3>
                <p>
                  We embrace new ideas, stronger connections and a forward-looking
                  approach to property and development.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* CLOSING INVITATION */}
        <section className="sa-about-closing">
          <p>THE STORY. THE VISION. THE FUTURE.</p>
          <h2>
            Every great opportunity
            <br />
            begins with <em>a vision.</em>
          </h2>
          <Link to="/expertise">
            DISCOVER OUR EXPERTISE <span>↗</span>
          </Link>
        </section>

      </main>

      {/* SIGNATURE FOOTER */}
      <footer className="sa-footer">
        <div className="sa-footer-main">
          <div className="sa-footer-brand">
            <Link to="/" className="sa-footer-logo">
              SAACHIZY<span>.</span>
            </Link>
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
            <Link to="/contact" className="sa-footer-contact-link">
              CONTACT SAACHIZY <span>↗</span>
            </Link>
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

export default About;
