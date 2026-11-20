
import { useEffect } from 'react';

function SEO({
  title,
  description,
  image,
  type = 'website',
  noIndex = false,
}) {
  useEffect(() => {
    const defaultTitle = 'Saachizy Real Estate | Abuja, Nigeria';

    const pageTitle = title
      ? `${title} | Saachizy Real Estate`
      : defaultTitle;

    const pageDescription =
      description ||
      'Discover premium properties, land investments, luxury homes and real estate development opportunities in Abuja, Nigeria.';

    const pageUrl = window.location.origin + window.location.pathname;

    document.title = pageTitle;

    function setMeta(attribute, key, content) {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    }

    // Google SEO
    setMeta('name', 'description', pageDescription);
    setMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    // Open Graph: Facebook and WhatsApp
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Saachizy Real Estate');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:url', pageUrl);

    if (image) {
      setMeta('property', 'og:image', image);
    }

    // Twitter / X
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);

    if (image) {
      setMeta('name', 'twitter:image', image);
    }

    // Canonical URL
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', pageUrl);

  }, [title, description, image, type, noIndex]);

  return null;
}

export default SEO;
