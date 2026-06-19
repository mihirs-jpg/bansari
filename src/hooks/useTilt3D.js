import { useRef, useCallback } from 'react';

/**
 * useTilt3D — Apple-style pointer-tracking 3D tilt for cards.
 * Attach the returned handlers + ref to any element to get a perspective tilt
 * that follows the cursor, plus a subtle glare highlight.
 *
 * @param {Object} opts
 * @param {number} opts.max - max rotation in degrees (default 10)
 * @param {number} opts.scale - hover scale factor (default 1.02)
 * @param {boolean} opts.glare - whether to render a glare highlight (default true)
 */
export function useTilt3D({ max = 10, scale = 1.02, glare = true } = {}) {
  const ref = useRef(null);
  const frame = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 - 1
      const y = (e.clientY - rect.top) / rect.height; // 0 - 1

      const rotateY = (x - 0.5) * max * 2;
      const rotateX = (0.5 - y) * max * 2;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare) {
        el.style.setProperty('--glare-x', `${x * 100}%`);
        el.style.setProperty('--glare-y', `${y * 100}%`);
        el.style.setProperty('--glare-opacity', '1');
      }
    });
  }, [max, scale, glare]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    if (glare) el.style.setProperty('--glare-opacity', '0');
  }, [glare]);

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * useParallax — returns a ref + style transform for a simple scroll-linked
 * parallax effect (translateY based on scroll position relative to element).
 *
 * @param {number} speed - parallax intensity; positive moves slower than scroll, negative faster
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // offset relative to viewport center
    const offset = (rect.top - viewportH / 2) * speed * -1;
    el.style.transform = `translate3d(0, ${offset * 0.08}px, 0)`;
  }, [speed]);

  return { ref, handleScroll };
}
