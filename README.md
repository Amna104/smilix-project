# Smilix

### Modern dental care, thoughtfully designed.

Smilix is a polished, editorial-style dental clinic website built to make modern care feel calm, considered, and human. It combines a warm visual system with responsive layouts, carefully staged motion, service discovery, social proof, product highlights, and a global appointment booking flow.

> Your smile, smarter.

## What is included

- Responsive clinic landing page for mobile, tablet, and desktop
- Editorial hero section with social proof and treatment highlights
- Services for whitening, braces, Invisalign, and root canal care
- Doctor carousel with profile-focused calls to action
- Product carousel for recommended oral-care products
- Patient review marquee
- Before-and-after treatment slider
- Global appointment modal with treatment and doctor preselection
- Smooth scrolling with Lenis
- Scroll-triggered reveals, parallax, and progress feedback with GSAP
- Reduced-motion support for more accessible animation behavior
- Semantic sections, descriptive labels, and keyboard-friendly interactions

## Built with

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) and ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [Motion](https://motion.dev/) for interface animation
- [Lucide React](https://lucide.dev/) for icons
- Google Fonts: Instrument Serif, Playfair Display, and Plus Jakarta Sans

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-repository-url>
cd smilix-modern-dental-clinic
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server on port 3000 |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs the TypeScript compiler without emitting files |
| `npm run clean` | Removes generated build and server artifacts |

## Project structure

```text
src/
├── animations/       GSAP, Lenis, parallax, and scroll utilities
├── assets/            Hero and service visual assets
├── components/       Reusable cards, controls, visuals, and navigation
├── context/           Appointment modal state and global triggers
├── data/              Doctors, products, and reviews
├── hooks/             Shared React hooks
└── sections/          Page-level sections rendered by App.tsx
```

The page composition lives in `src/App.tsx`. Content collections are kept in `src/data`, while reusable visual and interaction primitives live in `src/components`.

## Appointment flow

Appointment actions can be triggered globally with a data attribute:

```tsx
<button
	data-open-appointment
	data-treatment="Invisalign"
	data-doctor="Dr. Elena Voss"
>
	Book a consultation
</button>
```

The appointment context reads these attributes and opens the shared form with the selected treatment and doctor already populated. This keeps booking actions consistent across navigation, service cards, doctor profiles, and calls to action.

## Design direction

Smilix uses a soft clinical palette with editorial typography: warm ivory backgrounds, deep charcoal text, pastel treatment accents, and high-contrast serif display type. The visual language is intentionally premium without becoming sterile, while the motion system adds depth without getting in the way of booking or reading.

When adding new UI, prefer the existing design tokens in `src/index.css`, the established serif/sans type pairing, and the motion helpers already used by neighboring sections.

## Customization

- Update doctors, products, and reviews in `src/data/`
- Add or change services in `src/sections/Services.tsx`
- Adjust colors and typography in `src/index.css`
- Replace hero and service assets in `src/assets/`
- Extend the appointment form in `src/components/AppointmentFormModal.tsx`
- Add new page sections through `src/App.tsx`

## Production build

Build and preview the production bundle locally before deployment:

```bash
npm run build
npm run preview
```

The generated output is written to `dist/` and can be deployed to any static host that supports a Vite build, including Netlify, Vercel, GitHub Pages, or Cloudflare Pages.

## License

This project includes an Apache-2.0 license notice in the application source. Confirm the licensing terms for any third-party assets before publishing a production deployment.
