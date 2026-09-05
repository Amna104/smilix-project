import React, { useEffect, useRef } from 'react';
import { Users, Smile, ShieldCheck, Stethoscope, LucideIcon } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap';
import { StatItem } from '../components/StatItem';

interface StatDefinition {
  id: string;
  icon: LucideIcon;
  targetValue: number;
  suffix: string;
  displayFallback: string;
  label: string;
  borderClasses: string;
}

const STATS_DATA: StatDefinition[] = [
  {
    id: 'patients',
    icon: Users,
    targetValue: 10,
    suffix: 'K+',
    displayFallback: '10K+',
    label: 'Patients Treated',
    borderClasses: 'border-r border-b lg:border-b-0 border-[#25231F]/10',
  },
  {
    id: 'satisfaction',
    icon: Smile,
    targetValue: 95,
    suffix: '%',
    displayFallback: '95%',
    label: 'Patient Satisfaction',
    borderClasses: 'border-b lg:border-b-0 lg:border-r border-[#25231F]/10',
  },
  {
    id: 'care-plus',
    icon: ShieldCheck,
    targetValue: 50,
    suffix: '+',
    displayFallback: '50+',
    label: 'Dental Care Plus',
    borderClasses: 'border-r border-[#25231F]/10',
  },
  {
    id: 'experts',
    icon: Stethoscope,
    targetValue: 60,
    suffix: '+',
    displayFallback: '60+',
    label: 'Expert Dentists',
    borderClasses: '',
  },
];

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Setup Sequential Stat Entrance Reveal
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });

      // Staggered reveal for each stat column
      iconRefs.current.forEach((icon, i) => {
        const num = numberRefs.current[i];
        const label = labelRefs.current[i];

        if (icon && num && label) {
          revealTl.fromTo(
            icon,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            i === 0 ? 0 : '-=0.45'
          )
            .fromTo(
              num,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
              '-=0.5'
            )
            .fromTo(
              label,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
              '-=0.5'
            );
        }
      });

      // 2. Setup Smooth Number Count-Up Animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          STATS_DATA.forEach((stat, i) => {
            const numEl = numberRefs.current[i];
            if (!numEl) return;

            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.targetValue,
              duration: 1.8,
              ease: 'power2.out',
              delay: 0.15 + i * 0.08,
              onUpdate: () => {
                const currentVal = Math.round(counter.val);
                numEl.textContent = `${currentVal}${stat.suffix}`;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="smilix-statistics"
      aria-label="Practice Statistics & Trust Metrics"
      className="relative z-10 w-full bg-[#F7F6F1] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch">
          {STATS_DATA.map((stat, index) => (
            <StatItem
              key={stat.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              id={stat.id}
              icon={stat.icon}
              displayFallback={stat.displayFallback}
              label={stat.label}
              borderClasses={stat.borderClasses}
              iconRef={{
                get current() {
                  return iconRefs.current[index] || null;
                },
                set current(val) {
                  iconRefs.current[index] = val;
                },
              }}
              numberRef={{
                get current() {
                  return numberRefs.current[index] || null;
                },
                set current(val) {
                  numberRefs.current[index] = val;
                },
              }}
              labelRef={{
                get current() {
                  return labelRefs.current[index] || null;
                },
                set current(val) {
                  labelRefs.current[index] = val;
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
