import React, { useState, useEffect, useRef } from 'react';
import { UserCircleIcon, EnvelopeIcon, ChatBubbleIcon, PaperAirplaneIcon } from './icons';

const InputField: React.FC<{
  id: string;
  label: string;
  type: 'text' | 'email';
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, type, placeholder, icon, value, onChange }) => (
  <div className="text-left">
    <label htmlFor={id} className="mb-2 flex items-center gap-2 text-base font-medium text-green-400">
      {icon}
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-green-500/30 bg-gray-900/50 px-5 py-4 text-base text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
      required
    />
  </div>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const recipientEmail = "your-email@example.com"; // CHANGE THIS to your actual email
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(`New message from ${formData.name}`)}&body=${encodeURIComponent(formData.message + `\n\nFrom: ${formData.email}`)}`;

  return (
    <section ref={sectionRef} className={`flex h-screen items-center justify-center px-6 py-16 sm:p-12 md:p-16 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="w-full max-w-2xl text-center">
        <div className="animate-item">
            <h2 className="text-2xl font-bold text-white sm:text-5xl">
            <span className="text-gray-600">GET IN </span>
            <span className="relative inline-block">
                TOUCH
                <span className="absolute bottom-[-10px] left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-500 to-green-400"></span>
            </span>
            </h2>
            <p className="mx-auto mt-8 max-w-md text-base text-gray-400">
            Let's start a conversation about your next project
            </p>
        </div>

        <form 
          action={mailtoLink}
          method="GET"
          target="_blank"
          className="mt-10 rounded-2xl border border-green-500/20 bg-gray-900/30 p-6 sm:p-10 animate-item delay-200"
        >
          <div className="space-y-6">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Your full name"
              icon={<UserCircleIcon />}
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              icon={<EnvelopeIcon />}
              value={formData.email}
              onChange={handleChange}
            />
            <div className="text-left">
              <label htmlFor="message" className="mb-2 flex items-center gap-2 text-base font-medium text-green-400">
                <ChatBubbleIcon />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, ideas, or just say hello..."
                className="w-full rounded-lg border border-green-500/30 bg-gray-900/50 px-5 py-4 text-base text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-green-500 px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-green-400 hover:scale-105"
          >
            <PaperAirplaneIcon />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;