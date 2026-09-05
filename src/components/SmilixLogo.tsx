import React from 'react';

export interface SmilixLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'wordmark';
  theme?: 'dark' | 'light';
  height?: number;
}

/**
 * High-fidelity Vector Emblem matching the user's custom Smilix dental logo.
 * Features the signature contoured tooth with the smiling divider and the soft butter-yellow cusp highlight.
 */
export const SmilixEmblem: React.FC<{
  className?: string;
  size?: number;
  theme?: 'dark' | 'light';
}> = ({ className = '', size = 36, theme = 'dark' }) => {
  const strokeColor = theme === 'dark' ? '#25231F' : '#FAF9F5';
  const yellowFill = '#FAF198';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Signature Accent: Yellow Cusp Highlight */}
      <path
        d="M 98 46 C 106 32 122 24 134 32 C 142 38 144 50 140 60 C 134 68 114 66 98 46 Z"
        fill={yellowFill}
        stroke={strokeColor}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Upper-Left Crown Contour & Mid Valley */}
      <path
        d="M 28 66 C 26 44 38 24 60 22 C 74 20 88 34 98 46"
        stroke={strokeColor}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. The Graceful Mid-Tooth Smile Arc */}
      <path
        d="M 26 68 C 38 92 72 100 86 100 C 108 100 132 86 140 64"
        stroke={strokeColor}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. Lower Tooth Roots & Inverted Crotch Arch */}
      <path
        d="M 26 68 C 26 94 36 136 54 136 C 68 136 76 118 86 100 C 96 118 104 136 118 136 C 136 136 142 92 140 64"
        stroke={strokeColor}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SmilixLogo: React.FC<SmilixLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  height = 36,
}) => {
  const textColor = theme === 'dark' ? 'text-[#25231F]' : 'text-[#FAF9F5]';

  if (variant === 'icon') {
    return <SmilixEmblem size={height} theme={theme} className={className} />;
  }

  if (variant === 'wordmark') {
    return (
      <span
        className={`font-serif-heading font-medium tracking-[0.14em] uppercase select-none ${textColor} ${className}`}
        style={{ fontSize: `${height * 0.72}px` }}
      >
        SMILIX
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      <SmilixEmblem size={height} theme={theme} />
      <span
        className={`font-serif-heading font-medium tracking-[0.15em] uppercase leading-none ${textColor}`}
        style={{ fontSize: `${height * 0.68}px` }}
      >
        SMILIX
      </span>
    </div>
  );
};
