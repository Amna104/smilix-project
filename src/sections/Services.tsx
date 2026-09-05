import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { ServiceCard, ServiceData } from '../components/ServiceCard';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import {
  WhiteningVisual,
  BracesVisual,
  InvisalignVisual,
  RootCanalVisual,
} from '../components/DentalVisuals';

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'whitening',
    title: 'Teeth\nWhitening',
    description:
      'Personalized care. Trusted treatments. From whitening to implants, we’ve got every smile covered.',
    visualComponent: WhiteningVisual,
    imageAlt: 'Pristine glowing tooth model with whitening sparkle highlights',
    background: '#FFF6C7',
    ariaLabel: 'Learn more about Teeth Whitening services and schedule a consultation',
  },
  {
    id: 'braces',
    title: 'Braces',
    description:
      'Personalized care. Trusted treatments. From whitening to implants, we’ve got every smile covered.',
    visualComponent: BracesVisual,
    imageAlt: 'Modern orthodontic aesthetic ceramic braces illustration',
    background: '#AFCBE8',
    ariaLabel: 'Learn more about Braces and orthodontic treatment options',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description:
      'Personalized care. Trusted treatments. From whitening to implants, we’ve got every smile covered.',
    visualComponent: InvisalignVisual,
    imageAlt: 'Crystal clear invisible aligner tray dental model',
    background: '#D7D4C3',
    ariaLabel: 'Learn more about Invisalign clear aligners and modern smile straightening',
  },
  {
    id: 'root-canal',
    title: 'Root Canal',
    description:
      'Personalized care. Trusted treatments. From whitening to implants, we’ve got every smile covered.',
    visualComponent: RootCanalVisual,
    imageAlt: 'Artistic anatomical tooth cross-section showing gentle root canal therapy',
    background: '#F4C8D9',
    ariaLabel: 'Learn more about gentle and comfortable Root Canal treatments',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Heading Scroll Reveal
      gsap.fromTo(
        heading,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Sequential Service Cards Entrance Reveal
      const cardsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        cardsTimeline.fromTo(
          validCards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
          }
        );
      }

      // 3. Layered Dental Visuals Entrance Reveal
      const validVisuals = visualRefs.current.filter(Boolean);
      if (validVisuals.length > 0) {
        cardsTimeline.fromTo(
          validVisuals,
          { opacity: 0, scale: 0.88, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            stagger: 0.12,
          },
          '-=0.65'
        );
      }

      // 4. Subtle Parallax Scrub for Visuals as Cards Pass Through Viewport
      validVisuals.forEach((visual) => {
        if (!visual) return;
        gsap.fromTo(
          visual,
          { y: 10 },
          {
            y: -10,
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative z-10 w-full bg-[#FFFFFF] pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20 sm:pb-24 md:pb-28 lg:pb-32 px-5 sm:px-8 lg:px-12 transition-colors duration-500"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Large Editorial Heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            ref={headingRef}
            id="services-heading"
            className="font-editorial text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] xl:text-[90px] leading-[0.98] sm:leading-[0.95] text-[#25231F] font-normal tracking-[-0.035em]"
          >
            Our core <span className="italic font-normal">dental</span> services
          </h2>
        </div>

        {/* 4-Card Responsive Grid: 1 Col Mobile -> 2x2 Tablet -> 4 Col Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-3.5 xl:gap-4 items-stretch">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              cardRefCallback={(el) => {
                cardRefs.current[index] = el;
              }}
              visualRefCallback={(el) => {
                visualRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        {/* Interactive Before & After Treatment Comparison Slider */}
        <BeforeAfterSlider />
      </div>
    </section>
  );
};
