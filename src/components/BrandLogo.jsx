import { Link } from 'react-router-dom';

function BrandLogo({ className = '', onClick, variant = 'header' }) {
  return (
    <Link
      to="/"
      className={className}
      onClick={onClick}
      aria-label="Saachizy home"
    >
      <img
        src="/saachizy-logo.png"
        alt="Saachizy Real Estate"
        className={`sa-brand-logo-image sa-brand-logo-${variant}`}
      />
    </Link>
  );
}

export default BrandLogo;