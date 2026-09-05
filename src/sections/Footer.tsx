import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { FooterNav } from '../components/footer/FooterNav';
import { FooterCTA } from '../components/footer/FooterCTA';
import { FooterNewsletter } from '../components/footer/FooterNewsletter';
import { FooterBottom } from '../components/footer/FooterBottom';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const navColsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;

    if (!footer || !heading) return;

    const ctx = gsap.context(() => {
      // 1. Accessibility: reduced motion support
      if (prefersReducedMotion()) {
        gsap.set(
          [
            eyebrow,
            heading,
            subtitle,
            ctaContainerRef.current,
            bottomBarRef.current,
            ...navColsRef.current.filter(Boolean),
          ].filter(Boolean),
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // 2. Cinematic GSAP ScrollTrigger Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // 1. Eyebrow fades upward
      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      // 2. Main heading reveals upward (1.0–1.2s)
      tl.fromTo(
        heading,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.45'
      );

      // 3. Supporting text fades in
      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        );
      }

      // 4. CTA Block scales / fades in (0.7s)
      if (ctaContainerRef.current) {
        tl.fromTo(
          ctaContainerRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // 5. Navigation columns stagger in (0.6–0.8s each)
      const validCols = navColsRef.current.filter(Boolean);
      if (validCols.length > 0) {
        tl.fromTo(
          validCols,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      // 6. Bottom bar fades in last (0.5s)
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      aria-labelledby="footer-main-heading"
      className="relative z-10 w-full bg-[#25231F] text-[#F7F6F1] rounded-t-[32px] sm:rounded-t-[40px] lg:rounded-t-[48px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 sm:pt-20 lg:pt-28 pb-8 overflow-hidden select-none border-t border-white/[0.06]"
    >
      {/* Cinematic subtle background geometry */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Soft yellow radial warmth in the corner */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#FFF99A]/[0.025] blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-3xl" />
        <svg
          className="absolute -right-20 top-1/3 w-[700px] h-[700px] stroke-white/[0.03] fill-none"
          viewBox="0 0 500 500"
        >
          <circle cx="250" cy="250" r="230" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col space-y-16 sm:space-y-20 lg:space-y-24">
        {/* 1. FOOTER HERO AREA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-16 pb-4">
          <div className="flex flex-col max-w-[800px]">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              id="footer-eyebrow"
              className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] uppercase text-[#FFF99A]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFF99A]" />
              SMILIX DENTAL CARE
            </div>

            {/* Large Statement: "Your smile.\nOur expertise." */}
            <h2
              ref={headingRef}
              id="footer-main-heading"
              className="font-editorial text-[52px] sm:text-[72px] md:text-[90px] lg:text-[105px] xl:text-[116px] leading-[0.92] text-[#F7F6F1] font-normal tracking-[-0.035em] whitespace-pre-line"
            >
              Your <span className="italic font-normal">smile.</span><br />
              Our expertise.
            </h2>
          </div>

          {/* Supporting sentence + Smile Notes */}
          <div className="flex flex-col space-y-8 max-w-[460px]">
            <p
              ref={subtitleRef}
              id="footer-supporting-sentence"
              className="font-sans text-[15px] sm:text-[16.5px] leading-[1.6] text-[#F7F6F1]/75 font-normal"
            >
              Modern dental care designed around your comfort, confidence, and
              healthiest smile.
            </p>

            {/* Smile Notes Newsletter */}
            <FooterNewsletter />
          </div>
        </div>

        {/* 2. FOOTER CTA BLOCK */}
        <FooterCTA
          onRefReady={(el) => {
            ctaContainerRef.current = el;
          }}
        />

        {/* 3. 4-COLUMN FOOTER NAVIGATION */}
        <FooterNav
          onColumnRef={(index, el) => {
            navColsRef.current[index] = el;
          }}
        />

        {/* 4. FOOTER BOTTOM BAR */}
        <FooterBottom
          onRefReady={(el) => {
            bottomBarRef.current = el;
          }}
        />
      </div>
    </footer>
  );
};
