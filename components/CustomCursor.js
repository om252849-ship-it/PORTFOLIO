'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    // Don't run on purely touch devices (smartphones/tablets with no mouse)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Dot follows instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;

      const cursorType = target.getAttribute('data-cursor');
      document.body.classList.remove('cursor-hover', 'cursor-image');

      if (cursorType === 'link' || cursorType === 'button') {
        document.body.classList.add('cursor-hover');
        const label = ring.querySelector('.cursor-label');
        if (label) label.textContent = cursorType === 'button' ? 'Click' : 'View';
      } else if (cursorType === 'image') {
        document.body.classList.add('cursor-image');
        const label = ring.querySelector('.cursor-label');
        if (label) label.textContent = 'View';
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      document.body.classList.remove('cursor-hover', 'cursor-image');
    };

    const handleMouseOut = () => {
      visible.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Ring follows with spring delay
    let rafId;
    const animateRing = () => {
      const speed = 0.15;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * speed;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * speed;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    // Initial state
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
      document.body.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-image');
    };
  }, []);

  // Don't render on SSR
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring">
        <span className="cursor-label"></span>
      </div>
    </>
  );
}
