import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../animations/scroll';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

interface NavColumn {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
    isAddress?: boolean;
  }[];
}

const FOOTER_COLUMNS: NavColumn[] = [
  {
    title: 'EXPLORE',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'Our Team', href: '#team' },
      { label: 'Reviews', href: '#reviews' },
    ],
  },
  {
    title: 'PATIENTS',
    links: [
      { label: 'Book Appointment', href: '#appointment' },
      { label: 'Dental Products', href: '#products' },
      { label: 'Patient Resources', href: '#resources' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { label: 'hello@smilix.com', href: 'mailto:hello@smilix.com' },
      { label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
      { label: '123 Smile Avenue', href: '#', isAddress: true },
      { label: 'New York, NY', href: '#', isAddress: true },
    ],
  },
  {
    title: 'FOLLOW',
    links: [
      { label: 'Instagram', href: 'https://instagram.com', isExternal: true },
      { label: 'Facebook', href: 'https://facebook.com', isExternal: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', isExternal: true },
    ],
  },
];

export interface FooterNavProps {
  onColumnRef?: (index: number, el: HTMLDivElement | null) => void;
}

export const FooterNav: React.FC<FooterNavProps> = ({ onColumnRef }) => {
  const { openModal } = useAppointmentModal();
  return (
    <div
      id="footer-navigation"
      className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 w-full pt-4 pb-2"
    >
      {FOOTER_COLUMNS.map((col, colIdx) => (
        <div
          key={col.title}
          ref={(el) => onColumnRef && onColumnRef(colIdx, el)}
          id={`footer-col-${col.title.toLowerCase()}`}
          className="flex flex-col space-y-4"
        >
          {/* Column Header */}
          <h3 className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#FFF99A]">
            {col.title}
          </h3>

          {/* Links list */}
          <ul className="space-y-2.5 sm:space-y-3">
            {col.links.map((link) => {
              if (link.isAddress) {
                return (
                  <li key={link.label}>
                    <span className="font-sans text-[14px] sm:text-[15px] text-[#F7F6F1]/70 leading-relaxed block select-text">
                      {link.label}
                    </span>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={
                      link.href.startsWith('#')
                        ? (e) => {
                            e.preventDefault();
                            if (link.href === '#appointment') {
                              openModal();
                              return;
                            }
                            scrollToSection(link.href, { offset: -80 });
                          }
                        : undefined
                    }
                    aria-label={
                      link.isExternal
                        ? `Follow Smilix on ${link.label} (opens in new tab)`
                        : `Navigate to ${link.label}`
                    }
                    className="group inline-flex items-center gap-1.5 font-sans text-[14px] sm:text-[15px] text-[#F7F6F1]/80 hover:text-[#FFF99A] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#FFF99A] rounded-sm py-0.5"
                  >
                    <span className="relative transform transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                      {/* Subtle Underline */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFF99A] transition-all duration-200 group-hover:w-full" />
                    </span>
                    {link.isExternal && (
                      <ArrowUpRight
                        size={13}
                        className="opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#FFF99A]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
