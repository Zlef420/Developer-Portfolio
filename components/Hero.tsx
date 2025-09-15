import React, { useState, useEffect, useMemo, useRef } from 'react';

// Assuming these are in a local './icons' file as in your original code
// import { LinkedInIcon, GitHubIcon, XIcon, InstagramIcon } from './icons'; 
// import ScrollIndicator from './ScrollIndicator';

// NOTE: Placeholder icons and ScrollIndicator if you don't have them yet.
const LinkedInIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>;
const GitHubIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>;
const XIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd"/></svg>;
const ScrollIndicator = () => <div className="absolute bottom-10 animate-bounce"><svg className="w-6 h-6 text-teal-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div>;


const NavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean }> = ({ href, children, active }) => (
  <a
    href={href}
    className="relative px-2 py-1 group"
  >
    <span className={`transition-colors duration-300 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
      {children}
    </span>
    <span
      className={`absolute bottom-0 left-0 block h-0.5 w-full bg-teal-400 transition-transform duration-300 ease-out transform origin-center ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  </a>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group rounded-full bg-gray-800/80 p-3 text-gray-400 transition-all duration-300 hover:bg-teal-500/50 hover:text-white hover:scale-110"
  >
    {children}
  </a>
);

const Hero: React.FC = () => {
    const roles = useMemo(() => ['Full Stack Developer', 'Problem Solver', 'Prompt Engineer'], []);
    const [roleIndex, setRoleIndex] = useState(0);
    const [currentRole, setCurrentRole] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        const typeSpeed = 60;
        const deleteSpeed = 30;
        const delayBeforeDelete = 1000;

        const handleTyping = () => {
            const fullRole = roles[roleIndex];
            
            if (isDeleting) {
                setCurrentRole(fullRole.substring(0, currentRole.length - 1));
            } else {
                setCurrentRole(fullRole.substring(0, currentRole.length + 1));
            }
            
            if (!isDeleting && currentRole === fullRole) {
                setTimeout(() => setIsDeleting(true), delayBeforeDelete);
            } else if (isDeleting && currentRole === '') {
                setIsDeleting(false);
                setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        
        return () => clearTimeout(typingTimeout);
    }, [currentRole, isDeleting, roleIndex, roles]);


  return (
    <section ref={sectionRef} className={`relative flex h-screen items-center justify-center px-4 sm:px-6 md:px-8 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="flex flex-col items-center text-center max-w-5xl w-full">
        <p className="text-base md:text-lg text-gray-300 animate-item">Hello, I'm</p>
        <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-item delay-100">
          John Roilan L. Felizco
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 min-h-[3.5rem] animate-item delay-200">
          I'm a passionate <span className="text-teal-400 font-medium border-b border-teal-400/50 pr-1">{currentRole}</span><span className="inline-block w-0.5 h-6 bg-teal-400 animate-pulse" style={{ verticalAlign: '-3px' }}></span>.
        </p>
        
        <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-8 text-base md:text-lg animate-item delay-300">
          <NavLink href="#home" active>Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="mt-8 flex items-center justify-center gap-4 animate-item delay-400">
          <SocialIcon href="#"><LinkedInIcon /></SocialIcon>
          <SocialIcon href="#"><GitHubIcon /></SocialIcon>
          <SocialIcon href="#"><XIcon /></SocialIcon>
          <SocialIcon href="#"><InstagramIcon /></SocialIcon>
        </div>

        <a 
          href="/resume.pdf" 
          download="John_Felizco_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 inline-flex items-center justify-center rounded-md bg-gray-800/80 px-8 py-3 text-base sm:text-lg text-gray-300 transition-all duration-300 hover:bg-teal-500/50 hover:text-white hover:scale-105 animate-item delay-500 overflow-hidden group">
            {/* This span creates the centered ping animation */}
            <span className="absolute h-8 w-8 animate-ping rounded-full bg-teal-400 opacity-60 group-hover:animate-none"></span>
            {/* This span ensures the text is on top of the animation */}
            <span className="relative z-10">View Resume</span>
        </a>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default Hero;