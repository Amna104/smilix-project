/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Marquee } from './sections/Marquee';
import { Stats } from './sections/Stats';
import { Services } from './sections/Services';
import { Doctors } from './sections/Doctors';
import { Products } from './sections/Products';
import { Reviews } from './sections/Reviews';
import { AppointmentCTA } from './sections/AppointmentCTA';
import { Footer } from './sections/Footer';
import { LenisProvider } from './animations/LenisProvider';
import { AppointmentModalProvider } from './context/AppointmentModalContext';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollTrigger } from './animations/gsap';

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger calculations after web fonts and assets settle
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <LenisProvider>
      <AppointmentModalProvider>
        {/* Subtle global scroll progress bar */}
        <ScrollProgress />

        <div className="relative z-0 min-h-screen bg-[#F7F6F1] text-[#25231F] selection:bg-[#FFF99A] selection:text-[#25231F] flex flex-col overflow-x-hidden">
          {/* Premium Sticky / Fixed Navigation */}
          <Navbar />

          {/* Main Content Area with explicit z-index and flex layout */}
          <main className="relative z-10 flex-1 w-full flex flex-col justify-start">
            <Hero />
            <Marquee />
            <Stats />
            <Services />
            <Doctors />
            <Products />
            <Reviews />
            <AppointmentCTA />
          </main>

          {/* Cinematic Editorial Footer */}
          <Footer />
        </div>
      </AppointmentModalProvider>
    </LenisProvider>
  );
}

