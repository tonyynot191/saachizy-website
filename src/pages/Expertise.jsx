
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import SEO from '../components/SEO';
import '../App.css';
import './Expertise.css';

const services = [
  {
    number: '01',
    category: 'PROPERTY ADVISORY',
    title: 'Property Marketing & Advisory',
    subtitle: 'The right property. The right perspective.',
    description:
      'We connect property owners with serious prospects while helping buyers discover opportunities that align with their interests and objectives.',
    details: [
      'Residential property marketing',
      'Luxury home marketing',
      'Commercial property opportunities',
      'Property acquisition guidance',
      'Buyer and seller connections',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=90',
  },
  {
    number: '02',
    category: 'LAND & INVESTMENT',
    title: 'Land Acquisition & Investment',
    subtitle: 'Recognising potential. Securing opportunity.',
    description:
      'We explore land opportunities in strategic locations, connecting individuals, investors and businesses with property opportunities for their future plans.',
    details: [
      'Residential land opportunities',
      'Commercial land opportunities',
      'Land sourcing and marketing',
      'Investment opportunity discovery',
      'Property location guidance',
    ],
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1500&q=90',
  },
  {
    number: '03',
    category: 'PROJECTS & DEVELOPMENT',
    title: 'Real Estate Development',
    subtitle: 'From vision to meaningful spaces.',
    description:
      'We support real estate development opportunities and purposeful projects, bringing together property insight, strategic thinking and a long-term perspective.',
    details: [
      'Development opportunity exploration',
      'Residential development concepts',
      'Commercial development opportunities',
      'Project and property marketing',
      'Development-focused connections',
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=90',
  },
];

function Expertise() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="website sa-expertise-page">

      <SEO
        title="Real Estate Services in Abuja | Property Advisory, Land & Development"
        description="Explore Saachizy's real estate services in Abuja, including property marketing and advisory, residential and commercial land opportunities, property acquisition guidance and real estate development."
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

      {/* EXPERTISE HERO */}
      <header className="sa-expertise-hero">
        <div className="sa-expertise-hero-image"></div>
        <div className="sa-expertise-hero-overlay"></div>

        <div className="sa-expertise-hero-content">
          <p>WHAT WE DO / OUR CAPABILITIES</p>
          <h1>
            Insight that moves.<br />
            <em>Expertise that matters.</em>
          </h1>
          <p className="sa-expertise-hero-description">
            Every property journey is different. Our approach brings
            together market insight, meaningful connections and a
            considered understanding of opportunity.
          </p>
          <Link to="/contact">
            DISCUSS YOUR NEXT OPPORTUNITY <span>↗</span>
          </Link>
        </div>

        <span className="sa-expertise-hero-index">
          SAACHIZY / OUR EXPERTISE
        </span>
      </header>

      {/* INTRODUCTION */}
      <section className="sa-expertise-intro">
        <div>
          <p>OUR APPROACH</p>
          <span>01 — 03</span>
        </div>

        <h2>
          More than services.<br />
          <em>A perspective built around possibility.</em>
        </h2>

        <p className="sa-expertise-intro-copy">
          From identifying property opportunities to connecting people
          with the right possibilities, we approach every engagement
          with clarity, purpose and an appreciation of long-term value.
        </p>
      </section>

      {/* SERVICE COLLECTION */}
      <section className="sa-expertise-services">

        {services.map((service, index) => (
          <article className="sa-service-block" key={service.number}>

            <div className="sa-service-visual">
              <img src={service.image} alt={service.title} />

              <span className="sa-service-image-number">
                {service.number}
              </span>

              <span className="sa-service-image-caption">
                SAACHIZY / {service.category}
              </span>
            </div>

            <div className="sa-service-content">
              <p className="sa-service-category">
                <span></span>
                {service.category}
              </p>

              <h2>{service.title}</h2>

              <h3>{service.subtitle}</h3>

              <p className="sa-service-description">
                {service.description}
              </p>

              <div className="sa-service-divider"></div>

              <p className="sa-service-includes">
                HOW WE SUPPORT YOU
              </p>

              <ul>
                {service.details.map(detail => (
                  <li key={detail}>
                    <span>↗</span>
                    {detail}
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="sa-service-cta"
              >
                DISCUSS THIS SERVICE <span>↗</span>
              </Link>
            </div>

          </article>
        ))}

      </section>

      {/* CLOSING */}
      <section className="sa-expertise-closing">
        <p>YOUR NEXT MOVE BEGINS HERE</p>
        <h2>
          Let's turn your<br />
          <em>property vision into possibility.</em>
        </h2>
        <Link to="/contact">
          START A CONVERSATION <span>↗</span>
        </Link>
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
              THE STORY. THE VISION.<br />THE FUTURE.
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
            <h3>Let's find your<br /><em>next opportunity.</em></h3>
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

export default Expertise;
