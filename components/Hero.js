'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate name characters
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
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.04,
      });
    }

    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.3');

    tl.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.4');

    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.4');

    tl.to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    // Parallax on scroll (optimized)
    const hero = heroRef.current;
    if (!hero) return;
    let heroHeight = hero.offsetHeight;
    const updateHeight = () => {
      heroHeight = hero.offsetHeight;
    };
    window.addEventListener('resize', updateHeight);

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;
        if (scrollY < heroHeight) {
          const progress = scrollY / heroHeight;
          if (nameRef.current) {
            nameRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
            nameRef.current.style.opacity = 1 - progress * 1.2;
          }
          if (subtitleRef.current) {
            subtitleRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
          }
          if (ctaRef.current) {
            ctaRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
          }
        }
        // When scrollY >= heroHeight, do nothing (preserve last values)
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
    };
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
        <h1 className="hero-name" ref={nameRef} style={{ overflow: 'hidden' }}>
          Om Kumar
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Computer Science · Cybersecurity · Creative Design
        </p>
        <p className="hero-description" ref={descRef}>
          Building secure digital experiences with creative precision
        </p>
        <div className="hero-cta" ref={ctaRef}>
          <MagneticButton>
            <a
              href="#projects"
              className="btn btn-primary"
              data-cursor="button"
              onClick={(e) => { e.preventDefault(); handleScrollTo('#projects'); }}
            >
              Explore My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume"
              className="btn btn-secondary"
              data-cursor="button"
            >
              View Resume ↗
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="btn btn-outline"
              data-cursor="button"
              onClick={(e) => { e.preventDefault(); handleScrollTo('#contact'); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              Get in Touch
            </a>
          </MagneticButton>
        </div>
      </div>
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
