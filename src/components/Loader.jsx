
import BrandLogo from './BrandLogo';
import './Loader.css';

function Loader({
  message = 'Preparing your experience...',
  fullScreen = false,
  className = '',
}) {
  return (
    <div
      className={`sa-loader ${
        fullScreen ? 'sa-loader-fullscreen' : 'sa-loader-inline'
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="sa-loader-content">

        <BrandLogo
          className="sa-loader-brand"
          variant="header"
        />

        <div className="sa-loader-animation">
          <span />
        </div>

        <p className="sa-loader-message">{message}</p>

        <span className="sa-loader-caption">
          THE STORY. THE VISION. THE FUTURE.
        </span>

      </div>
    </div>
  );
}

export default Loader;
