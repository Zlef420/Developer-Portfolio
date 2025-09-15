import React, { useState, useEffect, useRef } from 'react';
import { ReactIcon, TypeScriptIcon, NodeJSIcon, SQLIcon, GitIcon, TailwindCSSIcon } from './icons';

interface Skill {
    name: string;
    icon: React.ReactNode;
}

const skills: Skill[] = [
    { name: 'React', icon: <ReactIcon /> },
    { name: 'TypeScript', icon: <TypeScriptIcon /> },
    { name: 'Node.js', icon: <NodeJSIcon /> },
    { name: 'SQL', icon: <SQLIcon /> },
    { name: 'Git', icon: <GitIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindCSSIcon /> },
];

const Skills: React.FC = () => {
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

  return (
    <section ref={sectionRef} className={`flex h-screen items-center justify-center px-6 py-16 sm:p-12 md:p-16 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 animate-item">My Tech Stack</h2>
        <p className="text-gray-400 mb-10 sm:mb-12 max-w-3xl mx-auto text-lg sm:text-xl animate-item delay-100">I'm proficient in a variety of modern technologies, enabling me to build robust, scalable, and visually appealing web applications.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
                <div key={skill.name} className={`group flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-lg border border-teal-500/20 transition-all duration-300 hover:border-teal-400 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10 animate-item`} style={{transitionDelay: `${200 + index * 50}ms`}}>
                    <div className="w-16 h-16 md:w-20 md:h-20 text-gray-400 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        {skill.icon}
                    </div>
                    <p className="mt-4 text-white font-medium text-base text-center">{skill.name}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;