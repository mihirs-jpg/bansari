import { useReveal } from '../../hooks/useReveal';

/**
 * Reveal — wraps children and applies a scroll-triggered reveal animation.
 * Reusable across any page.
 *
 * Props:
 *  - as: element type to render (default 'div')
 *  - direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' (default 'up')
 *  - delay: ms delay before animating in (default 0)
 *  - duration: ms duration (default 700)
 *  - threshold / rootMargin / once: forwarded to useReveal
 *  - className / style: forwarded to wrapper
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  rootMargin = '0px 0px -80px 0px',
  once = true,
  className = '',
  style = {},
  ...rest
}) {
  const [ref, visible] = useReveal({ threshold, rootMargin, once });

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
