import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { HeroSocialProof } from './HeroSocialProof';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { scrollToSection } from '../animations/scroll';
import { useAppointmentModal } from '../context/AppointmentModalContext';

export const Hero: React.FC = () => {
  const { openModal } = useAppointmentModal();
  const heroSectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);

  // CTA button refs for GSAP micro-interaction
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const arrowCircleRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);

  // Refs for visual elements passed down to sync entrance timeline
  const dentistRef = useRef<HTMLDivElement>(null);
  const treatmentRef = useRef<HTMLDivElement>(null);
  const patientRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // 1. GSAP Page-load entrance orchestration
  useEffect(() => {
    const isReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (isReduced) {
        return;
      }

      // Smooth entrance timeline with explicit fromTo and clearProps
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.05,
        onComplete: () => {
          // Guarantee all elements cleanly retain 100% normal CSS visibility
          if (headlineRef.current) gsap.set(headlineRef.current, { clearProps: 'opacity,transform' });
          if (descRef.current) gsap.set(descRef.current, { clearProps: 'opacity,transform' });
          if (ctaGroupRef.current) gsap.set(ctaGroupRef.current, { clearProps: 'opacity,transform' });
          if (socialProofRef.current) gsap.set(socialProofRef.current, { clearProps: 'opacity,transform' });
          if (patientRef.current) gsap.set(patientRef.current, { clearProps: 'opacity,transform' });
          if (dentistRef.current) gsap.set(dentistRef.current, { clearProps: 'opacity,transform' });
          if (treatmentRef.current) gsap.set(treatmentRef.current, { clearProps: 'opacity,transform' });
          if (badgeRef.current) gsap.set(badgeRef.current, { clearProps: 'opacity,transform' });
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.45'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.4'
        )
        .fromTo(
          socialProofRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.35'
        )
        .fromTo(
          patientRef.current,
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(1.1)' },
          '-=0.45'
        )
        .fromTo(
          dentistRef.current,
          { opacity: 0, scale: 0.88, y: -16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.3)' },
          '-=0.45'
        )
        .fromTo(
          treatmentRef.current,
          { opacity: 0, scale: 0.9, x: -16 },
          { opacity: 1, scale: 1, x: 0, duration: 0.65, ease: 'back.out(1.15)' },
          '-=0.45'
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.85, rotate: -6 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.4'
        );

      // Hero scroll physics as user scrolls away:
      // hero content: opacity 1 -> 0.75, translateY 0 -> -30px
      // hero visual: translateY 0 -> -40px, scale 1 -> 0.97
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          opacity: 0.75,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: -40,
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // Refresh ScrollTrigger so layout calculations are accurate on load
      ScrollTrigger.refresh();
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // CTA Button hover interactions
  const handleCtaMouseEnter = () => {
    if (prefersReducedMotion()) return;

    if (ctaBtnRef.current) {
      gsap.to(ctaBtnRef.current, {
        y: -2,
        scale: 1.02,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
    if (arrowCircleRef.current) {
      gsap.to(arrowCircleRef.current, {
        scale: 1.08,
        duration: 0.25,
        ease: 'power1.out',
      });
    }
    if (arrowIconRef.current) {
      gsap.to(arrowIconRef.current, {
        x: 3,
        duration: 0.25,
        ease: 'back.out(2)',
      });
    }
  };

  const handleCtaMouseLeave = () => {
    if (prefersReducedMotion()) return;

    if (ctaBtnRef.current) {
      gsap.to(ctaBtnRef.current, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
    if (arrowCircleRef.current) {
      gsap.to(arrowCircleRef.current, {
        scale: 1,
        duration: 0.25,
        ease: 'power1.out',
      });
    }
    if (arrowIconRef.current) {
      gsap.to(arrowIconRef.current, {
        x: 0,
        duration: 0.25,
        ease: 'power1.out',
      });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-10 w-full pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto"
    >
      {/* Framed Editorial Pastel Yellow Hero Card (as shown in reference image) */}
      <div className="relative w-full bg-[#FAF198] rounded-[22px] sm:rounded-[30px] md:rounded-[36px] px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14 overflow-hidden border border-[#25231F]/5 shadow-[0_10px_32px_rgba(37,35,31,0.03)]">
        {/* Subtle organic background ambient accents */}
        <div
          className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/20 blur-3xl pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* 50/50 Desktop Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center w-full my-auto">
          {/* LEFT COLUMN: Editorial Headline, Paragraph, CTA, Social Proof (z-20) */}
          <div
            ref={leftColRef}
            className="relative z-20 will-change-transform lg:col-span-6 flex flex-col justify-center max-w-[560px] lg:max-w-none"
          >
            {/* Editorial Headline */}
            <h1
              ref={headlineRef}
              id="hero-heading"
              className="font-editorial text-[56px] sm:text-[72px] md:text-[88px] lg:text-[98px] xl:text-[108px] leading-[0.92] sm:leading-[0.90] tracking-[-0.03em] text-[#25231F] font-normal"
            >
              Your <span className="italic font-normal">Smile,</span>
              <br />
              Smarter.
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              id="hero-description"
              className="mt-5 sm:mt-7 text-[#25231F]/80 text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.55] max-w-[450px] font-sans font-normal"
            >
              We don’t believe in one-size-fits-all dentistry. At Smilix, every patient
              receives thoughtful care — built on their goals, lifestyle, and comfort.
            </p>

            {/* Primary CTA & Social Proof Group */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {/* Pill-Shaped CTA Button */}
              <div ref={ctaGroupRef} className="w-full sm:w-auto">
                <a
                  ref={ctaBtnRef}
                  href="#appointment"
                  id="hero-cta-button"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                  onMouseEnter={handleCtaMouseEnter}
                  onMouseLeave={handleCtaMouseLeave}
                  className="group inline-flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-5 bg-[#25231F] text-white pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 rounded-full font-sans transition-colors duration-300 shadow-[0_4px_18px_rgba(37,35,31,0.22)] hover:bg-[#32302C] focus:outline-none focus:ring-2 focus:ring-[#25231F] focus:ring-offset-2 focus:ring-offset-[#FAF198]"
                >
                  <span className="text-[12px] sm:text-[13px] font-semibold tracking-wider uppercase underline underline-offset-4 whitespace-nowrap">
                    BOOK APPOINTMENT
                  </span>

                  {/* Circular White Arrow Button */}
                  <span
                    ref={arrowCircleRef}
                    className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white flex items-center justify-center transition-transform duration-200 shrink-0 shadow-xs"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      ref={arrowIconRef}
                      size={15}
                      strokeWidth={2.4}
                      className="text-[#25231F] transition-transform"
                    />
                  </span>
                </a>
              </div>

              {/* Social Proof Avatars & Counter */}
              <div ref={socialProofRef}>
                <HeroSocialProof />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Layered Artistic Visual Composition (z-20) */}
          <div
            ref={rightColRef}
            className="relative z-20 will-change-transform hero-scroll-composition lg:col-span-6 w-full flex justify-center items-center mt-2 sm:mt-4 lg:mt-0"
          >
            <HeroVisual
              dentistRef={dentistRef}
              treatmentRef={treatmentRef}
              patientRef={patientRef}
              badgeRef={badgeRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
