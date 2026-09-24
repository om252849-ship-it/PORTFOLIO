'use client';

import { FaShieldAlt, FaPalette, FaCode, FaUsers } from 'react-icons/fa';
import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import content from '../data/content.json';

const ICONS = {
  shield: FaShieldAlt,
  palette: FaPalette,
  code: FaCode,
  users: FaUsers,
};

export default function Skills() {
  const { skills } = content;

  return (
    <section id="skills">
      <div className="section-container">
        <ScrollReveal>
          <span className="section-label">Expertise</span>
        </ScrollReveal>

        <SplitText>
          Skills & Technologies
        </SplitText>

        <div style={{ marginTop: '48px' }}>
          <div className="skills-grid">
            {skills.map((skill, i) => {
              const Icon = ICONS[skill.icon] || FaCode;
              return (
                <ScrollReveal key={i} delay={i * 0.1} scale>
                  <div className="skill-card" data-cursor="link">
                    <div className="skill-card-header">
                      <div className="skill-card-icon">
                        <Icon />
                      </div>
                      <div className="skill-card-title">{skill.category}</div>
                    </div>
                    <div className="skill-tags">
                      {skill.items.map((item, j) => (
                        <span className="skill-tag" key={j}>{item}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
