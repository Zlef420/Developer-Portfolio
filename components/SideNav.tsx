
import React from 'react';
import { HomeIcon, UserIcon, CodeIcon, BriefcaseIcon, MailIcon } from './icons';
import type { SectionName } from '../types';

interface NavItemProps {
    href: string;
    sectionName: SectionName;
    activeSection: SectionName;
    children: React.ReactNode;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, sectionName, activeSection, children, label }) => {
    const isActive = sectionName === activeSection;
    return (
        <a 
            href={href} 
            className="group relative flex items-center justify-center"
            aria-label={label}
        >
            <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ease-in-out
                ${isActive ? 'bg-teal-500 text-white scale-110 shadow-lg shadow-teal-500/30' : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white group-hover:scale-110'}`}
            >
                {children}
            </div>
            <span className="absolute left-full ml-4 px-4 py-2 text-base bg-gray-800 text-white rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none transform translate-x-[-10px] group-hover:translate-x-0">
                {label}
            </span>
        </a>
    );
};

interface SideNavProps {
    activeSection: SectionName;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection }) => {
    const isVisible = activeSection !== 'home';

    return (
        <nav className={`hidden md:flex fixed top-1/2 -translate-y-1/2 left-4 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col gap-5">
                <NavItem href="#home" sectionName="home" activeSection={activeSection} label="Home"><HomeIcon /></NavItem>
                <NavItem href="#about" sectionName="about" activeSection={activeSection} label="About"><UserIcon /></NavItem>
                <NavItem href="#projects" sectionName="projects" activeSection={activeSection} label="Projects"><BriefcaseIcon /></NavItem>
                <NavItem href="#skills" sectionName="skills" activeSection={activeSection} label="Skills"><CodeIcon /></NavItem>
                <NavItem href="#contact" sectionName="contact" activeSection={activeSection} label="Contact"><MailIcon /></NavItem>
            </div>
        </nav>
    );
};

export default SideNav;