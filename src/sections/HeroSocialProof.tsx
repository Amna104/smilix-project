import React from 'react';
import { heroAssets } from '../assets/hero';

interface HeroSocialProofProps {
  className?: string;
  id?: string;
}

export const HeroSocialProof: React.FC<HeroSocialProofProps> = ({ className = '', id = 'hero-social-proof' }) => {
  return (
    <div
      id={id}
      className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      aria-label="Patient Satisfaction Social Proof"
    >
      {/* Overlapping Avatars */}
      <div className="flex -space-x-2 items-center">
        {heroAssets.avatars.map((avatar, idx) => (
          <div
            key={idx}
            id={`avatar-patient-${idx}`}
            className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#FAF198] overflow-hidden bg-white transition-transform duration-300 ease-out hover:-translate-y-1 hover:z-10 shadow-xs cursor-pointer"
          >
            <img
              src={avatar}
              alt={`Happy Smilix patient review ${idx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Metrics Text */}
      <div className="flex flex-col justify-center leading-tight">
        <span className="font-editorial italic text-lg sm:text-[20px] font-normal tracking-tight text-[#25231F]">
          1000+
        </span>
        <span className="text-[11.5px] sm:text-[12px] font-normal text-[#25231F]/80 -mt-0.5">
          of happy user
        </span>
      </div>
    </div>
  );
};
