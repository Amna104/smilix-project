import { useLenisContext } from '../animations/LenisProvider';
import { getLenis, scrollToSection } from '../animations/scroll';

/**
 * Reusable hook to access the global Lenis instance and smooth-scroll helper
 */
export function useLenis() {
  const context = useLenisContext();
  const lenis = context.lenis || getLenis();

  return {
    lenis,
    scrollTo: scrollToSection,
  };
}
