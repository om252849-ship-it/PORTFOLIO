'use client';

import { useRef } from 'react';
import content from '../data/content.json';

export default function About() {
  const { about } = content;
  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--spotlight-opacity', '1');
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <section className="about-section" id="about">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Research &amp; Identity</span>
          </div>
          <h2 className="section-title">
            The Mind Behind the <span className="gradient-text">Architecture</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Fusing defensive cybersecurity analysis with deep learning and creative design.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="about-grid">
          {/* Left: 3D Holographic ID Card */}
          <div className="holo-id-wrapper">
            <div
              ref={cardRef}
              className="holo-id-card glass-panel border-beam-container"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transition: 'transform 0.15s ease-out' }}
            >
              <div className="border-beam" />
              
              <div className="holo-avatar-container">
                <img
                  src="/images/avatar.jpg"
                  alt="Om Kumar"
                  className="holo-avatar-img"
                  loading="lazy"
                />
              </div>

              <h3 className="holo-id-name">Om Kumar</h3>
              <div className="holo-id-badge">
                <span>🛡️ VERIFIED ANALYST</span>
              </div>

              <div className="holo-id-meta">
                <div className="holo-meta-row">
                  <span className="holo-meta-label">FOCUS</span>
                  <span className="holo-meta-val">Cybersecurity &amp; AI</span>
                </div>
                <div className="holo-meta-row">
                  <span className="holo-meta-label">DEGREE</span>
                  <span className="holo-meta-val">BCA · 2nd Year</span>
                </div>
                <div className="holo-meta-row">
                  <span className="holo-meta-label">ALMA MATER</span>
                  <span className="holo-meta-val">ARKA JAIN University</span>
                </div>
                <div className="holo-meta-row">
                  <span className="holo-meta-label">CERTIFIED</span>
                  <span className="holo-meta-val">Tata Cyber &amp; Photoshop</span>
                </div>
                <div className="holo-meta-row">
                  <span className="holo-meta-label">LOCATION</span>
                  <span className="holo-meta-val">Jamshedpur, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Highlights */}
          <div className="about-narrative">
            <p className="about-bio-text">
              {about.bio}
            </p>
            <p className="about-bio-text" style={{ fontSize: '1.02rem', opacity: 0.9 }}>
              My engineering philosophy revolves around building zero-trust systems that are intuitive, secure, and visually breathtaking. Whether simulating cyber-attack vectors, training neural classification algorithms, or designing spatial user interfaces, I obsess over security, latency, and aesthetic excellence.
            </p>

            {/* Three Pillar Cards */}
            <div className="about-highlights-grid">
              <div className="highlight-glass-card">
                <div className="highlight-card-icon">🛡️</div>
                <h4 className="highlight-card-title">Threat Mitigation</h4>
                <p className="highlight-card-desc">
                  Vulnerability auditing, reconnaissance, and penetration testing simulation.
                </p>
              </div>

              <div className="highlight-glass-card">
                <div className="highlight-card-icon">🧠</div>
                <h4 className="highlight-card-title">AI &amp; Neural Nets</h4>
                <p className="highlight-card-desc">
                  Model training, data preprocessing, and applied deep learning pipelines.
                </p>
              </div>

              <div className="highlight-glass-card">
                <div className="highlight-card-icon">🎨</div>
                <h4 className="highlight-card-title">Creative Precision</h4>
                <p className="highlight-card-desc">
                  Certified Photoshop CS6 designer with refined graphic and visual craft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
