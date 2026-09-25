'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CyberCore3D() {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [telemetryState, setTelemetryState] = useState({
    fps: 60,
    nodes: 86,
    status: 'SECURE',
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Core Master Group ---
    const masterGroup = new THREE.Group();
    masterGroup.position.set(0, 0, 0);
    scene.add(masterGroup);

    // Check Theme
    const getIsDark = () => {
      if (typeof document === 'undefined') return true;
      const theme = document.documentElement.getAttribute('data-theme');
      return theme !== 'light';
    };

    let isDark = getIsDark();

    // Color definitions
    const getColors = (dark) => ({
      wireframe: dark ? 0x00e5ff : 0x937c56,
      innerCore: dark ? 0x07111e : 0xfcf9f2,
      emissive: dark ? 0x00f0ff : 0xc5a059,
      points: dark ? 0x00ff88 : 0xb5893a,
      ring1: dark ? 0x00f0ff : 0xb8954d,
      ring2: dark ? 0xc5a059 : 0x947230,
      particles: dark ? 0x67e8f9 : 0xa89980,
      lightA: dark ? 0x00f0ff : 0xfff6e6,
      lightB: dark ? 0x10b981 : 0xd97706,
    });

    let colors = getColors(isDark);

    // --- 1. Outer Geodesic Wireframe Sphere ---
    const outerGeo = new THREE.IcosahedronGeometry(1.85, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: colors.wireframe,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.28,
      roughness: isDark ? 0.3 : 0.2,
      metalness: isDark ? 0.8 : 0.6,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    masterGroup.add(outerMesh);

    // --- 2. Vertex Glowing Nodes (Points) ---
    const pointsMat = new THREE.PointsMaterial({
      color: colors.points,
      size: isDark ? 0.08 : 0.065,
      transparent: true,
      opacity: isDark ? 0.95 : 0.75,
    });
    const nodesPoints = new THREE.Points(outerGeo, pointsMat);
    masterGroup.add(nodesPoints);

    // --- 3. Inner Crystalline Cyber Core ---
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: colors.innerCore,
      emissive: colors.emissive,
      emissiveIntensity: isDark ? 0.6 : 0.35,
      roughness: isDark ? 0.1 : 0.25,
      metalness: isDark ? 0.95 : 0.8,
      flatShading: true,
      transparent: true,
      opacity: isDark ? 0.92 : 0.88,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // Inner wireframe overlay for tech facets
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: colors.emissive,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
    });
    const innerWire = new THREE.Mesh(innerGeo, innerWireMat);
    masterGroup.add(innerWire);

    // --- 4. Holographic Orbital Rings ---
    const ring1Geo = new THREE.RingGeometry(2.35, 2.38, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: colors.ring1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.5 : 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(2.65, 2.67, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: colors.ring2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.45 : 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    masterGroup.add(ring2);

    // --- 5. Cyber Particle Field (Floating Stardust) ---
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.1 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: isDark ? 0.05 : 0.04,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    masterGroup.add(particleCloud);

    // --- 6. Dynamic Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.3);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(colors.lightA, isDark ? 3.0 : 1.8, 15);
    light1.position.set(4, 3, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(colors.lightB, isDark ? 2.5 : 1.4, 15);
    light2.position.set(-4, -3, 3);
    scene.add(light2);

    // --- 7. Theme Synchronization ---
    const updateTheme = () => {
      const dark = getIsDark();
      if (dark === isDark) return;
      isDark = dark;
      colors = getColors(dark);

      outerMat.color.setHex(colors.wireframe);
      outerMat.opacity = dark ? 0.45 : 0.28;
      outerMat.roughness = dark ? 0.3 : 0.2;
      outerMat.metalness = dark ? 0.8 : 0.6;

      pointsMat.color.setHex(colors.points);
      pointsMat.size = dark ? 0.08 : 0.065;
      pointsMat.opacity = dark ? 0.95 : 0.75;

      innerMat.color.setHex(colors.innerCore);
      innerMat.emissive.setHex(colors.emissive);
      innerMat.emissiveIntensity = dark ? 0.6 : 0.35;
      innerMat.roughness = dark ? 0.1 : 0.25;
      innerMat.metalness = dark ? 0.95 : 0.8;
      innerMat.opacity = dark ? 0.92 : 0.88;

      innerWireMat.color.setHex(colors.emissive);
      innerWireMat.opacity = dark ? 0.6 : 0.4;

      ring1Mat.color.setHex(colors.ring1);
      ring1Mat.opacity = dark ? 0.5 : 0.3;

      ring2Mat.color.setHex(colors.ring2);
      ring2Mat.opacity = dark ? 0.45 : 0.25;

      particlesMat.color.setHex(colors.particles);
      particlesMat.size = dark ? 0.05 : 0.04;
      particlesMat.opacity = dark ? 0.75 : 0.5;

      ambientLight.intensity = dark ? 0.9 : 1.3;
      light1.color.setHex(colors.lightA);
      light1.intensity = dark ? 3.0 : 1.8;
      light2.color.setHex(colors.lightB);
      light2.intensity = dark ? 2.5 : 1.4;
    };

    const themeObserver = new MutationObserver(() => updateTheme());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // --- 8. Mouse & Interactive Physics Engine ---
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      setHasInteracted(true);
      previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        velocityX = deltaX * 0.006;
        velocityY = deltaY * 0.006;
        masterGroup.rotation.y += velocityX;
        masterGroup.rotation.x += velocityY;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        mouseX = normX;
        mouseY = normY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // --- 9. Visibility & Resize Control ---
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // --- 10. Animation Loop ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Damping velocity from dragging
      if (!isDragging) {
        masterGroup.rotation.y += velocityX;
        masterGroup.rotation.x += velocityY;
        velocityX *= 0.94;
        velocityY *= 0.94;

        // Auto gentle constant cyber rotation
        masterGroup.rotation.y += 0.0032;
        masterGroup.rotation.x += 0.0014;

        // Controlled subtle parallax without escaping bounds
        const targetRotY = Math.max(-0.25, Math.min(0.25, mouseX * 0.25));
        const targetRotX = Math.max(-0.2, Math.min(0.2, mouseY * 0.2));
        masterGroup.position.x += (targetRotY - masterGroup.position.x) * 0.05;
        masterGroup.position.y += (-targetRotX - masterGroup.position.y) * 0.05;
      }

      // Counter-rotating facets
      innerCore.rotation.y -= 0.012;
      innerCore.rotation.z += 0.008;
      innerWire.rotation.y -= 0.012;
      innerWire.rotation.z += 0.008;

      // Pulsing scale for organic cyber breathing
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.04;
      innerCore.scale.set(pulse, pulse, pulse);
      innerWire.scale.set(pulse, pulse, pulse);

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      particleCloud.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Telemetry jitter
    const telemetryInterval = setInterval(() => {
      setTelemetryState((prev) => ({
        fps: 59 + Math.floor(Math.random() * 2),
        nodes: 82 + Math.floor(Math.random() * 7),
        status: Math.random() > 0.05 ? 'SECURE' : 'DEFENDING',
      }));
    }, 2400);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(telemetryInterval);
      window.removeEventListener('resize', onResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      observer.disconnect();
      themeObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cyber-core-container" ref={containerRef}>
      {/* Ambient Radial Depth Glow Behind WebGL */}
      <div className="cyber-core-ambient-glow" />

      {/* Floating HUD Telemetry Badges */}
      <div className="cyber-hud-badge top-right">
        <div className="cyber-hud-dot" />
        <div className="cyber-hud-text">
          <span className="cyber-hud-label">CORE TELEMETRY</span>
          <span className="cyber-hud-val">
            {telemetryState.status} • {telemetryState.nodes} NODES
          </span>
        </div>
      </div>

      <div className="cyber-hud-badge bottom-left">
        <div className="cyber-hud-icon">⚡</div>
        <div className="cyber-hud-text">
          <span className="cyber-hud-label">REAL-TIME WEBGL</span>
          <span className="cyber-hud-val">{telemetryState.fps} FPS • 60Hz SYNC</span>
        </div>
      </div>

      <div className="cyber-hud-badge bottom-right">
        <div className="cyber-hud-icon">🛡️</div>
        <div className="cyber-hud-text">
          <span className="cyber-hud-label">ZERO-DAY DEFENSE</span>
          <span className="cyber-hud-val">AES-256 ENCRYPTED</span>
        </div>
      </div>

      {/* Interactive prompt hint */}
      {!hasInteracted && (
        <div className={`cyber-core-hint ${isInteracting ? 'hidden' : ''}`}>
          <span>✦ Drag to rotate 3D core</span>
        </div>
      )}
    </div>
  );
}
