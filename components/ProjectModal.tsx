import React, { useEffect, useState } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import type { Project } from './Projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNext, onPrev, isFirst, isLast }) => {
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
    // Reset image index when project changes
    if (project) {
      setCurrentImageIndex(0);
    }
  }, [project]);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 animate-[fade-in_0.3s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Main project navigation */}
      {!isFirst && (
          <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all"
              aria-label="Previous project"
          >
              <ChevronLeftIcon className="w-7 h-7" />
          </button>
      )}
      {!isLast && (
          <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all"
              aria-label="Next project"
          >
              <ChevronRightIcon className="w-7 h-7" />
          </button>
      )}

      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900/80 border border-teal-500/30 rounded-lg shadow-2xl shadow-teal-500/10 flex flex-col overflow-hidden animate-[slide-up_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
            <img 
                src={project.imageUrls[currentImageIndex]} 
                alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                className="w-full h-64 md:h-96 object-cover"
            />
            {project.imageUrls.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute top-1/2 -translate-y-1/2 left-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all" aria-label="Previous Image">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all" aria-label="Next Image">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project.imageUrls.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
        
        <div className="p-8 md:p-10 overflow-y-auto">
            <h2 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 my-4">
                {project.technologies.map(tech => (
                    <span key={tech} className="px-4 py-1.5 text-sm font-medium text-teal-300 bg-teal-900/50 rounded-full border border-teal-500/30">
                        {tech}
                    </span>
                ))}
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">{project.fullDescription}</p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-gray-300 hover:bg-black/80 hover:text-white transition-all"
          aria-label="Close project details"
        >
          <XIcon />
        </button>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ProjectModal;