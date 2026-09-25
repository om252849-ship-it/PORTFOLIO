'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function GlobalCharacter3D() {
  const containerRef = useRef(null);
  const [characterMode, setCharacterMode] = useState('RECON');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- High-Tech Web Audio Synthesis ---
    let audioCtx = null;
    const playCyberChime = (freq = 880, type = 'sine') => {
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.6, audioCtx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.26);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.28);
      } catch (e) {
        // Audio policy ignore
      }
    };

    // --- Three.js Full-Viewport Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8.0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Master Character Root ---
    const characterRoot = new THREE.Group();
    characterRoot.scale.set(0.78, 0.78, 0.78);
    scene.add(characterRoot);

    // Initial position in Hero section
    characterRoot.position.set(2.6, 0.15, 0);

    // --- Theme Detection & Colors ---
    const getIsDark = () => {
      if (typeof document === 'undefined') return true;
      return document.documentElement.getAttribute('data-theme') !== 'light';
    };
    let isDark = getIsDark();

    const getThemeColors = (dark) => ({
      hull: dark ? 0x141724 : 0xf2ece1,
      hullAccent: dark ? 0x1e2438 : 0xdcd5c7,
      visor: dark ? 0x00f0ff : 0xd97706,
      visorGlow: dark ? 0x00ff88 : 0xc5a059,
      core: dark ? 0x00f0ff : 0xd97706,
      wings: dark ? 0x00e5ff : 0x937c56,
      rings: dark ? 0xc5a059 : 0x947230,
      particles: dark ? 0x67e8f9 : 0xa89980,
      lightA: dark ? 0x00f0ff : 0xffedd5,
      lightB: dark ? 0x10b981 : 0xd97706,
    });

    let themeColors = getThemeColors(isDark);

    // --- BUILD THE 3D CYBER COMPANION ---

    // 1. Torso Assembly
    const bodyGroup = new THREE.Group();
    characterRoot.add(bodyGroup);

    // Chestplate / Main Hull
    const chestGeo = new THREE.OctahedronGeometry(0.52, 1);
    const hullMat = new THREE.MeshStandardMaterial({
      color: themeColors.hull,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const chestMesh = new THREE.Mesh(chestGeo, hullMat);
    chestMesh.scale.set(1.0, 1.25, 0.75);
    bodyGroup.add(chestMesh);

    // Arc Reactor / Core in center of chest
    const coreGeo = new THREE.OctahedronGeometry(0.22, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: themeColors.core,
      emissive: themeColors.core,
      emissiveIntensity: isDark ? 1.0 : 0.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const reactorCore = new THREE.Mesh(coreGeo, coreMat);
    reactorCore.position.set(0, 0, 0.42);
    bodyGroup.add(reactorCore);

    // Core Wireframe Facet overlay
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    coreWire.position.copy(reactorCore.position);
    coreWire.scale.set(1.1, 1.1, 1.1);
    bodyGroup.add(coreWire);

    // 2. Head & Visor Assembly
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.72, 0.1);
    characterRoot.add(headGroup);

    // Cyber Helmet
    const helmetGeo = new THREE.IcosahedronGeometry(0.40, 1);
    const helmetMat = new THREE.MeshStandardMaterial({
      color: themeColors.hullAccent,
      metalness: 0.9,
      roughness: 0.15,
      flatShading: true,
    });
    const helmetMesh = new THREE.Mesh(helmetGeo, helmetMat);
    helmetMesh.scale.set(0.9, 0.95, 1.0);
    headGroup.add(helmetMesh);

    // Panoramic Curved Cyber Visor
    const visorGeo = new THREE.CylinderGeometry(0.30, 0.30, 0.15, 24, 1, false, -Math.PI / 2.6, Math.PI / 1.3);
    const visorMat = new THREE.MeshStandardMaterial({
      color: themeColors.visor,
      emissive: themeColors.visor,
      emissiveIntensity: isDark ? 0.9 : 0.55,
      roughness: 0.05,
      metalness: 0.95,
      side: THREE.DoubleSide,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.25);
    visorMesh.rotation.x = Math.PI / 2;
    headGroup.add(visorMesh);

    // Optical Eye Diodes (Gaze trackers)
    const eyeGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({
      color: themeColors.visorGlow,
    });
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    eyeLeft.position.set(-0.09, 0.02, 0.41);
    headGroup.add(eyeLeft);

    const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    eyeRight.position.set(0.09, 0.02, 0.41);
    headGroup.add(eyeRight);

    // Cyber Antennas
    const finGeo = new THREE.BoxGeometry(0.035, 0.30, 0.07);
    const finMat = new THREE.MeshStandardMaterial({
      color: themeColors.hull,
      metalness: 0.8,
      roughness: 0.2,
    });
    const finLeft = new THREE.Mesh(finGeo, finMat);
    finLeft.position.set(-0.35, 0.20, -0.05);
    finLeft.rotation.z = Math.PI / 6;
    headGroup.add(finLeft);

    const finRight = new THREE.Mesh(finGeo, finMat);
    finRight.position.set(0.35, 0.20, -0.05);
    finRight.rotation.z = -Math.PI / 6;
    headGroup.add(finRight);

    // Antenna Beacon Lights
    const beaconGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const beaconLeft = new THREE.Mesh(beaconGeo, beaconMat);
    beaconLeft.position.set(-0.43, 0.34, -0.05);
    headGroup.add(beaconLeft);

    const beaconRight = new THREE.Mesh(beaconGeo, beaconMat);
    beaconRight.position.set(0.43, 0.34, -0.05);
    headGroup.add(beaconRight);

    // 3. Floating Antigravity Wings
    const wingsGroup = new THREE.Group();
    characterRoot.add(wingsGroup);

    const wingGeo = new THREE.BoxGeometry(0.10, 0.70, 0.035);
    const wingMat = new THREE.MeshStandardMaterial({
      color: themeColors.wings,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    const wingLeft = new THREE.Mesh(wingGeo, wingMat);
    wingLeft.position.set(-0.78, 0.08, -0.18);
    wingLeft.rotation.z = -Math.PI / 4;
    wingsGroup.add(wingLeft);

    const wingRight = new THREE.Mesh(wingGeo, wingMat);
    wingRight.position.set(0.78, 0.08, -0.18);
    wingRight.rotation.z = Math.PI / 4;
    wingsGroup.add(wingRight);

    // 4. Orbital Gyroscopic Rings
    const ringsGroup = new THREE.Group();
    characterRoot.add(ringsGroup);

    const ring1Geo = new THREE.RingGeometry(0.88, 0.91, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: themeColors.rings,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(1.08, 1.11, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: themeColors.visor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.5 : 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ringsGroup.add(ring2);

    // 5. Thruster Plasma Exhaust
    const thrusterGeo = new THREE.ConeGeometry(0.18, 0.45, 16);
    const thrusterMat = new THREE.MeshBasicMaterial({
      color: themeColors.core,
      transparent: true,
      opacity: 0.8,
    });
    const thrusterMesh = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterMesh.position.set(0, -0.80, 0);
    thrusterMesh.rotation.x = Math.PI;
    characterRoot.add(thrusterMesh);

    // 6. Holographic Shield Bubble
    const shieldGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: themeColors.visor,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    characterRoot.add(shieldMesh);

    // 7. Ambient Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.3);
    scene.add(ambientLight);

    const lightA = new THREE.PointLight(themeColors.lightA, isDark ? 3.5 : 2.0, 15);
    lightA.position.set(3, 3, 4);
    scene.add(lightA);

    const lightB = new THREE.PointLight(themeColors.lightB, isDark ? 2.5 : 1.5, 15);
    lightB.position.set(-3, -2, 3);
    scene.add(lightB);

    // --- THEME SYNC LISTENER ---
    const updateThemeMaterials = () => {
      const dark = getIsDark();
      if (dark === isDark) return;
      isDark = dark;
      themeColors = getThemeColors(dark);

      hullMat.color.setHex(themeColors.hull);
      helmetMat.color.setHex(themeColors.hullAccent);

      visorMat.color.setHex(themeColors.visor);
      visorMat.emissive.setHex(themeColors.visor);
      visorMat.emissiveIntensity = dark ? 0.9 : 0.55;

      coreMat.color.setHex(themeColors.core);
      coreMat.emissive.setHex(themeColors.core);
      coreMat.emissiveIntensity = dark ? 1.0 : 0.6;

      eyeMat.color.setHex(themeColors.visorGlow);
      wingMat.color.setHex(themeColors.wings);
      ring1Mat.color.setHex(themeColors.rings);
      ring2Mat.color.setHex(themeColors.visor);
      thrusterMat.color.setHex(themeColors.core);
      shieldMat.color.setHex(themeColors.visor);

      ambientLight.intensity = dark ? 0.9 : 1.3;
      lightA.color.setHex(themeColors.lightA);
      lightA.intensity = dark ? 3.5 : 2.0;
      lightB.color.setHex(themeColors.lightB);
      lightB.intensity = dark ? 2.5 : 1.5;
    };

    const themeObserver = new MutationObserver(() => updateThemeMaterials());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // --- WAYPOINTS TUNED FOR OPEN SPACE / MARGINS (NO CONTENT OVERLAP) ---
    // At z=0, camera width is ~10.3. Desktop content is centered between -3.6 and +3.6.
    const waypoints = [
      { p: 0.00, x: 2.6,  y: 0.15,  z: 0.0,  rotY: -0.35, rotZ: 0.0,   mode: 'RECON' },
      { p: 0.22, x: 3.8,  y: 0.35,  z: -0.2, rotY: -0.5,  rotZ: -0.08, mode: 'ANALYZE' },
      { p: 0.44, x: -3.8, y: 0.2,   z: 0.1,  rotY: 0.5,   rotZ: 0.1,   mode: 'TECH_MATRIX' },
      { p: 0.65, x: 3.8,  y: 0.1,   z: -0.1, rotY: -0.45, rotZ: -0.08, mode: 'MILESTONE_SYNC' },
      { p: 0.85, x: 3.9,  y: 0.3,   z: 0.1,  rotY: -0.4,  rotZ: -0.06, mode: 'LAB_OVERCLOCK' },
      { p: 1.00, x: 3.7,  y: -0.2,  z: 0.3,  rotY: -0.35, rotZ: 0.0,   mode: 'SECURE_COMM' },
    ];

    // Responsive position multiplier
    const getResponsiveSettings = () => {
      if (typeof window === 'undefined') return { mult: 1, zOffset: 0, scale: 0.78 };
      if (window.innerWidth < 768) {
        // Mobile: Render smaller in the subtle background depth layer
        return { mult: 0.2, zOffset: -2.0, scale: 0.55 };
      }
      if (window.innerWidth < 1100) {
        // Tablet: Slightly tucked into background
        return { mult: 0.55, zOffset: -1.0, scale: 0.65 };
      }
      return { mult: 1.0, zOffset: 0, scale: 0.78 };
    };

    let responsiveSettings = getResponsiveSettings();

    // Helper: interpolate along waypoints
    const getInterpolatedPose = (progress) => {
      const clampedP = Math.max(0, Math.min(1, progress));
      let idx = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        if (clampedP >= waypoints[i].p && clampedP <= waypoints[i + 1].p) {
          idx = i;
          break;
        }
      }
      const w1 = waypoints[idx];
      const w2 = waypoints[idx + 1] || waypoints[waypoints.length - 1];
      const span = w2.p - w1.p || 1;
      const t = (clampedP - w1.p) / span;

      const easedT = 0.5 - 0.5 * Math.cos(t * Math.PI);

      return {
        x: (w1.x + (w2.x - w1.x) * easedT) * responsiveSettings.mult,
        y: w1.y + (w2.y - w1.y) * easedT,
        z: w1.z + (w2.z - w1.z) * easedT + responsiveSettings.zOffset,
        rotY: w1.rotY + (w2.rotY - w1.rotY) * easedT,
        rotZ: w1.rotZ + (w2.rotZ - w1.rotZ) * easedT,
        mode: t > 0.5 ? w2.mode : w1.mode,
      };
    };

    // --- INTERACTIVE STATE VARIABLES ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 2.6;
    let targetY = 0.15;
    let targetZ = 0;
    let targetRotY = -0.35;
    let targetRotZ = 0;

    let scrollProgress = 0;
    let smoothScroll = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    let spinVelocity = 0;
    let shieldPulse = 0;
    let clickRecoil = 0;

    // --- MOUSE MOVE LISTENER ---
    const onMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX;
      mouseY = normY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- SCROLL LISTENER ---
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currScroll = window.scrollY;
      scrollProgress = maxScroll > 0 ? currScroll / maxScroll : 0;
      scrollVelocity = (currScroll - lastScrollY) * 0.005;
      lastScrollY = currScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- CLICK REACTION TRIGGER ---
    const triggerInteractiveReaction = (e) => {
      shieldPulse = 1.0;
      clickRecoil = 0.40;
      spinVelocity = Math.PI * 1.5; // Execute 360 corkscrew flip

      playCyberChime(920 + Math.random() * 260, 'triangle');

      setClickCount((prev) => prev + 1);

      // Cycle Eye/Visor Colors
      const eyePalette = [0x00f0ff, 0x00ff88, 0xc5a059, 0xa855f7, 0xec4899];
      const chosenColor = eyePalette[Math.floor(Math.random() * eyePalette.length)];
      eyeMat.color.setHex(chosenColor);
      reactorCore.material.emissive.setHex(chosenColor);
    };

    window.addEventListener('click', triggerInteractiveReaction);

    // --- RESIZE LISTENER ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      responsiveSettings = getResponsiveSettings();
      characterRoot.scale.set(
        responsiveSettings.scale,
        responsiveSettings.scale,
        responsiveSettings.scale
      );
    };
    window.addEventListener('resize', onResize);

    // --- ANIMATION RENDER LOOP (60 FPS) ---
    let frameId;
    const startTime = performance.now() * 0.001;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = performance.now() * 0.001 - startTime;

      // Smooth scroll lerping
      smoothScroll += (scrollProgress - smoothScroll) * 0.08;

      // Calculate path pose along waypoints
      const pose = getInterpolatedPose(smoothScroll);
      targetX = pose.x;
      targetY = pose.y;
      targetZ = pose.z;
      targetRotY = pose.rotY;
      targetRotZ = pose.rotZ;

      setCharacterMode(prevMode => {
        if (pose.mode !== prevMode) {
          return pose.mode;
        }
        return prevMode;
      });

      // Smooth position interpolation
      characterRoot.position.x += (targetX - characterRoot.position.x) * 0.08;
      characterRoot.position.y += (targetY - characterRoot.position.y) * 0.08;
      characterRoot.position.z += (targetZ - characterRoot.position.z) * 0.08;

      // Anti-Gravity Floating Bob
      const bob = Math.sin(elapsedTime * 2.2) * 0.08;
      const sway = Math.cos(elapsedTime * 1.8) * 0.04;
      characterRoot.position.y += bob * 0.05;
      characterRoot.position.x += sway * 0.05;

      // Base body rotation + banking on scroll
      const bankAngle = Math.max(-0.35, Math.min(0.35, scrollVelocity * 3.2));
      characterRoot.rotation.z += (targetRotZ + bankAngle - characterRoot.rotation.z) * 0.08;

      // Interactive spin trick damping
      if (spinVelocity > 0.01) {
        characterRoot.rotation.y += spinVelocity * 0.12;
        spinVelocity *= 0.92;
      } else {
        characterRoot.rotation.y += (targetRotY - characterRoot.rotation.y) * 0.08;
      }

      // Click recoil recovery
      if (clickRecoil > 0.001) {
        characterRoot.position.z -= clickRecoil * 0.08;
        clickRecoil *= 0.88;
      }

      // --- HEAD LOOK-AT CURSOR TRACKING ---
      const lookTargetX = mouseX * 0.65;
      const lookTargetY = mouseY * 0.50;
      headGroup.rotation.y += (lookTargetX - headGroup.rotation.y) * 0.12;
      headGroup.rotation.x += (-lookTargetY - headGroup.rotation.x) * 0.12;

      // Wing flexion
      const wingFlap = Math.sin(elapsedTime * 3.8) * 0.07;
      wingLeft.rotation.z = -Math.PI / 4 + wingFlap;
      wingRight.rotation.z = Math.PI / 4 - wingFlap;

      // Gyroscopic Ring Rotations
      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.01;

      // Pulsing Reactor Core
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.06;
      reactorCore.scale.set(pulseScale, pulseScale, pulseScale);
      coreWire.rotation.y += 0.015;

      // Thruster flame flicker
      const thrustScale = 0.85 + Math.random() * 0.3;
      thrusterMesh.scale.set(thrustScale, thrustScale * 1.2, thrustScale);

      // Shield shockwave expansion on click
      if (shieldPulse > 0.01) {
        shieldMesh.visible = true;
        shieldMat.opacity = shieldPulse * 0.85;
        const shieldScale = 1.0 + (1.0 - shieldPulse) * 0.8;
        shieldMesh.scale.set(shieldScale, shieldScale, shieldScale);
        shieldPulse *= 0.91;
      } else {
        shieldMesh.visible = false;
      }

      scrollVelocity *= 0.9;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', triggerInteractiveReaction);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="global-3d-character-layer" ref={containerRef}>
      {/* Floating Companion Telemetry HUD */}
      <div className="companion-hud-pill" data-cursor="button">
        <span className="companion-hud-dot" />
        <span className="companion-hud-text">
          COMPANION: {characterMode}
        </span>
        <span className="companion-hud-action">
          [ ✦ CLICK TO INTERACT ]
        </span>
      </div>
    </div>
  );
}
