import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let globalLenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export interface LenisConfigOptions {
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  syncTouch?: boolean;
}

/**
 * Initializes the single global Lenis instance and connects it to GSAP and ScrollTrigger.
 */
export function initializeLenis(options: LenisConfigOptions = {}): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Return existing instance if already active
  if (globalLenis) {
    return globalLenis;
  }

  // If user prefers reduced motion, fallback to standard native scrolling
  if (prefersReducedMotion()) {
    return null;
  }

  try {
    const isTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    globalLenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 0.95,
      // For touch devices, maintain responsive standard feel without sluggish inertia
      touchMultiplier: options.touchMultiplier ?? (isTouch ? 1.0 : 1.1),
      syncTouch: options.syncTouch ?? false,
      autoResize: true,
    });

    // Connect Lenis scroll events directly to ScrollTrigger update
    globalLenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis with the GSAP ticker for a single unified animation loop
    tickerCallback = (time: number) => {
      globalLenis?.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once Lenis initializes
    ScrollTrigger.refresh();

    return globalLenis;
  } catch (error) {
    console.warn('Lenis smooth scrolling could not be initialized:', error);
    return null;
  }
}

/**
 * Returns the active global Lenis instance
 */
export function getLenis(): Lenis | null {
  return globalLenis;
}

/**
 * Destroys the global Lenis instance and removes ticker listeners
 */
export function destroyScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (globalLenis) {
    globalLenis.destroy();
    globalLenis = null;
  }
}

/**
 * Refreshes ScrollTrigger positions after dynamic content or asset loads
 */
export function refreshScroll(): void {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

/**
 * Smoothly scrolls to a target section or selector, accounting for navbar offset
 */
export function scrollToSection(
  target: string | HTMLElement,
  options: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    onComplete?: () => void;
  } = {}
): void {
  if (typeof window === 'undefined') return;

  const { offset = -80, duration = 1.2, immediate = false, onComplete } = options;

  let targetEl: HTMLElement | null = null;

  if (typeof target === 'string') {
    if (target === '#' || target === '#hero' || target === '') {
      if (globalLenis && !prefersReducedMotion() && !immediate) {
        globalLenis.scrollTo(0, { duration, onComplete });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        onComplete?.();
      }
      return;
    }

    targetEl = document.querySelector(target) as HTMLElement;
  } else {
    targetEl = target;
  }

  if (!targetEl) return;

  if (globalLenis && !prefersReducedMotion() && !immediate) {
    globalLenis.scrollTo(targetEl, {
      offset,
      duration,
      onComplete,
    });
  } else {
    const elTop = targetEl.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top: Math.max(0, elTop),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
    onComplete?.();
  }
}
