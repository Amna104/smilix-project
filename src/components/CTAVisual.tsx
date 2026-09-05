import React, { useEffect, useRef } from 'react';
import { Star, Smile } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import patientImg from '../assets/images/cta_smiling_patient_1788443523374.jpg';

export interface CTAVisualProps {
  className?: string;
  onElementsReady?: (elements: {
    mainImage: HTMLDivElement | null;
    badge: HTMLDivElement | null;
    patientCard: HTMLDivElement | null;
  }) => void;
}

export const CTAVisual: React.FC<CTAVisualProps> = ({
  className = '',
  onElementsReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const patientCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onElementsReady) {
      onElementsReady({
        mainImage: mainImageRef.current,
        badge: badgeRef.current,
        patientCard: patientCardRef.current,
      });
    }
  }, [onElementsReady]);

  useEffect(() => {
    const container = containerRef.current;
    const mainImg = mainImageRef.current;
    const badge = badgeRef.current;
    const card = patientCardRef.current;

    if (!container || !mainImg || !badge || !card || prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 1. Continuous Floating Animation (GSAP sine loop)
    const floatBadge = gsap.to(badge, {
      y: -9,
      duration: 4.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const floatCard = gsap.to(card, {
      y: 8,
      duration: 5.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.8,
    });

    // 2. Layered Mouse Parallax
    // Main image: max 8px
    // Badge: max 15px
    // Patient card: max 12px
    const mainXTo = gsap.quickTo(mainImg, 'x', { duration: 0.5, ease: 'power2.out' });
    const mainYTo = gsap.quickTo(mainImg, 'y', { duration: 0.5, ease: 'power2.out' });
    const badgeXTo = gsap.quickTo(badge, 'x', { duration: 0.45, ease: 'power2.out' });
    const badgeYTo = gsap.quickTo(badge, 'y', { duration: 0.45, ease: 'power2.out' });
    const cardXTo = gsap.quickTo(card, 'x', { duration: 0.45, ease: 'power2.out' });
    const cardYTo = gsap.quickTo(card, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      mainXTo(normX * 8);
      mainYTo(normY * 8);

      badgeXTo(normX * 15);
      badgeYTo(normY * 15);

      cardXTo(normX * 12);
      cardYTo(normY * 12);
    };

    const handleMouseLeave = () => {
      mainXTo(0);
      mainYTo(0);
      badgeXTo(0);
      badgeYTo(0);
      cardXTo(0);
      cardYTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      floatBadge.kill();
      floatCard.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cta-visual-composition"
      className={`relative w-full max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] aspect-square flex items-center justify-center select-none ${className}`}
    >
      {/* Background Decorative Element: Giant low-opacity circle and subtle curve */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[115%] h-[115%] rounded-full border border-[#25231F]/[0.08]" />
        <svg
          className="absolute inset-0 w-full h-full stroke-[#25231F]/[0.08] fill-none"
          viewBox="0 0 500 500"
        >
          <path d="M 50 150 Q 250 480, 450 180" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Visual: Large circular smiling-patient image (360-450px desktop, 250-290px mobile) */}
      <div
        ref={mainImageRef}
        id="cta-main-image-frame"
        className="relative z-10 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[430px] aspect-square rounded-full overflow-hidden shadow-[0_24px_50px_-12px_rgba(37,35,31,0.22)] border-[5px] sm:border-[7px] border-[#F7F6F1] will-change-transform transform-gpu bg-[#F7F6F1]"
      >
        <img
          src={patientImg}
          alt="Radiant patient smiling with healthy teeth at Smilix dental studio"
          className="w-full h-full object-cover object-center will-change-transform"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floating Element 1: Circular cream badge (12+ Years of expertise) */}
      <div
        ref={badgeRef}
        id="cta-floating-badge"
        className="absolute top-2 sm:top-4 right-3 sm:right-6 lg:right-4 z-20 w-[100px] sm:w-[118px] lg:w-[126px] aspect-square rounded-full bg-[#FFF6C7] text-[#25231F] border border-[#25231F]/10 shadow-[0_12px_28px_-6px_rgba(37,35,31,0.18)] p-3 flex flex-col items-center justify-center text-center will-change-transform transform-gpu"
      >
        <span className="font-editorial text-[26px] sm:text-[32px] leading-none font-normal tracking-tight">
          12+
        </span>
        <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase text-[#25231F]/75 mt-1 leading-tight">
          Years of<br />expertise
        </span>
      </div>

      {/* Floating Element 2: Rounded cream card (1000+ happy patients) */}
      <div
        ref={patientCardRef}
        id="cta-floating-card"
        className="absolute bottom-4 sm:bottom-6 left-2 sm:left-4 lg:left-2 z-20 bg-[#F7F6F1] text-[#25231F] rounded-[18px] sm:rounded-[20px] px-4 sm:px-5 py-3 sm:py-3.5 border border-[#25231F]/10 shadow-[0_16px_32px_-8px_rgba(37,35,31,0.16)] flex items-center gap-3 will-change-transform transform-gpu max-w-[210px] sm:max-w-[240px]"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#AFCBE8]/40 border border-[#25231F]/10 flex items-center justify-center text-[#25231F] flex-shrink-0">
          <Smile size={20} strokeWidth={2} />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="font-sans font-bold text-[13.5px] sm:text-[15px] text-[#25231F] leading-tight">
              1,000+
            </span>
            <div className="flex items-center text-[#25231F]">
              <Star size={11} className="fill-[#25231F]" />
            </div>
          </div>
          <span className="font-sans text-[11px] sm:text-[11.5px] text-[#5A5751] font-normal leading-tight">
            Happy patients cared for
          </span>
        </div>
      </div>
    </div>
  );
};
