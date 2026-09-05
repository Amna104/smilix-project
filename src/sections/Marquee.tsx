import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';

const TREATMENT_ITEMS = [
  'Cleaning',
  'Invisalign',
  'Root Canals',
  'Crowns',
  'Comprehensive Cleaning',
  'Whitening',
  'Braces',
  'Dental Implants',
];

export const Marquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Subtle entrance reveal on scroll into view
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Calculate seamless loop duration based on pixel width to maintain ~35-45px/s
      const halfWidth = track.scrollWidth / 2;
      const targetSpeed = 40; // px per second
      const duration = Math.max(30, halfWidth / targetSpeed);

      // Create continuous infinite horizontal tween
      const loopTween = gsap.to(track, {
        x: -halfWidth,
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const parsed = parseFloat(x);
            // Seamless wrap-around modulo halfWidth
            return parsed % halfWidth;
          }),
        },
      });

      // Subtle scroll velocity interaction
      let velocityTween: gsap.core.Tween | null = null;
      const velocityClamp = gsap.utils.clamp(1, 2.4);

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (isHoveredRef.current) return;
          const vel = Math.abs(self.getVelocity());
          if (vel > 20) {
            const boost = velocityClamp(1 + vel / 1400);
            velocityTween?.kill();
            velocityTween = gsap.to(loopTween, {
              timeScale: boost,
              duration: 0.2,
              ease: 'power1.out',
              overwrite: 'auto',
              onComplete: () => {
                if (!isHoveredRef.current) {
                  gsap.to(loopTween, {
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

      // Hover interaction helpers
      const handleMouseEnter = () => {
        isHoveredRef.current = true;
        velocityTween?.kill();
        // Slow down smoothly, do not stop completely
        gsap.to(loopTween, {
          timeScale: 0.45,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(track, {
          opacity: 0.8,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        isHoveredRef.current = false;
        // Return to normal speed smoothly
        gsap.to(loopTween, {
          timeScale: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
        gsap.to(track, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
        loopTween.kill();
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate repeated items list to ensure seamless coverage on any screen size
  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex shrink-0 items-center select-none">
      {TREATMENT_ITEMS.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className="font-editorial text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-[#25231F] font-normal tracking-[-0.01em] whitespace-nowrap transition-colors">
            {item}
          </span>
          <span
            className="font-sans text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-[#25231F]/40 font-light mx-6 sm:mx-8 md:mx-10 select-none"
            aria-hidden="true"
          >
            +
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="treatment-marquee"
      aria-label="Treatments and Specialties Marquee"
      className="relative z-10 w-full bg-[#F7F6F1] border-y border-[#25231F]/10 overflow-hidden h-[72px] sm:h-[82px] lg:h-[88px] flex items-center cursor-default"
    >
      <div
        ref={trackRef}
        className="flex shrink-0 items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Render 4 repeated sets so half-width wraps seamlessly across any viewport width */}
        {renderItemSet('set-1')}
        {renderItemSet('set-2')}
        {renderItemSet('set-3')}
        {renderItemSet('set-4')}
      </div>
    </section>
  );
};
