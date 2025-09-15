import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, MessageCircle, Send } from 'lucide-react';

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
    <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-green-400">
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
      className="w-full rounded-lg border border-green-500/30 bg-gray-900/50 px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
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
    <section ref={sectionRef} className={`flex min-h-[70vh] items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="w-full max-w-lg text-center -mt-6">
        <div className="animate-item">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            <span className="text-gray-600">GET IN </span>
            <span className="relative inline-block">
                TOUCH
                <span className="absolute bottom-[-6px] sm:bottom-[-8px] left-1/2 h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-500 to-green-400"></span>
            </span>
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-sm text-sm sm:text-base text-gray-400">
            Let's start a conversation about your next project
            </p>
        </div>

        <div className="mt-6 sm:mt-8 rounded-2xl border border-green-500/20 bg-gray-900/30 p-4 sm:p-6 animate-item delay-200">
          <div className="space-y-4 sm:space-y-5">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Your full name"
              icon={<User className="w-4 h-4" />}
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email}
              onChange={handleChange}
            />
            <div className="text-left">
              <label htmlFor="message" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-green-400">
                <MessageCircle className="w-4 h-4" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, ideas, or just say hello..."
                className="w-full rounded-lg border border-green-500/30 bg-gray-900/50 px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 resize-none"
              ></textarea>
            </div>
          </div>
          <button
            onClick={() => window.open(mailtoLink, '_blank')}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-green-400 hover:scale-105"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;