import React, { useState, useEffect, useRef } from 'react';
import {
  FaReact,           // for React
  FaJsSquare,        // for TypeScript (using JS square as a common alternative)
  FaNodeJs,          // for Node.js
  FaDatabase,        // for SQL
  FaGitAlt,          // for Git
  FaWind,            // for Tailwind CSS
  FaRobot,           // for Prompt Engineering
  FaKeyboard,        // for Typing
  FaBrain,           // for Analytical Thinking
  FaLayerGroup,      // for Multitasking
} from 'react-icons/fa'; // Import from Font Awesome icons
import { SiTailwindcss } from 'react-icons/si'; // Import Tailwind CSS icon

interface Skill {
  name: string;
  Icon: React.ElementType;
}

interface SoftSkill {
  name: string;
  description: string;
  Icon: React.ElementType;
}

const techSkills: Skill[] = [
  { name: 'React', Icon: FaReact },
  { name: 'TypeScript', Icon: FaJsSquare }, // Changed icon
  { name: 'Node.js', Icon: FaNodeJs },
  { name: 'SQL', Icon: FaDatabase },
  { name: 'Git', Icon: FaGitAlt },
    { name: 'Tailwind CSS', Icon: SiTailwindcss }, // Official Tailwind CSS icon
];

const softSkills: SoftSkill[] = [
  { name: 'Prompt Engineering', description: 'Crafting effective AI prompts', Icon: FaRobot }, // Changed icon
  { name: '65+ WPM Typing', description: 'High-speed accurate typing', Icon: FaKeyboard },
  { name: 'Analytical Thinking', description: 'Problem-solving mindset', Icon: FaBrain }, // Changed icon
  { name: 'Multitasking', description: 'Managing multiple projects', Icon: FaLayerGroup }, // Changed icon
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentView, setCurrentView] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentView(prev => (prev === 0 ? 1 : 0));
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const renderTechStack = () => (
    <div className={`transition-all duration-600 ${isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-item">My Tech Stack</h2>
      <p className="text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto text-base sm:text-lg animate-item delay-100">
        I'm proficient in a variety of modern technologies to build robust, scalable, and visually appealing web applications.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 max-w-5xl mx-auto">
        {techSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="group flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg border border-teal-500/20 transition-all duration-300 hover:border-teal-400 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10 animate-item"
            style={{ transitionDelay: `${200 + index * 50}ms` }}
          >
            {/* Removed strokeWidth since react-icons don't use it */}
            <skill.Icon className="w-12 h-12 md:w-16 md:h-16 text-gray-400 group-hover:text-white transition-colors duration-300" />
            <p className="mt-3 text-white font-medium text-sm text-center">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSoftSkills = () => (
    <div className={`transition-all duration-600 ${isTransitioning ? 'opacity-0 transform -translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 animate-item">My Skills</h2>
      <p className="text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg animate-item delay-100">
        Beyond technical expertise, I bring essential soft skills that enhance productivity and drive successful project outcomes.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
        {softSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-gray-900/50 rounded-lg border border-purple-500/20 transition-all duration-300 hover:border-purple-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 animate-item"
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              {/* Removed strokeWidth since react-icons don't use it */}
              <skill.Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 group-hover:text-white transition-colors duration-300 mb-2" />
              <h3 className="text-white font-semibold text-sm sm:text-base text-center mb-0.5 sm:mb-1">{skill.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm text-center">{skill.description}</p>
            </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-8 animate-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto text-center">
        {currentView === 0 ? renderTechStack() : renderSoftSkills()}
        
        <div className="flex justify-center mt-10 space-x-2">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${currentView === 0 ? 'bg-teal-400' : 'bg-gray-600'}`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${currentView === 1 ? 'bg-purple-400' : 'bg-gray-600'}`} />
        </div>
      </div>
    </section>
  );
};

export default Skills;