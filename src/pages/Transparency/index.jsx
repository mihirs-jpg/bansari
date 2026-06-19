import PageHeader from '../../components/common/PageHeader';

const certifications = [
  { icon: '📜', title: '12(A) Registration', body: 'Income Tax Department', status: 'Active', id: '12A/AHD/2018/001' },
  { icon: '🏅', title: '80G Certification', body: 'Income Tax Department', status: 'Active', id: '80G/AHD/2018/001' },
  { icon: '🌐', title: 'FCRA Registration', body: 'Ministry of Home Affairs', status: 'Active', id: 'FCRA/2018/XXXXX' },
  { icon: '✅', title: 'GuideStar Platinum', body: 'Candid (GuideStar India)', status: 'Platinum', id: 'NGO-XXXX-XXXX' },
  { icon: '🏛️', title: 'Society Registration', body: 'Govt. of Gujarat', status: 'Active', id: 'GUJ/SOC/2018/0042' },
  { icon: '🔍', title: 'DARPAN Registration', body: 'NITI Aayog', status: 'Active', id: 'GJ/2018/0189734' },
];

const govPolicy = [
  { title: 'Anti-Corruption Policy', desc: 'Zero tolerance for corruption. All transactions above ₹10,000 require dual authorization.' },
  { title: 'Child Safeguarding Policy', desc: 'Mandatory background checks for all staff and volunteers working with children.' },
  { title: 'Whistleblower Policy', desc: 'Anonymous reporting mechanism for any financial or ethical concerns.' },
  { title: 'Data Privacy Policy', desc: 'Donor and beneficiary data is never sold, shared, or used for purposes beyond program delivery.' },
];

export default function Transparency() {
  return (
    <>
      <PageHeader title="Transparency" subtitle="We believe accountability is not just a legal obligation — it is the foundation of trust." crumb="Transparency" />
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">📜 Legal Registrations</div>
            <h2 className="section-title">Certifications & Compliance</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {certifications.map(c => (
              <div key={c.title} className="glass-card">
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <h4 style={{ marginBottom: '0.3rem', fontSize: '0.95rem' }}>{c.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--light)', marginBottom: '0.4rem' }}>{c.body}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--dark)', fontFamily: 'monospace', background: 'var(--bg)', padding: '0.2rem 0.5rem', borderRadius: 6 }}>{c.id}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', background: 'rgba(0,184,148,0.1)', color: 'var(--green)', fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 8 }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">⚖️ Governance</div>
            <h2 className="section-title">Our Policies</h2>
          </div>
          <div className="cards-grid">
            {govPolicy.map(p => (
              <div key={p.title} className="cause-card">
                <h4 style={{ marginBottom: '0.5rem' }}>{p.title}</h4>
                <p style={{ marginBottom: '0.8rem' }}>{p.desc}</p>
                <button className="btn-sm">📄 View Policy</button>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--light)', fontSize: '0.85rem' }}>For financial statements, board resolutions, or compliance documents, write to <a href="mailto:compliance@banshri.org" style={{ color: 'var(--teal)', fontWeight: 600 }}>compliance@banshri.org</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
