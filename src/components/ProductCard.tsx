import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { scrollToSection } from '../animations/scroll';
import { Product } from '../data/products';

export interface ProductCardProps {
  product: Product;
  index: number;
  className?: string;
  cardRefCallback?: (el: HTMLDivElement | null) => void;
  imageRefCallback?: (el: HTMLImageElement | null) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  className = '',
  cardRefCallback,
  imageRefCallback,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = cardInnerRef.current;
    const title = titleRef.current;
    const imgWrapper = imageWrapperRef.current;
    const img = imageRef.current;
    const button = buttonRef.current;
    const arrow = arrowRef.current;

    if (!card || !inner || !img || !button) return;
    if (prefersReducedMotion()) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // QuickTo for 3D card tilt (±2 degrees max)
    const rotXTo = gsap.quickTo(inner, 'rotationX', {
      duration: 0.45,
      ease: 'power2.out',
    });
    const rotYTo = gsap.quickTo(inner, 'rotationY', {
      duration: 0.45,
      ease: 'power2.out',
    });

    // QuickTo for product image layered depth movement (8-12px)
    const imgXTo = gsap.quickTo(img, 'x', {
      duration: 0.45,
      ease: 'power2.out',
    });
    const imgYTo = gsap.quickTo(img, 'y', {
      duration: 0.45,
      ease: 'power2.out',
    });

    // QuickTo for magnetic button movement (4-8px)
    const btnXTo = gsap.quickTo(button, 'x', {
      duration: 0.35,
      ease: 'power2.out',
    });
    const btnYTo = gsap.quickTo(button, 'y', {
      duration: 0.35,
      ease: 'power2.out',
    });

    const handleMouseEnter = () => {
      // 1. Card translateY(-8px) & elevation shadow
      gsap.to(inner, {
        y: -8,
        boxShadow: '0 24px 44px -10px rgba(0, 0, 0, 0.35)',
        duration: 0.45,
        ease: 'power2.out',
      });

      // 2. Product title translateY(-3px)
      if (title) {
        gsap.to(title, {
          y: -3,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // 3. Product image scale(1.08) and translateY(-5px)
      gsap.to(img, {
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out',
      });

      // 4. Arrow button scale(1.08) & slight rotation
      gsap.to(button, {
        scale: 1.08,
        rotation: 8,
        duration: 0.35,
        ease: 'back.out(1.5)',
      });

      // 5. Arrow icon translateX(3px) translateY(-3px)
      if (arrow) {
        gsap.to(arrow, {
          x: 3,
          y: -3,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;

      const rect = card.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

      // 3D card tilt (±2 degrees max)
      rotYTo(normX * 2.2);
      rotXTo(-normY * 2.2);

      // Product image moves slightly more for layered depth
      imgXTo(normX * 10);
      imgYTo(normY * 10 - 5); // includes hover lift

      // Magnetic Arrow interaction:
      // Compute distance to button center
      const btnRect = button.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      // Magnetic influence within 90px of button
      if (dist < 90) {
        const factor = (1 - dist / 90) * 7; // up to 7px magnetic attraction
        const angle = Math.atan2(e.clientY - btnCenterY, e.clientX - btnCenterX);
        btnXTo(Math.cos(angle) * factor);
        btnYTo(Math.sin(angle) * factor);
      } else {
        btnXTo(0);
        btnYTo(0);
      }
    };

    const handleMouseLeave = () => {
      // Reset card tilt and elevation
      gsap.to(inner, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.20)',
        duration: 0.55,
        ease: 'power2.out',
      });

      // Reset title position
      if (title) {
        gsap.to(title, {
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        });
      }

      // Reset product image
      gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      });

      // Reset arrow button & magnetic offset
      gsap.to(button, {
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      });

      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (cardRefCallback) cardRefCallback(el);
      }}
      id={`product-card-${product.id}`}
      className={`relative w-full [perspective:1000px] select-none ${className}`}
    >
      <a
        ref={cardInnerRef}
        href="#appointment"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#appointment', { offset: -80 });
        }}
        aria-label={product.ariaLabel}
        style={{ backgroundColor: product.background }}
        className="group relative flex flex-col justify-between w-full h-[375px] sm:h-[395px] lg:h-[410px] xl:h-[420px] rounded-[20px] sm:rounded-[22px] lg:rounded-[24px] p-5 sm:p-6 overflow-hidden border border-black/10 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.20)] focus:outline-none focus:ring-2 focus:ring-[#F7F6F1] focus:ring-offset-4 focus:ring-offset-[#25231F] will-change-transform block text-left cursor-pointer"
      >
        {/* Top Content: Category Label, Product Name, Short Descriptor */}
        <div className="relative z-20 flex flex-col items-start w-full">
          {/* Category Label */}
          <span
            id={`product-cat-${product.id}`}
            className="font-sans text-[10px] sm:text-[10.5px] font-semibold tracking-[0.12em] uppercase text-[#25231F]/70"
          >
            {product.category}
          </span>

          {/* Product Title */}
          <h3
            ref={titleRef}
            id={`product-name-${product.id}`}
            className="mt-1.5 font-editorial text-[26px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[0.98] text-[#25231F] font-normal tracking-[-0.02em] will-change-transform"
          >
            {product.name}
          </h3>

          {/* Short Descriptor */}
          <p
            id={`product-desc-${product.id}`}
            className="mt-1.5 sm:mt-2 font-sans text-[12.5px] sm:text-[13px] leading-[1.35] text-[#25231F]/75 font-normal max-w-[210px]"
          >
            {product.description}
          </p>
        </div>

        {/* Large Product Visual: Dominates the card */}
        <div
          ref={imageWrapperRef}
          id={`product-visual-${product.id}`}
          className="relative z-10 w-full mt-auto mb-1 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full max-w-[190px] sm:max-w-[210px] lg:max-w-[220px] aspect-square rounded-[16px] sm:rounded-[18px] overflow-hidden shadow-[0_10px_26px_rgba(37,35,31,0.12)] border border-[#25231F]/10 bg-white/30 backdrop-blur-[2px]">
            <img
              ref={(el) => {
                imageRef.current = el;
                if (imageRefCallback) imageRefCallback(el);
              }}
              src={product.image}
              alt={product.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover object-center will-change-transform transform-gpu"
            />
          </div>
        </div>

        {/* Bottom-Right: Magnetic Circular Arrow Button */}
        <div
          ref={buttonRef}
          id={`product-arrow-${product.id}`}
          className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25231F] flex items-center justify-center text-[#F7F6F1] shadow-[0_6px_16px_rgba(0,0,0,0.30)] will-change-transform cursor-pointer"
          aria-hidden="true"
        >
          <ArrowUpRight
            ref={arrowRef}
            size={18}
            strokeWidth={2.2}
            className="text-[#F7F6F1] will-change-transform"
          />
        </div>
      </a>
    </div>
  );
};
