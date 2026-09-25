'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CyberCore3D() {
  const containerRef = useRef(null);
  const [spinSpeed, setSpinSpeed] = useState(1);
  const [pulseKey, setPulseKey] = useState(0);
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    nodes: 142,
    status: 'OPTIMAL',
    entropy: '0.042',
  });

  const speedMultiplierRef = useRef(1);
  const targetSpeedRef = useRef(1);
  const pulseTriggerRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x00f0ff, 3.5, 50);
    pointLightCyan.position.set(4, 5, 4);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 3.2, 50);
    pointLightViolet.position.set(-4, -5, 4);
    scene.add(pointLightViolet);

    const pointLightEmerald = new THREE.PointLight(0x10b981, 2.8, 50);
    pointLightEmerald.position.set(0, 4, -4);
    scene.add(pointLightEmerald);

    // --- 1. Outer Holographic Geodesic Cage ---
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.8,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    masterGroup.add(outerMesh);

    // --- 2. Outer Vertex Glowing Nodes ---
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const nodesPoints = new THREE.Points(outerGeo, pointsMat);
    masterGroup.add(nodesPoints);

    // --- 3. Crystalline Quantum Inner Core ---
    const innerGeo = new THREE.OctahedronGeometry(1.05, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x6366f1,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.95,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // --- 4. Rotating Energy Rings ---
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.022, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.55, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // --- 5. Orbiting Quantum Swarm Particles ---
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAngles = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      particleAngles.push({
        radius,
        theta,
        phi,
        speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const swarmGeo = new THREE.BufferGeometry();
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const swarmMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSwarm = new THREE.Points(swarmGeo, swarmMat);
    masterGroup.add(particleSwarm);

    // --- Mouse & Gyro Drag Physics ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.5;
      targetY = y * 2.5;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        masterGroup.rotation.y += deltaX * 0.01;
        masterGroup.rotation.x += deltaY * 0.01;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Speed smoothing
      speedMultiplierRef.current += (targetSpeedRef.current - speedMultiplierRef.current) * 0.05;
      const speed = speedMultiplierRef.current;

      // Pulse reaction
      if (pulseTriggerRef.current > 0) {
        pulseTriggerRef.current -= delta * 2;
        const pulseScale = 1 + Math.sin(pulseTriggerRef.current * Math.PI) * 0.35;
        masterGroup.scale.set(pulseScale, pulseScale, pulseScale);
      } else {
        masterGroup.scale.set(1, 1, 1);
      }

      // Continuous rotators
      outerMesh.rotation.y += 0.005 * speed;
      outerMesh.rotation.x += 0.003 * speed;
      nodesPoints.rotation.y = outerMesh.rotation.y;
      nodesPoints.rotation.x = outerMesh.rotation.x;

      innerCore.rotation.y -= 0.012 * speed;
      innerCore.rotation.z += 0.008 * speed;

      ring1.rotation.z += 0.009 * speed;
      ring2.rotation.x += 0.007 * speed;

      // Master parallax tilt
      masterGroup.rotation.y += (mouseX - masterGroup.rotation.y * 0.5) * 0.04;
      masterGroup.rotation.x += (-mouseY - masterGroup.rotation.x * 0.5) * 0.04;

      // Floating bobbing
      masterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Animate swarm particles
      const positions = swarmGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i].theta += particleAngles[i].speed * speed;
        const { radius, theta, phi } = particleAngles[i];
        positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      }
      swarmGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleBoostSpeed = () => {
    targetSpeedRef.current = 3.5;
    setSpinSpeed(3.5);
    setTelemetry((prev) => ({ ...prev, entropy: '0.184', status: 'HYPER-SPIN' }));
    setTimeout(() => {
      targetSpeedRef.current = 1;
      setSpinSpeed(1);
      setTelemetry((prev) => ({ ...prev, entropy: '0.042', status: 'OPTIMAL' }));
    }, 2800);
  };

  const handlePulseEnergy = () => {
    pulseTriggerRef.current = 1;
    setPulseKey((k) => k + 1);
    setTelemetry((prev) => ({ ...prev, entropy: '0.312', status: 'SURGE' }));
    setTimeout(() => {
      setTelemetry((prev) => ({ ...prev, entropy: '0.042', status: 'OPTIMAL' }));
    }, 1500);
  };

  const handleStabilize = () => {
    targetSpeedRef.current = 0.5;
    setSpinSpeed(0.5);
    setTelemetry((prev) => ({ ...prev, entropy: '0.008', status: 'STABLE' }));
    setTimeout(() => {
      targetSpeedRef.current = 1;
      setSpinSpeed(1);
      setTelemetry((prev) => ({ ...prev, entropy: '0.042', status: 'OPTIMAL' }));
    }, 2000);
  };

  return (
    <div className="quantum-core-card border-beam-container">
      <div className="border-beam" />
      {/* Top HUD Telemetry */}
      <div className="quantum-core-hud">
        <span className="core-hud-chip">
          <span className="section-badge-dot" />
          QUANTUM CORE · {telemetry.status}
        </span>
        <span className="core-hud-chip" style={{ color: '#818CF8' }}>
          ENTROPY: {telemetry.entropy}
        </span>
      </div>

      {/* Interactive 3D Canvas */}
      <div ref={containerRef} className="quantum-core-canvas" />

      {/* Interactive Controls Bar */}
      <div className="quantum-core-controls">
        <button
          type="button"
          className="core-ctrl-btn"
          onClick={handleBoostSpeed}
          title="Accelerate quantum orbital velocity"
        >
          ⚡ BOOST SPEED
        </button>
        <button
          type="button"
          className="core-ctrl-btn"
          onClick={handlePulseEnergy}
          title="Trigger a quantum kinetic shockwave"
        >
          🌌 PULSE CORE
        </button>
        <button
          type="button"
          className="core-ctrl-btn"
          onClick={handleStabilize}
          title="Stabilize orbital spin"
        >
          🔄 STABILIZE
        </button>
      </div>
    </div>
  );
}
