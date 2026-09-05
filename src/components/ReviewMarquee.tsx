import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { Review } from '../data/reviews';
import { ReviewCard } from './ReviewCard';

interface ReviewTrackProps {
  id: string;
  reviews: Review[];
  direction: 'left' | 'right';
  baseDuration?: number;
  className?: string;
}

const ReviewTrack: React.FC<ReviewTrackProps> = ({
  id,
  reviews,
  direction,
  baseDuration = 45,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items to ensure uninterrupted seamless loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (prefersReducedMotion()) {
      gsap.set(track, { x: 0 });
      return;
    }

    // Set up continuous marquee animation
    // Direction 'left': moves from 0 to -33.333% (1 set of reviews width)
    // Direction 'right': moves from -33.333% to 0
    const startX = direction === 'left' ? 0 : -33.3333;
    const endX = direction === 'left' ? -33.3333 : 0;

    gsap.set(track, { xPercent: startX });

    const tween = gsap.fromTo(
      track,
      { xPercent: startX },
      {
        xPercent: endX,
        duration: baseDuration,
        ease: 'none',
        repeat: -1,
      }
    );

    tweenRef.current = tween;

    // Scroll Velocity influence:
    // Slightly speed up on scroll, smoothly returning to base speed
    const velocityTrigger = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (!tweenRef.current) return;
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 30) {
          // Calculate subtle multiplier (cap between 1 and 2.4 max to prevent erratic speed)
          const targetTimeScale = 1 + Math.min(velocity / 1400, 1.5);
          gsap.to(tweenRef.current, {
            timeScale: targetTimeScale,
            duration: 0.2,
            overwrite: 'auto',
            onComplete: () => {
              if (tweenRef.current) {
                gsap.to(tweenRef.current, {
                  timeScale: 1,
                  duration: 0.9,
                  ease: 'power2.out',
                });
              }
            },
          });
        }
      },
    });

    return () => {
      velocityTrigger.kill();
      tween.kill();
    };
  }, [direction, baseDuration]);

  // Adjust timeScale on hover: gently slow down to 0.2 instead of abrupt halting
  useEffect(() => {
    if (!tweenRef.current || prefersReducedMotion()) return;

    gsap.to(tweenRef.current, {
      timeScale: isHovered ? 0.2 : 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [isHovered]);

  return (
    <div
      id={id}
      className={`relative w-full overflow-hidden select-none py-2 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 w-max will-change-transform transform-gpu"
      >
        {duplicatedReviews.map((review, idx) => (
          <ReviewCard
            key={`${review.id}-${idx}`}
            review={review}
            onHoverStateChange={setIsHovered}
          />
        ))}
      </div>
    </div>
  );
};

export interface ReviewMarqueeProps {
  row1Reviews: Review[];
  row2Reviews: Review[];
}

export const ReviewMarquee: React.FC<ReviewMarqueeProps> = ({
  row1Reviews,
  row2Reviews,
}) => {
  return (
    <div className="relative w-full flex flex-col gap-5 sm:gap-7 overflow-hidden">
      {/* Subtle edge fade gradients for editorial elegance */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 lg:w-32 bg-gradient-to-r from-[#F7F6F1] to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 lg:w-32 bg-gradient-to-l from-[#F7F6F1] to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Row 1: Moves Right to Left (or Left to Right as requested) */}
      <ReviewTrack
        id="reviews-track-row-1"
        reviews={row1Reviews}
        direction="left"
        baseDuration={46}
      />

      {/* Row 2: Moves in opposite direction (Left to Right) */}
      <ReviewTrack
        id="reviews-track-row-2"
        reviews={row2Reviews}
        direction="right"
        baseDuration={50}
      />
    </div>
  );
};
