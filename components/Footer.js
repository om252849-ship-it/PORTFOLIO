'use client';

import { FaArrowUp, FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrap">
      <div className="section-container">
        <div className="footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="nav-logo-spark">✦</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                Om Kumar
              </div>
              <div className="footer-copy">
                © {new Date().getFullYear()} Om Kumar. Engineered with Google Aurora &amp; Spatial Glass.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="footer-links-row">
              <a
                href="https://github.com/om252849-ship-it/PORTFOLIO"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                title="GitHub Repository"
              >
                <FaGithub style={{ fontSize: '1.15rem' }} />
              </a>
              <a
                href="https://linkedin.com/in/om-kumar04"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                title="LinkedIn"
              >
                <FaLinkedinIn style={{ fontSize: '1.15rem' }} />
              </a>
              <a
                href="mailto:omkumarind69@gmail.com"
                className="footer-link"
                title="Email"
              >
                <FaEnvelope style={{ fontSize: '1.15rem' }} />
              </a>
            </div>

            <button
              type="button"
              className="btn btn-glass btn-pill"
              onClick={scrollToTop}
              title="Return to summit"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Back to Top</span>
              <FaArrowUp style={{ fontSize: '0.75rem' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
