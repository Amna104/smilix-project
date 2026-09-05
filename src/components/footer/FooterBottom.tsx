import React from 'react';

export interface FooterBottomProps {
  onRefReady?: (el: HTMLDivElement | null) => void;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ onRefReady }) => {
  return (
    <div
      ref={onRefReady}
      id="footer-bottom-bar"
      className="w-full pt-8 pb-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] sm:text-[13px] text-[#F7F6F1]/50 font-sans select-none"
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
        <span>© 2026 Smilix. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a
            href="#privacy"
            className="hover:text-[#FFF99A] transition-colors duration-200 focus:outline-none focus:underline"
          >
            Privacy Policy
          </a>
          <span className="opacity-30">•</span>
          <a
            href="#terms"
            className="hover:text-[#FFF99A] transition-colors duration-200 focus:outline-none focus:underline"
          >
            Terms of Service
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 text-center">
        <span>Made with care for better smiles.</span>
      </div>
    </div>
  );
};
