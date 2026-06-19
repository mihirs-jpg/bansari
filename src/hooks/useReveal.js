import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — IntersectionObserver-based scroll reveal.
 * Returns a ref to attach to an element and a boolean for whether it has entered the viewport.
 *
 * @param {Object} opts
 * @param {number} opts.threshold - fraction of element visible before triggering (0-1)
 * @param {string} opts.rootMargin - margin around root for early/late triggering
 * @param {boolean} opts.once - whether to only trigger once (default true)
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference: show immediately, no animation gating
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
}

/**
 * useRevealGroup — like useReveal but for staggering multiple children.
 * Returns a ref for the container and an index-based "isVisible(i)" helper,
 * plus a computed inline style delay generator.
 */
export function useStaggerDelay(index, baseMs = 90, maxItems = 12) {
  const i = Math.min(index, maxItems);
  return `${i * baseMs}ms`;
}
