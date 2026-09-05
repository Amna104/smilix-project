import React from 'react';

interface HeroExperienceBadgeProps {
  className?: string;
  id?: string;
}

export const HeroExperienceBadge: React.FC<HeroExperienceBadgeProps> = ({
  className = '',
  id = 'hero-experience-badge',
}) => {
  return (
    <div
      id={id}
      className={`relative w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-[175px] md:h-[175px] rounded-full bg-[#99C5EA] p-3 flex flex-col items-center justify-center text-center shadow-[0_12px_28px_rgba(37,35,31,0.08)] select-none ${className}`}
      aria-label="12 plus Years of expertise"
    >
      {/* Primary Number */}
      <span className="font-editorial italic text-[42px] sm:text-[52px] md:text-[58px] font-normal text-[#25231F] leading-none tracking-tight">
        12+
      </span>

      {/* Subtext */}
      <span className="font-editorial text-[13px] sm:text-[14px] md:text-[15px] text-[#25231F] max-w-[100px] mt-1 sm:mt-1.5 leading-[1.1] font-normal">
        Years of expertise
      </span>
    </div>
  );
};
