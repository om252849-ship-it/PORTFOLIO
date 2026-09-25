'use client';

import { useRef } from 'react';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import content from '../data/content.json';

function TiltProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--spotlight-opacity', '1');
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--spotlight-opacity', '0');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // Badge category generator
  const getCategory = (title, tags) => {
    if (tags.some(t => t.toLowerCase().includes('security') || t.toLowerCase().includes('cyber') || t.toLowerCase().includes('hash'))) {
      return 'CYBER LAB';
    }
    if (tags.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('full-stack') || t.toLowerCase().includes('node'))) {
      return 'FULL STACK';
    }
    return 'CREATIVE TECH';
  };

  return (
    <ScrollReveal delay={index * 0.12} scale>
      <a
        ref={cardRef}
        href={project.link}
        className="project-card tilt-card"
        data-cursor="image"
        target={project.link !== '#' ? '_blank' : undefined}
        rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Specular Spotlight Glow Overlay */}
        <div className="card-spotlight-glow" />

        {/* Card Header Media */}
        <div className="project-image">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="project-image-gradient" />
          <div className="project-cat-badge">
            <span className="cat-dot" />
            <span>{getCategory(project.title, project.tags)}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="project-content">
          <div className="project-header-row">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-arrow-icon">↗</span>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-tags">
            {project.tags.map((tag, j) => (
              <span className="project-tag" key={j}>{tag}</span>
            ))}
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

export default function Projects() {
  const { projects } = content;

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <ScrollReveal>
          <div className="projects-header-wrapper">
            <span className="section-label">PORTFOLIO & RESEARCH</span>
            <div className="bento-status-pill">
              <span className="bento-live-pulse" />
              <span>3D BENTO SHOWCASE</span>
            </div>
          </div>
        </ScrollReveal>

        <SplitText>
          Featured Projects
        </SplitText>

        <p className="section-intro-text">
          Engineered with precision across defensive cybersecurity, high-scalability web engineering, and interactive human-computer interfaces.
        </p>

        <div className="projects-grid bento-grid" style={{ marginTop: '48px' }}>
          {projects.map((project, i) => (
            <TiltProjectCard project={project} index={i} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
