import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

export const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <div
      id="footer-smile-notes"
      className="flex flex-col space-y-3 max-w-md w-full"
    >
      <div className="space-y-1">
        <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#FFF99A]">
          SMILE NOTES
        </span>
        <p className="font-sans text-[13.5px] sm:text-[14px] text-[#F7F6F1]/70 leading-relaxed font-normal">
          Simple tips, treatment insights, and dental care advice — occasionally.
        </p>
      </div>

      {isSubmitted ? (
        <div className="flex items-center gap-2 text-[#FFF99A] text-[13.5px] font-sans py-2 animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-[#FFF99A]/20 flex items-center justify-center">
            <Check size={13} strokeWidth={2.5} />
          </div>
          <span>Welcome to Smile Notes. Thank you for connecting.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative mt-2">
          <div className="relative flex items-center border-b border-white/20 focus-within:border-[#FFF99A] transition-colors duration-200 pb-1.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address for Smile Notes newsletter"
              className="w-full bg-transparent text-[#F7F6F1] placeholder:text-[#F7F6F1]/40 font-sans text-[14px] sm:text-[14.5px] focus:outline-none pr-16 py-1"
            />
            <button
              type="submit"
              aria-label="Subscribe to Smile Notes"
              className="absolute right-0 group inline-flex items-center gap-1 font-sans text-[11.5px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase text-[#FFF99A] hover:text-white transition-colors duration-200 py-1"
            >
              <span>JOIN</span>
              <ArrowUpRight
                size={13}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
