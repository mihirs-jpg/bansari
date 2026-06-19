import { useNavigate } from 'react-router-dom';

const galleryItems = ['📚 Class session', '🎨 Art workshop', '💻 Computer lab', '🏆 Award ceremony', '📖 Reading club', '🌳 Nature walk', '👩‍🏫 Teacher training', '🎉 Graduation day'];
const heights = [120, 150, 110, 140, 130, 120, 150, 110];
const metrics = [
  { n: '4,200+', l: 'Students enrolled' }, { n: '52', l: 'Partner schools' },
  { n: '200+', l: 'Teachers trained' }, { n: '95%', l: 'Retention rate' },
  { n: '₹45L', l: 'Scholarships awarded' }, { n: '8', l: 'Districts covered' },
];
const activities = ['📱 Tablet-based learning', '👩‍🏫 Teacher training', '🎒 Free school kits', '🏆 Scholarship program', '🌐 Computer labs', '📖 Mobile libraries'];

export default function ProgramDetail() {
  const navigate = useNavigate();

  return (
    <>
      <div className="prog-detail-hero">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '1rem' }}>
            <span onClick={() => navigate('/programs')} style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Programs</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0.3rem' }}>/</span>
            <span style={{ color: 'var(--gold)' }}>Shiksha Daan</span>
          </div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📚</div>
          <h1>Shiksha Daan</h1>
          <p>Quality education and digital literacy for underprivileged children across 52 rural schools in Gujarat</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['📍 52 Schools', '👧 4,200 Students'].map(tag => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{tag}</span>
            ))}
            <span style={{ background: 'rgba(244,197,66,0.25)', color: 'var(--gold)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>🟢 Active</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="mission-grid">
            <div>
              <div className="section-tag">📋 Overview</div>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>Program Overview</h2>
              <p style={{ color: 'var(--light)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Shiksha Daan addresses the critical gap in quality education for children in rural Gujarat. Through a network of 52 partner schools, we deploy trained teachers, digital learning tools, and after-school enrichment programs that transform educational outcomes.
              </p>
              <h3 style={{ marginBottom: '0.8rem', fontSize: '1.1rem' }}>Our Objectives</h3>
              <ul style={{ color: 'var(--light)', fontSize: '0.9rem', lineHeight: 2, paddingLeft: '1.5rem' }}>
                <li>Ensure 95%+ school retention among enrolled children</li>
                <li>Bring all students to grade-level literacy and numeracy</li>
                <li>Introduce digital literacy and coding basics from Class 5</li>
                <li>Provide merit scholarships for higher education</li>
                <li>Train and support 200+ rural school teachers</li>
              </ul>
              <h3 style={{ margin: '1.5rem 0 0.8rem', fontSize: '1.1rem' }}>Key Activities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {activities.map(a => (
                  <div key={a} style={{ background: 'rgba(0,91,154,0.04)', borderRadius: '10px', padding: '0.7rem 0.9rem', fontSize: '0.83rem', color: 'var(--dark)', border: '1px solid rgba(0,91,154,0.08)' }}>{a}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="glass-card">
                <h3 style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>Impact Metrics</h3>
                {metrics.map(m => (
                  <div key={m.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0', borderBottom: '1px solid rgba(0,91,154,0.06)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--light)' }}>{m.l}</span>
                    <span style={{ fontWeight: 700, color: 'var(--blue)' }}>{m.n}</span>
                  </div>
                ))}
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.2rem' }} onClick={() => navigate('/donate')}>❤️ Support This Program</button>
              </div>
            </div>
          </div>

          <div className="section-tag" style={{ marginTop: '2.5rem' }}>📸 Gallery</div>
          <div className="gallery-grid" style={{ marginTop: '1rem', columns: 4 }}>
            {galleryItems.map((g, i) => (
              <div className="gallery-item" key={g} style={{ marginBottom: '0.8rem' }}>
                <div className="gallery-placeholder" style={{ height: heights[i], background: 'linear-gradient(135deg,rgba(0,91,154,0.06),rgba(0,167,167,0.08))' }}>
                  <span style={{ fontSize: '2rem' }}>{g.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--light)' }}>{g.split(' ').slice(1).join(' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
