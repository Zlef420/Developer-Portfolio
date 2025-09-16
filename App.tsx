import React, { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
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
      className="relative text-gray-300 font-sans leading-relaxed h-full w-full overflow-y-auto snap-y snap-mandatory"
    >
      <AnimatedBackground />
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