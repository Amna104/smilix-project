import emmaImg from '../assets/images/patient_avatar_emma_1788443051249.jpg';
import jamesImg from '../assets/images/patient_avatar_james_1788443064910.jpg';
import oliviaImg from '../assets/images/patient_avatar_olivia_1788443078545.jpg';
import noahImg from '../assets/images/patient_avatar_noah_1788443091089.jpg';
import sophiaImg from '../assets/images/patient_avatar_sophia_1788443116497.jpg';
import danielImg from '../assets/images/patient_avatar_daniel_1788443131762.jpg';

export interface Review {
  id: string;
  quote: string;
  name: string;
  treatment: string;
  avatar: string;
  rating: number;
  background: string;
}

export const REVIEWS_ROW_1: Review[] = [
  {
    id: 'review-emma',
    quote:
      'From the first appointment, everything felt thoughtful and easy. I finally look forward to going to the dentist.',
    name: 'Emma R.',
    treatment: 'Teeth Whitening',
    avatar: emmaImg,
    rating: 5,
    background: '#FFF6C7',
  },
  {
    id: 'review-james',
    quote:
      'The team made the entire Invisalign process feel incredibly simple. I couldn\'t be happier with the results.',
    name: 'James M.',
    treatment: 'Invisalign',
    avatar: jamesImg,
    rating: 5,
    background: '#AFCBE8',
  },
  {
    id: 'review-olivia',
    quote:
      'Beautiful clinic, kind people, and genuinely excellent care. Every detail feels intentional.',
    name: 'Olivia K.',
    treatment: 'General Dentistry',
    avatar: oliviaImg,
    rating: 5,
    background: '#D7D4C3',
  },
  {
    id: 'review-noah',
    quote:
      'I was nervous about my treatment, but the team explained everything clearly and made me feel completely comfortable.',
    name: 'Noah T.',
    treatment: 'Root Canal',
    avatar: noahImg,
    rating: 5,
    background: '#F4C8D9',
  },
  {
    id: 'review-sophia',
    quote:
      'Professional, friendly, and incredibly attentive. Smilix completely changed my experience with dental care.',
    name: 'Sophia L.',
    treatment: 'Cosmetic Dentistry',
    avatar: sophiaImg,
    rating: 5,
    background: '#FFF6C7',
  },
  {
    id: 'review-daniel',
    quote:
      'The results exceeded my expectations. I would recommend Smilix to anyone looking for thoughtful dental care.',
    name: 'Daniel P.',
    treatment: 'Orthodontics',
    avatar: danielImg,
    rating: 5,
    background: '#AFCBE8',
  },
];

export const REVIEWS_ROW_2: Review[] = [
  {
    id: 'review-sophia-2',
    quote:
      'Professional, friendly, and incredibly attentive. Smilix completely changed my experience with dental care.',
    name: 'Sophia L.',
    treatment: 'Cosmetic Dentistry',
    avatar: sophiaImg,
    rating: 5,
    background: '#AFCBE8',
  },
  {
    id: 'review-daniel-2',
    quote:
      'The results exceeded my expectations. I would recommend Smilix to anyone looking for thoughtful dental care.',
    name: 'Daniel P.',
    treatment: 'Orthodontics',
    avatar: danielImg,
    rating: 5,
    background: '#D7D4C3',
  },
  {
    id: 'review-emma-2',
    quote:
      'From the first appointment, everything felt thoughtful and easy. I finally look forward to going to the dentist.',
    name: 'Emma R.',
    treatment: 'Teeth Whitening',
    avatar: emmaImg,
    rating: 5,
    background: '#F4C8D9',
  },
  {
    id: 'review-noah-2',
    quote:
      'I was nervous about my treatment, but the team explained everything clearly and made me feel completely comfortable.',
    name: 'Noah T.',
    treatment: 'Root Canal',
    avatar: noahImg,
    rating: 5,
    background: '#FFF6C7',
  },
  {
    id: 'review-olivia-2',
    quote:
      'Beautiful clinic, kind people, and genuinely excellent care. Every detail feels intentional.',
    name: 'Olivia K.',
    treatment: 'General Dentistry',
    avatar: oliviaImg,
    rating: 5,
    background: '#AFCBE8',
  },
  {
    id: 'review-james-2',
    quote:
      'The team made the entire Invisalign process feel incredibly simple. I couldn\'t be happier with the results.',
    name: 'James M.',
    treatment: 'Invisalign',
    avatar: jamesImg,
    rating: 5,
    background: '#D7D4C3',
  },
];
