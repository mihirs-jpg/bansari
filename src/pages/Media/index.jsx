import PageHeader from '../../components/common/PageHeader';

const coverage = [
  { outlet: 'The Hindu', date: 'May 2025', title: 'Gujarat NGO Plants 50,000 Trees in Watershed Zones', type: 'Print & Online', emo: '📰' },
  { outlet: 'Divya Bhaskar', date: 'Apr 2025', title: 'Banshri\'s Mobile Clinics Reach Where Doctors Can\'t', type: 'Print', emo: '📰' },
  { outlet: 'NDTV India', date: 'Mar 2025', title: 'Digital Revolution in Rural Gujarat Schools', type: 'TV', emo: '📺' },
  { outlet: 'Economic Times', date: 'Feb 2025', title: 'CSR Done Right: Banshri\'s Transparent Impact Model', type: 'Online', emo: '💻' },
  { outlet: 'Gujarat Samachar', date: 'Jan 2025', title: 'Rekha Patel: From Dependent to Entrepreneur', type: 'Print', emo: '📰' },
  { outlet: 'Doordarshan Girnar', date: 'Dec 2024', title: 'Harit Bharat: Community Reforestation in Banaskantha', type: 'TV', emo: '📺' },
];

const pressKit = [
  { icon: '📸', title: 'High-Res Logos', desc: 'PNG and SVG formats in all sizes' },
  { icon: '📄', title: 'Fact Sheet 2025', desc: 'Key stats, programs, and contact info' },
  { icon: '🖼️', title: 'Photo Library', desc: 'Field photos cleared for editorial use' },
  { icon: '📹', title: 'B-Roll Footage', desc: 'HD video clips from field programs' },
];

export default function Media() {
  return (
    <>
      <PageHeader title="Media Coverage" subtitle="Banshri in the news — stories from journalists, reporters, and content creators who've seen our work firsthand." crumb="Media" />
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">📰 In the News</div>
            <h2 className="section-title">Recent Coverage</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {coverage.map(c => (
              <div key={c.title} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg,rgba(0,91,154,0.1),rgba(0,167,167,0.1))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>{c.emo}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '0.2rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--light)' }}>{c.outlet} · {c.date} · <span style={{ color: 'var(--teal)', fontWeight: 600 }}>{c.type}</span></div>
                </div>
                <button className="btn-sm">Read →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="mission-grid">
            <div>
              <div className="section-tag">📦 Press Kit</div>
              <h3 style={{ margin: '0.6rem 0 1.2rem' }}>Download Press Resources</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {pressKit.map(p => (
                  <div key={p.title} className="cause-card" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.4rem' }}>{p.icon}</span>
                    <h4 style={{ marginBottom: '0.3rem', fontSize: '0.88rem' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.75rem', marginBottom: '0.7rem' }}>{p.desc}</p>
                    <button className="btn-sm">Download</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card">
              <div className="section-tag">📧 Media Enquiries</div>
              <h3 style={{ margin: '0.6rem 0 1.2rem' }}>Contact Our Media Team</h3>
              <div className="form-group"><label>Your Name</label><input placeholder="Journalist / Creator name" /></div>
              <div className="form-group"><label>Publication / Channel</label><input placeholder="Where you'll publish" /></div>
              <div className="form-group"><label>Email</label><input placeholder="you@media.com" /></div>
              <div className="form-group"><label>What you need</label><textarea rows="3" placeholder="Interview, photos, data, site visit..." /></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>📩 Send Request</button>
              <p style={{ fontSize: '0.75rem', color: 'var(--light)', marginTop: '0.8rem', textAlign: 'center' }}>Or email directly: <a href="mailto:media@banshri.org" style={{ color: 'var(--teal)' }}>media@banshri.org</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
