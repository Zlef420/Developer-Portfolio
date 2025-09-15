import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: "1.5"
};

export const LinkedInIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export const GitHubIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const XIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
    </svg>
);

export const InstagramIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m6 9 6 6 6-6"></path>
    </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m18 15-6-6-6 6"></path>
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m15 18-6-6 6-6"></path>
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 18 6-6-6-6"></path>
    </svg>
);


const navIconProps = {
    className: "w-7 h-7",
    strokeWidth: "1.5"
};

export const HomeIcon: React.FC = () => (
    <svg {...navIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export const UserIcon: React.FC = () => (
    <svg {...navIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const CodeIcon: React.FC = () => (
    <svg {...navIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export const BriefcaseIcon: React.FC = () => (
    <svg {...navIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

export const MailIcon: React.FC = () => (
    <svg {...navIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const skillIconProps = {
    className: "w-full h-full",
    preserveAspectRatio: "xMidYMid meet"
};

export const ReactIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

export const TypeScriptIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="currentColor"/>
        <path fill="#0d1117" d="M8.33 16.13h6.53v1.94H6.4V6.2h1.93v9.93zM14.03 8.36c0-1.2.66-1.83 1.83-1.83.6 0 1.1.2 1.4.4l.43-1.5c-.43-.26-1-.4-1.83-.4-1.8 0-3.13 1.16-3.13 3 0 2.4 2.16 2.3 2.16 3.13 0 .63-.46.96-1.1.96-.7 0-1.23-.23-1.6-.53l-.53 1.5c.46.36 1.23.56 2.06.56 1.86 0 3.23-1.16 3.23-3.03 0-2.5-2.16-2.4-2.16-3.13z"/>
    </svg>
);

export const NodeJSIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.996 24.002c-1.24 0-2.457-.15-3.63-.448-4.32-1.077-7.66-4.42-8.736-8.741-.29-1.172-.44-2.388-.44-3.628s.15-2.456.44-3.628c1.077-4.32 4.416-7.664 8.736-8.741a12.02 12.02 0 017.26 0c4.32 1.077 7.66 4.419 8.736 8.741.29 1.172.44 2.388.44 3.628s-.15 2.456-.44 3.628c-1.077 4.32-4.416 7.664-8.736 8.741-1.173.298-2.39.448-3.63.448zm-8.48-11.537c.394 3.63 2.956 6.55 6.34 7.66v-2.074c-2.47-.94-4.22-3.23-4.57-5.99h2.15v-1.7H3.45c.03-2.76 1.8-5.02 4.22-5.93V3.287c-3.383 1.11-5.943 4.03-6.34 7.662-.12.83-.18 1.67-.18 2.512s.06 1.682.18 2.512zm10.61-3.69V6.699c-1.14-.3-2.33-.46-3.55-.46s-2.41.16-3.55.46v2.074c1.1-.3 2.25-.43 3.42-.43.09 0 .17 0 .26.01.63.06 1.21.24 1.7.5.52.28.93.68 1.18 1.16.21.41.31.86.31 1.34v7.41c-.02 1.48-1.26 2.68-2.74 2.68-1.54 0-2.72-1.29-2.72-2.78v-3.86h-1.7v3.86c0 2.44 2.06 4.48 4.42 4.48 2.44 0 4.44-1.99 4.44-4.48V11.2c0-.98-.3-1.88-.82-2.62s-1.23-1.3-2.1-1.63z"/>
    </svg>
);

export const SQLIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 5v14h8.5v-2.5H6.5v-4H12.5v-2.5H6.5V7.5H12.5V5H4zm8 14h8V12.5H16v-2.5h4V5h-8v2.5h3.5v2.5h-3.5v2.5h3.5V16.5H12v2.5z"/>
    </svg>
);

export const GitIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 11.821L12.179.5 11.821 0 .5 11.821 0 12.179 11.821 24l.358-.5L23.146 12.527a.493.493 0 000-.706zM11.991 22.03L1.97 12l10.021-10.021L22.012 12l-10.021 10.039zm5.709-14.271L15.1 5.16a.494.494 0 00-.7 0L9.071 10.489a.492.492 0 000 .7l2.121 2.122-2.121 2.121-3.536-3.536a.5.5 0 00-.708 0L2.2 14.516a.5.5 0 000 .708L8.379 21.4a.5.5 0 00.708 0l2.621-2.621a.5.5 0 000-.708L8.172 14.536l2.028-2.021 4.243 4.243a.5.5 0 00.708 0L17.7 14.2a.5.5 0 000-.708L14.164 10.1l3.536-3.536a.493.493 0 000-.7z"/>
    </svg>
);

export const TailwindCSSIcon: React.FC = () => (
    <svg {...skillIconProps} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
);

// Icons for Contact Form
const contactIconProps = {
    className: "w-6 h-6",
    strokeWidth: "2"
};

export const UserCircleIcon: React.FC = () => (
    <svg {...contactIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const EnvelopeIcon: React.FC = () => (
    <svg {...contactIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 6.75c0-1.105.895-2 2-2h15c1.105 0 2 .895 2 2v10.5c0 1.105-.895 2-2 2h-15c-1.105 0-2-.895-2-2V6.75z"></path>
        <path d="M2.25 7.5l9.25 5.5 9.25-5.5"></path>
    </svg>
);

export const ChatBubbleIcon: React.FC = () => (
    <svg {...contactIconProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.625 15.875c-.248 0-.493-.058-.718-.172a.75.75 0 01-.532-1.011l.99-2.836A6.732 6.732 0 016 9.375c0-3.728 3.022-6.75 6.75-6.75s6.75 3.022 6.75 6.75S16.478 16.125 12.75 16.125a7.07 7.07 0 01-2.072-.345l-2.052.733a.751.751 0 01-.31.062z"></path>
    </svg>
);

export const PaperAirplaneIcon: React.FC = () => (
     <svg className="w-6 h-6 -rotate-45" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
    </svg>
);