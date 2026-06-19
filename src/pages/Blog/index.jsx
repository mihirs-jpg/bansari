import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';

/* ── Real images mapped per blog entry ─────────────────────── */
const blogImages = {
  'tablets-classroom': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=360&fit=crop&q=80',
  'rekha-business':    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=360&fit=crop&q=80',
  'reforestation':     'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=360&fit=crop&q=80',
  'mobile-health':     'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=360&fit=crop&q=80',
  'volunteer-stories': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=360&fit=crop&q=80',
  'csr-impact':        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=360&fit=crop&q=80',
  'water-conservation':'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&h=360&fit=crop&q=80',
  'decade-of-dreams':  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=420&fit=crop&q=80',
};

const authorAvatars = {
  'Dr. Kavita Sharma': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=48&h=48&fit=crop&q=80',
  'Priya Desai':       'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=48&h=48&fit=crop&q=80',
  'Ramesh Mehta':      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=48&h=48&fit=crop&q=80',
  'Ankit Shah':        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&q=80',
};

const allBlogs = [
  ...blogs,
  { title: 'Volunteer Stories: Why I Keep Coming Back', date: 'Jan 2025', author: 'Ankit Shah',        cat: 'Volunteer',    slug: 'volunteer-stories', featured: false, readTime: '4 min' },
  { title: 'How CSR Partnerships Multiplied Our Impact 3x', date: 'Dec 2024', author: 'Priya Desai',  cat: 'CSR',          slug: 'csr-impact',        featured: false, readTime: '6 min' },
  { title: 'Water Conservation in Banaskantha: A Community Win', date: 'Nov 2024', author: 'Ramesh Mehta', cat: 'Environment', slug: 'water-conservation', featured: false, readTime: '5 min' },
];
// Enrich with readTime for data.js entries
allBlogs.forEach(b => { if (!b.readTime) b.readTime = '5 min'; });

const featured = {
  title: 'A Decade of Dreams: Banshri at 10',
  date: 'Jun 2025',
  author: 'Dr. Kavita Sharma',
  cat: 'Impact',
  slug: 'decade-of-dreams',
  readTime: '8 min',
  desc: 'Ten years ago, we began with one school, one village, and one big dream. Today, we stand at 100+ villages. This is the story of how we got here — and where we\'re going.',
};

const categories = ['All', 'Education', 'Health', 'Environment', 'Women', 'CSR', 'Volunteer', 'Impact'];
const popular = allBlogs.slice(0, 4);

const catColors = {
  Education: '#005b9a', Health: '#00b894', Environment: '#27ae60',
  Women: '#e84393', CSR: '#6c5ce7', Volunteer: '#f39c12', Impact: '#00a7a7',
};

export default function Blog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = allBlogs.filter(b => {
    const matchCat = activeCat === 'All' || b.cat === activeCat;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <PageHeader
        title="Blog & Updates"
        subtitle="Stories, insights, and updates from the field — directly from our team"
        crumb="Blog"
      />

      {/* ── FEATURED ARTICLE ── */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up">
            <div className="section-tag" style={{ marginBottom: '1.2rem' }}>⭐ Featured Article</div>
            <div className="glass-card" style={{
              display: 'grid', gridTemplateColumns: '1fr 1.4fr',
              gap: '0', alignItems: 'stretch', overflow: 'hidden',
              borderRadius: 20, padding: 0, boxShadow: '0 8px 36px rgba(0,91,154,0.13)',
            }}>
              {/* Image side */}
              <div style={{ position: 'relative', minHeight: 260, overflow: 'hidden' }}>
                <img
                  src={blogImages[featured.slug]}
                  alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(120deg,rgba(0,20,60,0.45) 0%,transparent 70%)',
                }} />
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'var(--gold)', color: '#1a1a2e',
                  fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.75rem',
                  borderRadius: 20, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Featured</span>
              </div>

              {/* Text side */}
              <div style={{ padding: '2.2rem 2rem' }}>
                <div className="card-tag" style={{
                  background: catColors[featured.cat] || 'var(--blue)',
                  color: 'white', marginBottom: '0.8rem',
                }}>{featured.cat}</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ color: 'var(--light)', fontSize: '0.9rem', marginBottom: '1.2rem', lineHeight: 1.75 }}>{featured.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <img
                    src={authorAvatars[featured.author]}
                    alt={featured.author}
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--blue)' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--dark)' }}>{featured.author}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--light)' }}>{featured.date} · {featured.readTime} read</div>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => navigate(`/blog/${featured.slug}`)}>Read Full Article →</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem', alignItems: 'start' }}>

            {/* ── LEFT: Grid of posts ── */}
            <div>
              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, fill: 'none', stroke: 'var(--light)', strokeWidth: 2 }} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search articles…"
                  style={{
                    width: '100%', padding: '0.8rem 1rem 0.8rem 2.7rem',
                    border: '1.5px solid rgba(0,91,154,0.15)', borderRadius: 30,
                    fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none',
                    background: 'white', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,91,154,0.15)'}
                />
              </div>

              {/* Categories */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {categories.map(c => (
                  <button key={c} className={`cat-pill${activeCat === c ? ' active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
                ))}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--light)', marginBottom: '1.4rem' }}>
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </p>

              {/* Blog Cards */}
              <div className="cards-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {filtered.map((b, i) => (
                  <Reveal direction="up" delay={i * 60} key={b.slug}>
                    <TiltCard max={5} scale={1.01} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/blog/${b.slug}`)}>
                      {/* Image */}
                      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', height: 180 }}>
                        <img
                          src={blogImages[b.slug] || 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=360&fit=crop&q=80'}
                          alt={b.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />
                        <span style={{
                          position: 'absolute', top: 10, right: 10,
                          background: catColors[b.cat] || 'var(--blue)',
                          color: 'white', fontSize: '0.65rem', fontWeight: 800,
                          padding: '0.2rem 0.6rem', borderRadius: 12,
                        }}>{b.cat}</span>
                      </div>

                      {/* Body */}
                      <div className="card-body">
                        <h3 style={{ fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '0.6rem' }}>{b.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                          <img
                            src={authorAvatars[b.author] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80'}
                            alt={b.author}
                            style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--dark)' }}>{b.author}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--light)' }}>{b.date} · {b.readTime || '5 min'} read</div>
                          </div>
                        </div>
                        <button className="btn-sm">Read More →</button>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--light)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🔍</div>
                  <p>No articles found for "{search}"</p>
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: 90 }}>

              {/* Newsletter */}
              <div className="glass-card" style={{
                background: 'linear-gradient(135deg,var(--blue),var(--teal))',
                color: 'white', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
                <img
                  src="https://images.unsplash.com/photo-1586339392738-5a1741a1e3cf?w=60&h=60&fit=crop&q=80"
                  alt="Newsletter"
                  style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', marginBottom: '0.7rem', border: '2px solid rgba(255,255,255,0.3)' }}
                />
                <h4 style={{ color: 'white', marginBottom: '0.4rem' }}>Newsletter</h4>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>
                  Get monthly impact stories and updates from the field.
                </p>
                {subscribed ? (
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '0.7rem', textAlign: 'center', fontSize: '0.85rem' }}>
                    ✅ You're subscribed!
                  </div>
                ) : (
                  <>
                    <input
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Your email"
                      style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: 10, border: 'none', marginBottom: '0.6rem', fontSize: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                    <button onClick={() => email && setSubscribed(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Subscribe Free</button>
                  </>
                )}
              </div>

              {/* Popular Posts */}
              <div className="glass-card">
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=24&h=24&fit=crop&q=80" alt="" style={{ width: 22, height: 22, borderRadius: 6, objectFit: 'cover' }} />
                  Popular Posts
                </h4>
                {popular.map((b, i) => (
                  <div
                    key={b.slug}
                    onClick={() => navigate(`/blog/${b.slug}`)}
                    style={{
                      display: 'flex', gap: '0.7rem', alignItems: 'center',
                      padding: '0.7rem 0',
                      borderBottom: i < popular.length - 1 ? '1px solid rgba(0,91,154,0.07)' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={blogImages[b.slug] || 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=80&h=80&fit=crop&q=80'}
                      alt={b.title}
                      style={{ width: 48, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.3 }}>{b.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--light)', marginTop: '0.2rem' }}>{b.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Topics Cloud */}
              <div className="glass-card">
                <h4 style={{ marginBottom: '1rem' }}>Browse Topics</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {categories.filter(c => c !== 'All').map(c => (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      style={{
                        padding: '0.3rem 0.8rem', borderRadius: 20,
                        border: `1.5px solid ${catColors[c] || 'var(--blue)'}`,
                        background: activeCat === c ? (catColors[c] || 'var(--blue)') : 'white',
                        color: activeCat === c ? 'white' : (catColors[c] || 'var(--blue)'),
                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >{c}</button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
