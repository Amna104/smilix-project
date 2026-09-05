import React from 'react';
import { heroAssets } from '../assets/hero';

interface HeroTreatmentCardProps {
  className?: string;
  id?: string;
}

export const HeroTreatmentCard: React.FC<HeroTreatmentCardProps> = ({
  className = '',
  id = 'hero-treatment-card',
}) => {
  return (
    <div
      id={id}
      className={`relative w-[150px] sm:w-[175px] md:w-[195px] h-[240px] sm:h-[280px] md:h-[300px] rounded-[55px] sm:rounded-[65px] md:rounded-[70px] bg-[#DDD9CF] overflow-hidden flex flex-col justify-between shadow-[0_12px_28px_rgba(37,35,31,0.08)] transition-all duration-300 select-none ${className}`}
    >
      {/* Top Text Header */}
      <div className="pt-5 sm:pt-6 text-center px-3 z-10">
        <span className="block font-editorial text-[18px] sm:text-[21px] md:text-[23px] leading-[1.0] text-[#25231F] font-normal tracking-tight">
          Featured
        </span>
        <span className="block font-editorial italic text-[18px] sm:text-[21px] md:text-[23px] leading-[1.0] text-[#25231F] font-normal tracking-tight mt-0.5">
          Treatments
        </span>
      </div>

      {/* 3D Tooth, Smiling Mirror, Toothpaste & Brush Illustration */}
      <div className="relative w-full flex-1 flex items-end justify-center overflow-hidden pb-1 px-1">
        <img
          src={heroAssets.treatment}
          alt="Featured dental treatments illustration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-bottom transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  );
};
