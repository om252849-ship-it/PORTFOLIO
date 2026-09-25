'use client';

import { FaLinkedinIn, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const handleBackToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          © {new Date().getFullYear()} Om Kumar · Crafted with passion
        </p>

        <div className="footer-socials">
          <a
            href="https://linkedin.com/in/om-kumar04"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            data-cursor="link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="mailto:omkumarind69@gmail.com"
            className="footer-social-link"
            data-cursor="link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <button
            className="back-to-top"
            onClick={handleBackToTop}
            data-cursor="button"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
