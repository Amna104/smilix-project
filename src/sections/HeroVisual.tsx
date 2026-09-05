import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { heroAssets } from '../assets/hero';
import { HeroTreatmentCard } from './HeroTreatmentCard';
import { HeroExperienceBadge } from './HeroExperienceBadge';
import {
  createFloatingAnimation,
  createParallaxEffect,
  prefersReducedMotion,
} from '../animations/gsap';

interface HeroVisualProps {
  dentistRef?: React.RefObject<HTMLDivElement | null>;
  treatmentRef?: React.RefObject<HTMLDivElement | null>;
  patientRef?: React.RefObject<HTMLDivElement | null>;
  badgeRef?: React.RefObject<HTMLDivElement | null>;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({
  dentistRef: externalDentistRef,
  treatmentRef: externalTreatmentRef,
  patientRef: externalPatientRef,
  badgeRef: externalBadgeRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalPatientRef = useRef<HTMLDivElement>(null);
  const internalDentistRef = useRef<HTMLDivElement>(null);
  const internalTreatmentRef = useRef<HTMLDivElement>(null);
  const internalBadgeRef = useRef<HTMLDivElement>(null);

  const patientRef = externalPatientRef || internalPatientRef;
  const dentistRef = externalDentistRef || internalDentistRef;
  const treatmentRef = externalTreatmentRef || internalTreatmentRef;
  const badgeRef = externalBadgeRef || internalBadgeRef;

  const dentistInnerRef = useRef<HTMLDivElement>(null);
  const treatmentInnerRef = useRef<HTMLDivElement>(null);
  const badgeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Subtle continuous floating animations on the inner nodes
    const floatDentist = createFloatingAnimation(dentistInnerRef.current, {
      y: 6,
      duration: 3.8,
      delay: 0.2,
      rotation: 0.4,
    });
    const floatTreatment = createFloatingAnimation(treatmentInnerRef.current, {
      y: 7,
      duration: 4.2,
      delay: 0.5,
      rotation: -0.5,
    });
    const floatBadge = createFloatingAnimation(badgeInnerRef.current, {
      y: 6,
      duration: 3.6,
      delay: 0.3,
      rotation: 0.4,
    });

    // Mouse-based parallax on the outer containers
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    let cleanupParallax = () => {};

    if (!isTouchDevice) {
      cleanupParallax = createParallaxEffect([
        { target: patientRef.current, factorX: 8, factorY: 6 },
        { target: dentistRef.current, factorX: -12, factorY: -10 },
        { target: treatmentRef.current, factorX: 14, factorY: 10 },
        { target: badgeRef.current, factorX: -10, factorY: 10 },
      ]);
    }

    return () => {
      floatDentist?.kill();
      floatTreatment?.kill();
      floatBadge?.kill();
      cleanupParallax();
    };
  }, [patientRef, dentistRef, treatmentRef, badgeRef]);

  return (
    <div
      ref={containerRef}
      id="hero-visual-container"
      className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[600px] h-[460px] sm:h-[510px] md:h-[540px] flex items-center justify-center select-none mx-auto"
    >
      {/* 1. TALL ARCHED CAPSULE: Radiant Smiling Man in Yellow T-Shirt (Right Column) */}
      <div
        ref={patientRef}
        id="hero-main-patient-capsule"
        className="absolute right-0 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10"
      >
        <div className="w-[195px] sm:w-[240px] md:w-[265px] lg:w-[280px] h-[370px] sm:h-[430px] md:h-[475px] lg:h-[495px] rounded-t-full rounded-b-full overflow-hidden bg-[#80AA97] shadow-[0_16px_36px_rgba(37,35,31,0.08)] transition-transform duration-500 hover:scale-[1.01]">
          <img
            src={heroAssets.patient}
            alt="Smilix patient with radiant healthy smile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-104"
            loading="eager"
          />
        </div>
      </div>

      {/* 2. DENTIST OVAL CAPSULE (Top Left / Center) */}
      <div
        ref={dentistRef}
        id="hero-dentist-oval"
        className="absolute top-1 sm:top-2 md:top-4 left-4 sm:left-10 md:left-12 z-20"
      >
        <div ref={dentistInnerRef} className="relative group">
          {/* Oval container with warm sand tan background */}
          <div className="w-[145px] sm:w-[170px] md:w-[190px] h-[125px] sm:h-[145px] md:h-[160px] rounded-[50px] sm:rounded-[60px] md:rounded-[68px] overflow-hidden bg-[#C3AA94] shadow-[0_12px_28px_rgba(37,35,31,0.07)]">
            <img
              src={heroAssets.dentist}
              alt="Lead Dental Surgeon at Smilix Clinic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Scalloped / Flower Verified Checkmark Badge (Top-Right of Oval) */}
          <div
            id="dentist-verified-badge"
            className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EA6E65] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(234,110,101,0.4)] border-2 border-[#FAF198]"
            title="Verified Dental Specialist"
          >
            <Check size={16} strokeWidth={3} className="text-white" />
          </div>
        </div>
      </div>

      {/* 3. FEATURED TREATMENTS ARCHED CAPSULE (Bottom Left) */}
      <div
        ref={treatmentRef}
        id="hero-treatment-card-wrapper"
        className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1 sm:left-4 md:left-6 z-20"
      >
        <div ref={treatmentInnerRef}>
          <HeroTreatmentCard />
        </div>
      </div>

      {/* 4. 12+ YEARS OF EXPERTISE CIRCLE BADGE (Bottom Right overlapping tall capsule) */}
      <div
        ref={badgeRef}
        id="hero-experience-badge-wrapper"
        className="absolute bottom-0 sm:bottom-2 md:bottom-3 right-0 sm:right-2 md:right-4 z-30"
      >
        <div ref={badgeInnerRef}>
          <HeroExperienceBadge />
        </div>
      </div>
    </div>
  );
};
