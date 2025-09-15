import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes scroll-dot-pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes scroll-chevron-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(5px); }
          60% { transform: translateY(3px); }
        }
        .chevron-1 { animation: scroll-chevron-bounce 2s infinite; animation-delay: 0s; }
        .chevron-2 { animation: scroll-chevron-bounce 2s infinite; animation-delay: 0.1s; }
        .chevron-3 { animation: scroll-chevron-bounce 2s infinite; animation-delay: 0.2s; }
      `}</style>
      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group animate-item delay-500"
      >
        <div className="w-8 h-12 rounded-full border-2 border-green-400 flex items-center justify-center">
          <div 
            className="w-2.5 h-2.5 rounded-full bg-green-400"
            style={{ animation: 'scroll-dot-pulse 2s infinite' }}
          />
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 chevron-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 chevron-2 -mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-400 chevron-3 -mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </a>
    </>
  );
};

export default ScrollIndicator;