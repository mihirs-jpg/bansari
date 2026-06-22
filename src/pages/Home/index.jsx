import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { causes, programs, events, testimonials, heroStats } from '../../constants/data';
import { useTilt3D, useParallax } from '../../hooks/useTilt3D';
import Reveal from '../../components/common/Reveal';
import heroBg from '../../assets/images/1.png';
import GeoImpactMap from './GeoImpactMap';
import {
  useScroll, useTransform, motion, useSpring, useMotionValue, useInView, AnimatePresence
} from 'framer-motion';
import './Home.css';

/* ── CountUp ───────────────────────────────────────────────── */
function CountUp({ target, duration = 1600 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, '')) || 0;
    const suffix = String(target).replace(/[0-9.,]/g, '');
    const prefix = String(target).match(/^[^0-9]*/)?.[0] || '';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * numeric);
          setDisplay(`${prefix}${current.toLocaleString()}${suffix.replace(prefix, '')}`);
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

/* ── TiltCard ─────────────────────────────────────────────── */
function TiltCard({ children, className = '', max = 8, scale = 1.015, style = {} }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D({ max, scale });
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
}

/* ── CAUSES: 3D immersive scroll card grid ── */
const CAUSE_COLORS = ['#005b9a', '#00a7a7', '#00b894', '#f4c542', '#a855f7', '#ef4444'];

/* Full-screen modal when card is clicked */
function CauseModal({ cause, color, index, total, onClose, onPrev, onNext }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="cause-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="cause-modal-container"
          initial={{ scale: 0.82, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="cause-modal-img-wrap">
            <motion.img
              src={cause.img}
              alt={cause.name}
              className="cause-modal-img"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <div className="cause-modal-img-overlay" style={{ background: `linear-gradient(to top, ${color}ee 0%, ${color}55 40%, transparent 70%)` }} />

            {/* Close button */}
            <motion.button
              className="cause-modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </motion.button>

            {/* Icon badge */}
            <motion.div
              className="cause-modal-badge"
              style={{ background: color }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            >
              {cause.icon}
            </motion.div>

            {/* Counter badge */}
            <motion.div
              className="cause-modal-counter"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              style={{ borderColor: color, color }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Content */}
          <div className="cause-modal-body">
            <motion.div
              className="cause-modal-tag"
              style={{ background: color + '18', color }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Pillar {index + 1}
            </motion.div>

            <motion.h2
              className="cause-modal-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {cause.name}
            </motion.h2>

            <motion.div
              className="cause-modal-divider"
              style={{ background: color }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.32, duration: 0.55, ease: 'easeOut' }}
            />

            <motion.p
              className="cause-modal-desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {cause.desc}
            </motion.p>

            {/* Extended detail bullets */}
            <motion.ul
              className="cause-modal-bullets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
            >
              {(cause.bullets || [
                'Community-driven grassroots approach',
                'Partnerships with local government & NGOs',
                'Measurable impact tracked every quarter',
                'Volunteer and donor opportunities available',
              ]).map((b, bi) => (
                <motion.li
                  key={bi}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + bi * 0.08 }}
                >
                  <span className="cause-modal-bullet-dot" style={{ background: color }} />
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            {/* Progress */}
            <motion.div
              className="cause-modal-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="cause-modal-progress-track">
                <motion.div
                  className="cause-modal-progress-fill"
                  style={{ background: `linear-gradient(to right, ${color}, ${color}aa)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (index + 1) / total }}
                  transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="cause-modal-progress-label">
                <span style={{ color }}>Pillar {index + 1} of {total}</span>
                <span>{Math.round(((index + 1) / total) * 100)}% explored</span>
              </div>
            </motion.div>

            {/* Nav buttons */}
            <motion.div
              className="cause-modal-nav"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <motion.button
                className="cause-modal-nav-btn"
                onClick={onPrev}
                disabled={index === 0}
                whileHover={{ scale: 1.04, x: -3 }}
                whileTap={{ scale: 0.96 }}
                style={{ '--modal-nav-color': color }}
              >
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Previous
              </motion.button>
              <motion.button
                className="cause-modal-nav-btn cause-modal-nav-primary"
                style={{ background: color }}
                onClick={onClose}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Close
              </motion.button>
              <motion.button
                className="cause-modal-nav-btn"
                onClick={onNext}
                disabled={index === total - 1}
                whileHover={{ scale: 1.04, x: 3 }}
                whileTap={{ scale: 0.96 }}
                style={{ '--modal-nav-color': color }}
              >
                Next
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



/* ── 3D Focus Card ── */
function FocusCard3D({ cause, index, color, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -14, y: cx * 14 });
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  const staggerDelay = index * 0.11;

  return (
    <motion.div
      ref={ref}
      className="fc3d-wrapper"
      initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--card-color': color }}
    >
      <motion.div
        ref={cardRef}
        className="fc3d-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating orb glow */}
        <motion.div
          className="fc3d-orb"
          animate={hovered ? { opacity: 1, scale: 1.3 } : { opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ background: `radial-gradient(circle, ${color}55 0%, transparent 70%)` }}
        />

        {/* Top: full-bleed image header */}
        <div
          className="fc3d-header fc3d-header-img"
          style={{
            backgroundImage: cause.img ? `url(${cause.img})` : `linear-gradient(135deg, ${color}ee 0%, ${color}88 100%)`,
          }}
        >
          {/* Bottom fade into card body */}
          <div className="fc3d-img-fade" />
          {/* Top-left colour tint so number is readable */}
          <div className="fc3d-img-tint" style={{ background: `linear-gradient(160deg, ${color}66 0%, transparent 55%)` }} />
          <div className="fc3d-num">{String(index + 1).padStart(2, '0')}</div>
          <motion.div
            className="fc3d-shimmer"
            animate={hovered ? { x: ['-100%', '200%'], opacity: [0, 0.45, 0] } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          />
        </div>

        {/* Bottom: content */}
        <div className="fc3d-body">
          <motion.h3
            className="fc3d-name"
            animate={hovered ? { color: color } : { color: '#001f3f' }}
            transition={{ duration: 0.25 }}
          >
            {cause.name}
          </motion.h3>
          <motion.div
            className="fc3d-divider"
            animate={hovered ? { scaleX: 1.5 } : { scaleX: 1 }}
            style={{ background: color, transformOrigin: 'left' }}
            transition={{ duration: 0.3 }}
          />
          <p className="fc3d-desc">{cause.desc}</p>
          <motion.div
            className="fc3d-cta"
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <span>Learn more</span>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Bottom edge reveal */}
        <motion.div
          className="fc3d-edge"
          style={{ background: color }}
          animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

function AmbientParticle({ color, style }) {
  return (
    <motion.div
      className="fc3d-particle"
      style={{ ...style, background: color, position: 'absolute', borderRadius: '50%', pointerEvents: 'none' }}
      animate={{ y: [0, -28, 0], opacity: [0.15, 0.45, 0.15], scale: [1, 1.25, 1] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: style.delay || 0 }}
    />
  );
}

function CauseSpotlightSection({ causes }) {
  const TOTAL = causes.length;
  const [modalIdx, setModalIdx] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-24px']);

  const openModal = (i) => setModalIdx(i);
  const closeModal = () => setModalIdx(null);
  const modalPrev = () => setModalIdx(p => Math.max(0, p - 1));
  const modalNext = () => setModalIdx(p => Math.min(TOTAL - 1, p + 1));

  const particles = [
    { color: '#005b9a', style: { width: 12, height: 12, top: '18%', left: '8%', delay: 0 } },
    { color: '#00b894', style: { width: 8, height: 8, top: '62%', left: '5%', delay: 1.2 } },
    { color: '#a855f7', style: { width: 16, height: 16, top: '35%', right: '6%', delay: 0.5 } },
    { color: '#f4c542', style: { width: 10, height: 10, top: '75%', right: '10%', delay: 2 } },
    { color: '#00a7a7', style: { width: 7, height: 7, top: '10%', left: '45%', delay: 0.8 } },
    { color: '#ef4444', style: { width: 9, height: 9, top: '88%', left: '30%', delay: 1.7 } },
  ];

  return (
    <>
      <section ref={sectionRef} className="fc3d-section">
        <motion.div className="fc3d-bg-mesh" style={{ y: bgY }} />
        {particles.map((p, i) => <AmbientParticle key={i} {...p} />)}

        <div className="fc3d-inner">
          <motion.div className="fc3d-header-block" style={{ y: titleY }}>
            <motion.div
              className="fc3d-eyebrow"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              🌟 Our Focus
            </motion.div>
            <motion.h2
              className="fc3d-title"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              What We <span className="fc3d-title-accent">Stand For</span>
            </motion.h2>
            <motion.p
              className="fc3d-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              Six pillars guiding every decision, every program, every life we touch.
            </motion.p>
            <motion.div
              className="fc3d-title-line"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <div className="fc3d-grid">
            {causes.map((c, i) => (
              <FocusCard3D
                key={c.name}
                cause={c}
                index={i}
                color={CAUSE_COLORS[i % CAUSE_COLORS.length]}
                onClick={() => openModal(i)}
              />
            ))}
          </div>

          <motion.div
            className="fc3d-bottom-cta"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="fc3d-cta-text">Click any card to dive deeper</span>
            <div className="fc3d-cta-dots">
              {CAUSE_COLORS.map((c, i) => (
                <motion.div
                  key={i}
                  className="fc3d-cta-dot"
                  style={{ background: c }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalIdx !== null && (
          <CauseModal
            key={modalIdx}
            cause={causes[modalIdx]}
            color={CAUSE_COLORS[modalIdx % CAUSE_COLORS.length]}
            index={modalIdx}
            total={TOTAL}
            onClose={closeModal}
            onPrev={modalPrev}
            onNext={modalNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Marquee Partners ─────────────────────────────────────── */
function MarqueePartners({ partners }) {
  const doubled = [...partners, ...partners];
  return (
    <div className="marquee-wrap">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((p, i) => (
          <div key={i} className="marquee-item">{p}</div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Floating stat orbs for impact section ───────────────── */
function FloatingOrb({ color, size, top, left, delay }) {
  return (
    <motion.div
      style={{
        position: 'absolute', borderRadius: '50%', width: size, height: size,
        top, left, background: `radial-gradient(circle at 35% 35%, ${color}33, transparent 70%)`,
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Scroll-linked horizontal programs strip ─────────────── */
function ProgramsScrollStrip({ programs, navigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div className="programs-strip" style={{ x }}>
        {programs.map((p, i) => (
          <motion.div
            key={p.name}
            className="program-strip-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="psc-img-wrap">
              <img src={p.img} alt={p.name} className="psc-img" loading="lazy" />
              <span className="psc-tag">{p.cat}</span>
            </div>
            <div className="psc-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="psc-stats">
                <div><div className="n"><CountUp target={p.impact1} /></div><div className="l">{p.l1}</div></div>
                <div><div className="n"><CountUp target={p.impact2} /></div><div className="l">{p.l2}</div></div>
              </div>
              <button className="btn-sm magnetic-btn" onClick={() => navigate('/programs')}>Learn More →</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main Home component ──────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const orb1 = useParallax(0.5);
  const orb2 = useParallax(-0.35);
  const orb3 = useParallax(0.25);

  /* Hero scroll-out fade/scale */
  const heroScrollRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroScrollRef, offset: ['start start', 'end start'] });
  const heroContentY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  /* Pointer parallax on hero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = null;
    const onMove = (e) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousemove', onMove); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const handlers = [orb1.handleScroll, orb2.handleScroll, orb3.handleScroll];
    const onScroll = () => handlers.forEach(h => h());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [orb1, orb2, orb3]);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero-3d" ref={heroRef} style={{ position: 'relative' }}>
        <div ref={heroScrollRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="hero-bg-image mesh-drift" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero-bg-pattern" />
        <div className="hero-orb hero-orb-1" ref={orb1.ref} />
        <div className="hero-orb hero-orb-2" ref={orb2.ref} />
        <div className="hero-orb hero-orb-3" ref={orb3.ref} />
        <div className="feather-float float-anim">🪶</div>
        <div className="feather-float float-anim-slow">🪶</div>
        <div className="feather-float float-anim">🪶</div>

        <motion.div
          className="hero-content hero-content-3d"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <Reveal direction="down" duration={800}>
            <div className="hero-badge">🪶 Est. 2018 · Gujarat, India</div>
          </Reveal>
          <Reveal direction="up" delay={120} duration={900}>
            <h1>Together We Build a<br /><span className="shimmer-text">Better Tomorrow</span></h1>
          </Reveal>
          <Reveal direction="up" delay={240} duration={900}>
            <p>Banshri stands for hope, dignity, and opportunity — transforming lives through education, healthcare, women's empowerment, and community development across rural India.</p>
          </Reveal>
          <Reveal direction="up" delay={360} duration={900}>
            <div className="hero-btns">
              <button className="btn-primary magnetic-btn" onClick={() => navigate('/donate')}>❤️ Donate Now</button>
              <button className="btn-secondary magnetic-btn" onClick={() => navigate('/volunteer')}>🤝 Become a Volunteer</button>
            </div>
          </Reveal>
          <Reveal direction="up" delay={480} duration={900}>
            <div className="hero-stats">
              {heroStats.map((s, i) => (
                <div className="hero-stat" key={s.lbl} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="num"><CountUp target={s.num} /></div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <div className="hero-scroll-cue"><span /></div>
      </section>

      {/* ============ CAUSES — Scroll spotlight + 3D flip reveal ============ */}
      <CauseSpotlightSection causes={causes} />

      {/* ============ PROGRAMS — Parallax strip ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header">
            <div className="section-tag">🎯 Programs</div>
            <h2 className="section-title">Our Six Programs</h2>
            <p className="section-sub">Integrated initiatives creating lasting change across Gujarat's most underserved communities</p>
          </Reveal>
        </div>
        <ProgramsScrollStrip programs={programs.slice(0, 3)} navigate={navigate} />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <motion.button
            className="btn-primary magnetic-btn"
            onClick={() => navigate('/programs')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Programs →
          </motion.button>
        </div>
      </section>

      {/* ============ GEOGRAPHIC IMPACT MAP ============ */}
      <section className="section section-alt geo-section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" style={{verticalAlign:'middle',marginRight:'5px'}}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
              Where We Work
            </div>
            <h2 className="section-title">Geographic Impact Map</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Explore how Banshri's programs reach across eight districts of Gujarat — hover or tap a district to see villages covered, schools supported, farmers helped, and medical camps conducted.
            </p>
          </Reveal>
          <Reveal direction="scale" delay={120}>
            <GeoImpactMap />
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="geo-footnote">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{verticalAlign:'middle',marginRight:'5px'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Map is a stylized representation of our active districts, not a precise survey boundary. Data reflects cumulative program reach as of FY 2024–25.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ IMPACT — Floating orbs + stagger ============ */}
      <div className="impact-section impact-section-3d" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="impact-grid-bg" />
        <FloatingOrb color="#f59e0b" size="320px" top="-8%" left="-6%" delay={0} />
        <FloatingOrb color="#0d9488" size="240px" top="60%" left="80%" delay={2.5} />
        <FloatingOrb color="#6366f1" size="180px" top="20%" left="70%" delay={1.5} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>Our Impact in Numbers</h2>
          </Reveal>
          <div className="impact-grid">
            {[
              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, n: '10,000+', l: 'Lives Impacted' },
              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, n: '1,800', l: 'Women Trained' },
              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>, n: '6,500', l: 'Health Consults' },
              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M17 8C8 10 5.9 16.17 3.82 19.54"/><path d="M17 8c0 4.14-3.06 7.6-7 8M9.5 2C9.5 5.52 12 10 17 10"/><path d="M12 22a10 10 0 01-8.93-5.5"/></svg>, n: '50K+', l: 'Trees Planted' },
              { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, n: '100+', l: 'Villages Reached' },
            ].map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="impact-card" max={12} scale={1.05}>
                  <div className="impact-icon">{item.svg}</div>
                  <div className="impact-num"><CountUp target={item.n} /></div>
                  <div className="impact-lbl">{item.l}</div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ EVENTS — Alternating slide-in ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header">
            <div className="section-tag">📅 Upcoming</div>
            <h2 className="section-title">Events & Activities</h2>
            <p className="section-sub">Join us — every hand makes a difference</p>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.map((e, i) => (
              <motion.div
                key={e.name}
                className="event-card event-card-3d"
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div className="event-date">
                  <div className="day">{e.day}</div>
                  <div className="month">{e.month}</div>
                </div>
                <div className="event-body">
                  <h4>{e.name}</h4>
                  <p>{e.desc}</p>
                  <div className="event-meta">
                    <span>📍 {e.loc}</span>
                    <span>🏷️ {e.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-sm magnetic-btn" onClick={() => navigate('/events')} style={{ fontSize: '0.88rem', padding: '0.6rem 1.5rem' }}>View All Events →</button>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS — Staggered fan ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>💬 Stories</div>
            <h2 className="section-title">Voices of Change</h2>
          </Reveal>
          <div className="cards-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="testimonial-card" max={7} scale={1.02}>
                  <p>{t.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.emo}</div>
                    <div>
                      <div className="author-name">{t.author}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DONATE BANNER — Pulse glow ============ */}
      <motion.div
        className="donate-banner donate-banner-3d"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="donate-banner-glow" />
        <motion.div
          className="donate-banner-pulse"
          animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.08, 0.18] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>Ready to Make a Difference?</h2>
          <p>Every rupee you donate creates ripples of hope across Gujarat's most underserved communities.</p>
          <motion.button
            className="btn-primary magnetic-btn"
            onClick={() => navigate('/donate')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            💛 Donate Now
          </motion.button>
        </div>
      </motion.div>

      {/* ============ PARTNERS — Marquee ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>🤝 Partners</div>
            <h2 className="section-title">Trusted By</h2>
          </Reveal>
        </div>
        <MarqueePartners partners={['UNICEF India', 'Govt. of Gujarat', 'NABARD', 'Tata Trusts', 'Azim Premji Foundation', 'GuideStar India']} />
      </section>
    </>
  );
}