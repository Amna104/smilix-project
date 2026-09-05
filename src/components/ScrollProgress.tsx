import React, { useEffect, useRef } from 'react';
import { subscribeScrollVelocity } from '../animations/scrollVelocity';
import { prefersReducedMotion } from '../animations/gsap';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    // Direct transform style update for 0 re-renders
    const unsubscribe = subscribeScrollVelocity((state) => {
      bar.style.transform = `scaleX(${state.progress})`;
    });

    return unsubscribe;
  }, []);

  return (
    <div
      id="global-scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent select-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        id="global-scroll-progress-bar"
        className="w-full h-full bg-[#FFF99A] will-change-transform transform-gpu origin-left shadow-[0_1px_6px_rgba(255,249,154,0.4)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
