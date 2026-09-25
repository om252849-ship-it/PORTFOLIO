'use client';

import { useState } from 'react';
import { FaShieldAlt, FaPalette, FaCode, FaUsers, FaTerminal } from 'react-icons/fa';
import content from '../data/content.json';

const ICONS = {
  shield: FaShieldAlt,
  palette: FaPalette,
  code: FaCode,
  users: FaUsers,
};

const SKILL_INTEL = {
  'Ethical Hacking': {
    domain: 'Defensive Security',
    impact: 'Simulating adversary tactics to discover attack vectors before exploitation.',
    level: 'Advanced Specialist',
  },
  'Security Analysis': {
    domain: 'SIEM & Threat Intel',
    impact: 'Monitoring system logs, identifying anomalous payloads, and rapid incident response.',
    level: 'Certified Tata Analyst',
  },
  'Threat Assessment': {
    domain: 'Risk Architecture',
    impact: 'Evaluating digital surface exposures and calculating CVSS severity scores.',
    level: 'Operational',
  },
  'Adobe Photoshop CS6': {
    domain: 'Visual Craft',
    impact: 'Certified image manipulation, brand assets, and creative design compositions.',
    level: 'Certified Professional',
  },
  'AI & Deep Learning': {
    domain: 'Machine Intelligence',
    impact: 'Building neural network models, loss optimization, and feature engineering.',
    level: 'BCA Specialization',
  },
  'System Analysis': {
    domain: 'Computer Science',
    impact: 'Architecting scalable low-latency computing systems and relational data schemas.',
    level: 'Foundational Lead',
  },
};

export default function Skills() {
  const { skills } = content;
  const [activeTab, setActiveTab] = useState('all');
  const [activeInspectorSkill, setActiveInspectorSkill] = useState('Ethical Hacking');

  const filteredSkills =
    activeTab === 'all'
      ? skills
      : skills.filter((s) => s.category.toLowerCase().includes(activeTab.toLowerCase()));

  const currentIntel = SKILL_INTEL[activeInspectorSkill] || {
    domain: 'Computer Science',
    impact: 'Core computational knowledge, applied software engineering, and analytical thinking.',
    level: 'Proficient',
  };

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Capability Index</span>
          </div>
          <h2 className="section-title">
            Neural Matrix &amp; <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Multi-disciplinary technical arsenal across cybersecurity, artificial intelligence, and digital design.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="skills-tab-nav">
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Disciplines
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'cybersecurity' ? 'active' : ''}`}
            onClick={() => setActiveTab('cybersecurity')}
          >
            🛡️ Cybersecurity
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'programming' ? 'active' : ''}`}
            onClick={() => setActiveTab('programming')}
          >
            ⚡ Programming &amp; AI
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
          >
            🎨 Creative &amp; Design
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'core' ? 'active' : ''}`}
            onClick={() => setActiveTab('core')}
          >
            👥 Core Competencies
          </button>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-matrix-grid">
          {filteredSkills.map((cat, i) => {
            const Icon = ICONS[cat.icon] || FaCode;
            return (
              <div key={i} className="skill-matrix-card glass-panel">
                <div className="skill-card-top">
                  <div className="skill-icon-bubble">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="skill-category-name">{cat.category}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-tech)' }}>
                      {cat.items.length} ACTIVE CAPABILITIES
                    </span>
                  </div>
                </div>

                <div className="skill-pills-wrap">
                  {cat.items.map((item, j) => (
                    <button
                      key={j}
                      type="button"
                      className={`skill-bubble-pill ${activeInspectorSkill === item ? 'active-skill-pill' : ''}`}
                      onClick={() => setActiveInspectorSkill(item)}
                      onMouseEnter={() => setActiveInspectorSkill(item)}
                      style={
                        activeInspectorSkill === item
                          ? {
                              background: 'var(--accent-gradient)',
                              color: '#fff',
                              borderColor: 'transparent',
                            }
                          : {}
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Capability Inspector Drawer */}
        <div className="skill-inspector-panel glass-panel border-beam-container">
          <div className="border-beam" />
          <div className="inspector-intel">
            <span className="inspector-radar-dot" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaTerminal style={{ color: 'var(--aurora-cyan)', fontSize: '0.85rem' }} />
                <h4 className="inspector-title">{activeInspectorSkill}</h4>
                <span className="tech-code">{currentIntel.domain}</span>
              </div>
              <p className="inspector-desc">{currentIntel.impact}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-tech)' }}>
                VERIFIED LEVEL
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--accent-primary)' }}>
                {currentIntel.level}
              </div>
            </div>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--aurora-emerald)',
                boxShadow: '0 0 10px var(--aurora-emerald)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
