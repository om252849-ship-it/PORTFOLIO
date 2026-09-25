'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 240) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className="navbar-wrapper">
        <nav className={`navbar-dock ${scrolled ? 'dock-scrolled' : ''}`}>
          {/* Logo with Google Aurora Spark */}
          <a
            href="#"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) window.lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="nav-logo-spark">✦</span>
            <span>Om Kumar</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link-btn ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume"
                className="nav-link-btn"
                style={{
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                }}
              >
                Resume ↗
              </a>
            </li>
          </ul>

          {/* Quick AI Spotlight / Command Palette Trigger */}
          <button
            type="button"
            className="nav-cmd-trigger"
            onClick={onOpenCommandPalette}
            title="Launch Command Palette (Ctrl+K or ⌘K)"
          >
            <FaSearch style={{ fontSize: '0.75rem' }} />
            <span>Search</span>
            <span className="cmd-key-badge">⌘K</span>
          </button>

          {/* Celestial Theme Switcher */}
          <div style={{ marginLeft: '4px' }}>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>

      {/* Mobile Glass Dropdown Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '20px',
            right: '20px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--glass-border-glow)',
            padding: '24px',
            zIndex: 999,
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-btn"
              style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume"
            className="nav-link-btn"
            style={{ fontSize: '1.1rem', padding: '12px 16px', color: 'var(--accent-primary)' }}
          >
            Resume ↗
          </a>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: '8px' }}
            onClick={() => {
              setMobileOpen(false);
              onOpenCommandPalette();
            }}
          >
            <FaSearch /> Search / Actions (⌘K)
          </button>
        </div>
      )}
    </>
  );
}
