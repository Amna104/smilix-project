import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText,
  X,
} from 'lucide-react';
import { getLenis } from '../animations/scroll';

interface AppointmentFormData {
  fullName: string;
  email: string;
  phone: string;
  treatment: string;
  doctor: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  isFirstVisit: boolean;
}

const TREATMENTS_OPTIONS = [
  'Laser Enamel Whitening',
  'Invisalign Clear Aligners',
  'Porcelain Veneers & Smile Design',
  'Composite Edge Bonding',
  'Comprehensive Aesthetic Exam & Cleaning',
  'Periodontal Gum Health',
  'Emergency Consultation',
];

const DOCTOR_OPTIONS = [
  'Any Available Specialist',
  'Dr. Elena Vance (Lead Aesthetic Dentist)',
  'Dr. Marcus Thorne (Prosthodontist & Veneer Artisan)',
  'Dr. Alistair Sterling (Orthodontist & Arch Specialist)',
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '11:45 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
];

export interface AppointmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string;
  initialDoctor?: string;
}

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  isOpen,
  onClose,
  initialTreatment,
  initialDoctor,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    treatment: initialTreatment || TREATMENTS_OPTIONS[0],
    doctor: initialDoctor || DOCTOR_OPTIONS[0],
    preferredDate: '',
    preferredTime: '10:30 AM',
    notes: '',
    isFirstVisit: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Sync initial treatment or doctor when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialTreatment) {
        setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
      }
      if (initialDoctor) {
        setFormData((prev) => ({ ...prev, doctor: initialDoctor }));
      }
    }
  }, [isOpen, initialTreatment, initialDoctor]);

  // Lock background scroll and safely pause Lenis while modal is active
  useEffect(() => {
    if (!isOpen) return;

    // Pause Lenis so smooth scroll doesn't hijack touch/wheel in the modal
    const lenis = getLenis();
    lenis?.stop();

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Focus first input field when open on desktop
    const focusTimer = setTimeout(() => {
      if (window.innerWidth >= 640 && firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
      lenis?.start();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean realistic reservation confirmation
    setTimeout(() => {
      const randomCode = `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(randomCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 750);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const modalContent = (
    <div
      id="appointment-modal-overlay"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#25231F]/80 backdrop-blur-md overflow-y-auto overscroll-contain transition-opacity"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div
        id="appointment-modal-card"
        data-lenis-prevent="true"
        className="relative w-full max-w-lg lg:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAF9F5] rounded-[20px] sm:rounded-[28px] md:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] border border-[#25231F]/12 flex flex-col overflow-hidden text-left transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            {/* 1. PINNED HEADER: Always visible on all screens */}
            <div className="shrink-0 px-4 sm:px-7 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-[#25231F]/10 bg-[#FAF9F5] flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#AFCBE8]/35 text-[#25231F] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-1 sm:mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#25231F]" />
                  <span>Priority Consultation</span>
                </div>
                <h3
                  id="appointment-modal-title"
                  className="font-editorial text-xl sm:text-2xl md:text-[28px] leading-tight text-[#25231F] tracking-tight"
                >
                  Schedule Your <span className="italic font-normal">Smilix</span> Visit
                </h3>
                <p className="text-[11px] sm:text-xs text-[#25231F]/70 mt-0.5 hidden sm:block">
                  Tailored aesthetic dental care. Choose your preferred specialist & time.
                </p>
              </div>

              {/* Accessible Close Button: Guaranteed 44px min touch target */}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25231F]/5 hover:bg-[#25231F]/12 active:bg-[#25231F]/20 active:scale-95 text-[#25231F] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close appointment dialogue"
              >
                <X className="w-5 h-5 text-[#25231F]" />
              </button>
            </div>

            {/* 2. SCROLLABLE FORM BODY: Smooth touch and wheel scroll */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-7 py-3 sm:py-4 space-y-3 sm:space-y-3.5"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Row 1: Patient Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                    <input
                      ref={firstInputRef}
                      id="fullName"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-11 bg-white pl-9 pr-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/35 focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 bg-white pl-9 pr-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/35 focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & First Visit Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 bg-white pl-9 pr-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/35 focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1">
                    Patient Status
                  </label>
                  <div className="flex gap-1 h-11 p-1 bg-white rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isFirstVisit: true })}
                      className={`flex-1 rounded-[7px] text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                        formData.isFirstVisit
                          ? 'bg-[#25231F] text-white shadow-xs'
                          : 'text-[#25231F]/70 hover:text-[#25231F]'
                      }`}
                    >
                      New Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isFirstVisit: false })}
                      className={`flex-1 rounded-[7px] text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                        !formData.isFirstVisit
                          ? 'bg-[#25231F] text-white shadow-xs'
                          : 'text-[#25231F]/70 hover:text-[#25231F]'
                      }`}
                    >
                      Returning
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Treatment Selection */}
              <div>
                <label
                  htmlFor="treatment"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                >
                  Desired Treatment / Consultation *
                </label>
                <select
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full h-11 bg-white px-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors cursor-pointer"
                >
                  {TREATMENTS_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Doctor Preference */}
              <div>
                <label
                  htmlFor="doctor"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                >
                  Specialist Preference
                </label>
                <select
                  id="doctor"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full h-11 bg-white px-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors cursor-pointer"
                >
                  {DOCTOR_OPTIONS.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                  >
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                    <input
                      id="preferredDate"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full h-11 bg-white pl-9 pr-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                  >
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full h-11 bg-white pl-9 pr-3 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 6: Note / Special Concerns */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#25231F]/75 mb-1"
                >
                  Notes or Smile Goals (Optional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="Dental history, sensitivity, aesthetic goals..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white pl-9 pr-3 py-2 rounded-[10px] sm:rounded-[12px] border border-[#25231F]/15 text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/35 focus:outline-none focus:border-[#25231F] focus:ring-1 focus:ring-[#25231F] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. PINNED FOOTER: Always reachable for fast submission */}
            <div className="shrink-0 px-4 sm:px-7 py-3 sm:py-4 border-t border-[#25231F]/10 bg-[#FAF9F5]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 sm:h-12 rounded-full bg-[#25231F] text-white font-medium text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-[#151412] active:scale-[0.98] transition-all shadow-[0_4px_18px_rgba(37,35,31,0.18)] disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Reserving Consultation...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm Consultation Request</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#25231F]/60 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25231F]/70 shrink-0" />
                <span>HIPAA Compliant & Confidential. Instant Concierge Confirmation.</span>
              </div>
            </div>
          </form>
        ) : (
          /* CONFIRMATION STATE: Fully centered and responsive */
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF198] text-[#25231F] mx-auto flex items-center justify-center shadow-[0_8px_24px_rgba(250,241,152,0.6)]">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-[#25231F]">
              Consultation Reserved!
            </h3>

            <p className="text-xs sm:text-sm text-[#25231F]/80 max-w-sm mx-auto">
              Thank you, <strong>{formData.fullName}</strong>. Your consultation request for{' '}
              <strong>{formData.treatment}</strong> has been registered.
            </p>

            <div className="bg-white rounded-[16px] sm:rounded-[18px] p-4 border border-[#25231F]/8 max-w-sm mx-auto text-left space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-[#25231F]/8">
                <span className="text-[#25231F]/60">Booking Reference:</span>
                <span className="font-mono font-bold text-[#25231F]">{confirmationCode}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#25231F]/8">
                <span className="text-[#25231F]/60">Date & Slot:</span>
                <span className="font-medium text-[#25231F] text-right">
                  {formData.preferredDate || 'Selected Day'} at {formData.preferredTime}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#25231F]/8">
                <span className="text-[#25231F]/60">Specialist:</span>
                <span className="font-medium text-[#25231F] text-right truncate max-w-[180px]">{formData.doctor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#25231F]/60">Email:</span>
                <span className="font-medium text-[#25231F] truncate max-w-[180px]">{formData.email}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#25231F]/60">
              A calendar confirmation has been sent to your email.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-[#25231F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#171513] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(modalContent, document.body);
};
