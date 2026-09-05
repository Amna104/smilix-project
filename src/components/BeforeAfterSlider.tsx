import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export interface TreatmentCase {
  id: string;
  name: string;
  category: string;
  duration: string;
  shadeImprovement?: string;
  summary: string;
  beforeLabel: string;
  afterLabel: string;
  accentColor: string;
  // Visual renderers for before and after dental states
  type: 'whitening' | 'aligners' | 'veneers' | 'bonding';
}

const TREATMENT_CASES: TreatmentCase[] = [
  {
    id: 'whitening',
    name: 'Laser Enamel Whitening',
    category: 'Cosmetic Brightening',
    duration: '60-min in-clinic',
    shadeImprovement: '8 shades brighter (VITA B1)',
    summary: 'Non-invasive cold-light laser activation lifting stubborn caffeine, tea, and tobacco pigments safely.',
    beforeLabel: 'Before: Stained & Oxidized (A3.5)',
    afterLabel: 'After: High-Luster Porcelain (B1)',
    accentColor: '#FAF198',
    type: 'whitening',
  },
  {
    id: 'aligners',
    name: 'Invisalign Clear Aligners',
    category: 'Invisible Orthodontics',
    duration: '7 months',
    shadeImprovement: '100% Arch Alignment',
    summary: 'Digital 3D biomechanical aligners correcting midline crowding, canine rotation, and bite symmetry.',
    beforeLabel: 'Before: Crowding & Overjet',
    afterLabel: 'After: Symmetrical Harmonious Arch',
    accentColor: '#AFCBE8',
    type: 'aligners',
  },
  {
    id: 'veneers',
    name: 'Handcrafted Porcelain Veneers',
    category: 'Aesthetic Smile Design',
    duration: '2 appointments',
    shadeImprovement: 'Custom Translucent Luster',
    summary: 'Ultra-thin 0.3mm feldspathic porcelain shells recreating micro-textured natural enamel and golden proportions.',
    beforeLabel: 'Before: Chipped & Discolored Edge',
    afterLabel: 'After: Golden Proportion Veneers',
    accentColor: '#D7D4C3',
    type: 'veneers',
  },
  {
    id: 'bonding',
    name: 'Composite Edge Bonding',
    category: 'Micro-Invasive Restorative',
    duration: 'Single Visit',
    shadeImprovement: 'Seamless Optical Blending',
    summary: 'Micro-hybrid nano-composite hand-layered with opalescence to restore incisal attrition and diastema gaps.',
    beforeLabel: 'Before: Diastema (Gap) & Wear',
    afterLabel: 'After: Closed Diastema & Restored Edge',
    accentColor: '#F4C8D9',
    type: 'bonding',
  },
];

/**
 * Detailed SVG Dental Smile Art for Before and After comparison
 */
const DentalArtwork: React.FC<{
  type: TreatmentCase['type'];
  isAfter: boolean;
}> = ({ type, isAfter }) => {
  if (type === 'whitening') {
    return (
      <svg viewBox="0 0 540 380" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Background dental canvas atmosphere */}
          <linearGradient id={`bg-grad-${isAfter ? 'after' : 'before'}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isAfter ? '#21262B' : '#23201D'} />
            <stop offset="100%" stopColor={isAfter ? '#14181B' : '#171514'} />
          </linearGradient>

          {/* Enamel gradient: Before is warm yellow/dull grey-cream; After is luminous diamond B1 */}
          <linearGradient id={`enamel-${isAfter ? 'after' : 'before'}`} x1="0.5" y1="0" x2="0.5" y2="1">
            {isAfter ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#F9FBFD" />
                <stop offset="75%" stopColor="#EBF4FA" />
                <stop offset="100%" stopColor="#D5E6F2" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#F4E9C1" />
                <stop offset="35%" stopColor="#EED99E" />
                <stop offset="75%" stopColor="#D9BF78" />
                <stop offset="100%" stopColor="#C4A85C" />
              </>
            )}
          </linearGradient>

          {/* Gum tissue gradient */}
          <linearGradient id="gum-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9646D" />
            <stop offset="60%" stopColor="#D87882" />
            <stop offset="100%" stopColor="#E58D97" />
          </linearGradient>

          <radialGradient id="smile-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isAfter ? '#E0F2FE' : '#FEF3C7'} stopOpacity={isAfter ? 0.25 : 0.08} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Dark Studio Background */}
        <rect width="540" height="380" fill={`url(#bg-grad-${isAfter ? 'after' : 'before'})`} />
        <circle cx="270" cy="200" r="220" fill="url(#smile-glow)" />

        {/* Realistic Gum Line (Upper Gingival Margin) */}
        <path
          d="M 60 140 Q 110 90, 160 145 Q 215 85, 270 145 Q 325 85, 380 145 Q 430 90, 480 140 L 480 80 L 60 80 Z"
          fill="url(#gum-grad)"
          opacity="0.9"
        />

        {/* Central Left Incisor */}
        <path
          d="M 215 142 C 220 120, 260 120, 265 142 C 268 180, 267 220, 266 250 C 265 258, 215 258, 214 250 C 213 220, 212 180, 215 142 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          stroke={isAfter ? '#F0F9FF' : '#B89B4E'}
          strokeWidth="1.5"
        />

        {/* Central Right Incisor */}
        <path
          d="M 275 142 C 280 120, 320 120, 325 142 C 328 180, 327 220, 326 250 C 325 258, 275 258, 274 250 C 273 220, 272 180, 275 142 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          stroke={isAfter ? '#F0F9FF' : '#B89B4E'}
          strokeWidth="1.5"
        />

        {/* Lateral Left Incisor */}
        <path
          d="M 162 144 C 166 126, 204 126, 208 144 C 210 178, 209 214, 208 244 C 207 252, 163 252, 162 244 C 161 214, 160 178, 162 144 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          stroke={isAfter ? '#F0F9FF' : '#B89B4E'}
          strokeWidth="1.5"
        />

        {/* Lateral Right Incisor */}
        <path
          d="M 332 144 C 336 126, 374 126, 378 144 C 380 178, 379 214, 378 244 C 377 252, 333 252, 332 244 C 331 214, 330 178, 332 144 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          stroke={isAfter ? '#F0F9FF' : '#B89B4E'}
          strokeWidth="1.5"
        />

        {/* Canine Left */}
        <path
          d="M 112 140 C 116 126, 152 126, 155 140 C 157 172, 156 210, 154 238 C 153 246, 113 246, 112 238 C 111 210, 110 172, 112 140 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          opacity="0.88"
        />

        {/* Canine Right */}
        <path
          d="M 385 140 C 388 126, 424 126, 428 140 C 430 172, 429 210, 428 238 C 427 246, 387 246, 386 238 C 385 210, 384 172, 385 140 Z"
          fill={`url(#enamel-${isAfter ? 'after' : 'before'})`}
          opacity="0.88"
        />

        {/* Highlights & Lustre */}
        {isAfter ? (
          <>
            {/* Luminous Enamel Sheen */}
            <path
              d="M 224 148 C 226 142, 238 140, 246 140 C 238 155, 234 195, 232 232 C 228 215, 225 180, 224 148 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            <path
              d="M 284 148 C 286 142, 298 140, 306 140 C 298 155, 294 195, 292 232 C 288 215, 285 180, 284 148 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            {/* Star Sparkle 1 */}
            <g transform="translate(258, 160)">
              <path d="M0 -14 C1 -5, 5 -1, 14 0 C5 1, 1 5, 0 14 C-1 5, -5 1, -14 0 C-5 -1, -1 -5, 0 -14 Z" fill="#FFFFFF" />
            </g>
            {/* Star Sparkle 2 */}
            <g transform="translate(340, 180)">
              <path d="M0 -10 C1 -3, 3 -1, 10 0 C3 1, 1 3, 0 10 C-1 3, -3 1, -10 0 C-3 -1, -1 -3, 0 -10 Z" fill="#FFFFFF" opacity="0.9" />
            </g>
          </>
        ) : (
          <>
            {/* Tea/Coffee Staining Texture Patches */}
            <ellipse cx="240" cy="190" rx="14" ry="24" fill="#A88536" opacity="0.45" />
            <ellipse cx="300" cy="185" rx="16" ry="28" fill="#B38E3B" opacity="0.42" />
            <ellipse cx="185" cy="195" rx="10" ry="20" fill="#99742B" opacity="0.5" />
            <ellipse cx="355" cy="195" rx="11" ry="22" fill="#99742B" opacity="0.5" />
            <path d="M 218 240 Q 240 248, 262 240" stroke="#8C671F" strokeWidth="2.5" opacity="0.6" fill="none" />
            <path d="M 278 240 Q 300 248, 322 240" stroke="#8C671F" strokeWidth="2.5" opacity="0.6" fill="none" />
          </>
        )}
      </svg>
    );
  }

  if (type === 'aligners') {
    return (
      <svg viewBox="0 0 540 380" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="align-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E2328" />
            <stop offset="100%" stopColor="#13161A" />
          </linearGradient>
          <linearGradient id="tooth-clean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F2F6F9" />
            <stop offset="100%" stopColor="#D9E3EB" />
          </linearGradient>
          <linearGradient id="gum-grad-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9646D" />
            <stop offset="100%" stopColor="#E58D97" />
          </linearGradient>
        </defs>

        <rect width="540" height="380" fill="url(#align-bg)" />

        {/* Gum Line */}
        <path
          d="M 60 145 Q 110 95, 160 145 Q 215 90, 270 145 Q 325 90, 380 145 Q 430 95, 480 145 L 480 80 L 60 80 Z"
          fill="url(#gum-grad-2)"
          opacity="0.9"
        />

        {/* Teeth Arch: After is aligned and symmetrical; Before is rotated and crowded */}
        {isAfter ? (
          <g>
            {/* Perfectly aligned midline and incisal edge */}
            <path d="M 215 145 C 220 120, 260 120, 265 145 L 265 248 C 265 254, 215 254, 215 248 Z" fill="url(#tooth-clean)" stroke="#AFCBE8" strokeWidth="1.2" />
            <path d="M 275 145 C 280 120, 320 120, 325 145 L 325 248 C 325 254, 275 254, 275 248 Z" fill="url(#tooth-clean)" stroke="#AFCBE8" strokeWidth="1.2" />
            <path d="M 160 148 C 165 125, 205 125, 208 148 L 208 244 C 208 250, 160 250, 160 244 Z" fill="url(#tooth-clean)" stroke="#AFCBE8" strokeWidth="1.2" />
            <path d="M 332 148 C 335 125, 375 125, 380 148 L 380 244 C 380 250, 332 250, 332 244 Z" fill="url(#tooth-clean)" stroke="#AFCBE8" strokeWidth="1.2" />
            <path d="M 112 150 C 115 130, 152 130, 155 150 L 155 240 C 155 246, 112 246, 112 240 Z" fill="url(#tooth-clean)" opacity="0.85" />
            <path d="M 385 150 C 388 130, 425 130, 428 150 L 428 240 C 428 246, 385 246, 385 240 Z" fill="url(#tooth-clean)" opacity="0.85" />
            
            {/* Horizontal Alignment Harmony Guide (subtle aesthetic line) */}
            <line x1="140" y1="248" x2="400" y2="248" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          </g>
        ) : (
          <g>
            {/* Crooked central tooth tilted forward overlapping neighbor */}
            <path
              d="M 215 145 C 220 120, 260 120, 265 145 L 268 252 C 268 258, 218 258, 215 252 Z"
              fill="url(#tooth-clean)"
              transform="rotate(6 240 195)"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            {/* Recessed and crowded central right tooth */}
            <path
              d="M 270 150 C 275 125, 312 125, 316 150 L 314 240 C 314 246, 270 246, 270 240 Z"
              fill="#E2E8F0"
              transform="rotate(-4 290 195)"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            {/* Crowded protruding lateral */}
            <path
              d="M 165 142 C 170 120, 210 120, 215 142 L 210 248 C 210 254, 165 254, 165 248 Z"
              fill="url(#tooth-clean)"
              transform="rotate(-8 190 195)"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            {/* Right overlapping canine */}
            <path
              d="M 324 140 C 328 120, 368 120, 372 140 L 376 250 C 376 256, 324 256, 324 250 Z"
              fill="url(#tooth-clean)"
              transform="rotate(9 350 195)"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <path d="M 112 150 C 115 130, 152 130, 155 150 L 155 240 Z" fill="url(#tooth-clean)" opacity="0.8" />
            <path d="M 385 150 C 388 130, 425 130, 428 150 L 428 240 Z" fill="url(#tooth-clean)" opacity="0.8" />
          </g>
        )}
      </svg>
    );
  }

  if (type === 'veneers') {
    return (
      <svg viewBox="0 0 540 380" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="veneer-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#252422" />
            <stop offset="100%" stopColor="#171615" />
          </linearGradient>
          <linearGradient id="porcelain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FCFBF7" />
            <stop offset="85%" stopColor="#F5F0E6" />
            <stop offset="100%" stopColor="#ECE3D3" />
          </linearGradient>
          <linearGradient id="rough-enamel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2ECE1" />
            <stop offset="60%" stopColor="#E5DAC5" />
            <stop offset="100%" stopColor="#CFC0A3" />
          </linearGradient>
        </defs>

        <rect width="540" height="380" fill="url(#veneer-bg)" />

        {/* Gum Tissue */}
        <path
          d="M 60 145 Q 110 95, 160 145 Q 215 90, 270 145 Q 325 90, 380 145 Q 430 95, 480 145 L 480 80 L 60 80 Z"
          fill="#D87882"
          opacity="0.9"
        />

        {isAfter ? (
          /* Flawless porcelain veneer facade */
          <g>
            <path d="M 215 145 C 220 120, 260 120, 265 145 L 265 252 C 265 256, 215 256, 215 252 Z" fill="url(#porcelain)" stroke="#FFF" strokeWidth="1.5" />
            <path d="M 275 145 C 280 120, 320 120, 325 145 L 325 252 C 325 256, 275 256, 275 252 Z" fill="url(#porcelain)" stroke="#FFF" strokeWidth="1.5" />
            <path d="M 160 148 C 165 125, 205 125, 208 148 L 208 246 C 208 250, 160 250, 160 246 Z" fill="url(#porcelain)" stroke="#FFF" strokeWidth="1.5" />
            <path d="M 332 148 C 335 125, 375 125, 380 148 L 380 246 C 380 250, 332 250, 332 246 Z" fill="url(#porcelain)" stroke="#FFF" strokeWidth="1.5" />
            
            {/* Opalescent translucent edge gradient reflection */}
            <path d="M 218 248 Q 240 253, 262 248" stroke="#7DD3FC" strokeWidth="2.5" opacity="0.5" fill="none" />
            <path d="M 278 248 Q 300 253, 322 248" stroke="#7DD3FC" strokeWidth="2.5" opacity="0.5" fill="none" />
            <ellipse cx="230" cy="165" rx="4" ry="18" fill="#FFF" opacity="0.75" />
            <ellipse cx="290" cy="165" rx="4" ry="18" fill="#FFF" opacity="0.75" />
          </g>
        ) : (
          /* Chipped tooth, worn incisal edge and micro-fractures */
          <g>
            {/* Left incisor with large diagonal fracture chip */}
            <path
              d="M 215 145 C 220 120, 260 120, 265 145 L 265 240 L 244 228 L 228 248 L 215 248 Z"
              fill="url(#rough-enamel)"
              stroke="#A89270"
              strokeWidth="1.5"
            />
            {/* Micro crack line */}
            <path d="M 244 228 L 248 180" stroke="#786242" strokeWidth="1.2" opacity="0.7" fill="none" />
            
            {/* Right incisor worn flat with yellow dentin exposure */}
            <path
              d="M 275 145 C 280 120, 320 120, 325 145 L 325 242 C 325 245, 275 245, 275 242 Z"
              fill="url(#rough-enamel)"
              stroke="#A89270"
              strokeWidth="1.5"
            />
            <ellipse cx="300" cy="240" rx="14" ry="4" fill="#C49B45" opacity="0.8" />
            <path d="M 160 148 C 165 125, 205 125, 208 148 L 208 246 Z" fill="url(#rough-enamel)" opacity="0.9" />
            <path d="M 332 148 C 335 125, 375 125, 380 148 L 380 246 Z" fill="url(#rough-enamel)" opacity="0.9" />
          </g>
        )}
      </svg>
    );
  }

  // Fallback / Bonding Treatment (Diastema gap closure)
  return (
    <svg viewBox="0 0 540 380" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bond-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2428" />
          <stop offset="100%" stopColor="#181517" />
        </linearGradient>
        <linearGradient id="composite-clean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FAF2F4" />
          <stop offset="100%" stopColor="#EADDE0" />
        </linearGradient>
      </defs>

      <rect width="540" height="380" fill="url(#bond-bg)" />

      {/* Gum */}
      <path
        d="M 60 145 Q 110 95, 160 145 Q 215 90, 270 145 Q 325 90, 380 145 Q 430 95, 480 145 L 480 80 L 60 80 Z"
        fill="#D87882"
        opacity="0.9"
      />

      {isAfter ? (
        /* Closed gap with natural contact point */
        <g>
          <path d="M 215 145 C 220 120, 264 120, 269 145 L 269 250 C 269 254, 215 254, 215 250 Z" fill="url(#composite-clean)" stroke="#F4C8D9" strokeWidth="1.2" />
          <path d="M 271 145 C 276 120, 320 120, 325 145 L 325 250 C 325 254, 271 254, 271 250 Z" fill="url(#composite-clean)" stroke="#F4C8D9" strokeWidth="1.2" />
          <path d="M 160 148 C 165 125, 205 125, 208 148 L 208 244 Z" fill="url(#composite-clean)" opacity="0.85" />
          <path d="M 332 148 C 335 125, 375 125, 380 148 L 380 244 Z" fill="url(#composite-clean)" opacity="0.85" />
          {/* Subtle contact point reflection */}
          <line x1="270" y1="160" x2="270" y2="246" stroke="#25231F" strokeWidth="0.8" opacity="0.3" />
        </g>
      ) : (
        /* Wide dark gap (diastema) between central incisors */
        <g>
          {/* Left tooth narrower */}
          <path d="M 215 145 C 220 120, 252 120, 256 145 L 254 250 C 254 254, 215 254, 215 250 Z" fill="url(#composite-clean)" stroke="#6B5B63" strokeWidth="1.2" />
          {/* Right tooth narrower */}
          <path d="M 284 145 C 288 120, 320 120, 325 145 L 325 250 C 325 254, 286 254, 284 250 Z" fill="url(#composite-clean)" stroke="#6B5B63" strokeWidth="1.2" />
          {/* Dark oral cavity shadow in the gap */}
          <rect x="256" y="145" width="26" height="110" fill="#0C0A0B" opacity="0.95" />
          <path d="M 160 148 C 165 125, 205 125, 208 148 L 208 244 Z" fill="url(#composite-clean)" opacity="0.85" />
          <path d="M 332 148 C 335 125, 375 125, 380 148 L 380 244 Z" fill="url(#composite-clean)" opacity="0.85" />
        </g>
      )}
    </svg>
  );
};

export const BeforeAfterSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = TREATMENT_CASES[activeCaseIndex];

  // Drag calculation
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percentage = Math.round((clamped / rect.width) * 100);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  // Reset slider position smoothly when switching treatment tabs
  useEffect(() => {
    setSliderPosition(50);
  }, [activeCaseIndex]);

  return (
    <div
      id="before-after-treatment-slider"
      className="w-full mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-16 border-t border-[#25231F]/10"
      aria-label="Interactive dental treatment before and after comparison"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF198] text-[#25231F] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#25231F]" />
            <span>Clinical Results Studio</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#25231F] tracking-tight">
            Before & <span className="italic font-normal">After</span> Transformation
          </h3>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#25231F]/70 max-w-xl">
            Drag the divider handle horizontally to reveal patient aesthetic improvements across our signature clinical treatments.
          </p>
        </div>

        {/* Treatment Selector Tabs - Mobile Horizontal Swipe Friendly */}
        <div className="flex overflow-x-auto sm:flex-wrap gap-2 sm:gap-2.5 pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {TREATMENT_CASES.map((item, idx) => {
            const isActive = idx === activeCaseIndex;
            return (
              <button
                key={item.id}
                id={`treatment-tab-${item.id}`}
                onClick={() => setActiveCaseIndex(idx)}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#25231F] text-white shadow-[0_4px_16px_rgba(37,35,31,0.18)] scale-[1.02]'
                    : 'bg-[#F7F6F1] text-[#25231F]/80 hover:bg-[#EAE8DE] hover:text-[#25231F]'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                {isActive && <Check className="w-3.5 h-3.5 text-[#FAF198]" />}
                <span>{item.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage & Case Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* LEFT / CENTER: Interactive Split Image Viewer (8 cols on desktop) */}
        <div className="lg:col-span-8 w-full">
          <div
            ref={containerRef}
            id="slider-container-box"
            tabIndex={0}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Interactive before and after reveal for ${activeCase.name}`}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] rounded-[20px] sm:rounded-[32px] overflow-hidden select-none cursor-ew-resize touch-none shadow-[0_16px_48px_rgba(37,35,31,0.12)] border border-[#25231F]/10 bg-[#171514]"
          >
            {/* 1. Base Layer: BEFORE State (Shows on the left side) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <DentalArtwork type={activeCase.type} isAfter={false} />
              {/* Badge: BEFORE */}
              <div className="absolute top-3.5 sm:top-6 left-3.5 sm:left-6 z-10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                Before
              </div>
            </div>

            {/* 2. Top Clipped Layer: AFTER State (Revealed by slider position) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
              style={{
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
              }}
            >
              <DentalArtwork type={activeCase.type} isAfter={true} />
              {/* Badge: AFTER */}
              <div className="absolute top-3.5 sm:top-6 right-3.5 sm:right-6 z-10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FAF198] text-[#25231F] text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                After Result
              </div>
            </div>

            {/* 3. Drag Line Divider & Ergonomic Circular Handle with Enhanced Touch Target */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical Divider Hairline */}
              <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" />

              {/* Center Drag Handle with expanded touch radius */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#25231F] flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-transform duration-150 border-2 border-[#25231F]/10 before:absolute before:-inset-3 before:content-[''] ${
                  isDragging ? 'scale-110' : 'scale-100'
                }`}
              >
                <div className="flex items-center gap-0.5 pointer-events-none">
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25231F]" />
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25231F]" />
                </div>
              </div>
            </div>

            {/* Subtle On-Canvas Instruction Pill */}
            <div className="absolute bottom-3.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[10px] sm:text-[11px] tracking-wide flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FAF198] animate-pulse" />
              <span>Drag handle left / right</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Case Details & Metric Specs (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="bg-[#FAF9F5] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-[#25231F]/8">
            <div className="text-xs font-semibold tracking-wider text-[#25231F]/60 uppercase">
              {activeCase.category}
            </div>
            <h4 className="font-editorial text-2xl sm:text-3xl text-[#25231F] mt-1 mb-3">
              {activeCase.name}
            </h4>
            <p className="text-sm text-[#25231F]/80 leading-relaxed mb-6">
              {activeCase.summary}
            </p>

            {/* Treatment Metrics Card */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-[#25231F]/8 text-xs sm:text-sm">
                <span className="text-[#25231F]/60 font-medium">Treatment Time:</span>
                <span className="font-semibold text-[#25231F]">{activeCase.duration}</span>
              </div>
              {activeCase.shadeImprovement && (
                <div className="flex items-center justify-between py-2 border-b border-[#25231F]/8 text-xs sm:text-sm">
                  <span className="text-[#25231F]/60 font-medium">Outcome Measure:</span>
                  <span className="font-semibold text-[#25231F]">{activeCase.shadeImprovement}</span>
                </div>
              )}
            </div>

            {/* Clinical Comparison Notes */}
            <div className="bg-white rounded-[16px] p-3.5 sm:p-4 border border-[#25231F]/6 mb-6 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#25231F]/70">
                <Info className="w-3.5 h-3.5 text-[#25231F] shrink-0 mt-0.5" />
                <span><strong>Left:</strong> {activeCase.beforeLabel}</span>
              </div>
              <div className="flex items-start gap-2 text-[#25231F]/70">
                <Check className="w-3.5 h-3.5 text-[#25231F] shrink-0 mt-0.5" />
                <span><strong>Right:</strong> {activeCase.afterLabel}</span>
              </div>
            </div>

            {/* Quick Action Anchor */}
            <a
              href="#appointment"
              id="cta-book-slider-treatment"
              data-open-appointment="true"
              data-treatment={activeCase.name}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#25231F] text-white py-3.5 px-6 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#151412] hover:scale-[1.01] shadow-[0_4px_18px_rgba(37,35,31,0.12)] cursor-pointer"
            >
              <span>Consult On This Treatment</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
