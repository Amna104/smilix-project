import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { initializeLenis, destroyScroll, getLenis, scrollToSection } from './scroll';
import { initScrollVelocityTracking } from './scrollVelocity';

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: typeof scrollToSection;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: scrollToSection,
});

export const useLenisContext = () => useContext(LenisContext);

export interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize the global Lenis instance once
    const instance = initializeLenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false,
    });
    lenisRef.current = instance;

    // 2. Initialize scroll velocity tracking
    const cleanupVelocity = initScrollVelocityTracking(instance);

    // 3. Prevent scroll restoration on page reload (start fresh at top as requested)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      cleanupVelocity();
      destroyScroll();
      lenisRef.current = null;
    };
  }, []);

  const value: LenisContextValue = {
    lenis: lenisRef.current || getLenis(),
    scrollTo: scrollToSection,
  };

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
};
