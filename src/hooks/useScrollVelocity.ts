import { useEffect, useRef } from 'react';
import {
  ScrollVelocityState,
  getScrollVelocityState,
  subscribeScrollVelocity,
} from '../animations/scrollVelocity';

/**
 * Hook providing access to the current scroll velocity, direction, and progress
 * without triggering re-renders on every animation frame.
 *
 * @param onUpdate Optional callback executed on each scroll update
 * @returns ref containing the current ScrollVelocityState
 */
export function useScrollVelocity(onUpdate?: (state: ScrollVelocityState) => void) {
  const stateRef = useRef<ScrollVelocityState>(getScrollVelocityState());
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    const unsubscribe = subscribeScrollVelocity((newState) => {
      stateRef.current = newState;
      if (onUpdateRef.current) {
        onUpdateRef.current(newState);
      }
    });

    return unsubscribe;
  }, []);

  return stateRef;
}
