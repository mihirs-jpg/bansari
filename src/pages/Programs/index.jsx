import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { programs } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import './program.css';

/* ── Categories ─────────────────────────────────────────────── */
const categories = [
  { id: 'all', label: 'All Programs', iconUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=32&h=32&fit=crop&q=80' },
  { id: 'Education', label: 'Education', iconUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=32&h=32&fit=crop&q=80' },
  { id: 'Health', label: 'Health', iconUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=32&h=32&fit=crop&q=80' },
  { id: 'Environment', label: 'Environment', iconUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=32&h=32&fit=crop&q=80' },
  { id: 'Women', label: 'Women Empowerment', iconUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&q=80' },
  { id: 'Rural Dev', label: 'Rural Development', iconUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=32&h=32&fit=crop&q=80' },
  { id: 'Child Welfare', label: 'Child Welfare', iconUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=32&h=32&fit=crop&q=80' },
];

/* ── Impact Stats ───────────────────────────────────────────── */
const programStats = [
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=80&h=80&fit=crop&q=80', num: '4200', suffix: '+', label: 'Students Enrolled' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80', num: '1800', suffix: '+', label: 'Women Trained' },
  { img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=80&h=80&fit=crop&q=80', num: '6500', suffix: '+', label: 'Health Consults' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&q=80', num: '50000', suffix: '+', label: 'Trees Planted' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&q=80', num: '100', suffix: '+', label: 'Villages Reached' },
  { img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=80&h=80&fit=crop&q=80', num: '800', suffix: '+', label: 'Children Protected' },
];

/* ── Methodology ────────────────────────────────────────────── */
const methodology = [
  {
    step: '01',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=320&fit=crop&q=80',
    phase: 'Problem Identification',
    desc: 'We spend months in the community — listening, observing, and building trust — before designing any program. Every initiative starts with the community\'s own definition of the problem.',
  },
  {
    step: '02',
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=320&fit=crop&q=80',
    phase: 'Co-designed Solution',
    desc: 'Programs are co-designed with local leaders, women\'s groups, and panchayats. We bring tools, expertise, and resources — communities bring ownership and on-the-ground wisdom.',
  },
  {
    step: '03',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=320&fit=crop&q=80',
    phase: 'Measured Impact',
    desc: 'We track 40+ indicators per program — attendance, income, health outcomes, tree survival rates — and share results publicly. No program continues without evidence of impact.',
  },
];

/* ── Beneficiary Stories ────────────────────────────────────── */
const beneficiaryStories = [
  {
    name: 'Sunita Parmar', age: 15, program: 'Shiksha Daan',
    loc: 'Patan District', programColor: '#005B9A',
    tag: 'Education',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&q=80',
    bgImg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=600&fit=crop&q=60',
    quote: 'I had left school in Class 7 to help at home. When Banshri opened a learning center near our village, my mother agreed to let me join. I\'ve now cleared my Class 10 boards and want to become a teacher.',
    highlight: 'Class 10 boards cleared',
    before: 'Dropped out at Class 7, helping with household chores',
    after: 'Cleared Class 10 boards, aspiring to become a teacher',
    stats: [{ label: 'Grade Cleared', val: 'Class 10' }, { label: 'Year', val: '2024' }, { label: 'Future Goal', val: 'Teacher' }],
  },
  {
    name: 'Rekha Patel', age: 34, program: 'Shakti Abhiyan',
    loc: 'Mehsana District', programColor: '#00A7A7',
    tag: 'Women',
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&q=80',
    bgImg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=600&fit=crop&q=60',
    quote: 'Before the training, I had never earned a single rupee independently. After three months of tailoring and business skills, I started taking orders. Today I earn Rs. 12,000 a month and send my children to an English-medium school.',
    highlight: '₹12,000/month earned independently',
    before: 'No independent income, fully dependent on husband',
    after: 'Earning ₹12,000/month, children in English-medium school',
    stats: [{ label: 'Monthly Income', val: '₹12K' }, { label: 'Training', val: '3 months' }, { label: 'Children', val: 'Schooling' }],
  },
  {
    name: 'Gopalji Thakor', age: 58, program: 'Nirogi Gaon',
    loc: 'Banaskantha District', programColor: '#00B894',
    tag: 'Health',
    img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop&q=80',
    bgImg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&h=600&fit=crop&q=60',
    quote: 'I had been feeling unwell for two years but the nearest doctor was 40 kilometres away. The Banshri health camp came to our village and diagnosed me with diabetes. Now I have medicine, I exercise, and I am farming again at full capacity.',
    highlight: 'Diagnosed & farming again at full capacity',
    before: 'Ill for 2 years, nearest doctor 40km away, no diagnosis',
    after: 'Diabetes diagnosed, on medication, farming at full capacity',
    stats: [{ label: 'Distance saved', val: '40 km' }, { label: 'Years ill', val: '2 yrs' }, { label: 'Status', val: 'Recovered' }],
  },
];

/* ── Gallery items ───────────────────────────────────────────── */
const galleryItems = [
  { img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=380&fit=crop&q=80', label: 'Classroom session', cat: 'Education' },
  { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=380&fit=crop&q=80', label: 'Digital literacy lab', cat: 'Education' },
  { img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500&h=380&fit=crop&q=80', label: 'Art & creativity workshop', cat: 'Education' },
  { img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=380&fit=crop&q=80', label: 'Mobile health camp', cat: 'Health' },
  { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=380&fit=crop&q=80', label: 'Medicine distribution', cat: 'Health' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=380&fit=crop&q=80', label: 'Tailoring & skill training', cat: 'Women' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=380&fit=crop&q=80', label: 'Tree plantation drive', cat: 'Environment' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=380&fit=crop&q=80', label: 'Village community meeting', cat: 'Rural Dev' },
  { img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=500&h=380&fit=crop&q=80', label: 'Graduation ceremony', cat: 'Events' },
];

export default function Programs() {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('all');

  const filtered = activeCat === 'all'
    ? programs
    : programs.filter(p => p.cat === activeCat);

  return (
    <>
      <PageHeader
        title="Our Programs"
        subtitle="Six integrated initiatives creating lasting change across Gujarat's most underserved communities"
        crumb="Programs"
      />

      {/* ============ CATEGORIES FILTER ============ */}
      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Browse by Focus Area</div>
            <h2 className="section-title">Program Categories</h2>
          </Reveal>
          <div className="prog-cats">
            {categories.map(c => (
              <button
                key={c.id}
                className={`prog-cat-btn ${activeCat === c.id ? 'active' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                <img
                  src={c.iconUrl}
                  alt={c.label}
                  style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROGRAM CARDS ============ */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className="cards-grid">
            {filtered.map((p, i) => (
              <Reveal direction="up" delay={i * 80} key={p.name}>
                <TiltCard max={6} scale={1.015} className="prog-card">
                  <div className="card-img-wrap">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="card-real-img"
                      onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    />
                    <div className="card-img-fallback" style={{ background: p.bg, display: 'none' }}>{p.icon}</div>
                    <div className="card-img-badge">{p.cat}</div>
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <div className="card-stats">
                      <div className="card-stat"><div className="n">{p.impact1}</div><div className="l">{p.l1}</div></div>
                      <div className="card-stat"><div className="n">{p.impact2}</div><div className="l">{p.l2}</div></div>
                    </div>
                    <button className="btn-sm" onClick={() => navigate(`/programs/${p.slug}`)}>Learn More →</button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--light)' }}>
              No programs in this category yet — check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ============ IMPACT STATS ============ */}
      <div className="prog-impact-band">
        <div className="prog-impact-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 0.5rem', background: 'rgba(255,255,255,0.12)', color: 'white' }}>Combined Impact</div>
            <h2 className="section-title" style={{ color: 'white' }}>Program Impact At A Glance</h2>
          </Reveal>
          <div className="prog-stats-grid">
            {programStats.map((s, i) => (
              <Reveal direction="scale" delay={i * 80} key={s.label}>
                <div className="prog-stat-card">
                  <div className="prog-stat-img-wrap">
                    <img src={s.img} alt={s.label} className="prog-stat-img" />
                  </div>
                  <div className="prog-stat-num">
                    <CountUp target={parseInt(s.num).toLocaleString() + s.suffix} />
                  </div>
                  <div className="prog-stat-lbl">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============ METHODOLOGY ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>How We Work</div>
            <h2 className="section-title">Program Methodology</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Every program follows the same rigorous path: Problem → Solution → Impact.</p>
          </Reveal>
          <div className="method-track">
            {methodology.map((m, i) => (
              <Reveal direction="up" delay={i * 100} key={m.step}>
                <div className="method-card method-card-img">
                  <div className="method-img-wrap">
                    <img src={m.img} alt={m.phase} className="method-real-img" />
                    <div className="method-step-badge">{m.step}</div>
                  </div>
                  <div className="method-body">
                    <h4 className="method-phase">{m.phase}</h4>
                    <p className="method-desc">{m.desc}</p>
                  </div>
                  {i < methodology.length - 1 && <div className="method-arrow">→</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFICIARY STORIES ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Real Voices</div>
            <h2 className="section-title">Beneficiary Stories</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Behind every statistic is a life transformed. Here are three of them.</p>
          </Reveal>
          <div className="stories-grid">
            {beneficiaryStories.map((s, i) => (
              <Reveal direction="up" delay={i * 90} key={s.name}>
                <TiltCard max={5} scale={1.01} className="story-card">
                  <div className="story-head">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="story-avatar"
                      onError={e => { e.target.style.display='none'; }}
                    />
                    <div>
                      <div className="story-name">{s.name}</div>
                      <div className="story-meta">Age {s.age} · {s.loc}</div>
                      <div className="story-prog-tag">{s.program}</div>
                    </div>
                  </div>
                  <p className="story-quote">{s.story}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>From the Field</div>
            <h2 className="section-title">Program Gallery</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A glimpse of our work across districts and communities in Gujarat.</p>
          </Reveal>
          <div className="prog-gallery">
            {galleryItems.map((g, i) => (
              <Reveal direction="scale" delay={i * 60} key={g.label}>
                <div className="prog-gallery-item">
                  <img src={g.img} alt={g.label} className="gallery-real-img" />
                  <div className="gallery-overlay">
                    <span className="gallery-label">{g.label}</span>
                    <span className="gallery-cat-tag">{g.cat}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPONSOR CTA ============ */}
      <section className="prog-sponsor-cta">
        <div className="prog-sponsor-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up">
            <div className="sponsor-inner">
              <div className="sponsor-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop&q=80"
                  alt="Partnership"
                  className="sponsor-icon-img"
                />
              </div>
              <h2>Become a Program Sponsor</h2>
              <p>
                Partner with Banshri to fund a full program, sponsor a village, or brand a school lab.
                CSR, individual, and institutional sponsorships available with full impact reporting.
              </p>
              <div className="sponsor-tiers">
                {[
                  { tier: 'Seed', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=60&h=60&fit=crop&q=80', amt: '₹25,000', benefit: '1 Child for 1 Year' },
                  { tier: 'Grove', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=60&h=60&fit=crop&q=80', amt: '₹1,00,000', benefit: '1 Village Health Camp' },
                  { tier: 'Champion', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=60&h=60&fit=crop&q=80', amt: '₹5,00,000', benefit: 'Fund a Full Program Wing' },
                ].map(({ tier, img, amt, benefit }) => (
                  <div className="sponsor-tier" key={tier}>
                    <img src={img} alt={tier} className="tier-img" />
                    <div className="tier-name">{tier}</div>
                    <div className="tier-amt">{amt}</div>
                    <div className="tier-benefit">{benefit}</div>
                  </div>
                ))}
              </div>
              <div className="sponsor-actions">
                <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
                  Sponsor a Program
                </button>
                <button className="btn-secondary" style={{ fontSize: '0.95rem' }}>
                  Request Partnership Proposal
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}