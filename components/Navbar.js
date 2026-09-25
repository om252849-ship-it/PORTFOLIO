'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Scrolled state (glass effect - active whenever scrolled away from top)
      setScrolled(currentScroll > 15);

      // Hide/show on scroll direction
      if (currentScroll > lastScroll && currentScroll > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);

      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
        <div className="navbar-inner">
          <a
            href="#"
            className="navbar-logo"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) window.lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            OM<span>.</span>
          </a>

          <div className="navbar-right">
            <ul className="navbar-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="link"
                    className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume"
                  className="navbar-resume-pill"
                  data-cursor="button"
                >
                  Resume ↗
                </a>
              </li>
            </ul>

            <ThemeToggle />

            <button
              className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{ transitionDelay: mobileOpen ? `${i * 0.08}s` : '0s' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/resume"
          style={{
            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 0.08}s` : '0s',
            color: 'var(--accent)',
            fontWeight: 600,
          }}
        >
          📄 View Full Resume ↗
        </a>
      </div>
    </>
  );
}
