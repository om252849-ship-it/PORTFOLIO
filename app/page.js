'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import InteractiveBackground from '../components/InteractiveBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <InteractiveBackground />
      <Navbar onOpenCommandPalette={() => setCmdOpen(true)} />
      <main>
        <Hero onOpenCommandPalette={() => setCmdOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </SmoothScroll>
  );
}
