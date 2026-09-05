import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { Doctor } from '../data/doctors';
import { useAppointmentModal } from '../context/AppointmentModalContext';

export interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  className?: string;
  cardRefCallback?: (el: HTMLDivElement | null) => void;
  imageRefCallback?: (el: HTMLImageElement | null) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  index,
  className = '',
  cardRefCallback,
  imageRefCallback,
}) => {
  const { openModal } = useAppointmentModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLAnchorElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = cardInnerRef.current;
    const imgWrapper = imgWrapperRef.current;
    const img = imgRef.current;
    const info = infoRef.current;
    const button = buttonRef.current;
    const arrow = arrowRef.current;
    const overlay = overlayRef.current;

    if (!card || !inner || !img || !info || !button) return;
    if (prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // High performance cursor parallax via gsap.quickTo (shifts image 5-10px)
    const xImgTo = gsap.quickTo(img, 'x', {
      duration: 0.45,
      ease: 'power2.out',
    });
    const yImgTo = gsap.quickTo(img, 'y', {
      duration: 0.45,
      ease: 'power2.out',
    });

    const handleMouseEnter = () => {
      // 1. Card lift & luxury shadow
      gsap.to(inner, {
        y: -8,
        boxShadow: '0 24px 44px -10px rgba(37,35,31,0.20)',
        duration: 0.45,
        ease: 'power2.out',
      });

      // 2. Image gentle zoom (1.05)
      gsap.to(img, {
        scale: 1.05,
        duration: 0.55,
        ease: 'power2.out',
      });

      // 3. Subtle overlay intensification
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.96,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // 4. Doctor info moves upward 5-8px
      gsap.to(info, {
        y: -6,
        duration: 0.4,
        ease: 'power2.out',
      });

      // 5. Arrow button scale & diagonal arrow movement
      gsap.to(button, {
        scale: 1.08,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        duration: 0.35,
        ease: 'power2.out',
      });

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
      // Normalized from -1 to 1
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Image follows cursor: 6-8px movement
      xImgTo(normX * 8);
      yImgTo(normY * 8);
    };

    const handleMouseLeave = () => {
      // Reset card elevation
      gsap.to(inner, {
        y: 0,
        boxShadow: '0 8px 24px -6px rgba(37,35,31,0.08)',
        duration: 0.5,
        ease: 'power2.out',
      });

      // Reset image scale & cursor offset
      gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      });

      // Reset overlay
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.85,
          duration: 0.45,
          ease: 'power2.out',
        });
      }

      // Reset info position
      gsap.to(info, {
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      });

      // Reset button & arrow
      gsap.to(button, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.22)',
        duration: 0.4,
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
      id={`doctor-card-${doctor.id}`}
      className={`relative select-none ${className}`}
    >
      <a
        ref={cardInnerRef}
        href="#appointment"
        onClick={(e) => {
          e.preventDefault();
          openModal({ doctor: doctor.name });
        }}
        aria-label={doctor.ariaLabel}
        className="group relative block w-full h-[470px] sm:h-[490px] lg:h-[510px] xl:h-[530px] rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] overflow-hidden bg-[#EAE8DE] border border-[#25231F]/10 shadow-[0_8px_24px_-6px_rgba(37,35,31,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25231F] focus-visible:ring-offset-4 will-change-transform"
      >
        {/* Full Card Portrait Image with overflow hidden container */}
        <div
          ref={imgWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden bg-[#E2DFD2]"
        >
          <img
            ref={(el) => {
              imgRef.current = el;
              if (imageRefCallback) imageRefCallback(el);
            }}
            src={doctor.image}
            alt={doctor.alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-[112%] -top-[6%] relative object-cover object-center will-change-transform transform-gpu scale-100"
          />
        </div>

        {/* Nuanced Editorial Bottom Gradient Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/90 via-[#1C1A17]/45 via-45% to-transparent opacity-85 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container (Pinned to Bottom) */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex items-end justify-between gap-3">
          {/* Left: Doctor Name & Specialty */}
          <div
            ref={infoRef}
            id={`doctor-info-${doctor.id}`}
            className="flex flex-col items-start will-change-transform"
          >
            <h3
              id={`doctor-name-${doctor.id}`}
              className="font-editorial text-[24px] sm:text-[26px] lg:text-[27px] font-normal leading-[1.08] text-white tracking-[-0.015em]"
            >
              {doctor.name}
            </h3>

            <p
              id={`doctor-specialty-${doctor.id}`}
              className="mt-1.5 sm:mt-2 font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.1em] uppercase text-white/85"
            >
              {doctor.specialty}
            </p>
          </div>

          {/* Right: Small Frosted Circular Arrow Indicator */}
          <div
            ref={buttonRef}
            id={`doctor-arrow-btn-${doctor.id}`}
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] will-change-transform flex-shrink-0"
          >
            <ArrowUpRight
              ref={arrowRef}
              size={18}
              strokeWidth={2.2}
              className="text-white will-change-transform"
            />
          </div>
        </div>
      </a>
    </div>
  );
};
