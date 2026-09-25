'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CyberCore3D from './CyberCore3D';

export default function Hero({ onOpenCommandPalette }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      }
    );
  }, []);

  const handleScrollTo = (target) => {
    const el = document.querySelector(target);
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -70 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="section-container">
        <div className="hero-grid">
          {/* Left Column: Hero Narrative */}
          <div className="hero-content" ref={contentRef}>
            {/* Live Security / System Pill */}
            <div className="hero-status-pill">
              <span className="status-pulse-dot" />
              <span className="status-pill-text">
                SYSTEM VERIFIED · OPEN FOR RESEARCH &amp; ROLES
              </span>
            </div>

            {/* Kinetic Main Title */}
            <h1 className="hero-main-title">
              Hi, I&apos;m <span className="gradient-text">Om Kumar</span>
            </h1>

            {/* Subtitle Tech Ribbon */}
            <div className="hero-subtitle-bar">
              <span>Cybersecurity Analyst</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>AI &amp; Deep Learning</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Creative Design</span>
            </div>

            {/* Bio Lead */}
            <p className="hero-bio-lead">
              Bridging ethical security engineering with artificial intelligence and modern visual design. Developing bulletproof architectures with creative precision.
            </p>

            {/* High Impact Actions */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleScrollTo('#projects')}
              >
                <span>Explore Work</span>
                <span>↓</span>
              </button>

              <button
                type="button"
                className="btn btn-glass"
                onClick={onOpenCommandPalette}
              >
                <span>AI Navigator</span>
                <span className="cmd-key-badge" style={{ marginLeft: '4px' }}>⌘K</span>
              </button>

              <a href="/resume" className="btn btn-glass">
                <span>Resume</span>
                <span>↗</span>
              </a>
            </div>

            {/* Interactive Telemetry Metrics */}
            <div className="hero-interactive-stats">
              <div className="hero-stat-pill">
                <div className="stat-pill-label">ACADEMICS</div>
                <div className="stat-pill-value">BCA (2nd Yr)</div>
              </div>
              <div className="hero-stat-pill">
                <div className="stat-pill-label">SPECIALIZATION</div>
                <div className="stat-pill-value">AI &amp; Security</div>
              </div>
              <div className="hero-stat-pill">
                <div className="stat-pill-label">LOCATION</div>
                <div className="stat-pill-value">Jamshedpur</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Quantum Aurora Core */}
          <div className="hero-3d-visual">
            <CyberCore3D />
          </div>
        </div>
      </div>
    </section>
  );
}
