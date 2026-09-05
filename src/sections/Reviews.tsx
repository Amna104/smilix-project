import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { REVIEWS_ROW_1, REVIEWS_ROW_2 } from '../data/reviews';
import { ReviewMarquee } from '../components/ReviewMarquee';

export const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const numberWrapperRef = useRef<HTMLDivElement>(null);
  const numberValRef = useRef<HTMLSpanElement>(null);
  const reviewsWordRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const rowsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const numberWrapper = numberWrapperRef.current;
    const numberVal = numberValRef.current;
    const reviewsWord = reviewsWordRef.current;
    const desc = descRef.current;
    const rowsWrapper = rowsWrapperRef.current;

    if (!section || !numberWrapper || !numberVal) return;

    const ctx = gsap.context(() => {
      // 1. Reduced motion handling
      if (prefersReducedMotion()) {
        numberVal.textContent = '1800';
        gsap.set(
          [label, numberWrapper, reviewsWord, desc, rowsWrapper].filter(Boolean),
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Initial state for numeric text
      numberVal.textContent = '0';

      // 2. Layered entrance reveal timeline
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: numberWrapper,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Step 1: Section label
      if (label) {
        revealTl.fromTo(
          label,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      // Step 2: Giant number wrapper entrance
      revealTl.fromTo(
        numberWrapper,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
        },
        label ? '-=0.4' : 0
      );

      // Step 3: Count-up animation for numeric value (0 -> 1800)
      const countObj = { value: 0 };
      revealTl.to(
        countObj,
        {
          value: 1800,
          duration: 2.0,
          ease: 'power2.out',
          onUpdate: () => {
            if (numberVal) {
              numberVal.textContent = Math.round(countObj.value).toLocaleString();
            }
          },
        },
        '-=0.9'
      );

      // Step 4: "Reviews" word entrance
      if (reviewsWord) {
        revealTl.fromTo(
          reviewsWord,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=1.4'
        );
      }

      // Step 5: Supporting paragraph
      if (desc) {
        revealTl.fromTo(
          desc,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=1.2'
        );
      }

      // Step 6: Testimonial rows reveal
      if (rowsWrapper) {
        revealTl.fromTo(
          rowsWrapper,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=1.0'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-labelledby="reviews-section-heading"
      className="relative w-full bg-[#F7F6F1] text-[#25231F] pt-[90px] pb-[100px] lg:pt-[140px] lg:pb-[150px] overflow-hidden select-none"
    >
      {/* Decorative Element: One subtle oversized circular outline behind the giant number */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[700px] lg:w-[880px] xl:w-[980px] aspect-square rounded-full border border-[#25231F]/[0.07] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex flex-col items-center text-center">
        {/* Section Label: "WHAT OUR PATIENTS SAY" */}
        <div
          ref={labelRef}
          id="reviews-section-label"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25231F]/[0.05] border border-[#25231F]/10 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.15em] uppercase text-[#25231F]/75 mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25231F]" />
          WHAT OUR PATIENTS SAY
        </div>

        {/* Hero Number & Editorial Heading Block */}
        <div
          ref={numberWrapperRef}
          id="reviews-hero-number-block"
          className="flex flex-col items-center justify-center will-change-transform"
        >
          {/* Main Enormous Number: 1800+ */}
          <div
            className="font-editorial text-[88px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[230px] leading-[0.82] tracking-[-0.055em] text-[#25231F] font-normal inline-flex items-baseline justify-center select-none"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            <span ref={numberValRef} id="reviews-counter-number">
              1800
            </span>
            <span className="text-[#25231F] font-light ml-1 sm:ml-2">+</span>
          </div>

          {/* Underneath: "Reviews" & Offset Supporting Copy Container */}
          <div className="mt-1 sm:mt-3 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 w-full max-w-[850px]">
            {/* "Reviews" in large elegant italic serif */}
            <h2
              ref={reviewsWordRef}
              id="reviews-section-heading"
              className="font-editorial italic font-normal text-[44px] sm:text-[54px] md:text-[62px] lg:text-[70px] leading-none text-[#25231F] tracking-[-0.025em]"
            >
              Reviews
            </h2>

            {/* Supporting Copy: Desktop offset / Mobile centered */}
            <p
              ref={descRef}
              id="reviews-supporting-text"
              className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.5] text-[#5A5751] font-normal max-w-[320px] sm:max-w-[380px] md:text-left text-center"
            >
              Thousands of smiles, one simple goal: making every visit feel a
              little better.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Testimonial Marquee: Two Horizontal Rows */}
      <div
        ref={rowsWrapperRef}
        id="reviews-marquee-section"
        className="relative z-10 w-full mt-14 sm:mt-16 lg:mt-20 overflow-hidden will-change-transform"
      >
        <ReviewMarquee
          row1Reviews={REVIEWS_ROW_1}
          row2Reviews={REVIEWS_ROW_2}
        />
      </div>
    </section>
  );
};
