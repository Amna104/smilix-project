import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { DOCTORS_DATA } from '../data/doctors';
import { DoctorCarousel } from '../components/DoctorCarousel';

export const Doctors: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageElementsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const heading = headingRef.current;
    const textCol = textColRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      // 1. Reduced motion check
      if (prefersReducedMotion()) {
        gsap.set([badge, heading, textCol], { opacity: 1, y: 0 });
        gsap.set(cardElementsRef.current.filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // 2. Section Header Reveal Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      if (badge) {
        headerTl.fromTo(
          badge,
          { opacity: 0, y: 18, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
        );
      }

      headerTl.fromTo(
        heading,
        { opacity: 0, y: 35, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
        badge ? '-=0.45' : 0
      );

      if (textCol) {
        headerTl.fromTo(
          textCol,
          { opacity: 0, y: 30, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '-=0.65'
        );
      }

      // 3. Staggered Doctor Cards Reveal
      const validCards = cardElementsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 55,
            scale: 0.97,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: validCards[0],
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Subtle Editorial Scroll Parallax on Portrait Images
      const validImages = imageElementsRef.current.filter(Boolean);
      validImages.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: -16 },
          {
            y: 16,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      aria-labelledby="doctors-section-heading"
      className="relative w-full bg-[#F7F6F1] pt-[80px] pb-[90px] lg:pt-[120px] lg:pb-[140px] overflow-hidden"
    >
      {/* Extremely subtle editorial background decoration: low-opacity organic curved line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          className="absolute -right-20 top-1/4 w-[650px] h-[650px] stroke-[#25231F]/[0.035] fill-none"
          viewBox="0 0 500 500"
        >
          <circle
            cx="250"
            cy="250"
            r="210"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M 50 350 C 180 200, 320 400, 450 180"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Layout: Desktop 2-column (Left: Badge + Heading, Right: Paragraph + Text Link) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column: Section Label Badge & Main Editorial Heading */}
          <div className="flex flex-col items-start max-w-[800px]">
            {/* Trust Detail / Section Label Badge */}
            <div
              ref={badgeRef}
              id="doctors-badge"
              className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3.5 py-1.5 rounded-full bg-[#25231F]/5 border border-[#25231F]/10 text-[#25231F]/75 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.15em] uppercase select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25231F]/60" />
              OUR TEAM
            </div>

            {/* Main Heading */}
            <h2
              ref={headingRef}
              id="doctors-section-heading"
              className="font-editorial text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] xl:text-[84px] leading-[0.95] sm:leading-[0.92] text-[#25231F] font-normal tracking-[-0.03em]"
            >
              Discover Our Team of<br />
              <span className="italic font-normal">Dental Experts</span>
            </h2>
          </div>

          {/* Right Column: Supporting Paragraph & Animate-on-Hover Text Link */}
          <div
            ref={textColRef}
            id="doctors-header-desc"
            className="flex flex-col items-start lg:items-start max-w-[420px] lg:pb-2"
          >
            <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#25231F]/80 font-normal">
              Meet the people behind every confident smile. Our experienced team
              combines clinical expertise with thoughtful, personalized care.
            </p>

            <a
              href="#appointment"
              id="doctors-full-team-link"
              className="group inline-flex items-center gap-1.5 mt-5 sm:mt-6 font-sans text-[14px] sm:text-[15px] font-medium text-[#25231F] hover:text-[#25231F]/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25231F] focus-visible:ring-offset-2 rounded-sm"
              aria-label="Meet the full Smilix dental team"
            >
              <span>Meet the full team</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Doctor Profiles: Horizontally scrollable carousel on mobile/tablet, 4-column grid on desktop */}
        <DoctorCarousel
          doctors={DOCTORS_DATA}
          cardRefsCallback={(index, el) => {
            cardElementsRef.current[index] = el;
          }}
          imageRefsCallback={(index, el) => {
            imageElementsRef.current[index] = el;
          }}
        />
      </div>
    </section>
  );
};
