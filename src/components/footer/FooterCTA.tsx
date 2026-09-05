import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../animations/gsap';
import { scrollToSection } from '../../animations/scroll';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export interface FooterCTAProps {
  onRefReady?: (el: HTMLDivElement | null) => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ onRefReady }) => {
  const { openModal } = useAppointmentModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (onRefReady) {
      onRefReady(containerRef.current);
    }
  }, [onRefReady]);

  useEffect(() => {
    const btn = buttonRef.current;
    const arrow = arrowRef.current;
    if (!btn || prefersReducedMotion()) return;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        y: -4,
        scale: 1.03,
        boxShadow: '0 16px 32px -6px rgba(255, 249, 154, 0.28)',
        duration: 0.35,
        ease: 'power2.out',
      });
      if (arrow) {
        gsap.to(arrow, {
          x: 3,
          y: -3,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 18px -2px rgba(255, 249, 154, 0.12)',
        duration: 0.4,
        ease: 'power2.out',
      });
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div
      ref={containerRef}
      id="footer-cta-block"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-white/[0.04] border border-white/10 backdrop-blur-sm"
    >
      <div className="flex flex-col space-y-1">
        <h4 className="font-editorial text-[26px] sm:text-[32px] text-[#F7F6F1] font-normal tracking-tight">
          Ready to smile with confidence?
        </h4>
        <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#F7F6F1]/70 font-normal">
          Book your personalized consultation with our care team today.
        </p>
      </div>

      <a
        ref={buttonRef}
        id="footer-appointment-button"
        href="#appointment"
        onClick={handleClick}
        aria-label="Book an appointment at Smilix dental studio"
        className="group relative inline-flex items-center justify-center gap-3 h-[52px] sm:h-[56px] px-7 rounded-full bg-[#FFF99A] text-[#25231F] font-sans text-[12.5px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase shadow-[0_4px_18px_-2px_rgba(255,249,154,0.12)] focus:outline-none focus:ring-2 focus:ring-[#FFF99A] focus:ring-offset-4 focus:ring-offset-[#25231F] will-change-transform transform-gpu flex-shrink-0 cursor-pointer"
      >
        <span>BOOK AN APPOINTMENT</span>
        <div
          className="w-7 h-7 rounded-full bg-[#25231F]/10 flex items-center justify-center text-[#25231F]"
          aria-hidden="true"
        >
          <ArrowUpRight
            ref={arrowRef}
            size={16}
            strokeWidth={2.4}
            className="will-change-transform"
          />
        </div>
      </a>
    </div>
  );
};
