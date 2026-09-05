import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates subtle continuous vertical floating animation using GSAP
 */
export const createFloatingAnimation = (
  target: gsap.DOMTarget,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    rotation?: number;
  } = {}
) => {
  if (prefersReducedMotion()) return null;

  const { y = 8, duration = 4, delay = 0, rotation = 0 } = options;

  return gsap.to(target, {
    y: `+=${y}`,
    rotation: rotation !== 0 ? `+=${rotation}` : undefined,
    duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay,
  });
};

/**
 * Performant quickTo mouse parallax helper
 */
export const createParallaxEffect = (
  elements: { target: Element | null; factorX: number; factorY: number }[]
) => {
  if (prefersReducedMotion()) return () => {};

  const setters = elements
    .filter((item) => item.target !== null)
    .map((item) => ({
      quickX: gsap.quickTo(item.target!, 'x', { duration: 0.8, ease: 'power2.out' }),
      quickY: gsap.quickTo(item.target!, 'y', { duration: 0.8, ease: 'power2.out' }),
      factorX: item.factorX,
      factorY: item.factorY,
    }));

  const handleMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const normY = (e.clientY / innerHeight - 0.5) * 2;

    setters.forEach(({ quickX, quickY, factorX, factorY }) => {
      quickX(normX * factorX);
      quickY(normY * factorY);
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};
