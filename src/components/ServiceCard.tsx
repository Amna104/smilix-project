import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { scrollToSection } from '../animations/scroll';
import { useAppointmentModal } from '../context/AppointmentModalContext';

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  background: string;
  visualComponent: React.ComponentType<{ className?: string }>;
  imageAlt: string;
  ariaLabel: string;
}

export interface ServiceCardProps {
  service: ServiceData;
  index: number;
  cardRefCallback?: (el: HTMLDivElement | null) => void;
  visualRefCallback?: (el: HTMLDivElement | null) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  cardRefCallback,
  visualRefCallback,
}) => {
  const { openModal } = useAppointmentModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const VisualComponent = service.visualComponent;

  useEffect(() => {
    const card = cardRef.current;
    const inner = cardInnerRef.current;
    const visual = visualWrapperRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;
    const arrow = arrowRef.current;

    if (!card || !inner || !visual || !button) return;
    if (prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // High-performance GSAP quickTo setters for cursor parallax (8-12px movement)
    const xVisualTo = gsap.quickTo(visual, 'x', {
      duration: 0.45,
      ease: 'power2.out',
    });
    const yVisualTo = gsap.quickTo(visual, 'y', {
      duration: 0.45,
      ease: 'power2.out',
    });

    // Subtle 3D tilt quickTo setters (max ±2 degrees)
    const rotXTo = gsap.quickTo(inner, 'rotationX', {
      duration: 0.5,
      ease: 'power2.out',
    });
    const rotYTo = gsap.quickTo(inner, 'rotationY', {
      duration: 0.5,
      ease: 'power2.out',
    });

    const handleMouseEnter = () => {
      // 1. Card subtle luxury lift, scale & layered elevation shadow
      gsap.to(inner, {
        y: -6,
        scale: 1.02,
        boxShadow: '0 22px 40px -10px rgba(37,35,31,0.13), 0 6px 16px -3px rgba(37,35,31,0.05)',
        duration: 0.4,
        ease: 'power2.out',
      });

      // 2. Title micro-lift
      if (title) {
        gsap.to(title, {
          y: -2,
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      // 3. Image scale and lift
      gsap.to(visual, {
        scale: 1.05,
        y: -6,
        duration: 0.4,
        ease: 'power2.out',
      });

      // 4. Arrow button scale & rotation
      gsap.to(button, {
        scale: 1.08,
        rotation: 10,
        duration: 0.35,
        ease: 'back.out(1.6)',
      });

      // 5. Arrow icon diagonal nudge toward upper-right
      if (arrow) {
        gsap.to(arrow, {
          x: 2.5,
          y: -2.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;

      const rect = card.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

      // Cursor parallax: 6–8px depth offset
      xVisualTo(normX * 8);
      yVisualTo(normY * 8 - 6); // includes -6px hover lift

      // Card tilt: ±1.5 degrees max
      rotYTo(normX * 1.5);
      rotXTo(-normY * 1.5);
    };

    const handleMouseLeave = () => {
      // Reset card inner container
      gsap.to(inner, {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        boxShadow: '0 4px 20px -2px rgba(37,35,31,0.03)',
        duration: 0.5,
        ease: 'power2.out',
      });

      // Reset title
      if (title) {
        gsap.to(title, {
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        });
      }

      // Reset visual position & scale
      gsap.to(visual, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power2.out',
      });

      // Reset button & arrow
      gsap.to(button, {
        scale: 1,
        rotation: 0,
        duration: 0.45,
        ease: 'power2.out',
      });

      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (cardRefCallback) cardRefCallback(el);
      }}
      id={`service-card-${service.id}`}
      className="relative w-full [perspective:1000px] select-none"
    >
      <a
        ref={cardInnerRef}
        href="#appointment"
        onClick={(e) => {
          e.preventDefault();
          openModal({ treatment: service.title.replace(/\n/g, ' ') });
        }}
        aria-label={service.ariaLabel}
        style={{ backgroundColor: service.background }}
        className="group relative flex flex-col justify-between w-full h-[370px] sm:h-[390px] lg:h-[405px] xl:h-[415px] rounded-[20px] sm:rounded-[22px] lg:rounded-[24px] p-5 sm:p-6 lg:p-7 overflow-hidden border border-[#25231F]/8 shadow-[0_4px_20px_-2px_rgba(37,35,31,0.03)] focus:outline-none focus:ring-2 focus:ring-[#25231F] focus:ring-offset-4 will-change-transform block text-left cursor-pointer"
      >
        {/* Top Content: Large Editorial Title & Description */}
        <div className="relative z-20 flex flex-col items-start w-full">
          <h3
            ref={titleRef}
            id={`service-title-${service.id}`}
            className="font-editorial text-[28px] sm:text-[30px] lg:text-[32px] xl:text-[34px] leading-[0.96] sm:leading-[0.94] text-[#25231F] tracking-[-0.03em] font-normal whitespace-pre-line"
          >
            {service.title}
          </h3>

          <p
            id={`service-desc-${service.id}`}
            className="mt-2 sm:mt-2.5 text-[12px] sm:text-[13px] leading-[1.32] text-[#25231F]/75 font-sans font-normal max-w-[210px] sm:max-w-[230px]"
          >
            {service.description}
          </p>
        </div>

        {/* Dental Visual Container: Occupies lower half, position absolute, transparent, no rectangular background */}
        <div
          ref={(el) => {
            visualWrapperRef.current = el;
            if (visualRefCallback) visualRefCallback(el);
          }}
          id={`service-visual-${service.id}`}
          className="absolute inset-x-0 bottom-2 sm:bottom-3 lg:bottom-4 h-[165px] sm:h-[180px] lg:h-[190px] xl:h-[195px] flex items-center justify-center z-10 pointer-events-none will-change-transform"
        >
          <VisualComponent className="w-full h-full" />
        </div>

        {/* Bottom-Right: Circular Arrow Button */}
        <div
          ref={buttonRef}
          id={`service-arrow-${service.id}`}
          className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25231F] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(37,35,31,0.22)] will-change-transform cursor-pointer"
          aria-hidden="true"
        >
          <ArrowUpRight
            ref={arrowRef}
            size={18}
            strokeWidth={2.2}
            className="text-white will-change-transform"
          />
        </div>
      </a>
    </div>
  );
};

