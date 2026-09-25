'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import content from '../data/content.json';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experience } = content;
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x, y });
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    const lineFill = lineFillRef.current;
    if (!timeline || !lineFill) return;

    // Animate the timeline line drawing based on scroll
    gsap.to(lineFill, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    // Animate dots
    const dots = timeline.querySelectorAll('.timeline-dot');
    dots.forEach((dot) => {
      ScrollTrigger.create({
        trigger: dot,
        start: 'top 70%',
        onEnter: () => dot.classList.add('active'),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const getTypeBadge = (type) => {
    switch (type) {
      case 'work': return 'Work Experience';
      case 'education': return 'Education';
      case 'certification': return 'Certification';
      default: return type;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Background Ambient Glowing Orbs */}
      <div className="experience-ambient-orb orb-top-left" aria-hidden="true" />
      <div className="experience-ambient-orb orb-mid-right" aria-hidden="true" />
      <div className="experience-ambient-orb orb-bottom-left" aria-hidden="true" />

      {/* Interactive Parallax Floating Milestone Badges */}
      <div
        className="floating-milestone milestone-1"
        style={{
          transform: `translate3d(${mouseOffset.x * 26}px, ${mouseOffset.y * 26}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">✦</span>
        <span>AI & Deep Learning</span>
      </div>

      <div
        className="floating-milestone milestone-2"
        style={{
          transform: `translate3d(${mouseOffset.x * -24}px, ${mouseOffset.y * -24}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">⚡</span>
        <span>Cyber Security Analyst</span>
      </div>

      <div
        className="floating-milestone milestone-3"
        style={{
          transform: `translate3d(${mouseOffset.x * 30}px, ${mouseOffset.y * -20}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">◈</span>
        <span>ARKA JAIN Univ · NAAC &apos;A&apos;</span>
      </div>

      <div
        className="floating-milestone milestone-4"
        style={{
          transform: `translate3d(${mouseOffset.x * -26}px, ${mouseOffset.y * 24}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">📍</span>
        <span>FiveS Digital Tech Center</span>
      </div>

      <div
        className="floating-milestone milestone-5"
        style={{
          transform: `translate3d(${mouseOffset.x * 22}px, ${mouseOffset.y * 26}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">★</span>
        <span>SNSVM School · Est. 1986</span>
      </div>

      <div
        className="floating-milestone milestone-6"
        style={{
          transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -18}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="milestone-icon">🎨</span>
        <span>Adobe CS6 Certified</span>
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal>
          <span className="section-label">Journey</span>
        </ScrollReveal>

        <SplitText>
          Experience & Education
        </SplitText>

        <div className="timeline" ref={timelineRef} style={{ marginTop: '64px' }}>
          <div className="timeline-line" />
          <div className="timeline-line-fill" ref={lineFillRef} />

          {experience.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-spacer" />
              <ScrollReveal
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={0.1}
              >
                <div className="timeline-card">
                  <span className="timeline-type-badge">{getTypeBadge(item.type)}</span>
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-company">
                    {item.mapUrl ? (
                      <span className="timeline-map-wrap">
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="timeline-map-link"
                          data-cursor="link"
                          title={`View ${item.company} on Google Maps`}
                        >
                          <span className="timeline-company-name">{item.company}</span>
                          {item.location && (
                            <span className="timeline-location-group">
                              <span className="timeline-location-sep">·</span>
                              <span className="timeline-location">{item.location}</span>
                            </span>
                          )}
                          <span className="timeline-map-icon" aria-hidden="true">📍</span>
                        </a>

                        {item.preview && (
                          <span className="campus-preview-card" aria-hidden="true">
                            <span className="campus-preview-img-container">
                              <img
                                src={item.preview.image}
                                alt={item.preview.title}
                                className="campus-preview-img"
                                loading="lazy"
                              />
                              <span className="campus-preview-badge">
                                📍 Google Maps Photo
                              </span>
                            </span>
                            <span className="campus-preview-content">
                              <span className="campus-preview-tagline">{item.preview.tagline}</span>
                              <span className="campus-preview-title">{item.preview.title}</span>
                              <span className="campus-preview-location">{item.preview.subtitle}</span>
                              {item.preview.highlights && (
                                <span className="campus-preview-pills">
                                  {item.preview.highlights.map((h, hIdx) => (
                                    <span key={hIdx} className="campus-preview-pill">
                                      {h}
                                    </span>
                                  ))}
                                </span>
                              )}
                              <span className="campus-preview-action">
                                <span>Click to open in Google Maps</span>
                                <span>↗</span>
                              </span>
                            </span>
                          </span>
                        )}
                      </span>
                    ) : (
                      <>
                        <span className="timeline-company-name">{item.company}</span>
                        {item.location && (
                          <span className="timeline-location-group">
                            <span className="timeline-location-sep">·</span>
                            <span className="timeline-location">{item.location}</span>
                          </span>
                        )}
                      </>
                    )}
                  </p>
                  <span className="timeline-date">
                    {item.startDate ? `${item.startDate} — ` : ''}{item.endDate}
                  </span>
                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <div className="timeline-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
