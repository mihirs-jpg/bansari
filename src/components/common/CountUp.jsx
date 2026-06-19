import { useEffect, useRef, useState } from 'react';

/**
 * CountUp — animates a number (or string like "10,000+", "45L", "6") counting up
 * from 0 once it scrolls into view. Reusable across any page.
 */
export default function CountUp({ target, duration = 1600 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, '')) || 0;
    const prefix = String(target).match(/^[^0-9]*/)?.[0] || '';
    const suffix = String(target).replace(/^[^0-9]*/, '').replace(/[0-9.,]/g, '');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * numeric);
          setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(String(target));
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="count-num">{display}</span>;
}
