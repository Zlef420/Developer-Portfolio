import React, { useState, useEffect, useRef } from 'react';

const EducationItem: React.FC<{ title: string; period: string; institution: string; description?: string; }> = ({ title, period, institution, description }) => (
    <li className="flex items-start">
        <div className="mt-1.5 mr-3 flex h-3 w-3 items-center justify-center flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_1px_rgba(52,211,153,0.7)] animate-pulse"></div>
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-white uppercase tracking-wider text-base sm:text-lg">{title}</h4>
            <p className="text-xs sm:text-base text-gray-400">{period}</p>
            <p className="text-gray-300 mt-1 text-sm sm:text-lg">{institution}</p>
            {description && <p className="text-gray-400 mt-2 text-sm sm:text-lg italic">{description}</p>}
        </div>
    </li>
);

const ExperienceItem: React.FC<{ title: string; period: string; institution: string; description?: string; }> = ({ title, period, institution, description }) => (
    <li className="flex items-start">
        <div className="mt-1.5 mr-3 flex h-3 w-3 items-center justify-center flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_1px_rgba(192,132,252,0.7)] animate-pulse"></div>
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-white uppercase tracking-wider text-base sm:text-lg">{title}</h4>
            <p className="text-xs sm:text-base text-gray-400">{period}</p>
            <p className="text-gray-300 mt-1 text-sm sm:text-lg">{institution}</p>
            {description && <p className="text-gray-400 mt-2 text-sm sm:text-lg italic">{description}</p>}
        </div>
    </li>
);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeInfo, setActiveInfo] = useState<'education' | 'experience'>('education');

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
    let interval: number;
    if (isVisible) {
      interval = window.setInterval(() => {
        setActiveInfo(current => current === 'education' ? 'experience' : 'education');
      }, 10000); // Switch every 10 seconds
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={`flex h-screen items-start sm:items-center justify-center px-4 pt-8 pb-8 sm:p-16 lg:p-20 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        
        <div className="lg:col-span-2 flex justify-center items-center animate-item">
          <div className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 animate-pulse blur-xl"></div>
            <div className="absolute inset-0 p-1 rounded-full bg-gradient-to-br from-teal-400/80 to-purple-600/80">
              <div className="bg-black rounded-full w-full h-full p-2">
                <img
                  src="https://picsum.photos/seed/jrf/400/400"
                  alt="John Roilan L. Felizco"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-gray-400 text-sm sm:text-lg animate-item delay-200">Hello, I'm <span className="text-white font-bold">John Roilan L. Felizco</span></p>
          <p className="mt-2 text-gray-300 text-sm sm:text-lg leading-relaxed animate-item delay-300">
            Highly motivated Computer Science fresh graduate specializing in front-end development. Skilled in building responsive applications with React, Vite.js, Tailwind CSS, and Supabase. Seeking an entry-level opportunity to apply my skills, learn from experienced developers, and contribute to impactful projects.
          </p>

          <div className="relative mt-6 sm:mt-8 animate-item delay-400 min-h-[320px] sm:min-h-[420px] overflow-hidden">
            {/* Education Section */}
            <div className={`absolute w-full transition-all duration-700 ease-in-out ${activeInfo === 'education' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 border-l-4 border-teal-400 pl-4">Education</h3>
              <ul className="space-y-4 sm:space-y-6">
                  <EducationItem 
                      title="SENIOR HIGH SCHOOL (ICT STRAND)"
                      period="2018 - 2020"
                      institution="Leon Guinto Memorial College, Inc."
                      description="Single-handedly engineered the capstone project, a robust desktop application developed with VB.NET and an ACCDB database."
                  />
                 <EducationItem 
                      title="BACHELOR OF SCIENCE IN COMPUTER SCIENCE"
                      period="2021 - 2025"
                      institution="Quezonian Educational College, Inc."
                      description="Independently developed the final thesis project, leveraging a modern tech stack including React, Vite.js, TypeScript, Tailwind CSS, and Supabase."
                  />
              </ul>
            </div>
            {/* Experience Section */}
            <div className={`absolute w-full transition-all duration-700 ease-in-out ${activeInfo === 'experience' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
               <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 border-l-4 border-purple-400 pl-4">Job Experience</h3>
                <ul className="space-y-4 sm:space-y-6">
                    <ExperienceItem 
                        title="DATA ENCODER"
                        period="FEB 2025 - JUL 2025"
                        institution="Tourism Office Atimonan LGU"
                        description="Tasked with accurately digitizing and organizing tourism-related data, managing records, and assisting in the preparation of reports to support local tourism initiatives."
                    />
                </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;