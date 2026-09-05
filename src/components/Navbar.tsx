import React, { useState, useEffect, useRef } from 'react';
import { User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { gsap } from '../animations/gsap';
import { scrollToSection } from '../animations/scroll';
import { subscribeScrollVelocity } from '../animations/scrollVelocity';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Product', href: '#products' },
  { name: 'Service', href: '#services' },
  { name: 'Appointment', href: '#appointment' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<SVGSVGElement>(null);
  const bagIconRef = useRef<SVGSVGElement>(null);

  // Scroll listener to update sticky glass styling
  useEffect(() => {
    const unsubscribe = subscribeScrollVelocity(({ scrollY }) => {
      // Glass styling threshold
      setIsScrolled(scrollY > 20);
      setIsHidden(false);
    });

    return unsubscribe;
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Allow any mobile menu transition / body overflow to unlock then smoothly scroll
    setTimeout(() => {
      scrollToSection(href, { offset: -80 });
    }, 20);
  };

  // Desktop Pill Hover micro-interaction with GSAP
  const handlePillMouseEnter = () => {
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        scale: 1.04,
        backgroundColor: '#1C1A17',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (userIconRef.current) {
      gsap.to(userIconRef.current, { y: -1, rotate: -4, duration: 0.25, ease: 'power1.out' });
    }
    if (bagIconRef.current) {
      gsap.to(bagIconRef.current, { y: -1, rotate: 4, duration: 0.25, ease: 'power1.out' });
    }
  };

  const handlePillMouseLeave = () => {
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        scale: 1,
        backgroundColor: '#25231F',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    if (userIconRef.current) {
      gsap.to(userIconRef.current, { y: 0, rotate: 0, duration: 0.25, ease: 'power1.out' });
    }
    if (bagIconRef.current) {
      gsap.to(bagIconRef.current, { y: 0, rotate: 0, duration: 0.25, ease: 'power1.out' });
    }
  };

  // Mobile menu GSAP animated reveal and sequential link cascade
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();

      tl.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'power2.out',
      });

      const validLinks = menuItemsRef.current.filter(Boolean);
      if (validLinks.length > 0) {
        tl.fromTo(
          validLinks,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in',
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        id="smilix-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-all duration-300 ease-out py-2.5 sm:py-3 px-4 sm:px-8 lg:px-12 ${
          isHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0 pointer-events-auto'
        } ${
          isScrolled
            ? 'bg-[#F7F6F1]/85 backdrop-blur-md border-b border-[#25231F]/8 shadow-[0_4px_24px_rgba(37,35,31,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* LEFT: Logo */}
          <a
            href="#"
            id="smilix-logo"
            aria-label="Smilix Home"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#25231F] transition-transform duration-300 group-hover:scale-[1.02]">
              Smilix
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#AFC4B7] mb-1 group-hover:scale-125 transition-transform duration-300" />
          </a>

          {/* CENTER: Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                id={`nav-link-${idx}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative py-1 text-[14px] font-medium text-[#25231F]/90 transition-all duration-200 hover:text-[#25231F]"
              >
                <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                  {item.name}
                </span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#25231F] transition-all duration-300 ease-out group-hover:w-full opacity-80" />
              </a>
            ))}
          </nav>

          {/* RIGHT: Compact Luxury Pill [User] | [ShoppingBag] */}
          <div className="hidden sm:flex items-center gap-3">
            <div
              ref={pillRef}
              id="user-cart-pill"
              onMouseEnter={handlePillMouseEnter}
              onMouseLeave={handlePillMouseLeave}
              className="flex items-center bg-[#25231F] text-white px-3.5 py-2 rounded-full cursor-pointer transition-colors duration-300 select-none shadow-[0_2px_10px_rgba(37,35,31,0.12)]"
              role="button"
              tabIndex={0}
              aria-label="Account and Cart"
            >
              <button
                type="button"
                aria-label="Patient Account"
                className="p-1 focus:outline-none text-white/90 hover:text-white transition-colors"
              >
                <User ref={userIconRef} size={15} strokeWidth={2.2} />
              </button>

              <div className="w-[1px] h-3.5 bg-white/20 mx-2" aria-hidden="true" />

              <button
                type="button"
                aria-label="Shopping Bag"
                className="p-1 focus:outline-none text-white/90 hover:text-white transition-colors flex items-center gap-1"
              >
                <ShoppingBag ref={bagIconRef} size={15} strokeWidth={2.2} />
                <span className="text-[11px] font-semibold text-[#FFF99A] ml-0.5">2</span>
              </button>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE (Visible on all screens below md: 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="w-11 h-11 rounded-full bg-[#25231F] text-white flex items-center justify-center focus:outline-none transition-transform active:scale-95 shadow-sm"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN / OVERLAY MENU */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu-overlay"
        aria-hidden={!isMobileMenuOpen}
        className="fixed inset-0 z-40 bg-[#F7F6F1] flex flex-col justify-between p-5 sm:p-8 md:hidden opacity-0 pointer-events-none transition-opacity overflow-y-auto"
      >
        <div className="pt-20 flex flex-col gap-4 sm:gap-6">
          <div className="text-xs uppercase tracking-widest text-[#25231F]/50 font-semibold mb-1">
            Navigation
          </div>
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              ref={(el) => {
                menuItemsRef.current[idx] = el;
              }}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-editorial text-3xl sm:text-4xl text-[#25231F] hover:text-[#25231F]/70 transition-colors flex items-center justify-between border-b border-[#25231F]/10 pb-3.5 sm:pb-4"
            >
              <span>{item.name}</span>
              <ArrowRight size={20} className="text-[#25231F]/40" />
            </a>
          ))}

          {/* Direct Mobile Book Appointment Button */}
          <div className="pt-3">
            <a
              href="#appointment"
              onClick={(e) => handleNavClick(e, '#appointment')}
              className="w-full h-12 rounded-full bg-[#25231F] text-white flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-transform"
            >
              <span>Book An Appointment</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom actions for mobile */}
        <div className="pt-6 mt-4 border-t border-[#25231F]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25231F] text-white flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#25231F]">Patient Portal</div>
              <div className="text-[11px] text-[#25231F]/60">Sign in to manage visits</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FFFCEB] border border-[#25231F]/10 px-3 py-1.5 rounded-full">
            <ShoppingBag size={14} className="text-[#25231F]" />
            <span className="text-xs font-semibold text-[#25231F]">Bag (2)</span>
          </div>
        </div>
      </div>
    </>
  );
};
