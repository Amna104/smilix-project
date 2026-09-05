import React from 'react';

interface DentalVisualProps {
  className?: string;
}

/**
 * 1. Teeth Whitening Visual:
 * Sculpted pristine enamel tooth with warm/white specular highlights and elegant 4-point sparkle glints.
 */
export const WhiteningVisual: React.FC<DentalVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] max-h-[260px] object-contain drop-shadow-[0_16px_28px_rgba(37,35,31,0.08)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="whitening-enamel" x1="50" y1="30" x2="250" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFFDF0" />
            <stop offset="85%" stopColor="#F4ECC2" />
            <stop offset="100%" stopColor="#E9DCA0" />
          </linearGradient>

          <linearGradient id="whitening-highlight" x1="120" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="whitening-glow" cx="150" cy="110" r="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#FFF99A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFF99A" stopOpacity="0" />
          </radialGradient>

          <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="150" cy="130" r="100" fill="url(#whitening-glow)" filter="url(#soft-blur)" />

        {/* Sculpted Tooth Crown & Roots */}
        <path
          d="M78 84C82 52 108 36 138 40C146 41 154 41 162 40C192 36 218 52 222 84C228 126 230 162 208 206C198 226 182 248 168 250C158 252 153 234 150 205C147 234 142 252 132 250C118 248 102 226 92 206C70 162 72 126 78 84Z"
          fill="url(#whitening-enamel)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
        />

        {/* Inner Volumetric Enamel Contour */}
        <path
          d="M92 90C95 65 116 52 140 55C147 56 153 56 160 55C184 52 205 65 208 90C213 124 214 156 196 192C188 208 175 226 164 228C156 229 152 214 150 190C148 214 144 229 136 228C125 226 112 208 104 192C86 156 87 124 92 90Z"
          fill="none"
          stroke="url(#whitening-highlight)"
          strokeWidth="3"
        />

        {/* Left Gloss Sheen */}
        <path
          d="M102 78C108 66 122 62 136 64C122 76 114 104 116 138C117 156 114 178 106 188C100 174 98 134 102 78Z"
          fill="#FFFFFF"
          fillOpacity="0.75"
        />

        {/* Center Specular Glint Spot */}
        <ellipse cx="140" cy="80" rx="16" ry="7" transform="rotate(-15 140 80)" fill="#FFFFFF" fillOpacity="0.85" />

        {/* Sparkle 1: Top Right Major Star */}
        <g transform="translate(224, 38)">
          <path
            d="M0 -22 C1 -8, 8 -1, 22 0 C8 1, 1 8, 0 22 C-1 8, -8 1, -22 0 C-8 -1, -1 -8, 0 -22 Z"
            fill="#FFFFFF"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
          <circle cx="0" cy="0" r="3" fill="#FFF275" />
        </g>

        {/* Sparkle 2: Left Middle Small Star */}
        <g transform="translate(56, 110) scale(0.68)">
          <path
            d="M0 -18 C1 -6, 6 -1, 18 0 C6 1, 1 6, 0 18 C-1 6, -6 1, -18 0 C-6 -1, -1 -6, 0 -18 Z"
            fill="#FFFFFF"
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
          <circle cx="0" cy="0" r="2.5" fill="#FFF99A" />
        </g>

        {/* Sparkle 3: Bottom Right Accent */}
        <g transform="translate(230, 188) scale(0.55)">
          <path
            d="M0 -18 C1 -6, 6 -1, 18 0 C6 1, 1 6, 0 18 C-1 6, -6 1, -18 0 C-6 -1, -1 -6, 0 -18 Z"
            fill="#FFFFFF"
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Braces Visual:
 * Orthodontic tooth featuring refined metallic bracket, precision archwire, and ligature tie.
 */
export const BracesVisual: React.FC<DentalVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] max-h-[260px] object-contain drop-shadow-[0_16px_28px_rgba(37,35,31,0.08)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="braces-enamel" x1="60" y1="40" x2="240" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#EBF4FD" />
            <stop offset="85%" stopColor="#CCE3FA" />
            <stop offset="100%" stopColor="#B3D5F5" />
          </linearGradient>

          <linearGradient id="bracket-metal" x1="120" y1="100" x2="180" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#D2D9E2" />
            <stop offset="55%" stopColor="#8A95A5" />
            <stop offset="80%" stopColor="#586375" />
            <stop offset="100%" stopColor="#9AA6B8" />
          </linearGradient>

          <linearGradient id="archwire-shine" x1="30" y1="120" x2="270" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6C7A8D" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#CFD8E4" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#CFD8E4" />
            <stop offset="100%" stopColor="#6C7A8D" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Sculpted Tooth Body */}
        <path
          d="M78 84C82 52 108 36 138 40C146 41 154 41 162 40C192 36 218 52 222 84C228 126 230 162 208 206C198 226 182 248 168 250C158 252 153 234 150 205C147 234 142 252 132 250C118 248 102 226 92 206C70 162 72 126 78 84Z"
          fill="url(#braces-enamel)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
        />

        {/* Enamel Highlight Sheen */}
        <path
          d="M102 78C108 66 122 62 136 64C122 76 114 104 116 138C117 156 114 178 106 188C100 174 98 134 102 78Z"
          fill="#FFFFFF"
          fillOpacity="0.6"
        />

        {/* Orthodontic Archwire spanning across */}
        <path
          d="M40 126 C 90 134, 150 137, 210 134 C 235 132, 255 128, 265 126"
          stroke="url(#archwire-shine)"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        />

        {/* Precision Orthodontic Bracket Base Plate */}
        <rect
          x="122"
          y="108"
          width="56"
          height="48"
          rx="9"
          fill="url(#bracket-metal)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          className="drop-shadow-[0_4px_10px_rgba(37,35,31,0.2)]"
        />

        {/* Bracket Wings / Tie Slots */}
        <rect x="127" y="114" width="10" height="36" rx="3.5" fill="#FFFFFF" fillOpacity="0.8" />
        <rect x="163" y="114" width="10" height="36" rx="3.5" fill="#4B5563" fillOpacity="0.5" />

        {/* Horizontal Archwire Slot Channel */}
        <rect x="120" y="127" width="60" height="7" rx="2" fill="#25231F" fillOpacity="0.75" />

        {/* Wire Passing through Channel */}
        <line x1="116" y1="130.5" x2="184" y2="130.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Elastic Ligature Ring / O-Ring */}
        <rect
          x="125"
          y="112"
          width="50"
          height="40"
          rx="8"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeOpacity="0.6"
        />

        {/* Specular Bracket Dot */}
        <circle cx="132" cy="118" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * 3. Invisalign Visual:
 * Ultra-clear, translucent orthodontic aligner tray showcasing glossy refraction curves.
 */
export const InvisalignVisual: React.FC<DentalVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] max-h-[260px] object-contain drop-shadow-[0_16px_28px_rgba(37,35,31,0.08)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="invisalign-glass" x1="50" y1="50" x2="250" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#E5E4D8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="tray-rim" x1="40" y1="80" x2="260" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#BDBAA8" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <filter id="glass-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#25231F" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Ghost Inner Tooth Baseline */}
        <path
          d="M84 94C88 64 110 50 138 53C146 54 154 54 162 53C190 50 212 64 216 94C221 132 223 162 204 198C194 216 180 234 168 236C158 238 153 222 150 196C147 222 142 238 132 236C120 234 106 216 96 198C77 162 79 132 84 94Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Clear Aligner Precision Horseshoe Tray */}
        <path
          d="M58 140 C 64 80, 102 46, 150 46 C 198 46, 236 80, 242 140 C 246 178, 236 212, 222 228 C 214 236, 198 238, 190 226 C 182 214, 186 190, 188 160 C 190 120, 172 88, 150 88 C 128 88, 110 120, 112 160 C 114 190, 118 214, 110 226 C 102 238, 86 236, 78 228 C 64 212, 54 178, 58 140 Z"
          fill="url(#invisalign-glass)"
          stroke="url(#tray-rim)"
          strokeWidth="3.5"
          filter="url(#glass-glow)"
        />

        {/* Scalloped Gingival Margin Ridges (Individual Tooth Pockets) */}
        <path
          d="M82 110 C 94 86, 108 86, 122 100 C 136 78, 164 78, 178 100 C 192 86, 206 86, 218 110"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Secondary Inner Ridge Contours */}
        <path
          d="M92 136 C 102 120, 114 120, 126 130 C 136 114, 164 114, 174 130 C 186 120, 198 120, 208 136"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Specular Refraction Highlights */}
        <path
          d="M72 130 C 76 96, 96 70, 124 58"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M176 58 C 204 70, 224 96, 228 130"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Micro Laser Etched Tracking Mark */}
        <circle cx="150" cy="180" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        <circle cx="150" cy="180" r="6" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
    </div>
  );
};

/**
 * 4. Root Canal Visual:
 * Stylized artistic tooth highlighting the inner canal chamber and restorative golden-rose inner grace line.
 */
export const RootCanalVisual: React.FC<DentalVisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[85%] h-[85%] max-h-[260px] object-contain drop-shadow-[0_16px_28px_rgba(37,35,31,0.08)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="canal-enamel" x1="60" y1="40" x2="240" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FDF0F4" />
            <stop offset="85%" stopColor="#FAD4E2" />
            <stop offset="100%" stopColor="#EBB8CB" />
          </linearGradient>

          <linearGradient id="pulp-chamber" x1="120" y1="70" x2="180" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F28EAB" />
            <stop offset="50%" stopColor="#D94B74" />
            <stop offset="100%" stopColor="#9C2044" />
          </linearGradient>

          <linearGradient id="restoration-gold" x1="140" y1="80" x2="160" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="40%" stopColor="#FDCB6E" />
            <stop offset="100%" stopColor="#E17055" />
          </linearGradient>

          <filter id="canal-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sculpted Outer Tooth Body */}
        <path
          d="M78 84C82 52 108 36 138 40C146 41 154 41 162 40C192 36 218 52 222 84C228 126 230 162 208 206C198 226 182 248 168 250C158 252 153 234 150 205C147 234 142 252 132 250C118 248 102 226 92 206C70 162 72 126 78 84Z"
          fill="url(#canal-enamel)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
        />

        {/* Translucent Enamel Cross-Section Window */}
        <path
          d="M100 88 C 105 68, 125 58, 150 58 C 175 58, 195 68, 200 88 C 205 116, 206 148, 192 184 C 182 206, 170 226, 163 232 C 158 234, 154 220, 150 196 C 146 220, 142 234, 137 232 C 130 226, 118 206, 108 184 C 94 148, 95 116, 100 88 Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {/* Inner Organic Pulp Chamber & Dual Root Canals */}
        <path
          d="M130 84 C 132 76, 142 74, 150 74 C 158 74, 168 76, 170 84 C 174 96, 170 108, 164 120 C 160 128, 166 160, 166 195 C 166 215, 162 236, 161 238 C 159 238, 158 220, 158 195 C 156 160, 152 135, 150 135 C 148 135, 144 160, 142 195 C 142 220, 141 238, 139 238 C 138 236, 134 215, 134 195 C 134 160, 140 128, 136 120 C 130 108, 126 96, 130 84 Z"
          fill="url(#pulp-chamber)"
          filter="url(#canal-glow)"
          opacity="0.85"
        />

        {/* Restorative Precision Gold Canal Pathways */}
        <path
          d="M139 236 C 141 216, 143 175, 143 145 C 143 130, 146 116, 150 110 C 154 116, 157 130, 157 145 C 157 175, 159 216, 161 236"
          stroke="url(#restoration-gold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(253,203,110,0.8)]"
        />

        {/* Top Chamber Crown Restorative Sealing Accent */}
        <ellipse cx="150" cy="85" rx="14" ry="7" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="150" cy="85" r="3.5" fill="#FDCB6E" />
      </svg>
    </div>
  );
};
