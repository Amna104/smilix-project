import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCarousel } from '../components/ProductCarousel';

export const Products: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageElementsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;
    const heading = headingRef.current;
    const desc = descRef.current;

    if (!container || !panel || !heading) return;

    const ctx = gsap.context(() => {
      // 1. Reduced motion bypass
      if (prefersReducedMotion()) {
        gsap.set([panel, label, heading, desc], { opacity: 1, scale: 1, y: 0 });
        gsap.set(cardElementsRef.current.filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(imageElementsRef.current.filter(Boolean), {
          opacity: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      // 2. Dark Panel Scroll Entrance
      gsap.fromTo(
        panel,
        {
          opacity: 0,
          scale: 0.97,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Header Elements Reveal Timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (label) {
        headerTl.fromTo(
          label,
          { opacity: 0, y: 18, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
        );
      }

      headerTl.fromTo(
        heading,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        label ? '-=0.45' : 0
      );

      if (desc) {
        headerTl.fromTo(
          desc,
          { opacity: 0, y: 30, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '-=0.65'
        );
      }

      // 4. Staggered Product Cards Reveal
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

      // 5. Emerging Product Images Reveal
      const validImages = imageElementsRef.current.filter(Boolean);
      if (validImages.length > 0) {
        gsap.fromTo(
          validImages,
          {
            opacity: 0,
            scale: 0.8,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            delay: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: validCards[0] || panel,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );

        // 6. Subtle Scroll Parallax on Product Images (10-20px)
        validImages.forEach((img) => {
          if (!img) return;
          gsap.fromTo(
            img,
            { y: 15 },
            {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
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
      id="products"
      aria-labelledby="products-section-heading"
      className="relative w-full bg-[#F7F6F1] px-3.5 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-14 lg:py-20 overflow-hidden"
    >
      {/* 
        The Large Dark Panel Sitting Inside the Page:
        - Rounded corners: 24–32px
        - Brand dark charcoal: #25231F
        - Text: #F7F6F1
      */}
      <div
        ref={panelRef}
        id="products-dark-panel"
        className="relative w-full max-w-[1400px] mx-auto bg-[#25231F] text-[#F7F6F1] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-10 lg:p-14 xl:p-16 overflow-hidden shadow-[0_24px_60px_-15px_rgba(37,35,31,0.28)] will-change-transform border border-white/5"
      >
        {/* Subtle Background Elements: Giant low-opacity circle, thin curved line, radial glow */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Subtle warm radial ambient glow */}
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[#FFF6C7]/[0.035] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#AFCBE8]/[0.03] blur-3xl pointer-events-none" />

          {/* Giant subtle low-opacity vector geometric circle & line */}
          <svg
            className="absolute -right-24 -bottom-24 w-[700px] h-[700px] stroke-white/[0.04] fill-none"
            viewBox="0 0 600 600"
          >
            <circle cx="300" cy="300" r="270" strokeWidth="1.2" strokeDasharray="5 7" />
            <path
              d="M 50 200 Q 250 450, 550 250"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Panel Header: Desktop 2-column editorial flow (Left: Label + Large Heading, Right: Supporting Copy) */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-14 mb-10 sm:mb-14 lg:mb-16">
          {/* Left Column: Top-left Label & Primary Editorial Heading */}
          <div className="flex flex-col items-start max-w-[820px]">
            {/* Top-left small label */}
            <div
              ref={labelRef}
              id="products-label"
              className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[#F7F6F1]/80 text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.15em] uppercase select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFF6C7]" />
              SMILIX ESSENTIALS
            </div>

            {/* Large Dominant Editorial Heading */}
            <h2
              ref={headingRef}
              id="products-section-heading"
              className="font-editorial text-[46px] sm:text-[60px] md:text-[72px] lg:text-[82px] xl:text-[90px] leading-[0.92] sm:leading-[0.89] text-[#F7F6F1] font-normal tracking-[-0.03em] whitespace-pre-line"
            >
              Everything your<br />
              <span className="italic font-normal">smile</span> needs.
            </h2>
          </div>

          {/* Right Column: Supporting Copy */}
          <div className="flex flex-col items-start max-w-[390px] lg:pb-3">
            <p
              ref={descRef}
              id="products-supporting-copy"
              className="font-sans text-[15px] sm:text-[16px] leading-[1.55] text-[#F7F6F1]/80 font-normal"
            >
              Thoughtfully selected essentials designed to keep your smile healthy,
              confident, and cared for every day.
            </p>
          </div>
        </div>

        {/* Featured Products: Mobile Horizontal Carousel / Desktop 4-Column Grid */}
        <div className="relative z-10 w-full">
          <ProductCarousel
            products={PRODUCTS_DATA}
            cardRefsCallback={(index, el) => {
              cardElementsRef.current[index] = el;
            }}
            imageRefsCallback={(index, el) => {
              imageElementsRef.current[index] = el;
            }}
          />
        </div>
      </div>
    </section>
  );
};
