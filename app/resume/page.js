'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import content from '../../data/content.json';
import './resume.css';

export default function ResumePage() {
  const [copied, setCopied] = useState(false);
  const { hero, about, skills, experience, projects, contact } = content;

  useEffect(() => {
    document.body.classList.add('resume-page');
    return () => {
      document.body.classList.remove('resume-page');
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const workExperiences = experience.filter((e) => e.type === 'work');
  const educationList = [...experience.filter((e) => e.type === 'education')].reverse();
  const certList = experience.filter((e) => e.type === 'certification');

  return (
    <div className="resume-wrapper">
      {/* Top Actions Bar (Hidden when printing) */}
      <div className="resume-actions-bar">
        <Link href="/" className="resume-btn-back">
          ← Back to Portfolio
        </Link>

        <div className="resume-actions-right">
          <button
            onClick={handleCopyEmail}
            className="resume-btn-action resume-btn-copy"
            title="Copy email to clipboard"
          >
            {copied ? '✓ Copied' : '✉ Copy Email'}
          </button>
          <button
            onClick={handlePrint}
            className="resume-btn-action resume-btn-print"
            title="Save as PDF or print"
          >
            ⎙ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Resume Paper */}
      <div className="resume-paper">
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">{hero.name}</h1>
          <p className="resume-tagline">{hero.subtitle}</p>
          <div className="resume-contact-row">
            <span>📍 {contact.location}</span>
            <a href={`tel:${contact.phone}`}>📞 {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>✉ {contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              🔗 linkedin.com/in/om-kumar04
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="resume-summary-text">{about.bio}</p>
        </section>

        {/* Technical & Core Skills */}
        <section className="resume-section">
          <h2 className="resume-section-title">Skills & Competencies</h2>
          <div className="resume-skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="resume-skill-group">
                <h4>{skillGroup.category}</h4>
                <p>{skillGroup.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        {workExperiences.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Professional Experience</h2>
            {workExperiences.map((item, idx) => (
              <div key={idx} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-role">{item.role}</h3>
                  <span className="resume-entry-date">
                    {item.startDate ? `${item.startDate} — ` : ''}
                    {item.endDate}
                  </span>
                </div>
                <div className="resume-entry-company">
                  {item.mapUrl ? (
                    <a
                      href={item.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-map-link"
                      title={`View ${item.company} on Google Maps`}
                    >
                      <span className="resume-company-name">{item.company}</span>
                      {item.location ? ` | ${item.location}` : ''}
                      <span className="resume-map-pin" aria-hidden="true"> 📍</span>
                    </a>
                  ) : (
                    <>
                      {item.company}
                      {item.location ? ` | ${item.location}` : ''}
                    </>
                  )}
                </div>
                <ul className="resume-entry-bullets">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {educationList.map((item, idx) => (
              <div key={idx} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-role">{item.role}</h3>
                  <span className="resume-entry-date">
                    {item.startDate ? `${item.startDate} — ` : ''}
                    {item.endDate}
                  </span>
                </div>
                <div className="resume-entry-company">
                  {item.mapUrl ? (
                    <a
                      href={item.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-map-link"
                      title={`View ${item.company} on Google Maps`}
                    >
                      <span className="resume-company-name">{item.company}</span>
                      {item.location ? ` | ${item.location}` : ''}
                      <span className="resume-map-pin" aria-hidden="true"> 📍</span>
                    </a>
                  ) : (
                    <>
                      {item.company}
                      {item.location ? ` | ${item.location}` : ''}
                    </>
                  )}
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="resume-entry-bullets">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certList.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Certifications & Training</h2>
            <div className="resume-cert-list">
              {certList.map((cert, idx) => (
                <div key={idx} className="resume-cert-item">
                  <h4 className="resume-cert-name">{cert.role}</h4>
                  <div className="resume-cert-issuer">{cert.company}</div>
                  {cert.bullets && cert.bullets[0] && (
                    <p className="resume-cert-desc">{cert.bullets[0]}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Key Projects</h2>
            <div className="resume-projects-grid">
              {projects.map((proj, idx) => (
                <div key={idx} className="resume-project-item">
                  <h4 className="resume-project-title">{proj.title}</h4>
                  <p className="resume-project-desc">{proj.description}</p>
                  <div className="resume-project-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="resume-project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
