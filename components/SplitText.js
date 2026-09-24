'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ children, className = '', as: Tag = 'h2', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = '';

    // Split into words, then characters
    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';

      const chars = word.split('');
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.transform = 'translateY(105%)';
        charSpan.style.opacity = '0';
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);

      // Add space between words
      if (wi < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.style.display = 'inline-block';
        el.appendChild(space);
      }
    });

    const charElements = el.querySelectorAll('.char');

    gsap.to(charElements, {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.025,
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
