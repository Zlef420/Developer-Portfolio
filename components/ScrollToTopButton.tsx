import React from 'react';
import { ChevronUpIcon } from './icons';

interface ScrollToTopButtonProps {
  isVisible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible }) => {
  return (
    <a
      href="#home"
      aria-label="Scroll to top"
  className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-teal-500/80 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-teal-500 hover:scale-110
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ChevronUpIcon className="h-7 w-7" />
    </a>
  );
};

export default ScrollToTopButton;