import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { MagneticCTAButton } from '../components/MagneticCTAButton';
import { CTAVisual } from '../components/CTAVisual';
import { useAppointmentModal } from '../context/AppointmentModalContext';

export const AppointmentCTA: React.FC = () => {
  const { openModal } = useAppointmentModal();
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const secondaryLinkRef = useRef<HTMLAnchorElement>(null);

  const visualElementsRef = useRef<{
    mainImage: HTMLDivElement | null;
    badge: HTMLDivElement | null;
    patientCard: HTMLDivElement | null;
  }>({
    mainImage: null,
    badge: null,
    patientCard: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const desc = descRef.current;
    const ctaBtns = ctaButtonsRef.current;

    if (!container || !panel || !headline) return;

    const ctx = gsap.context(() => {
      const { mainImage, badge, patientCard } = visualElementsRef.current;

      // 1. Reduced motion handling
      if (prefersReducedMotion()) {
        gsap.set(
          [
            panel,
            label,
            headline,
            desc,
            ctaBtns,
            mainImage,
            badge,
            patientCard,
          ].filter(Boolean),
          { opacity: 1, scale: 1, y: 0, rotation: 0 }
        );
        return;
      }

      // 2. ScrollTrigger Entrance Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Panel expands in
      tl.fromTo(
        panel,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }
      );

      // Label fades in
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // Headline reveals
      tl.fromTo(
        headline,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.45'
      );

      // Description
      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.65'
        );
      }

      // CTA Buttons group
      if (ctaBtns) {
        tl.fromTo(
          ctaBtns,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // Visual Main Image
      if (mainImage) {
        tl.fromTo(
          mainImage,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)' },
          '-=0.75'
        );
      }

      // Visual Badge
      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, scale: 0.7, rotation: -8 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.6)' },
          '-=0.65'
        );
      }

      // Visual Patient Card
      if (patientCard) {
        tl.fromTo(
          patientCard,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      // Subtle parallax scrub for CTA visual poster
      if (mainImage) {
        gsap.to(mainImage, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="appointment"
      aria-labelledby="cta-section-heading"
      className="relative w-full bg-[#F7F6F1] px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-14 lg:py-20 overflow-hidden"
    >
      {/* 
        The Large Pastel Blue Container:
        - Background: #AFCBE8
        - Border radius: 28–36px desktop, 22–26px mobile
        - Large editorial poster feel
      */}
      <div
        ref={panelRef}
        id="cta-panel"
        className="relative w-full max-w-[1400px] mx-auto bg-[#AFCBE8] text-[#25231F] rounded-[22px] sm:rounded-[26px] md:rounded-[30px] lg:rounded-[34px] xl:rounded-[36px] px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden shadow-[0_20px_50px_-15px_rgba(37,35,31,0.14)] border border-[#25231F]/10 will-change-transform"
      >
        {/* Subtle Ambient Background Nuance */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Subtle soft white radial highlight */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-white/15 blur-3xl" />
        </div>

        {/* 2-Column Responsive Layout: Left Text / Right Visual Composition */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Heading, Supporting Copy, CTAs (lg: 7 cols or 6.5 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left max-w-[640px]">
            {/* Small Section Label */}
            <div
              ref={labelRef}
              id="cta-section-label"
              className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3.5 py-1.5 rounded-full bg-[#25231F]/[0.06] border border-[#25231F]/10 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.15em] uppercase text-[#25231F]/80 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25231F]" />
              YOUR SMILE STARTS HERE
            </div>

            {/* Large Dominant Headline: "Ready for your\nbest smile yet?" */}
            <h2
              ref={headlineRef}
              id="cta-section-heading"
              className="font-editorial text-[48px] sm:text-[62px] md:text-[75px] lg:text-[84px] xl:text-[96px] leading-[0.91] text-[#25231F] font-normal tracking-[-0.035em] whitespace-pre-line mb-6 sm:mb-7"
            >
              Ready for your<br />
              <span className="italic font-normal">best smile</span> yet?
            </h2>

            {/* Supporting Copy */}
            <p
              ref={descRef}
              id="cta-supporting-text"
              className="font-sans text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.55] text-[#25231F]/80 font-normal max-w-[430px] mb-8 sm:mb-10"
            >
              Thoughtful dental care, modern treatments, and a team that puts
              your comfort first.
            </p>

            {/* CTA Group: Primary Pill Button & Secondary Link */}
            <div
              ref={ctaButtonsRef}
              id="cta-actions-group"
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {/* Primary CTA: Magnetic Book an Appointment */}
              <MagneticCTAButton
                id="cta-appointment-primary-btn"
                text="BOOK AN APPOINTMENT"
                href="#appointment"
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              />

              {/* Secondary CTA: Animated Underline link */}
              <a
                ref={secondaryLinkRef}
                id="cta-secondary-link"
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 text-[14px] sm:text-[14.5px] font-sans font-medium text-[#25231F] py-2 focus:outline-none focus:ring-2 focus:ring-[#25231F] rounded-sm transition-colors duration-200 self-start sm:self-center"
              >
                <span>Have a question? Talk to our team</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                {/* Underline animating from left to right on hover */}
                <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#25231F] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* Right Column: Layered Artistic Smile/Dental Visual Composition (lg: 5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full pt-4 lg:pt-0">
            <CTAVisual
              onElementsReady={(elements) => {
                visualElementsRef.current = elements;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
