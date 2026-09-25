'use client';

import { useState } from 'react';
import { FaGraduationCap, FaCertificate, FaBriefcase, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import content from '../data/content.json';

const TYPE_ICONS = {
  education: FaGraduationCap,
  certification: FaCertificate,
  work: FaBriefcase,
};

export default function Experience() {
  const { experience } = content;
  const [filter, setFilter] = useState('all');

  const filteredExp =
    filter === 'all'
      ? experience
      : experience.filter((item) => item.type === filter);

  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Academic &amp; Professional Path</span>
          </div>
          <h2 className="section-title">
            The Spatial <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Chronological milestones in computer science, cybersecurity credentials, and enterprise client operations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="skills-tab-nav" style={{ marginTop: '28px', marginBottom: '36px' }}>
          <button
            type="button"
            className={`skills-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Milestones ({experience.length})
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${filter === 'education' ? 'active' : ''}`}
            onClick={() => setFilter('education')}
          >
            🎓 Education
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${filter === 'certification' ? 'active' : ''}`}
            onClick={() => setFilter('certification')}
          >
            📜 Certifications
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${filter === 'work' ? 'active' : ''}`}
            onClick={() => setFilter('work')}
          >
            💼 Work Experience
          </button>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline">
          <div className="timeline-spine-line">
            <div className="timeline-spine-fill" style={{ height: '100%' }} />
          </div>

          {filteredExp.map((item, index) => {
            const Icon = TYPE_ICONS[item.type] || FaGraduationCap;
            return (
              <div key={index} className="timeline-node-card">
                {/* Glowing Node Pin */}
                <div className="timeline-node-pin">
                  <Icon style={{ fontSize: '10px', color: 'var(--accent-primary)' }} />
                </div>

                {/* Glass Milestone Card */}
                <div className="experience-glass-card glass-panel border-beam-container">
                  <div className="border-beam" />
                  
                  <div className="exp-card-header">
                    <div>
                      <h3 className="exp-role-title">{item.role}</h3>
                      <div className="exp-org-name">{item.company}</div>
                      {item.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <FaMapMarkerAlt />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                    {item.endDate && (
                      <span className="exp-date-pill">{item.endDate}</span>
                    )}
                  </div>

                  <ul className="exp-bullets-list">
                    {item.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="exp-bullet-item">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Campus Visualizer Banner (if preview exists) */}
                  {item.preview && (
                    <div className="exp-campus-preview">
                      <img
                        src={item.preview.image}
                        alt={item.preview.title}
                        className="campus-preview-img"
                        loading="lazy"
                      />
                      <div className="campus-preview-meta">
                        <div>
                          <div className="campus-preview-title">{item.preview.title}</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{item.preview.tagline}</div>
                        </div>
                        {item.mapUrl && (
                          <a
                            href={item.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="campus-map-link"
                          >
                            <span>Open Maps</span>
                            <FaExternalLinkAlt style={{ fontSize: '0.68rem' }} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
