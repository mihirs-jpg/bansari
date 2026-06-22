import React, { useEffect, useRef } from 'react';
import { team, values, impactStats } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import { useParallax } from '../../hooks/useTilt3D';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import './About.css';

/* ── Real photo URLs ────────────────────────────────────────── */
const PHOTOS = {
  founder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80',
  story:   '/images/child-welfare.png',
  team: [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=280&h=280&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=280&h=280&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=280&h=280&fit=crop&q=80',
  ],
  timeline: [
    '/images/education.png',          // 2018 — Founded: reading circle, first 12 children
    '/images/rural-development.png',  // 2019 — First Village Program: village community work
    '/images/women-empowerment.png',  // 2021 — 5,000 Beneficiaries: Shakti Abhiyan women program
    '/images/healthcare.png',         // 2024 — Gujarat Expansion: health camps across 8 districts
    '/images/environment.png',        // 2026 — Future Vision: clean energy & sustainable growth
  ],
};

/* ── Award SVG icons (no emoji) ────────────────────────────── */
const AwardIcons = {
  star: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="var(--gold)" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <path d="M12 2L3 7v6c0 4.97 3.8 9.63 9 10.93C17.2 22.63 21 17.97 21 13V7L12 2z"
        fill="rgba(0,91,154,0.12)" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ribbon: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <circle cx="12" cy="8" r="6" fill="rgba(0,167,167,0.12)" stroke="var(--teal)" strokeWidth="1.5"/>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  certificate: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <rect x="2" y="3" width="20" height="14" rx="3" fill="rgba(244,197,66,0.12)" stroke="var(--gold)" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="10" r="3" fill="rgba(244,197,66,0.2)" stroke="var(--gold)" strokeWidth="1.5"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <circle cx="12" cy="12" r="10" fill="rgba(0,184,148,0.1)" stroke="var(--green)" strokeWidth="1.5"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="var(--green)" strokeWidth="1.5"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" className="award-svg">
      <path d="M8 21h8M12 17v4M7 3H5C5 3 3 3 3 7c0 2.76 1.79 5 4 5" fill="rgba(244,197,66,0.1)" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 3h2c0 0 2 0 2 4 0 2.76-1.79 5-4 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 3h10v8a5 5 0 01-10 0V3z" fill="rgba(244,197,66,0.12)" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ── Timeline data ─────────────────────────────────────────── */
const timeline = [
  { year: '2018', title: 'Founded', desc: 'Dr. Kavita Sharma walks through drought-stricken villages of North Gujarat and founds Banshri with 12 children in a reading circle in Patan.', color: 'var(--blue)', img: PHOTOS.timeline[0] },
  { year: '2019', title: 'First Village Program', desc: 'Launch of our first full village program covering education, health, and livelihood in Banaskantha district, touching 400+ families.', color: 'var(--teal)', img: PHOTOS.timeline[1] },
  { year: '2021', title: '5,000 Beneficiaries', desc: 'A milestone year — 5,000 direct beneficiaries across 3 districts, 30 schools, and the birth of the Shakti Abhiyan women\'s empowerment program.', color: 'var(--gold)', img: PHOTOS.timeline[2] },
  { year: '2024', title: 'Gujarat Expansion', desc: 'Expanded to 8 districts across Gujarat, planted 50,000 trees, and crossed 10,000+ beneficiaries. Received AAA NGO rating from GuideStar India.', color: 'var(--green)', img: PHOTOS.timeline[3] },
  { year: '2026', title: 'Future Vision', desc: 'Scaling to 15 districts, launching the Banshri Digital Academy, and targeting 25,000 beneficiaries by 2026 — one district at a time.', color: '#a855f7', img: PHOTOS.timeline[4], future: true },
];

/* ── Awards data ───────────────────────────────────────────── */
const awards = [
  { icon: AwardIcons.star, title: 'GuideStar India AAA Rating', year: '2024', body: 'Platinum Transparency Award for financial reporting excellence.' },
  { icon: AwardIcons.ribbon, title: 'NITI Aayog Recognition', year: '2023', body: 'Recognized as one of Gujarat\'s top 10 grassroots NGOs in Social Impact.' },
  { icon: AwardIcons.shield, title: 'Tata Trusts Partnership', year: '2022', body: 'Selected as a Tata Trusts implementation partner for rural education in 4 districts.' },
  { icon: AwardIcons.trophy, title: 'CM\'s Social Service Award', year: '2021', body: 'Gujarat Chief Minister\'s Award for Outstanding Contribution to Rural Development.' },
  { icon: AwardIcons.certificate, title: '80G & 12(A) Certified', year: '2018', body: 'Fully certified by the Income Tax Department for tax-exempt donations from day one.' },
  { icon: AwardIcons.globe, title: 'FCRA Registration', year: '2019', body: 'Registered to receive international funds — enabling global donors to support our mission.' },
];

/* ── 2030 Goals ────────────────────────────────────────────── */
const goals2030 = [
  { year: '2027', target: '15 Districts', desc: 'Reach all 15 underserved districts of Gujarat with integrated programs.', img: '/images/rural-development.png', color: 'var(--blue)' },
  { year: '2028', target: 'Digital Academy', desc: 'Launch Banshri Digital Academy — free online learning for 10,000 rural students.', img: '/images/education.png', color: 'var(--teal)' },
  { year: '2029', target: '50 Health Hubs', desc: 'Establish 50 permanent community health hubs with telemedicine access.', img: '/images/healthcare.png', color: 'var(--green)' },
  { year: '2030', target: '2 Lakh Trees', desc: 'Plant 2,00,000 trees and restore 25 watersheds across North and Central Gujarat.', img: '/images/environment.png', color: '#a855f7' },
];

/* ── Donation breakdown ────────────────────────────────────── */
const donationBreakdown = [
  { label: 'Education', pct: 40, color: 'var(--blue)' },
  { label: 'Healthcare', pct: 25, color: 'var(--teal)' },
  { label: 'Environment', pct: 20, color: 'var(--green)' },
  { label: 'Operations', pct: 15, color: 'var(--gold)' },
];

/* ── Core values ───────────────────────────────────────────── */
const coreValues = [
  { name: 'Transparency', desc: 'Every rupee accounted for. We publish audited reports publicly and maintain GuideStar AAA rating.', accentColor: 'var(--blue)' },
  { name: 'Compassion', desc: 'We lead with genuine empathy — treating every beneficiary with dignity and deep care.', accentColor: 'var(--teal)' },
  { name: 'Sustainability', desc: 'Programs built to outlive our presence — local ownership, local leadership, lasting change.', accentColor: 'var(--green)' },
  { name: 'Equality', desc: 'No one left behind. We intentionally reach the most marginalized and furthest from support.', accentColor: 'var(--gold)' },
];

/* ── Value SVG icons ──────────────────────────────────────── */
const ValueIcons = [
  <svg key="t" viewBox="0 0 24 24" fill="none" className="value-svg"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" className="value-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  <svg key="s" viewBox="0 0 24 24" fill="none" className="value-svg"><path d="M2 22s4-2 10-2 10 2 10 2M12 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 6v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="e" viewBox="0 0 24 24" fill="none" className="value-svg"><path d="M12 22V2M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

/* ── Horizontal Cascading Scroll Timeline ────────────────────────────────
   Reference motion: a stacked deck of skewed/tilted cards fanning out
   diagonally. As the section scrolls, the deck advances horizontally —
   each card un-skews and snaps flat into focus, then tilts away and
   recedes into the stack as the next card takes its place.
   - Outer section is tall to provide scroll runway.
   - Inner sticky panel pins full-height while progress (0→1) drives
     every card's x / rotate / scale / opacity / blur via useTransform.
   ─────────────────────────────────────────────────────────────────────── */

function TimelineDeckCard({ item, index, total, smoothProgress }) {
  const step = 1 / total;
  const center = index * step + step / 2;

  // Window of progress during which this card is the active "in focus" one
  const enter = center - step * 0.85;
  const peak = center;
  const exit = center + step * 0.85;

  const x = useTransform(
    smoothProgress,
    [enter, peak, exit],
    ['68vw', '0vw', '-68vw']
  );

  const rotate = useTransform(
    smoothProgress,
    [enter, peak, exit],
    [16, 0, -16]
  );

  const scale = useTransform(
    smoothProgress,
    [enter, peak, exit],
    [0.78, 1, 0.78]
  );

  const opacity = useTransform(
    smoothProgress,
    [enter, enter + step * 0.28, peak, exit - step * 0.28, exit],
    [0, 1, 1, 1, 0]
  );

  const blur = useTransform(
    smoothProgress,
    [enter, enter + step * 0.3, peak, exit - step * 0.3, exit],
    [6, 0, 0, 0, 6]
  );

  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // Depth offset for the "stack" feel — cards queued behind fan out slightly
  const z = total - Math.abs(index - 1);

  return (
    <motion.div
      className="tlx-card-slot"
      style={{
        x,
        rotate,
        scale,
        opacity,
        filter,
        zIndex: 100 + z,
      }}
    >
      <div className="tlx-card" style={{ '--accent': item.color }}>
        <div className="tlx-glow" style={{ background: item.color }} />

        <div className="tlx-img-wrap">
          <img src={item.img} alt={item.title} className="tlx-img" loading="lazy" />
          <div className="tlx-img-fade" />
          <div className="tlx-index">{String(index + 1).padStart(2, '0')}</div>
          {item.future && (
            <div className="tlx-future">
              <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                <path d="M12 2l3 6.5L22 9.3l-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2 2 9.3l7-1L12 2z" fill="#a855f7" />
              </svg>
              Coming Soon
            </div>
          )}
        </div>

        <div className="tlx-body">
          <div className="tlx-yr-row">
            <span className="tlx-yr" style={{ color: item.color }}>{item.year}</span>
            <span className="tlx-yr-line" style={{ background: item.color }} />
          </div>
          <h3 className="tlx-title">{item.title}</h3>
          <p className="tlx-desc">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PinnedTimeline() {
  const sectionRef = useRef(null);
  const TOTAL_CARDS = timeline.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const bgGradient = useTransform(
    smoothProgress,
    timeline.map((_, i) => i / Math.max(1, TOTAL_CARDS - 1)),
    timeline.map((t) => `linear-gradient(135deg, #050810 0%, ${t.color}22 55%, #050810 100%)`)
  );

  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => {
    return smoothProgress.on('change', (v) => {
      const idx = Math.min(TOTAL_CARDS - 1, Math.max(0, Math.round(v * TOTAL_CARDS - 0.5)));
      setActiveIdx(idx);
    });
  }, [smoothProgress, TOTAL_CARDS]);

  return (
    <section ref={sectionRef} className="tlx-section">
      <div className="tlx-sticky">
        <motion.div className="tlx-bg" style={{ background: bgGradient }} />

        {/* Faint receding deck edges for depth */}
        <div className="tlx-deck-ambient" aria-hidden="true">
          {timeline.map((t, i) => (
            <div
              key={i}
              className="tlx-deck-card"
              style={{
                background: t.color,
                transform: `translate(-50%, -50%) rotate(${(i - (TOTAL_CARDS - 1) / 2) * 4}deg) translateX(${(i - (TOTAL_CARDS - 1) / 2) * 90}px)`,
              }}
            />
          ))}
        </div>

        <div className="tlx-header">
          <div className="tlx-tag">Our Journey</div>
          <h2 className="tlx-heading">Organization Timeline</h2>
          <p className="tlx-sub">From a single promise to a statewide movement</p>
        </div>

        <div className="tlx-stage">
          {timeline.map((item, i) => (
            <TimelineDeckCard
              key={item.year}
              item={item}
              index={i}
              total={TOTAL_CARDS}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        <div className="tlx-footer">
          <div className="tlx-steps">
            {timeline.map((item, i) => (
              <div key={item.year} className={`tlx-step ${i === activeIdx ? 'tlx-step--active' : ''}`}>
                <span className="tlx-step-dot" style={{
                  background: item.color,
                  boxShadow: i === activeIdx ? `0 0 14px ${item.color}` : 'none',
                }} />
                <span className="tlx-step-yr" style={{ color: item.color, opacity: i === activeIdx ? 1 : 0.4 }}>
                  {item.year}
                </span>
              </div>
            ))}
          </div>

          <div className="tlx-rail">
            <motion.div className="tlx-rail-fill" style={{
              scaleX: smoothProgress,
              transformOrigin: 'left',
              background: useTransform(
                smoothProgress,
                [0, 0.25, 0.5, 0.75, 1],
                ['var(--blue)', 'var(--teal)', 'var(--gold)', 'var(--green)', '#a855f7']
              ),
            }} />
          </div>

          <p className="tlx-hint">
            <motion.span style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}>
              ↓ Scroll to advance the timeline
            </motion.span>
          </p>
        </div>
      </div>
    </section>
  );
}



export default function About() {
  const orb1 = useParallax(0.4);
  const orb2 = useParallax(-0.3);

  useEffect(() => {
    const handlers = [orb1.handleScroll, orb2.handleScroll];
    const onScroll = () => handlers.forEach((h) => h());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [orb1, orb2]);

  return (
    <>
      {/* ============ HEADER ============ */}
      <div className="about-header">
        <div className="about-header-orb about-header-orb-1" ref={orb1.ref}></div>
        <div className="about-header-orb about-header-orb-2" ref={orb2.ref}></div>
        <PageHeader title="About Banshri" subtitle="Our story, our values, and the people who make it all possible" />
      </div>

      {/* ============ STORY ============ */}
      <section className="section">
        <div className="container">
          <div className="story-split">
            <Reveal direction="left" className="story-text">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">Born from a Promise</h2>
              <p style={{ color: 'var(--light)', lineHeight: 1.85, marginBottom: '1.1rem' }}>
                In 2018, Dr. Kavita Sharma walked through the drought-stricken villages of North Gujarat
                and made a promise — that no child's future would be determined by their postcode.
                Banshri was born that day.
              </p>
              <p style={{ color: 'var(--light)', lineHeight: 1.85, marginBottom: '1.1rem' }}>
                What began as a small reading circle for 12 children in Patan has grown into a
                pan-Gujarat movement touching 10,000+ lives through six integrated programs.
              </p>
              <p style={{ color: 'var(--light)', lineHeight: 1.85 }}>
                Named after the sacred flute — the Banshi — which creates harmony from the simplest
                breath, our organization believes in the transformative power of connection, community,
                and compassion.
              </p>

              <div className="story-stats">
                {[['10,000+', 'Lives Touched'], ['8', 'Districts'], ['7 yrs', 'Of Service'], ['6', 'Programs']].map(([val, lbl]) => (
                  <div key={lbl} className="story-stat-item">
                    <div className="story-stat-val">{val}</div>
                    <div className="story-stat-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={120} className="story-image-col">
              <div className="story-photo-wrap">
                <img
                  src={PHOTOS.story}
                  alt="Children at Banshri's reading program"
                  className="story-photo"
                  loading="lazy"
                />
                <div className="story-photo-badge">
                  <div className="spb-num">AAA</div>
                  <div className="spb-lbl">NGO Rating</div>
                </div>
                <div className="story-photo-badge2">
                  <div className="spb-num">80G</div>
                  <div className="spb-lbl">Tax Certified</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <PinnedTimeline />

      {/* ============ FOUNDER MESSAGE ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Founder's Message</div>
            <h2 className="section-title">A Word from Our Founder</h2>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <div className="founder-card">
              <div className="founder-photo-col">
                <div className="founder-img-wrap">
                  <img
                    src={PHOTOS.founder}
                    alt="Dr. Kavita Sharma — Founder & Executive Director"
                    className="founder-img"
                    loading="lazy"
                  />
                </div>
                <div className="founder-meta">
                  <strong>Dr. Kavita Sharma</strong>
                  <span>Founder &amp; Executive Director</span>
                  <div className="founder-badges">
                    <span>IIM Ahmedabad</span>
                    <span>20 yrs Rural Dev</span>
                  </div>
                </div>
              </div>
              <div className="founder-quote">
                <div className="quote-mark">&ldquo;</div>
                <p>
                  When I first walked into those villages in 2018, I saw children with brilliant minds
                  sitting in broken classrooms — or worse, not in classrooms at all. I saw women who
                  were capable of running entire enterprises but had never been given the tools or the confidence.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  I didn't start Banshri because I had all the answers. I started it because I couldn't
                  sleep knowing I had walked away without trying. Seven years later, I know that real change
                  is slow, honest, and only possible when communities own it themselves.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Every child we reach, every woman we support, every tree we plant — it is not charity.
                  It is justice. Thank you for being part of this movement.
                </p>
                <div className="founder-signature">— Dr. Kavita Sharma</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Direction</div>
            <h2 className="section-title">Vision &amp; Mission</h2>
          </Reveal>
          <div className="vm-grid">
            <Reveal direction="left" delay={80}>
              <TiltCard max={6} scale={1.01} className="vm-card vm-vision">
                <div className="vm-icon-wrap vm-vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                    <circle cx="11" cy="11" r="8" stroke="var(--blue)" strokeWidth="1.8"/>
                    <path d="M21 21l-4.35-4.35" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="11" cy="11" r="3" fill="rgba(0,91,154,0.15)" stroke="var(--blue)" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="vm-label">Our Vision</div>
                <h3>A Gujarat Where No One is Left Behind</h3>
                <p>
                  We envision a Gujarat where every child has access to quality education, every woman
                  has economic freedom, every village has clean water and health access — and where
                  communities drive their own futures.
                </p>
              </TiltCard>
            </Reveal>
            <Reveal direction="right" delay={80}>
              <TiltCard max={6} scale={1.01} className="vm-card vm-mission">
                <div className="vm-icon-wrap vm-mission-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                    <circle cx="12" cy="12" r="10" stroke="var(--teal)" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="6" stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="2 2"/>
                    <circle cx="12" cy="12" r="2" fill="var(--teal)"/>
                    <line x1="12" y1="2" x2="12" y2="5" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="2" y1="12" x2="5" y2="12" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="19" y1="12" x2="22" y2="12" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="vm-label">Our Mission</div>
                <h3>Integrated Programs, Lasting Impact</h3>
                <p>
                  To design and deliver community-owned programs in education, health, environment,
                  and livelihoods that address root causes of inequality and build lasting self-reliance
                  in Gujarat's most underserved villages.
                </p>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>What Guides Us</div>
            <h2 className="section-title">Core Values</h2>
          </Reveal>
          <div className="values-row">
            {coreValues.map((v, i) => (
              <Reveal direction="up" delay={i * 80} key={v.name}>
                <TiltCard max={7} scale={1.02} className="value-card-pro">
                  <div className="value-icon-pro" style={{ color: v.accentColor, background: `${v.accentColor}14` }}>
                    {ValueIcons[i]}
                  </div>
                  <h4 className="value-name-pro">{v.name}</h4>
                  <p className="value-desc-pro">{v.desc}</p>
                  <div className="value-accent-bar" style={{ background: v.accentColor }}></div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW DONATIONS ARE USED ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Financial Transparency</div>
            <h2 className="section-title">How Your Donation Is Used</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>At least 85% of every rupee goes directly to programs.</p>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <div className="donation-layout">
              <div className="donation-chart-wrap">
                <DonationPieChart data={donationBreakdown} />
              </div>
              <div className="donation-legend">
                {donationBreakdown.map((d, i) => (
                  <div className="donation-row" key={d.label} style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="donation-dot" style={{ background: d.color }}></div>
                    <div className="donation-info">
                      <div className="donation-label">{d.label}</div>
                      <div className="donation-bar-wrap">
                        <div className="donation-bar" style={{ width: `${d.pct}%`, background: d.color }}></div>
                      </div>
                    </div>
                    <div className="donation-pct" style={{ color: d.color }}>{d.pct}%</div>
                  </div>
                ))}
                <div className="donation-note">
                  Full audited accounts available in our <strong>Annual Report</strong>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Leadership</div>
            <h2 className="section-title">The Team Behind the Mission</h2>
          </Reveal>
          <div className="team-grid-pro">
            {team.map((t, i) => (
              <Reveal direction="up" delay={i * 100} key={t.name}>
                <TiltCard max={6} scale={1.015} className="team-card-pro">
                  <div className="team-photo-wrap">
                    <img
                      src={PHOTOS.team[i] || PHOTOS.team[0]}
                      alt={t.name}
                      className="team-photo"
                      loading="lazy"
                    />
                    <div className="team-photo-overlay"></div>
                  </div>
                  <div className="team-body-pro">
                    <h4 className="team-name">{t.name}</h4>
                    <div className="team-role">{t.role}</div>
                    <p className="team-bio">{t.bio}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AWARDS & RECOGNITION ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Recognition</div>
            <h2 className="section-title">Awards &amp; Recognition</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Trusted, certified, and recognized by leading institutions across India.</p>
          </Reveal>
          <div className="awards-grid">
            {awards.map((a, i) => (
              <Reveal direction="up" delay={i * 70} key={a.title}>
                <TiltCard max={6} scale={1.01} className="award-card">
                  <div className="award-icon">{a.icon}</div>
                  <div className="award-year">{a.year}</div>
                  <h4 className="award-title">{a.title}</h4>
                  <p className="award-body">{a.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT ============ */}
      <div className="impact-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="about-impact-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>2024–25 Annual Highlights</h2>
          </Reveal>
          <div className="impact-grid">
            {impactStats.map((item, idx) => (
              <Reveal direction="scale" delay={idx * 90} key={item.l}>
                <TiltCard max={12} scale={1.05} className="impact-card">
                  <div className="impact-num"><CountUp target={item.n} /></div>
                  <div className="impact-lbl">{item.l}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={200} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn-outline-white magnetic-btn">Download Annual Report</button>
          </Reveal>
        </div>
      </div>

      {/* ============ FUTURE GOALS 2030 ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Looking Ahead</div>
            <h2 className="section-title">Future Goals: Road to 2030</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Our 5-year roadmap to scale impact across all of Gujarat.</p>
          </Reveal>
          <div className="goals-grid-pro">
            {goals2030.map((g, i) => (
              <Reveal direction="up" delay={i * 90} key={g.year}>
                <TiltCard max={6} scale={1.015} className="goal-card-pro">
                  <div className="goal-img-wrap">
                    <img src={g.img} alt={g.target} className="goal-img" loading="lazy" />
                    <div className="goal-year-badge" style={{ background: g.color }}>{g.year}</div>
                  </div>
                  <div className="goal-body">
                    <h4 className="goal-target" style={{ color: g.color }}>{g.target}</h4>
                    <p className="goal-desc">{g.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={200} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Join Our 2030 Mission
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── Inline SVG Pie Chart ──────────────────────────────────── */
function DonationPieChart({ data }) {
  const size = 220;
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;
  let startAngle = -90;

  const slices = data.map((d) => {
    const angle = (d.pct / 100) * 360;
    const start = startAngle;
    const end = startAngle + angle;
    startAngle = end;
    const startRad = (start * Math.PI) / 180;
    const endRad = (end * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const large = angle > 180 ? 1 : 0;
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="donation-pie">
      {slices.map((s) => (
        <path key={s.label} d={s.path} fill={s.color} stroke="white" strokeWidth="3" className="pie-slice" />
      ))}
      <circle cx={cx} cy={cy} r={44} fill="white" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="var(--light)" fontFamily="Inter">Donation</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="var(--light)" fontFamily="Inter">Breakdown</text>
    </svg>
  );
}