'use client';

import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import content from '../data/content.json';

export default function Projects() {
  const { projects } = content;

  return (
    <section id="projects">
      <div className="section-container">
        <ScrollReveal>
          <span className="section-label">Portfolio</span>
        </ScrollReveal>

        <SplitText>
          Featured Projects
        </SplitText>

        <div className="projects-grid" style={{ marginTop: '48px' }}>
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.15} scale>
              <a
                href={project.link}
                className="project-card"
                data-cursor="image"
                target={project.link !== '#' ? '_blank' : undefined}
                rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, j) => (
                      <span className="project-tag" key={j}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
