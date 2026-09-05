import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';

export interface MagneticCTAButtonProps {
  text?: string;
  href?: string;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MagneticCTAButton: React.FC<MagneticCTAButtonProps> = ({
  text = 'BOOK AN APPOINTMENT',
  href = '#appointment',
  className = '',
  id = 'cta-primary-button',
  onClick,
}) => {
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const arrowCircleRef = useRef<HTMLDivElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrapper = buttonWrapperRef.current;
    const btn = buttonRef.current;
    const arrowCircle = arrowCircleRef.current;
    const arrowIcon = arrowIconRef.current;

    if (!wrapper || !btn || prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // QuickTo for magnetic attraction
    const btnXTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
    const btnYTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });
    const arrowXTo = arrowCircle
      ? gsap.quickTo(arrowCircle, 'x', { duration: 0.3, ease: 'power2.out' })
      : null;
    const arrowYTo = arrowCircle
      ? gsap.quickTo(arrowCircle, 'y', { duration: 0.3, ease: 'power2.out' })
      : null;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        y: -4,
        scale: 1.02,
        boxShadow: '0 20px 35px -8px rgba(37, 35, 31, 0.32)',
        duration: 0.35,
        ease: 'power2.out',
      });

      if (arrowCircle) {
        gsap.to(arrowCircle, {
          scale: 1.06,
          rotation: 8,
          duration: 0.35,
          ease: 'back.out(1.5)',
        });
      }

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          x: 3,
          y: -3,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.hypot(deltaX, deltaY);

      // Magnetic range: 120px
      if (dist < 120) {
        const factor = (1 - dist / 120) * 7; // up to 7px magnetic shift
        const angle = Math.atan2(deltaY, deltaX);
        const moveX = Math.cos(angle) * factor;
        const moveY = Math.sin(angle) * factor - 4; // combine with hover lift

        btnXTo(moveX);
        btnYTo(moveY);

        if (arrowXTo && arrowYTo) {
          arrowXTo(moveX * 1.3);
          arrowYTo((moveY + 4) * 1.3);
        }
      } else {
        btnXTo(0);
        btnYTo(-4);
        if (arrowXTo && arrowYTo) {
          arrowXTo(0);
          arrowYTo(0);
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: '0 8px 24px -4px rgba(37, 35, 31, 0.22)',
        duration: 0.45,
        ease: 'power2.out',
      });

      if (arrowCircle) {
        gsap.to(arrowCircle, {
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        });
      }

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      btnXTo(0);
      btnYTo(0);
      if (arrowXTo && arrowYTo) {
        arrowXTo(0);
        arrowYTo(0);
      }
    };

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={buttonWrapperRef}
      className={`inline-block w-full sm:w-auto p-1 select-none ${className}`}
    >
      <a
        ref={buttonRef}
        id={id}
        href={href}
        onClick={onClick}
        aria-label="Book an appointment at Smilix"
        className="group relative inline-flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto h-[54px] sm:h-[58px] px-6 sm:px-7 rounded-full bg-[#25231F] text-[#F7F6F1] font-sans text-[12.5px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase shadow-[0_8px_24px_-4px_rgba(37,35,31,0.22)] focus:outline-none focus:ring-2 focus:ring-[#25231F] focus:ring-offset-4 focus:ring-offset-[#AFCBE8] will-change-transform transform-gpu"
      >
        <span>{text}</span>

        {/* Circular Arrow Area */}
        <div
          ref={arrowCircleRef}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#F7F6F1] will-change-transform"
          aria-hidden="true"
        >
          <ArrowUpRight
            ref={arrowIconRef}
            size={17}
            strokeWidth={2.4}
            className="will-change-transform"
          />
        </div>
      </a>
    </div>
  );
};
