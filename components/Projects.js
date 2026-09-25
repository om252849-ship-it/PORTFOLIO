'use client';

import { useState, useRef } from 'react';
import { FaExternalLinkAlt, FaTimes, FaShieldAlt, FaLayerGroup } from 'react-icons/fa';
import content from '../data/content.json';

function TiltProjectCard({ project, onInspect }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--spotlight-opacity', '1');
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--spotlight-opacity', '0');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const getStatus = (tags) => {
    if (tags.some((t) => t.toLowerCase().includes('cyber') || t.toLowerCase().includes('security'))) {
      return 'SECURITY RESEARCH';
    }
    if (tags.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('deep learning'))) {
      return 'NEURAL NETWORK LAB';
    }
    return 'CREATIVE SUITE';
  };

  return (
    <div
      ref={cardRef}
      className="project-tilt-card glass-panel border-beam-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="border-beam" />

      {/* Banner Media */}
      <div className="project-banner-box">
        <img
          src={project.image}
          alt={project.title}
          className="project-banner-img"
          loading="lazy"
        />
        <div className="project-status-tag">
          <span className="section-badge-dot" />
          <span>{getStatus(project.tags)}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="project-body">
        <div className="project-title-row">
          <h3 className="project-heading">{project.title}</h3>
          <button
            type="button"
            className="project-arrow-badge"
            onClick={() => onInspect(project)}
            title="Inspect project architecture"
          >
            <FaLayerGroup />
          </button>
        </div>

        <p className="project-synopsis">{project.description}</p>

        <div className="project-tags-flex">
          {project.tags.map((tag, j) => (
            <span key={j} className="project-spec-tag">
              {tag}
            </span>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-glass btn-pill"
            style={{ flex: 1 }}
            onClick={() => onInspect(project)}
          >
            Architecture Specs
          </button>
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-pill"
            >
              <span>Visit</span>
              <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = content;
  const [activeCategory, setActiveCategory] = useState('all');
  const [inspectingProject, setInspectingProject] = useState(null);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
        );

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Showcase &amp; Deployments</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Architectures</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Production dashboards, applied deep learning visualizers, and brand design portfolios.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-tab-nav" style={{ marginTop: '30px' }}>
          <button
            type="button"
            className={`skills-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Work ({projects.length})
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeCategory === 'cyber' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cyber')}
          >
            🛡️ Cybersecurity
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeCategory === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ai')}
          >
            🧠 AI &amp; Machine Learning
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeCategory === 'design' ? 'active' : ''}`}
            onClick={() => setActiveCategory('design')}
          >
            🎨 Creative Design
          </button>
        </div>

        {/* Grid Cards */}
        <div className="projects-grid">
          {filteredProjects.map((project, i) => (
            <TiltProjectCard
              key={i}
              project={project}
              onInspect={(p) => setInspectingProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Inspect Architecture Glass Modal */}
      {inspectingProject && (
        <div
          className="cmd-palette-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectingProject(null);
          }}
        >
          <div className="cmd-palette-modal glass-panel border-beam-container" style={{ maxWidth: '680px' }}>
            <div className="border-beam" />
            
            <div className="cmd-input-bar" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaShieldAlt style={{ color: 'var(--aurora-cyan)' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{inspectingProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingProject(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <img
                  src={inspectingProject.image}
                  alt={inspectingProject.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Architecture Overview
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.98rem' }}>
                  {inspectingProject.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Tech Stack &amp; Toolchain
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {inspectingProject.tags.map((t, idx) => (
                    <span key={idx} className="tech-code" style={{ fontSize: '0.9rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn btn-glass btn-pill"
                  onClick={() => setInspectingProject(null)}
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
