import React, { useRef, useState, useEffect } from 'react';
import { Doctor } from '../data/doctors';
import { DoctorCard } from './DoctorCard';

export interface DoctorCarouselProps {
  doctors: Doctor[];
  cardRefsCallback?: (index: number, el: HTMLDivElement | null) => void;
  imageRefsCallback?: (index: number, el: HTMLImageElement | null) => void;
}

export const DoctorCarousel: React.FC<DoctorCarouselProps> = ({
  doctors,
  cardRefsCallback,
  imageRefsCallback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      // Only enable drag on primary mouse button
      if (e.button !== 0) return;
      setIsDragging(true);
      hasMovedRef.current = false;
      startXRef.current = e.pageX - container.offsetLeft;
      scrollLeftRef.current = container.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * 1.5; // drag sensitivity
      if (Math.abs(walk) > 5) {
        hasMovedRef.current = true;
      }
      container.scrollLeft = scrollLeftRef.current - walk;
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onClickCapture = (e: MouseEvent) => {
      // If a drag movement occurred, prevent click from triggering link navigation
      if (hasMovedRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClickCapture, true);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClickCapture, true);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full">
      {/* 
        Responsive Layout:
        - Mobile & Tablet (< lg): Horizontally scrollable carousel (78-84vw per card, natural touch scroll, visual right peek)
        - Desktop (>= lg): 4-column grid with generous spacing
      */}
      <div
        ref={containerRef}
        id="doctors-track"
        className={`w-full overflow-x-auto lg:overflow-x-visible scrollbar-none flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 -mx-5 px-5 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 snap-x lg:snap-none snap-mandatory pb-4 lg:pb-0 ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-default'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {doctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="w-[80vw] max-w-[340px] sm:w-[320px] lg:w-auto flex-shrink-0 snap-start lg:snap-align-none"
          >
            <DoctorCard
              doctor={doctor}
              index={index}
              cardRefCallback={(el) => {
                if (cardRefsCallback) cardRefsCallback(index, el);
              }}
              imageRefCallback={(el) => {
                if (imageRefsCallback) imageRefsCallback(index, el);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
