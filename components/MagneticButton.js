'use client';

import { useEffect, useRef } from 'react';

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rect = useRef(null);
  const raf = useRef(null);
  const resizeRaf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    el.style.display = 'inline-block';

    const updateRect = () => {
      rect.current = el.getBoundingClientRect();
    };

    const apply = () => {
      raf.current = null;
      const { x, y } = pos.current;
      el.style.transition =
        x === 0 && y === 0
          ? 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'transform 0.15s ease-out';
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const setPos = (x, y) => {
      pos.current = { x, y };
      if (raf.current === null) raf.current = requestAnimationFrame(apply);
    };

    let ticking = false;
    const handleMouseMove = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = rect.current;
        if (!r) return;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        if (dist < maxDist) {
          const strength = (1 - dist / maxDist) * 0.35;
          setPos(dx * strength, dy * strength);
        } else {
          setPos(0, 0);
        }
      });
    };

    const handleMouseLeave = () => setPos(0, 0);

    let scrollTicking = false;
    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        updateRect();
      });
    };

    const handleResize = () => {
      if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current);
      resizeRaf.current = requestAnimationFrame(updateRect);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    updateRect();

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current);
    };
  }, []);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
