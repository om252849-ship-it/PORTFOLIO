'use client';

import SplitText from './SplitText';
import ScrollReveal from './ScrollReveal';
import content from '../data/content.json';

export default function About() {
  const { about } = content;

  return (
    <section className="about" id="about">
      <div className="section-container">
        <ScrollReveal>
          <span className="section-label">About Me</span>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="about-image-wrapper" data-cursor="image">
              <img
                src="/images/avatar.jpg"
                alt="Om Kumar"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <div className="about-text">
            <SplitText className="">
              Who I Am
            </SplitText>

            <ScrollReveal delay={0.2}>
              <p>{about.bio}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="about-stats">
                {about.stats.map((stat, i) => (
                  <div className="about-stat-card" key={i} data-cursor="link">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
