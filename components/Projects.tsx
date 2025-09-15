import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface Project {
    title: string;
    description: string;
    imageUrls: string[];
    fullDescription: string;
    technologies: string[];
}

const projectData: Project[] = [
    { 
        title: "Mr. D Convenience Store Billing and Inventory System", 
        description: "A comprehensive, standalone billing and inventory system engineered single-handedly using VB.NET and an ACCDB database.", 
        imageUrls: [
          "/images/project1/1.png",
          "/images/project1/2.png",
          "/images/project1/3.png"
        ],
        fullDescription: "Developed from scratch before the widespread use of AI coding assistants, this robust desktop application was a testament to foundational software engineering principles. The system managed all core operations for a convenience store, including point-of-sale transactions, real-time inventory tracking, sales reporting, and user access control. Built with VB.NET for the front-end interface and a Microsoft Access (.accdb) database for data persistence, it provided a reliable and efficient solution for the client's business needs.",
        technologies: ["VB.NET", "Microsoft Access", ".NET Framework"]
    },
    { 
        title: "Self-Order Kiosk For Kuya Bert's Kitchenette", 
        description: "A modern, intuitive self-ordering kiosk application created for a local restaurant, built with React, TypeScript, and Supabase.",
        imageUrls: [
          "/images/project2/home.jpg",
          "/images/project2/home1.jpg",
          "/images/project2/intro.jpg",
          "/images/project2/revieworder.jpg",
          "/images/project2/transaction.jpg"
        ],
        fullDescription: "This solo project showcases proficiency in modern web technologies to create a seamless user experience. The kiosk allows customers to browse the menu, customize their orders, and complete payments without assistance. The front-end, built with React, Vite, and TypeScript, ensures a fast and responsive interface, while Tailwind CSS provides a clean and modern design. Supabase was utilized for the backend, handling the database, user authentication, and real-time order updates, demonstrating full-stack development capabilities.",
        technologies: ["React", "TypeScript", "Vite.js", "Tailwind CSS", "Supabase"]
    },
];

// ProjectModal Component
const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  isAd?: boolean;
}> = ({ project, onClose, onNext, onPrev, isFirst, isLast, isAd }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowRight' && !isLast) {
        onNext();
      }
      if (e.key === 'ArrowLeft' && !isFirst) {
        onPrev();
      }
    };
    
    if (project) {
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose, onNext, onPrev, isFirst, isLast]);

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

  // If isAd, show the advertisement modal
  if (isAd) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-ad-title"
      >
        <div
          className="relative w-full max-w-3xl bg-gray-900/80 border border-teal-500/30 rounded-lg shadow-2xl shadow-teal-500/10 flex flex-col overflow-hidden mt-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center p-8">
            <h2 id="project-modal-ad-title" className="text-2xl font-bold text-white mb-4">Have a Project in Mind?</h2>
            <p className="text-gray-300 mb-6 text-center max-w-xl">Let's turn your idea into reality. I'm available for freelance work and collaborations. Reach out and let's build something great together!</p>
            <a href="#contact" className="rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-base md:px-8 md:py-4 md:text-lg 
            text-white font-bold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30 " onClick={onClose}>Contact Me</a>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/80 text-white shadow-lg transition-all hover:bg-red-400 hover:text-white hover:scale-110"
            aria-label="Close project details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // If project is null (shouldn't happen, but for safety), don't render modal
  if (!project) {
    return null;
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.imageUrls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.imageUrls.length) % project.imageUrls.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Main project navigation */}
    {/* Always show left/right, wrap around including ad */}
    <button
      onClick={e => { e.stopPropagation(); onPrev(); }}
      className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-teal-500/80 text-white shadow-lg transition-all hover:bg-teal-400 hover:text-white hover:scale-110"
      aria-label="Previous project"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    <button
      onClick={e => { e.stopPropagation(); onNext(); }}
      className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-teal-500/80 text-white shadow-lg transition-all hover:bg-teal-400 hover:text-white hover:scale-110"
      aria-label="Next project"
    >
      <ChevronRight className="w-5 h-5" />
    </button>

      <div
        className="relative w-full max-w-3xl bg-gray-900/80 border border-teal-500/30 rounded-lg shadow-2xl shadow-teal-500/10 flex flex-col overflow-hidden mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
      <img 
        src={project.imageUrls[currentImageIndex]} 
        alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
        className="w-full max-h-[60vh] object-contain bg-black"
      />
            {project.imageUrls.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute top-1/2 -translate-y-1/2 left-2 z-10 p-1.5 rounded-full bg-teal-500/80 text-white hover:bg-black/80 transition-all" aria-label="Previous Image">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 -translate-y-1/2 right-2 z-10 p-1.5 rounded-full bg-teal-500/80 text-white hover:bg-black/80 transition-all" aria-label="Next Image">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {project.imageUrls.map((_, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto">
            <h2 id="project-modal-title" className="text-lg sm:text-xl md:text-2xl font-bold text-white">{project.title}</h2>
            
            <div className="flex flex-wrap gap-1.5 my-3">
                {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium text-teal-300 bg-teal-900/50 rounded-full border border-teal-500/30">
                        {tech}
                    </span>
                ))}
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{project.fullDescription}</p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/80 text-white shadow-lg transition-all hover:bg-red-400 hover:text-white hover:scale-110"
          aria-label="Close project details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ 
  project: Project; 
  onPause: () => void; 
  onResume: () => void;
  onClick: () => void;
}> = ({ project, onPause, onResume, onClick }) => {
    const { title, description, imageUrls } = project;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        onPause();
        if (imageUrls.length > 1) {
            intervalRef.current = window.setInterval(() => {
                setCurrentImageIndex(prev => (prev + 1) % imageUrls.length);
            }, 1500);
        }
    };

    const handleMouseLeave = () => {
        onResume();
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCurrentImageIndex(0);
    };

    return (
        <div 
            className="w-full h-full bg-gray-900/50 rounded-lg overflow-hidden border border-teal-500/20 flex flex-col cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            <div className="relative w-full h-32 sm:h-40 overflow-hidden">
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`${title} view ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className="text-white font-bold tracking-wider border-2 border-white/80 px-3 py-1.5 rounded text-sm">View Details</p>
                </div>
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2">{title}</h3>
                <p className="mt-1.5 text-gray-400 text-xs sm:text-sm flex-grow line-clamp-3">{description}</p>
            </div>
        </div>
    );
};

const CtaCard: React.FC = () => (
     <div className="w-full h-full bg-gray-900/50 rounded-lg border border-teal-500/20 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-teal-900/30 to-gray-900/50">
        <h3 className="text-lg sm:text-xl font-bold text-white">Have a Project in Mind?</h3>
        <p className="mt-2 text-gray-300 max-w-sm text-xs sm:text-sm">Let's turn your idea into reality. I'm available for freelance work and collaborations.</p>
        <a href="#contact" className="mt-4 rounded-md bg-teal-600/80 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-500/80 hover:scale-105">
            Let's Talk
        </a>
    </div>
);

const slides = [...projectData, { type: 'cta' }];

const Projects: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

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

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, []);
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleNextProject = () => {
      if (selectedProjectIndex !== null) {
          setSelectedProjectIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex + 1) % projectData.length));
      }
    };

    const handlePrevProject = () => {
        if (selectedProjectIndex !== null) {
            setSelectedProjectIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex - 1 + projectData.length) % projectData.length));
        }
    };

    useEffect(() => {
        let slideInterval: number | undefined;
        if (isVisible && !isAutoScrollPaused) {
            slideInterval = setInterval(nextSlide, 5000);
        }
        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };
    }, [isVisible, isAutoScrollPaused, nextSlide]);

  // Modal navigation logic: allow wrap-around and ad slide
  const allSlides = [...projectData, { type: 'ad' }];
  const isAdModal = selectedProjectIndex === projectData.length;
  const selectedProject = !isAdModal && selectedProjectIndex !== null ? projectData[selectedProjectIndex] : null;

  // Modal navigation handlers
  const handleModalNext = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex + 1) % allSlides.length);
  };
  const handleModalPrev = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex - 1 + allSlides.length) % allSlides.length);
  };

  return (
  <>
    <section ref={sectionRef} className={`flex min-h-[70vh] items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 animate-section ${isVisible ? 'is-visible' : ''}`}>
    <div className="text-center container mx-auto max-w-5xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-item">My Work</h2>
      <p className="mt-3 text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base animate-item delay-100">Here are some of the projects I've developed, showcasing my skills in creating modern and functional solutions.</p>
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto h-60 sm:h-72 animate-item delay-200">
        <div className="overflow-hidden w-full h-full">
          <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full p-1">
                {'title' in slide ? (
                  <ProjectCard 
                    project={slide as Project} 
                    onPause={() => setIsAutoScrollPaused(true)}
                    onResume={() => setIsAutoScrollPaused(false)}
                    onClick={() => setSelectedProjectIndex(index)}
                  />
                ) : (
                  <CtaCard />
                )}
              </div>
            ))}
          </div>
        </div>
        <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-3 z-10 p-1.5 rounded-full bg-gray-800/80 text-white hover:bg-teal-500/50 transition-all" aria-label="Previous Project">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-3 z-10 p-1.5 rounded-full bg-gray-800/80 text-white hover:bg-teal-500/50 transition-all" aria-label="Next Project">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-6 sm:mt-8 animate-item delay-300">
        <a href="#contact" className="inline-block rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-base md:px-8 md:py-4 md:text-lg text-white font-bold shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30">
          Bring Your Vision to Life
        </a>
      </div>
    </div>
    </section>
    <ProjectModal
    project={selectedProject}
    onClose={() => setSelectedProjectIndex(null)}
    onNext={handleModalNext}
    onPrev={handleModalPrev}
    isFirst={false}
    isLast={false}
    isAd={isAdModal}
    />
  </>
  );
};

export default Projects;