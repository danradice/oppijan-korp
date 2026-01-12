import { useState } from 'react';

/**
 * Custom hook for rate limiting actions
 * @param limitMs - Minimum milliseconds between actions
 * @returns Function that returns true if action is allowed, false if rate limited
 */
export function useRateLimiter(limitMs: number) {
  const [lastTime, setLastTime] = useState(0);

  const checkLimit = (): boolean => {
    const now = Date.now();
    if (now - lastTime < limitMs) {
      return false;
    }
    setLastTime(now);
    return true;
  };

  return checkLimit;
}
