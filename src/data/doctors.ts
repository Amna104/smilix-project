import ameliaImg from '../assets/images/doctor_amelia_hart_1788442207101.jpg';
import danielImg from '../assets/images/doctor_daniel_brooks_1788442221245.jpg';
import sofiaImg from '../assets/images/doctor_sofia_bennett_1788442239240.jpg';
import ethanImg from '../assets/images/doctor_ethan_cole_1788442251208.jpg';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  alt: string;
  ariaLabel: string;
}

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'amelia-hart',
    name: 'Dr. Amelia Hart',
    specialty: 'Cosmetic Dentist',
    image: ameliaImg,
    alt: 'Dr. Amelia Hart, Cosmetic Dentist at Smilix',
    ariaLabel: 'View profile and schedule a consultation with Dr. Amelia Hart, Cosmetic Dentist',
  },
  {
    id: 'daniel-brooks',
    name: 'Dr. Daniel Brooks',
    specialty: 'Orthodontist',
    image: danielImg,
    alt: 'Dr. Daniel Brooks, Orthodontist at Smilix',
    ariaLabel: 'View profile and schedule a consultation with Dr. Daniel Brooks, Orthodontist',
  },
  {
    id: 'sofia-bennett',
    name: 'Dr. Sofia Bennett',
    specialty: 'Restorative Dentist',
    image: sofiaImg,
    alt: 'Dr. Sofia Bennett, Restorative Dentist at Smilix',
    ariaLabel: 'View profile and schedule a consultation with Dr. Sofia Bennett, Restorative Dentist',
  },
  {
    id: 'ethan-cole',
    name: 'Dr. Ethan Cole',
    specialty: 'Implant Specialist',
    image: ethanImg,
    alt: 'Dr. Ethan Cole, Implant Specialist at Smilix',
    ariaLabel: 'View profile and schedule a consultation with Dr. Ethan Cole, Implant Specialist',
  },
];
