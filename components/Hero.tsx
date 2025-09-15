import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LinkedInIcon, GitHubIcon, XIcon, InstagramIcon } from './icons';
import ScrollIndicator from './ScrollIndicator';

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
    className="group rounded-full bg-gray-800/80 p-4 text-gray-400 transition-all duration-300 hover:bg-teal-500/50 hover:text-white hover:scale-110"
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
                // Deleting
                setCurrentRole(fullRole.substring(0, currentRole.length - 1));
            } else {
                // Typing
                setCurrentRole(fullRole.substring(0, currentRole.length + 1));
            }
            
            // If word is fully typed, pause then start deleting
            if (!isDeleting && currentRole === fullRole) {
                setTimeout(() => setIsDeleting(true), delayBeforeDelete);
            // If word is fully deleted, move to next word
            } else if (isDeleting && currentRole === '') {
                setIsDeleting(false);
                setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        
        return () => clearTimeout(typingTimeout);
    }, [currentRole, isDeleting, roleIndex, roles]);


  return (
    <section ref={sectionRef} className={`relative flex h-screen items-center justify-center px-6 py-12 sm:p-16 md:p-20 lg:p-24 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="flex flex-col items-center text-center">
        <p className="text-lg md:text-xl text-gray-300 animate-item">Hello, I'm</p>
        <h1 className="mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-item delay-100">
          John Roilan L. Felizco
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 min-h-[3rem] md:min-h-[2rem] animate-item delay-200">
          I'm a passionate <span className="text-teal-400 font-medium border-b border-teal-400/50 pr-1">{currentRole}</span><span className="inline-block w-0.5 h-6 bg-teal-400 animate-pulse" style={{ verticalAlign: '-3px' }}></span>.
        </p>
        
        <nav className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 md:gap-x-10 text-base md:text-lg animate-item delay-300">
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
          className="mt-8 inline-block rounded-md bg-gray-800/80 px-8 py-4 text-lg text-gray-300 transition-all duration-300 hover:bg-teal-500/50 hover:text-white hover:scale-105 animate-item delay-500">
          View Resume
        </a>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default Hero;