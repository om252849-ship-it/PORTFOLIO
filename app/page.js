'use client';

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

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
