import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { Review } from '../data/reviews';

export interface ReviewCardProps {
  review: Review;
  className?: string;
  onHoverStateChange?: (isHovered: boolean) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className = '',
  onHoverStateChange,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const quote = quoteRef.current;
    const avatar = avatarRef.current;

    if (!card || prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // QuickTo for avatar subtle parallax (3-5px)
    const avatarXTo = avatar
      ? gsap.quickTo(avatar, 'x', { duration: 0.35, ease: 'power2.out' })
      : null;
    const avatarYTo = avatar
      ? gsap.quickTo(avatar, 'y', { duration: 0.35, ease: 'power2.out' })
      : null;

    const handleMouseEnter = () => {
      onHoverStateChange?.(true);

      // Card elevation
      gsap.to(card, {
        y: -7,
        boxShadow: '0 20px 36px -10px rgba(37, 35, 31, 0.18)',
        duration: 0.35,
        ease: 'power2.out',
      });

      // Subtle quote mark shift
      if (quote) {
        gsap.to(quote, {
          x: 2,
          y: -2,
          opacity: 0.45,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || !avatarXTo || !avatarYTo) return;
      const rect = card.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      avatarXTo(normX * 4);
      avatarYTo(normY * 4);
    };

    const handleMouseLeave = () => {
      onHoverStateChange?.(false);

      gsap.to(card, {
        y: 0,
        boxShadow: '0 8px 22px -6px rgba(37, 35, 31, 0.10)',
        duration: 0.45,
        ease: 'power2.out',
      });

      if (quote) {
        gsap.to(quote, {
          x: 0,
          y: 0,
          opacity: 0.3,
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      if (avatarXTo && avatarYTo) {
        avatarXTo(0);
        avatarYTo(0);
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
  }, [onHoverStateChange]);

  return (
    <div
      ref={cardRef}
      id={`review-card-${review.id}`}
      style={{ backgroundColor: review.background }}
      className={`relative flex flex-col justify-between w-[80vw] max-w-[340px] sm:w-[360px] md:w-[390px] lg:w-[410px] h-[290px] sm:h-[310px] lg:h-[325px] rounded-[22px] sm:rounded-[24px] p-6 sm:p-7 lg:p-8 flex-shrink-0 border border-[#25231F]/[0.07] shadow-[0_8px_22px_-6px_rgba(37,35,31,0.10)] will-change-transform select-none cursor-default text-left overflow-hidden ${className}`}
    >
      {/* Upper-left large subtle quotation mark */}
      <span
        ref={quoteRef}
        aria-hidden="true"
        className="absolute top-2 left-5 sm:left-6 font-editorial text-[72px] sm:text-[84px] leading-none text-[#25231F] opacity-30 select-none pointer-events-none will-change-transform"
      >
        “
      </span>

      {/* Star Rating in upper area */}
      <div className="relative z-10 flex items-center gap-1.5 pt-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-[#25231F] fill-[#25231F]/90"
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Review Text */}
      <blockquote className="relative z-10 my-auto pt-2 pb-1">
        <p className="font-editorial text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.32] text-[#25231F] font-normal tracking-[-0.015em]">
          "{review.quote}"
        </p>
      </blockquote>

      {/* Patient Avatar, Name & Treatment */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-3 border-t border-[#25231F]/10">
        <div className="flex items-center gap-3">
          {/* Subtle circular avatar */}
          <div
            ref={avatarRef}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#25231F]/15 bg-white/40 flex-shrink-0 shadow-sm will-change-transform"
          >
            <img
              src={review.avatar}
              alt={`Portrait of ${review.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-sans font-medium text-[13.5px] sm:text-[14px] text-[#25231F] leading-snug">
              {review.name}
            </span>
            <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-[#25231F]/70">
              {review.treatment}
            </span>
          </div>
        </div>

        {/* Small verified tag */}
        <span className="font-sans text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full bg-[#25231F]/[0.06] text-[#25231F]/60 font-medium hidden sm:inline-block">
          Verified Patient
        </span>
      </div>
    </div>
  );
};
