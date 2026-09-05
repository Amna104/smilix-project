import sonicImg from '../assets/images/product_sonic_toothbrush_1788442504888.jpg';
import whiteningImg from '../assets/images/product_whitening_kit_1788442521196.jpg';
import alignersImg from '../assets/images/product_clear_aligners_1788442539910.jpg';
import careKitImg from '../assets/images/product_care_kit_1788442553036.jpg';

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  background: string;
  image: string;
  alt: string;
  ariaLabel: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'sonic-toothbrush',
    category: 'DAILY CARE',
    name: 'Sonic Toothbrush',
    description: 'Deep clean. Gentle care.',
    background: '#FFF6C7',
    image: sonicImg,
    alt: 'Smilix Sonic Toothbrush with magnetic charging dock',
    ariaLabel: 'View details for Smilix Sonic Toothbrush',
  },
  {
    id: 'whitening-kit',
    category: 'WHITENING',
    name: 'Whitening Kit',
    description: 'Brighter smiles, thoughtfully.',
    background: '#AFCBE8',
    image: whiteningImg,
    alt: 'Smilix Professional Teeth Whitening Kit with wireless LED mouthpiece',
    ariaLabel: 'View details for Smilix Whitening Kit',
  },
  {
    id: 'clear-aligners',
    category: 'ORTHODONTICS',
    name: 'Clear Aligners',
    description: 'Subtle treatment. Confident results.',
    background: '#D7D4C3',
    image: alignersImg,
    alt: 'Smilix Clear Aligners in custom matte travel case',
    ariaLabel: 'View details for Smilix Clear Aligners',
  },
  {
    id: 'dental-care-kit',
    category: 'ESSENTIALS',
    name: 'Dental Care Kit',
    description: 'Your everyday essentials.',
    background: '#F4C8D9',
    image: careKitImg,
    alt: 'Smilix Dental Care Kit with silk floss, natural paste and rinse',
    ariaLabel: 'View details for Smilix Dental Care Kit',
  },
];
