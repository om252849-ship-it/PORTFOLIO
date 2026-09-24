'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180,
      isMoving: false,
    };

    let moveTimeout;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle types: 'dot', 'cross', 'diamond'
    const particleTypes = ['dot', 'cross', 'diamond'];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        // Gentle upward & lateral drift
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.35 + 0.15);
        
        // Physical reaction forces
        this.fx = 0;
        this.fy = 0;
        
        // Opacity
        this.opacity = Math.random() * 0.45 + 0.15;
        this.baseOpacity = this.opacity;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.rotation += this.rotSpeed;

        // Apply mouse physics (antigravity displacement & spring-back)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.x > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away from cursor smoothly
          this.fx -= Math.cos(angle) * force * 1.6;
          this.fy -= Math.sin(angle) * force * 1.6;
          this.opacity = Math.min(0.9, this.baseOpacity + force * 0.4);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.04;
        }

        // Apply friction to force
        this.fx *= 0.92;
        this.fy *= 0.92;

        this.x += this.vx + this.fx;
        this.y += this.vy + this.fy;

        // Wrap around screen boundaries
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'cross') {
          ctx.strokeStyle = `rgba(196, 163, 90, ${this.opacity * 0.8})`;
          ctx.lineWidth = 1;
          const arm = this.size * 1.8;
          ctx.beginPath();
          ctx.moveTo(-arm, 0);
          ctx.lineTo(arm, 0);
          ctx.moveTo(0, -arm);
          ctx.lineTo(0, arm);
          ctx.stroke();
        } else if (this.type === 'diamond') {
          ctx.strokeStyle = `rgba(196, 163, 90, ${this.opacity * 0.85})`;
          ctx.lineWidth = 0.8;
          const d = this.size * 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -d);
          ctx.lineTo(d, 0);
          ctx.lineTo(0, d);
          ctx.lineTo(-d, 0);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Standard glowing dot
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 163, 90, ${this.opacity})`;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    let particles = [];
    const initParticles = () => {
      // Calculate responsive particle count (around 70 on desktop, 35 on mobile)
      const count = Math.min(85, Math.max(35, Math.floor((width * height) / 18000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Draw network connection lines between nearby particles
    function drawConnections() {
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196, 163, 90, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Also connect particles near the mouse cursor
        if (mouse.x > 0) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mAlpha = (1 - mdist / 140) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196, 163, 90, ${mAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Update ambient glow element position
      if (glow && mouse.x > 0) {
        glow.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        glow.style.opacity = '1';
      }

      // Draw all particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawConnections();

      animationId = requestAnimationFrame(render);
    }

    render();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 500);
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      if (glow) glow.style.opacity = '0';
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(moveTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="global-interactive-bg" aria-hidden="true">
      {/* Dynamic ambient cursor flashlight glow */}
      <div ref={glowRef} className="bg-cursor-spotlight" />
      
      {/* Architectural Dot Grid Matrix Pattern */}
      <div className="bg-grid-texture" />
      
      {/* Interactive Physics Canvas */}
      <canvas ref={canvasRef} className="bg-interactive-canvas" />
    </div>
  );
}
