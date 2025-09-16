import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, MessageCircle, Send } from 'lucide-react';

/*
  ContactForm.tsx
  - Replace FORMSPREE_ENDPOINT with your Formspree endpoint (e.g. https://formspree.io/f/your-id)
  - If you leave FORMSPREE_ENDPOINT empty (""), the component falls back to opening a mailto: link.
*/

const FORMSPREE_ENDPOINT = "https://formspree.io/f/movnzonr"; // <-- replace this

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
    <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-teal-400">
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
      className="w-full rounded-lg border border-teal-500/30 bg-gray-900/50 px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
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

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
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
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const recipientEmail = 'johnfelizco13@gmail.com';
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    `New message from ${formData.name || 'Website visitor'}`
  )}&body=${encodeURIComponent(formData.message + `\n\nFrom: ${formData.email}`)}`;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If no Formspree endpoint configured, fallback to mailto
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      // open mail client as fallback
      window.open(mailtoLink, '_blank');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Formspree sometimes returns 422 for validation errors
        const payload = await res.json().catch(() => ({}));
        console.error('Formspree error', payload);
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className={`flex min-h-[90vh] items-start justify-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 md:px-8 md:pt-8 md:pb-6 animate-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="w-full max-w-lg text-center mb-2">
        <div className="animate-item">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            <span className="text-gray-600">GET IN </span>
            <span className="relative inline-block">
              TOUCH
              <span className="absolute bottom-[-6px] sm:bottom-[-8px] left-1/2 h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></span>
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-sm text-sm sm:text-base text-gray-400">
            Let's start a conversation about your next project
          </p>
        </div>

  <form onSubmit={handleSubmit} className="mt-2 sm:mt-4 rounded-2xl border border-teal-500/20 bg-gray-900/30 p-4 sm:p-6 animate-item delay-200">
          <div className="space-y-4 sm:space-y-5">
            <InputField
              id="name"
              label="Name"
              type="text"
              placeholder="Your full name"
              icon={<User className="w-4 h-4" />}
              value={formData.name}
              onChange={handleChange as unknown as (e: React.ChangeEvent<HTMLInputElement>) => void}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email}
              onChange={handleChange as unknown as (e: React.ChangeEvent<HTMLInputElement>) => void}
            />

            <div className="text-left">
              <label htmlFor="message" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-teal-400">
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
                className="w-full rounded-lg border border-teal-500/30 bg-gray-900/50 px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 transition-colors duration-300 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 resize-none"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            aria-disabled={status === 'sending'}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 ${
              status === 'sending'
                ? 'bg-teal-400/60 cursor-wait'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30'
            }`}
          >
            <Send className="w-4 h-4" />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          <div className="mt-3 min-h-[1.25rem] text-sm" aria-live="polite">
            {status === 'success' && <p className="text-green-400">Message sent — I will get back to you soon.</p>}
            {status === 'error' && <p className="text-rose-400">Something went wrong. Try again or use your email client.</p>}
          </div>

          <div className="mt-3 text-xs text-gray-500">{!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID') ? 'Formspree not configured — will open your email client as a fallback.' : 'Sending via Formspree.'}</div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
