import { useTilt3D } from '../../hooks/useTilt3D';

/**
 * TiltCard — wraps children with a pointer-tracking 3D tilt + glare effect.
 * Reusable across any page. Pairs with the `.tilt-card` styles in animations.css.
 *
 * Props:
 *  - max: max tilt rotation in degrees (default 8)
 *  - scale: hover scale factor (default 1.02)
 *  - className / style: forwarded to wrapper, merge with caller's own classes
 */
export default function TiltCard({ children, className = '', max = 8, scale = 1.02, style = {}, ...rest }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D({ max, scale });
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
