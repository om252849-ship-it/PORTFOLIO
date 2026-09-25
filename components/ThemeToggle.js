'use client';

import { useState, useEffect, useRef } from 'react';

export default function ThemeToggle() {
  // mode: 'light' | 'dark' | 'system'
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('om_theme') || 'system';
    }
    return 'system';
  });
  const [appliedTheme, setAppliedTheme] = useState('light');
  const [sparks, setSparks] = useState([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveTheme = (targetMode) => {
      if (targetMode === 'dark' || targetMode === 'light') return targetMode;
      return systemDark.matches ? 'dark' : 'light';
    };

    const current = resolveTheme(mode);
    setAppliedTheme(current);
    document.documentElement.setAttribute('data-theme', current);

    // System theme listener
    const handleSystemChange = (e) => {
      const activeMode = localStorage.getItem('om_theme') || 'system';
      if (activeMode === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        setAppliedTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    systemDark.addEventListener('change', handleSystemChange);
    return () => systemDark.removeEventListener('change', handleSystemChange);
  }, [mode]);

  const triggerSparks = (x, y) => {
    const newSparks = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const distance = Math.random() * 22 + 18;
      return {
        id: Date.now() + i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: Math.random() * 3 + 2,
      };
    });
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 600);
  };

  const cycleTheme = (e) => {
    const rect = buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;
    const clickX = e.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const clickY = e.clientY || (rect ? rect.top + rect.height / 2 : 40);

    triggerSparks(clickX, clickY);

    // Cycle order: Light -> Dark -> System (Auto) -> Light
    let nextMode;
    if (mode === 'light') nextMode = 'dark';
    else if (mode === 'dark') nextMode = 'system';
    else nextMode = 'light';

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextApplied = nextMode === 'system' ? (systemDark ? 'dark' : 'light') : nextMode;

    setMode(nextMode);
    setAppliedTheme(nextApplied);
    localStorage.setItem('om_theme', nextMode);

    // Calculate maximum radius for radial ripple from click position
    const maxRadius = Math.hypot(
      Math.max(clickX, window.innerWidth - clickX),
      Math.max(clickY, window.innerHeight - clickY)
    );

    // View Transitions API with circular ripple clip-path
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', nextApplied);
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${clickX}px ${clickY}px)`,
                `circle(${maxRadius}px at ${clickX}px ${clickY}px)`,
              ],
            },
            {
              duration: 650,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {});
    } else {
      document.documentElement.setAttribute('data-theme', nextApplied);
    }
  };

  return (
    <div className="theme-toggle-wrapper">
      <button
        ref={buttonRef}
        type="button"
        onClick={cycleTheme}
        className={`theme-celestial-orb mode-${mode} theme-${appliedTheme}`}
        data-cursor="button"
        aria-label={`Current theme: ${mode} (${appliedTheme}). Click to cycle theme.`}
        title={`Theme: ${mode.toUpperCase()} (Click to toggle Light / Dark / Auto)`}
      >
        {/* Celestial Core: Sun / Moon / Eclipse Morph */}
        <div className="celestial-core">
          {/* Solar Sun with rotating ray flares */}
          <div className="celestial-sun">
            <svg viewBox="0 0 24 24" fill="none" className="sun-svg">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          </div>

          {/* Lunar Moon with crater and twinkling star */}
          <div className="celestial-moon">
            <svg viewBox="0 0 24 24" fill="none" className="moon-svg">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="currentColor"
              />
            </svg>
            <span className="moon-star star-1">✦</span>
            <span className="moon-star star-2">·</span>
          </div>
        </div>

        {/* Mode Label Indicator: AUTO / LIGHT / DARK */}
        <span className="theme-mode-badge">
          {mode === 'system' ? 'AUTO' : mode.toUpperCase()}
        </span>

        {/* Solar Flare / Cosmic Spark Burst */}
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="celestial-spark"
            style={{
              '--dx': `${spark.dx}px`,
              '--dy': `${spark.dy}px`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
            }}
          />
        ))}
      </button>
    </div>
  );
}
