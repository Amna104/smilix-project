import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatItemProps {
  id: string;
  icon: LucideIcon;
  displayFallback: string;
  label: string;
  isLastOnDesktop?: boolean;
  borderClasses?: string;
  iconRef?: React.RefObject<HTMLDivElement | null>;
  numberRef?: React.RefObject<HTMLSpanElement | null>;
  labelRef?: React.RefObject<HTMLParagraphElement | null>;
}

export const StatItem = forwardRef<HTMLDivElement, StatItemProps>(
  (
    {
      id,
      icon: Icon,
      displayFallback,
      label,
      borderClasses = '',
      iconRef,
      numberRef,
      labelRef,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id={`stat-item-${id}`}
        className={`group flex flex-col items-center justify-center text-center p-6 sm:p-8 lg:p-10 select-none transition-colors duration-300 ${borderClasses}`}
      >
        {/* Small & Elegant Icon */}
        <div
          ref={iconRef}
          className="mb-4 sm:mb-5 text-[#25231F] transition-transform duration-300 ease-out group-hover:-translate-y-1"
          aria-hidden="true"
        >
          <Icon size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
        </div>

        {/* Large Editorial Serif Number */}
        <div className="overflow-hidden">
          <span
            ref={numberRef}
            id={`stat-number-${id}`}
            className="inline-block font-editorial text-[48px] sm:text-[58px] md:text-[68px] lg:text-[76px] xl:text-[80px] leading-none tracking-[-0.03em] text-[#25231F] font-normal whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-y-1"
          >
            {displayFallback}
          </span>
        </div>

        {/* Small Descriptive Label */}
        <p
          ref={labelRef}
          id={`stat-label-${id}`}
          className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] lg:text-[16px] text-[#25231F]/70 font-sans tracking-tight whitespace-nowrap transition-colors duration-300 group-hover:text-[#25231F]"
        >
          {label}
        </p>
      </div>
    );
  }
);

StatItem.displayName = 'StatItem';
