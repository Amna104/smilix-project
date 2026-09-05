import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

export type ParallaxStrength = 'small' | 'medium' | 'large' | number;

export interface ParallaxOptions {
  strength?: ParallaxStrength;
  direction?: 'up' | 'down';
  scrub?: number | boolean;
  scale?: number;
  trigger?: HTMLElement | string;
}

const STRENGTH_VALUES: Record<string, number> = {
  small: 16,
  medium: 32,
  large: 54,
};

/**
 * Initializes transform-based scroll parallax on a target element
 */
export function initParallax(
  target: HTMLElement,
  options: ParallaxOptions = {}
): ScrollTrigger | null {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return null;
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    // Keep touch scrolling snappy without heavy parallax lag
    return null;
  }

  const {
    strength = 'medium',
    direction = 'up',
    scrub = 0.5,
    scale,
    trigger,
  } = options;

  const distance =
    typeof strength === 'number'
      ? strength
      : STRENGTH_VALUES[strength] || STRENGTH_VALUES.medium;

  const yMove = direction === 'up' ? -distance : distance;

  if (scale) {
    gsap.set(target, { scale });
  }

  const tween = gsap.to(target, {
    y: yMove,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || target,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
      invalidateOnRefresh: true,
    },
  });

  return tween.scrollTrigger || null;
}

/**
 * React hook to attach subtle transform parallax to a ref
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion()) return;

    const st = initParallax(el, options);

    return () => {
      st?.kill();
    };
  }, [options.strength, options.direction, options.scale]);

  return elementRef;
}

/**
 * Automatically attaches subtle parallax to elements with data-parallax inside a container
 */
export function initDataParallax(container: HTMLElement = document.body): () => void {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return () => {};
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return () => {};

  const elements = container.querySelectorAll<HTMLElement>('[data-parallax]');
  const triggers: ScrollTrigger[] = [];

  elements.forEach((el) => {
    const strengthAttr = el.getAttribute('data-parallax') as ParallaxStrength;
    const directionAttr = (el.getAttribute('data-parallax-direction') || 'up') as 'up' | 'down';
    const st = initParallax(el, {
      strength: strengthAttr || 'small',
      direction: directionAttr,
      scrub: 0.6,
    });
    if (st) triggers.push(st);
  });

  return () => {
    triggers.forEach((st) => st.kill());
  };
}
