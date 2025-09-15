import React from 'react';
import {
  Linkedin,
  Github,
  X, // Renamed from XIcon to avoid conflict, typically 'X' is the Lucide component
  Instagram,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Atom, 
  FileCode2, 
  Server, 
  Database, 
  GitBranch, // For Git
  Palette, // For Tailwind CSS
  // For Contact Form icons
  UserRound, // For UserCircleIcon
  Send, // For PaperAirplaneIcon
  MessageSquare, // For ChatBubbleIcon
} from 'lucide-react';

// Common icon props can be passed directly to Lucide components if needed
// const iconProps = { className: "w-6 h-6", strokeWidth: 1.5 };
// However, it's often better to apply Tailwind classes directly.

export const LinkedInIcon: React.FC = () => (
    <Linkedin className="w-6 h-6" strokeWidth={1.5} />
);

export const GitHubIcon: React.FC = () => (
    <Github className="w-6 h-6" strokeWidth={1.5} />
);

export const XSocialIcon: React.FC = () => ( // Renamed to XSocialIcon to avoid confusion with the X component
    <X className="w-6 h-6" strokeWidth={1.5} />
);

export const InstagramIcon: React.FC = () => (
    <Instagram className="w-6 h-6" strokeWidth={1.5} />
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <ChevronDown className={className} strokeWidth={1.5} />
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <ChevronUp className={className} strokeWidth={1.5} />
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <ChevronLeft className={className} strokeWidth={1.5} />
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <ChevronRight className={className} strokeWidth={1.5} />
);

// Navigation Icons
export const HomeIcon: React.FC = () => (
    <Home className="w-7 h-7" strokeWidth={1.5} />
);

export const UserIcon: React.FC = () => (
    <User className="w-7 h-7" strokeWidth={1.5} />
);

export const CodeIcon: React.FC = () => (
    <Code className="w-7 h-7" strokeWidth={1.5} />
);

export const BriefcaseIcon: React.FC = () => (
    <Briefcase className="w-7 h-7" strokeWidth={1.5} />
);

export const MailIcon: React.FC = () => (
    <Mail className="w-7 h-7" strokeWidth={1.5} />
);

// Skill Icons (using appropriate Lucide alternatives)
export const ReactIcon: React.FC = () => (
    <Atom className="w-full h-full" strokeWidth={1.5} />
);

export const TypeScriptIcon: React.FC = () => (
    <FileCode2 className="w-full h-full" strokeWidth={1.5} />
);

export const NodeJSIcon: React.FC = () => (
    <Server className="w-full h-full" strokeWidth={1.5} />
);

export const SQLIcon: React.FC = () => (
    <Database className="w-full h-full" strokeWidth={1.5} />
);

export const GitIcon: React.FC = () => (
    <GitBranch className="w-full h-full" strokeWidth={1.5} />
);

export const TailwindCSSIcon: React.FC = () => (
    <Palette className="w-full h-full" strokeWidth={1.5} />
);

// Icons for Contact Form
export const UserCircleIcon: React.FC = () => (
    <UserRound className="w-6 h-6" strokeWidth={2} />
);

export const EnvelopeIcon: React.FC = () => (
    <Mail className="w-6 h-6" strokeWidth={2} /> // Re-using Mail icon for envelope
);

export const ChatBubbleIcon: React.FC = () => (
    <MessageSquare className="w-6 h-6" strokeWidth={2} />
);

export const PaperAirplaneIcon: React.FC = () => (
     <Send className="w-6 h-6 -rotate-45" strokeWidth={2} />
);