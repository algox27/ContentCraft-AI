import { useState, useEffect } from 'react';

export function useAnimation(trigger: boolean, delay: number = 0) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [trigger, delay]);

  return shouldAnimate;
}

export function useCountUp(end: number, duration: number = 1000, start: number = 0) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}
