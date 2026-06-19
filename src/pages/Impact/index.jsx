import { Link } from 'react-router-dom';
import './impact.css';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import './impact.css';

const stats = [
  {
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&h=120&fit=crop&q=80',
    n: '4,200+', l: 'Students Enrolled',
    desc: 'Across 52 rural schools in North & Central Gujarat',
    color: 'var(--blue)',
  },
  {
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&q=80',
    n: '1,800', l: 'Women Trained',
    desc: 'Vocational skills, SHGs, and entrepreneurship',
    color: '#e91e8c',
  },
  {
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=120&h=120&fit=crop&q=80',
    n: '6,500+', l: 'Health Consultations',
    desc: 'Free mobile camps in 100+ villages',
    color: 'var(--teal)',
  },
  {
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&h=120&fit=crop&q=80',
    n: '50,000+', l: 'Trees Planted',
    desc: 'Across watershed restoration zones',
    color: '#16a34a',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&q=80',
    n: '100+', l: 'Villages Reached',
    desc: 'In 8 districts of Gujarat',
    color: 'var(--blue)',
  },
  {
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&h=120&fit=crop&q=80',
    n: '800+', l: 'Children Protected',
    desc: 'Nutrition, safety, and welfare programs',
    color: 'var(--gold)',
  },
  {
    img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=120&h=120&fit=crop&q=80',
    n: '350+', l: 'Volunteers Mobilized',
    desc: 'From 18 states across India',
    color: '#a855f7',
  },
  {
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=120&h=120&fit=crop&q=80',
    n: '7 Years', l: 'Of Continuous Service',
    desc: 'Since 2018, without interruption',
    color: 'var(--blue)',
  },
];

const programImpact = [
  {
    name: 'Shiksha Daan', slug: 'shiksha-daan',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=280&h=180&fit=crop&q=80',
    metric1: '4,200+ students', metric2: '95% retention rate', metric3: '52 schools',
    color: 'var(--blue)', desc: 'Quality education and digital literacy for children across rural Gujarat.',
  },
  {
    name: 'Shakti Abhiyan', slug: 'shakti-abhiyan',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=280&h=180&fit=crop&q=80',
    metric1: '1,800 women trained', metric2: '₹45L+ income generated', metric3: '60 SHGs formed',
    color: '#e91e8c', desc: 'Vocational training and entrepreneurship support for rural women.',
  },
  {
    name: 'Nirogi Gaon', slug: 'nirogi-gaon',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=280&h=180&fit=crop&q=80',
    metric1: '6,500+ consultations', metric2: '100+ villages covered', metric3: '0 malaria in 3 villages',
    color: 'var(--teal)', desc: 'Free mobile health camps bringing doctors to remote doorsteps.',
  },
  {
    name: 'Harit Bharat', slug: 'harit-bharat',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=280&h=180&fit=crop&q=80',
    metric1: '50K trees planted', metric2: '12 watersheds restored', metric3: '3 forest dept partnerships',
    color: '#16a34a', desc: 'Reforestation and watershed restoration across North Gujarat.',
  },
  {
    name: 'Bal Suraksha', slug: 'bal-suraksha',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=280&h=180&fit=crop&q=80',
    metric1: '800+ children enrolled', metric2: '12 safe-space centers', metric3: '100% nutrition coverage',
    color: 'var(--gold)', desc: 'Child nutrition, protection, and safe-space programs in 12 centers.',
  },
  {
    name: 'Grameen Unnati', slug: 'grameen-unnati',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=280&h=180&fit=crop&q=80',
    metric1: '30+ villages', metric2: '500+ families', metric3: 'Sanitation in 20 schools',
    color: 'var(--teal)', desc: 'Infrastructure, sanitation and livelihood development in underserved villages.',
  },
];

const sdgGoals = [
  { n: 1, title: 'No Poverty', match: 'Livelihood programs for 1,800+ women', img: 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=80&h=80&fit=crop&q=80', color: '#e5243b' },
  { n: 3, title: 'Good Health', match: '6,500+ free consultations', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=80&fit=crop&q=80', color: '#4c9f38' },
  { n: 4, title: 'Quality Education', match: 'Digital classrooms for 4,200+ children', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&h=80&fit=crop&q=80', color: '#c5192d' },
  { n: 5, title: 'Gender Equality', match: 'Shakti Abhiyan women empowerment', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80', color: '#ff3a21' },
  { n: 13, title: 'Climate Action', match: '50K trees, 12 watershed restorations', img: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=80&h=80&fit=crop&q=80', color: '#3f7e44' },
  { n: 15, title: 'Life on Land', match: 'Harit Bharat reforestation initiative', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&q=80', color: '#56c02b' },
];

const milestones = [
  { year: '2018', title: 'Foundation Established', desc: 'Banshri launched with Shiksha Daan in 3 villages of Patan district.', img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=180&fit=crop&q=80' },
  { year: '2019', title: 'Health Wing Launched', desc: 'Nirogi Gaon mobile health camps began serving 20 villages.', img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&h=180&fit=crop&q=80' },
  { year: '2020', title: 'Women Empowerment', desc: 'Shakti Abhiyan trained its first 200 women during the pandemic.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=180&fit=crop&q=80' },
  { year: '2022', title: '10,000 Lives Milestone', desc: 'Crossed 10,000 direct beneficiaries across 6 programs.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=180&fit=crop&q=80' },
  { year: '2023', title: 'FCRA & 80G Certified', desc: 'Received all major compliance certifications for transparency.', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=180&fit=crop&q=80' },
  { year: '2025', title: '50K Trees Planted', desc: 'Harit Bharat reaches its landmark 50,000 tree milestone.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=180&fit=crop&q=80' },
];

const testimonials = [
  {
    text: 'Banshri gave my daughter a tablet and a teacher who cared. Today she topped her class. I never imagined this was possible.',
    author: 'Geeta Ben', role: 'Parent, Patan District',
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&q=80',
    program: 'Shiksha Daan',
  },
  {
    text: 'The Shakti Abhiyan training helped me start my own tailoring business. I now earn Rs.12,000 a month and support my family independently.',
    author: 'Rekha Patel', role: 'Entrepreneur, Mehsana',
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&q=80',
    program: 'Shakti Abhiyan',
  },
  {
    text: 'Volunteering with Banshri for a weekend changed how I see the world. The children\'s smiles are the most meaningful thing I have experienced.',
    author: 'Ankit Shah', role: 'Volunteer, Ahmedabad',
    img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&q=80',
    program: 'Volunteer',
  },
];

export default function Impact() {
  return (
    <>
      <PageHeader
        title="Our Impact"
        subtitle="Numbers tell part of the story. Behind each one is a life changed, a family strengthened, a community lifted."
        crumb="Impact"
      />

      {/* ══════ KEY STATS ══════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Impact at a Glance</div>
            <h2 className="section-title">7 Years, Measurable Change</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Every number below represents real people in real communities across Gujarat.</p>
          </Reveal>
          <div className="impact-stats-grid">
            {stats.map((s, i) => (
              <Reveal direction="up" delay={i * 60} key={s.l}>
                <TiltCard max={5} scale={1.015} className="impact-stat-card">
                  <div className="impact-stat-img-wrap" style={{ borderColor: s.color }}>
                    <img src={s.img} alt={s.l} className="impact-stat-img" />
                  </div>
                  <div className="impact-stat-n" style={{ color: s.color }}>{s.n}</div>
                  <div className="impact-stat-l">{s.l}</div>
                  <div className="impact-stat-desc">{s.desc}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROGRAM BY PROGRAM ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Program Impact</div>
            <h2 className="section-title">Each Program, Measured</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>We track 40+ indicators per program and report every result publicly.</p>
          </Reveal>
          <div className="program-impact-list">
            {programImpact.map((p, i) => (
              <Reveal direction="up" delay={i * 70} key={p.name}>
                <div className="pi-row">
                  <div className="pi-img-wrap">
                    <img src={p.img} alt={p.name} className="pi-img" />
                    <div className="pi-img-label" style={{ background: p.color }}>{p.name}</div>
                  </div>
                  <div className="pi-content">
                    <h4 className="pi-name" style={{ color: p.color }}>{p.name}</h4>
                    <p className="pi-desc">{p.desc}</p>
                    <div className="pi-metrics">
                      {[p.metric1, p.metric2, p.metric3].map((m, j) => (
                        <div key={j} className="pi-metric" style={{ borderLeft: `3px solid ${p.color}` }}>
                          <span className="pi-check" style={{ color: p.color }}>✓</span>
                          <span className="pi-metric-text">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to={`/programs/${p.slug}`} className="pi-learn-btn" style={{ borderColor: p.color, color: p.color }}>
                    View Program →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ MILESTONES TIMELINE ══════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Our Journey</div>
            <h2 className="section-title">Milestones Since 2018</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Seven years of building, learning, and scaling impact across Gujarat.</p>
          </Reveal>
          <div className="milestones-grid">
            {milestones.map((m, i) => (
              <Reveal direction="up" delay={i * 80} key={m.year}>
                <div className="milestone-card">
                  <div className="ms-img-wrap">
                    <img src={m.img} alt={m.title} className="ms-img" />
                    <div className="ms-year-badge">{m.year}</div>
                  </div>
                  <div className="ms-body">
                    <h4 className="ms-title">{m.title}</h4>
                    <p className="ms-desc">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SDG ALIGNMENT ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>SDG Alignment</div>
            <h2 className="section-title">Aligned with UN Sustainable Development Goals</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Banshri's work directly contributes to 6 of the 17 UN SDGs.</p>
          </Reveal>
          <div className="sdg-grid">
            {sdgGoals.map((s, i) => (
              <Reveal direction="up" delay={i * 70} key={s.n}>
                <TiltCard max={6} scale={1.015} className="sdg-card">
                  <div className="sdg-img-wrap" style={{ borderColor: s.color }}>
                    <img src={s.img} alt={s.title} className="sdg-img" />
                    <div className="sdg-badge" style={{ background: s.color }}>SDG {s.n}</div>
                  </div>
                  <div className="sdg-content">
                    <h4 className="sdg-title" style={{ color: s.color }}>{s.title}</h4>
                    <p className="sdg-match">{s.match}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <div className="impact-testimonials-band">
        <div className="impact-test-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 0.5rem', background: 'rgba(255,255,255,0.12)', color: 'white' }}>Real Voices</div>
            <h2 className="section-title" style={{ color: 'white' }}>Stories of Change</h2>
          </Reveal>
          <div className="impact-test-grid">
            {testimonials.map((t, i) => (
              <Reveal direction="up" delay={i * 90} key={t.author}>
                <div className="impact-test-card">
                  <p className="impact-test-quote">"{t.text}"</p>
                  <div className="impact-test-author">
                    <img src={t.img} alt={t.author} className="impact-test-avatar" />
                    <div>
                      <div className="impact-test-name">{t.author}</div>
                      <div className="impact-test-role">{t.role}</div>
                      <span className="impact-test-prog">{t.program}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up">
            <div className="impact-cta-block">
              <div className="impact-cta-img-wrap">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=260&fit=crop&q=80" alt="Community" className="impact-cta-img" />
                <div className="impact-cta-overlay"></div>
                <div className="impact-cta-text">
                  <h2>Be Part of the Next Milestone</h2>
                  <p>Every donation, every volunteer hour, every share helps us reach further.</p>
                  <div className="impact-cta-btns">
                    <Link to="/donate" className="btn-primary" style={{ textDecoration: 'none' }}>Donate Now</Link>
                    <Link to="/volunteer" className="btn-secondary" style={{ textDecoration: 'none' }}>Volunteer</Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
