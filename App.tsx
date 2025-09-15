import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SideNav from './components/SideNav';
import ScrollToTopButton from './components/ScrollToTopButton';
import type { SectionName } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionName>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current, // Observe within the scrolling container
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionName);
        }
      });
    }, observerOptions);

    const refs = Object.values(sectionRefs);
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowScrollTop(scrollContainerRef.current.scrollTop > window.innerHeight / 2);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);


    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      container?.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative bg-black text-gray-300 font-sans leading-relaxed h-full w-full overflow-y-auto snap-y snap-mandatory"
    >
      {/* Enhanced dark, trippy, tech-inspired animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 w-full h-full"
      >
        {/* Layer 1: Deep blue/purple blurred blob */}
        <div
          className="absolute w-[80vw] h-[60vh] top-[-10%] left-[-20%] opacity-60 mix-blend-lighten"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #1a1a40 0%, #3a0ca3 60%, transparent 100%)',
            filter: 'blur(60px) saturate(1.3)',
            animation: 'trippy1 18s ease-in-out infinite alternate',
          }}
        />
        {/* Layer 2: Neon cyan blurred blob */}
        <div
          className="absolute w-[60vw] h-[50vh] bottom-[-15%] right-[-10%] opacity-50 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 60% 40%, #00ffe7 0%, #3a86ff 60%, transparent 100%)',
            filter: 'blur(48px) saturate(1.2)',
            animation: 'trippy2 22s ease-in-out infinite alternate',
          }}
        />
        {/* Layer 3: Magenta/pink blurred blob */}
        <div
          className="absolute w-[70vw] h-[60vh] top-[30%] left-[40%] opacity-40 mix-blend-lighten"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 40% 60%, #ff00cc 0%, #ff6fff 60%, transparent 100%)',
            filter: 'blur(70px) saturate(1.1)',
            animation: 'trippy3 26s ease-in-out infinite alternate',
          }}
        />
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a1a] opacity-70" />
        <style>{`
          @keyframes trippy1 {
            0% { transform: scale(1) translateY(0px) translateX(0px); }
            100% { transform: scale(1.08) translateY(-40px) translateX(30px); }
          }
          @keyframes trippy2 {
            0% { transform: scale(1) translateY(0px) translateX(0px); }
            100% { transform: scale(1.05) translateY(30px) translateX(-40px); }
          }
          @keyframes trippy3 {
            0% { transform: scale(1) translateY(0px) translateX(0px); }
            100% { transform: scale(1.1) translateY(-20px) translateX(40px); }
          }
        `}</style>
      </div>
      {/* Main content above background */}
      <SideNav activeSection={activeSection} />
      <main className="relative z-10">
        <div id="home" ref={sectionRefs.home} className="snap-start">
          <Hero />
        </div>
        <div id="about" ref={sectionRefs.about} className="snap-start">
          <About />
        </div>
        <div id="projects" ref={sectionRefs.projects} className="snap-start">
          <Projects />
        </div>
        <div id="skills" ref={sectionRefs.skills} className="snap-start">
          <Skills />
        </div>
        <div id="contact" ref={sectionRefs.contact} className="snap-start">
          <Contact />
        </div>
      </main>
      <ScrollToTopButton isVisible={showScrollTop} />
    </div>
  );
};

export default App;