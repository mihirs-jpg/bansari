import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './team.css';

/* ── SVG Icons ── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── Avatar: initials + gradient ── */
function Avatar({ name, color1, color2, size = 96 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 800,
      fontSize: size * 0.3,
      letterSpacing: '0.5px',
      fontFamily: 'var(--font-heading, sans-serif)',
      boxShadow: `0 8px 32px ${color1}44`,
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {initials}
    </div>
  );
}

/* ── Leadership colours ── */
const LEADER_COLORS = [
  ['#005b9a', '#00a7a7'],
  ['#a855f7', '#ec4899'],
  ['#00b894', '#005b9a'],
];

/* ── Field Team colours ── */
const FIELD_COLORS = [
  ['#005b9a', '#0077cc'],
  ['#00a7a7', '#00b894'],
  ['#a855f7', '#7c3aed'],
  ['#f4c542', '#e67e22'],
  ['#ef4444', '#dc2626'],
  ['#00b894', '#00a7a7'],
];

const leadership = [
  { name: 'Dr. Kavita Sharma', role: 'Founder & Executive Director', bio: 'A social entrepreneur with 20 years in rural development. Founded Banshri after witnessing the education gap firsthand in North Gujarat. Ph.D. in Social Policy from TISS Mumbai.', linkedin: '#', tag: 'Founder' },
  { name: 'Ramesh Mehta', role: 'Head of Programs', bio: 'Former UNICEF program officer with deep expertise in community health and livelihood projects across South Asia. MBA in Development Management.', linkedin: '#', tag: 'Programs' },
  { name: 'Priya Desai', role: 'Director of Fundraising', bio: 'Built partnerships with Tata Trusts, Azim Premji Foundation, and 15+ corporates, growing Banshri\'s annual budget 5x in three years.', linkedin: '#', tag: 'Fundraising' },
];

const fieldTeam = [
  { name: 'Dinesh Solanki', role: 'Field Coordinator', location: 'Patan', years: 5 },
  { name: 'Anita Parmar', role: 'Program Officer – Health', location: 'Mehsana', years: 4 },
  { name: 'Nilesh Thakkar', role: 'Data & Impact Analyst', location: 'Ahmedabad', years: 3 },
  { name: 'Kinjal Panchal', role: 'Communications Lead', location: 'Ahmedabad', years: 4 },
  { name: 'Hitesh Rabari', role: 'Field Coordinator', location: 'Banaskantha', years: 6 },
  { name: 'Manisha Vyas', role: 'Finance Manager', location: 'Ahmedabad', years: 5 },
];

const board = [
  { name: 'Justice A.K. Patel (Retd.)', role: 'Chairman, Board of Trustees', tag: 'Chairman' },
  { name: 'Dr. Sheela Iyer', role: 'Trustee – Public Health', tag: 'Health' },
  { name: 'CA Suresh Gujarati', role: 'Trustee – Finance & Audit', tag: 'Finance' },
  { name: 'Prof. Nalini Bhatt', role: 'Trustee – Education Policy', tag: 'Education' },
];

/* ── 3D Leader Card ── */
function LeaderCard({ member, index, colors }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const cardRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -12, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        className="tm-leader-card"
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hov ? 1.025 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top color band */}
        <div className="tm-leader-band" style={{ background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` }}>
          <motion.div className="tm-leader-ring tm-leader-ring-1" style={{ borderColor: `${colors[1]}55` }} animate={hov ? { scale: 1.15 } : { scale: 1 }} transition={{ duration: 0.4 }} />
          <motion.div className="tm-leader-ring tm-leader-ring-2" style={{ borderColor: `${colors[1]}33` }} animate={hov ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.5 }} />
          <span className="tm-leader-tag">{member.tag}</span>
        </div>

        {/* Avatar floating over the band */}
        <div className="tm-leader-avatar-wrap">
          <motion.div
            animate={hov ? { y: -6, boxShadow: `0 16px 48px ${colors[0]}55` } : { y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ borderRadius: '50%', border: '3px solid white' }}
          >
            <Avatar name={member.name} color1={colors[0]} color2={colors[1]} size={88} />
          </motion.div>
        </div>

        {/* Body */}
        <div className="tm-leader-body">
          <h3 className="tm-leader-name">{member.name}</h3>
          <div className="tm-leader-role" style={{ color: colors[0] }}>{member.role}</div>
          <p className="tm-leader-bio">{member.bio}</p>

          <motion.a
            href={member.linkedin}
            className="tm-leader-linkedin"
            style={{ '--lc': colors[0] }}
            animate={hov ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 3 }}
            transition={{ duration: 0.2 }}
          >
            <LinkedInIcon />
            <span>View LinkedIn</span>
            <ArrowRightIcon />
          </motion.a>
        </div>

        {/* Bottom color strip reveal */}
        <motion.div
          className="tm-card-strip"
          style={{ background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` }}
          animate={hov ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Field Team Member Card ── */
function FieldCard({ member, index, colors }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="tm-field-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.025, y: -4 }}
    >
      {/* Left color bar */}
      <motion.div
        className="tm-field-bar"
        style={{ background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})` }}
        animate={hov ? { width: 6 } : { width: 4 }}
        transition={{ duration: 0.2 }}
      />

      {/* Avatar */}
      <motion.div animate={hov ? { scale: 1.08 } : { scale: 1 }} transition={{ duration: 0.25 }}>
        <Avatar name={member.name} color1={colors[0]} color2={colors[1]} size={56} />
      </motion.div>

      {/* Info */}
      <div className="tm-field-info">
        <div className="tm-field-name">{member.name}</div>
        <div className="tm-field-role" style={{ color: colors[0] }}>{member.role}</div>
        <div className="tm-field-meta">
          <span><MapPinIcon /> {member.location}</span>
          <span><CalendarIcon /> {member.years} yrs</span>
        </div>
      </div>

      {/* Stars */}
      <div className="tm-field-stars" style={{ color: colors[0] }}>
        {Array.from({ length: Math.min(member.years, 5) }).map((_, i) => <StarIcon key={i} />)}
      </div>
    </motion.div>
  );
}

/* ── Board Row ── */
function BoardRow({ member, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      className="tm-board-row"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ x: 6 }}
    >
      <div className="tm-board-idx" style={{ background: hov ? '#005b9a' : 'rgba(0,91,154,0.08)', color: hov ? 'white' : '#005b9a' }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="tm-board-main">
        <div className="tm-board-name">{member.name}</div>
        <div className="tm-board-role">{member.role}</div>
      </div>
      <span className="tm-board-tag">{member.tag}</span>
      <motion.div animate={hov ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }} transition={{ duration: 0.2 }}>
        <ArrowRightIcon />
      </motion.div>
    </motion.div>
  );
}

/* ── Section Header ── */
function SectionHeader({ eyebrow, icon: Icon, title, sub, inView }) {
  return (
    <div className="tm-section-header">
      <motion.div className="tm-eyebrow"
        initial={{ opacity: 0, y: -16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        <Icon />{eyebrow}
      </motion.div>
      <motion.h2 className="tm-section-title"
        initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
        {title}
      </motion.h2>
      {sub && (
        <motion.p className="tm-section-sub"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ── Page Header with parallax ── */
function TeamPageHeader() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const navigate = useNavigate();

  return (
    <div ref={ref} className="tm-hero">
      <motion.div className="tm-hero-bg" style={{ y }} />
      <div className="tm-hero-overlay" />
      {/* Floating orbs */}
      {[
        { w: 320, h: 320, top: '-10%', left: '-5%', c: '#005b9a' },
        { w: 220, h: 220, top: '60%', right: '-3%', c: '#00a7a7' },
        { w: 160, h: 160, top: '30%', left: '55%', c: '#a855f7' },
      ].map((o, i) => (
        <motion.div key={i} className="tm-hero-orb"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: o.right, background: `radial-gradient(circle, ${o.c}44, transparent 70%)` }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <motion.div className="tm-hero-content" style={{ opacity }}>
        <div className="breadcrumb" style={{ marginBottom: '1.2rem' }}>
          <span onClick={() => navigate('/')} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: '0.82rem' }}>Home</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 0.4rem' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>Team</span>
        </div>
        <motion.div className="tm-hero-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <UsersIcon /> Meet Our Team
        </motion.div>
        <motion.h1 className="tm-hero-title"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          The People Who Make<br /><span className="tm-hero-accent">It Happen</span>
        </motion.h1>
        <motion.p className="tm-hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}>
          On the ground, in the field, every single day — driven by purpose.
        </motion.p>
        {/* Stat pills */}
        <motion.div className="tm-hero-stats"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
          {[['25+', 'Team Members'], ['8', 'Districts'], ['7 Yrs', 'Serving']].map(([n, l]) => (
            <div key={l} className="tm-hero-stat">
              <span className="tm-hero-stat-n">{n}</span>
              <span className="tm-hero-stat-l">{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Team() {
  const leaderRef = useRef(null);
  const fieldRef = useRef(null);
  const boardRef = useRef(null);
  const leaderInView = useInView(leaderRef, { once: true, margin: '-80px' });
  const fieldInView = useInView(fieldRef, { once: true, margin: '-80px' });
  const boardInView = useInView(boardRef, { once: true, margin: '-80px' });

  return (
    <div className="tm-page">
      <TeamPageHeader />

      {/* Leadership */}
      <section className="tm-section tm-section-alt" ref={leaderRef}>
        <div className="tm-container">
          <SectionHeader eyebrow="Leadership" icon={StarIcon} title="The People Who Lead" sub="Visionaries building change from the ground up." inView={leaderInView} />
          <div className="tm-leader-grid">
            {leadership.map((m, i) => (
              <LeaderCard key={m.name} member={m} index={i} colors={LEADER_COLORS[i % LEADER_COLORS.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* Field Team */}
      <section className="tm-section" ref={fieldRef}>
        <div className="tm-container">
          <SectionHeader eyebrow="Field Team" icon={MapPinIcon} title="The People in the Villages" sub="They don't work at desks — they work where it matters most." inView={fieldInView} />
          <div className="tm-field-grid">
            {fieldTeam.map((m, i) => (
              <FieldCard key={m.name} member={m} index={i} colors={FIELD_COLORS[i % FIELD_COLORS.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="tm-section tm-section-alt" ref={boardRef}>
        <div className="tm-container">
          <SectionHeader eyebrow="Governance" icon={ShieldIcon} title="Board of Trustees" sub="Independent oversight ensuring accountability and integrity." inView={boardInView} />
          <div className="tm-board-list">
            {board.map((b, i) => <BoardRow key={b.name} member={b} index={i} />)}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="tm-cta-section">
        <div className="tm-container">
          <motion.div
            className="tm-cta-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tm-cta-content">
              <div className="tm-cta-eyebrow">Join Us</div>
              <h2 className="tm-cta-title">Want to be part of the mission?</h2>
              <p className="tm-cta-sub">We welcome volunteers, interns, and passionate professionals who want to create real, lasting change.</p>
              <div className="tm-cta-btns">
                <motion.a href="/careers" className="tm-cta-btn tm-cta-btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  View Open Roles <ArrowRightIcon />
                </motion.a>
                <motion.a href="/contact" className="tm-cta-btn tm-cta-btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Volunteer With Us
                </motion.a>
              </div>
            </div>
            <div className="tm-cta-orbs">
              {['#005b9a', '#00a7a7', '#a855f7'].map((c, i) => (
                <motion.div key={i} className="tm-cta-orb"
                  style={{ background: `radial-gradient(circle, ${c}44, transparent 70%)` }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}