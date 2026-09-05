import Lenis from 'lenis';
import { getLenis } from './scroll';

export interface ScrollVelocityState {
  velocity: number;
  direction: 1 | -1 | 0;
  progress: number;
  scrollY: number;
}

type VelocityListener = (state: ScrollVelocityState) => void;

let currentState: ScrollVelocityState = {
  velocity: 0,
  direction: 0,
  progress: 0,
  scrollY: 0,
};

const listeners = new Set<VelocityListener>();
let isTracking = false;
let lastScrollY = 0;

/**
 * Updates internal velocity values and notifies registered subscribers
 */
function updateVelocity(scrollY: number, velocity: number) {
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

  let direction: 1 | -1 | 0 = 0;
  if (velocity > 0.1 || scrollY > lastScrollY + 0.5) {
    direction = 1;
  } else if (velocity < -0.1 || scrollY < lastScrollY - 0.5) {
    direction = -1;
  }

  currentState = {
    velocity,
    direction,
    progress,
    scrollY,
  };

  lastScrollY = scrollY;

  listeners.forEach((listener) => {
    listener(currentState);
  });
}

/**
 * Initializes the velocity tracking system with Lenis
 */
export function initScrollVelocityTracking(lenisInstance?: Lenis | null): () => void {
  if (typeof window === 'undefined' || isTracking) {
    return () => {};
  }

  const lenis = lenisInstance || getLenis();

  if (lenis) {
    isTracking = true;
    const handleScroll = (e: { scroll: number; velocity: number }) => {
      updateVelocity(e.scroll, e.velocity);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      isTracking = false;
    };
  } else {
    // Fallback for native scrolling
    isTracking = true;
    let lastTime = performance.now();

    const handleNativeScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentScroll = window.scrollY;
      const velocity = ((currentScroll - lastScrollY) / dt) * 16.67;

      updateVelocity(currentScroll, velocity);
      lastTime = now;
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      isTracking = false;
    };
  }
}

/**
 * Returns the current synchronous scroll velocity state
 */
export function getScrollVelocityState(): ScrollVelocityState {
  return currentState;
}

/**
 * Subscribes a callback to receive scroll velocity updates
 */
export function subscribeScrollVelocity(listener: VelocityListener): () => void {
  listeners.add(listener);
  // Initial callback with current state
  listener(currentState);

  return () => {
    listeners.delete(listener);
  };
}
