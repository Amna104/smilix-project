import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppointmentFormModal } from '../components/AppointmentFormModal';

interface OpenAppointmentOptions {
  treatment?: string;
  doctor?: string;
}

interface AppointmentModalContextValue {
  isOpen: boolean;
  openModal: (options?: OpenAppointmentOptions) => void;
  closeModal: () => void;
  treatment?: string;
  doctor?: string;
}

const AppointmentModalContext = createContext<AppointmentModalContextValue | undefined>(undefined);

export const useAppointmentModal = () => {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used within an AppointmentModalProvider');
  }
  return context;
};

export const AppointmentModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [treatment, setTreatment] = useState<string | undefined>(undefined);
  const [doctor, setDoctor] = useState<string | undefined>(undefined);

  const openModal = useCallback((options?: OpenAppointmentOptions) => {
    if (options?.treatment) setTreatment(options.treatment);
    if (options?.doctor) setDoctor(options.doctor);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global event listener: elements with data-open-appointment open the modal
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-open-appointment]');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const customTreatment = target.getAttribute('data-treatment') || undefined;
        const customDoctor = target.getAttribute('data-doctor') || undefined;
        openModal({ treatment: customTreatment, doctor: customDoctor });
      }
    };

    // Also support custom window event for anywhere in the app
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<OpenAppointmentOptions>;
      openModal(customEvent.detail);
    };

    document.addEventListener('click', handleDocumentClick, true);
    window.addEventListener('open-appointment-modal', handleCustomEvent);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      window.removeEventListener('open-appointment-modal', handleCustomEvent);
    };
  }, [openModal]);

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        treatment,
        doctor,
      }}
    >
      {children}
      {/* Global Form Dialogue accessible from every screen and trigger */}
      <AppointmentFormModal
        isOpen={isOpen}
        onClose={closeModal}
        initialTreatment={treatment}
        initialDoctor={doctor}
      />
    </AppointmentModalContext.Provider>
  );
};
