'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const tagsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Status Badge
    if (badgeRef.current) {
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    // 2. Animate name characters
    if (nameRef.current) {
      const text = 'Om Kumar';
      nameRef.current.innerHTML = '';
      const chars = text.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(105%)';
        span.style.opacity = '0';
        nameRef.current.appendChild(span);
      });

      tl.to(nameRef.current.querySelectorAll('.char'), {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.04,
      }, '-=0.3');
    }

    // 3. Subtitle
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.4');

    // 4. Description
    tl.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.4');

    // 5. CTAs
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.4');

    // 6. Tags
    if (tagsRef.current) {
      tl.to(tagsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');
    }

    // 7. Scroll Indicator
    tl.to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');
  }, []);

  const handleScrollTo = (target) => {
    const el = document.querySelector(target);
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -80 });
    }
  };

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-content">
        {/* Status Pill */}
        <div className="hero-status-pill" ref={badgeRef}>
          <span className="hero-status-pulse" />
          <span className="hero-status-text">AVAILABLE FOR PROJECTS &amp; SECURITY RESEARCH</span>
        </div>

        <h1 className="hero-name" ref={nameRef} style={{ overflow: 'hidden' }}>
          Om Kumar
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Computer Science · Cybersecurity · Creative Design
        </p>

        <p className="hero-description" ref={descRef}>
          Architecting secure digital infrastructures, conducting ethical security research, and engineering high-performance interactive web experiences.
        </p>

        <div className="hero-cta" ref={ctaRef}>
          <MagneticButton>
            <a
              href="#projects"
              className="btn btn-primary hero-btn-main"
              data-cursor="button"
              onClick={(e) => { e.preventDefault(); handleScrollTo('#projects'); }}
            >
              <span>Explore Featured Work</span>
              <span className="btn-arrow">↓</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume"
              className="btn btn-secondary"
              data-cursor="button"
            >
              <span>View Resume</span>
              <span className="btn-arrow">↗</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="btn btn-outline"
              data-cursor="button"
              onClick={(e) => { e.preventDefault(); handleScrollTo('#contact'); }}
            >
              <span>Get in Touch</span>
            </a>
          </MagneticButton>
        </div>

        {/* Tech micro-tags */}
        <div className="hero-tech-tags" ref={tagsRef}>
          <span className="tech-tag-pill">🛡️ Ethical Hacking</span>
          <span className="tech-tag-pill">⚡ Full-Stack React/Next.js</span>
          <span className="tech-tag-pill">🔒 Vulnerability Assessment</span>
        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
