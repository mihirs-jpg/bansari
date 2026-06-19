import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';

const partners = [
  { name: 'Adani Foundation', sector: 'Infrastructure', amount: '₹25L', year: '2024–25' },
  { name: 'Gujarat Co-op Milk', sector: 'FMCG', amount: '₹15L', year: '2024–25' },
  { name: 'Zydus Healthcare', sector: 'Pharma', amount: '₹20L', year: '2023–24' },
];

const benefits = [
  { icon: '📋', title: 'Ministry-Compliant Documentation', desc: 'We handle all CSR Schedule VII documentation, impact reports, and Form CSR-2 support.' },
  { icon: '🏷️', title: 'Co-Branding Rights', desc: 'Your company name on program materials, reports, and events aligned to your contribution.' },
  { icon: '👥', title: 'Employee Volunteering', desc: 'Structured opportunities for your employees to volunteer at our field sites and online.' },
  { icon: '📊', title: 'Quarterly Impact Reports', desc: 'Dedicated reports showing exactly how your CSR budget was deployed and what it achieved.' },
  { icon: '🎙️', title: 'Site Visits & Showcases', desc: 'Arrange field visits for your board, CSR committee, and leadership team.' },
  { icon: '🌐', title: 'Media & PR Coverage', desc: 'Co-press releases and social media coverage amplifying your company\'s social impact.' },
];

export default function CSR() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader title="Corporate CSR Partnership" subtitle="Structure a meaningful, compliant, and measurable CSR program with Banshri — in Gujarat and beyond." crumb="CSR" />
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">🏢 Why Partner With Us?</div>
            <h2 className="section-title">More Than Compliance</h2>
            <p className="section-sub">We help companies turn their CSR mandate into a story of genuine impact — verified, co-branded, and strategically aligned.</p>
          </div>
          <div className="cards-grid">
            {benefits.map(b => (
              <div key={b.title} className="cause-card">
                <span className="cause-icon">{b.icon}</span>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="mission-grid">
            <div>
              <div className="section-tag">🤝 Our Partners</div>
              <h3 style={{ margin: '0.6rem 0 1.5rem' }}>Trusted by Leading Companies</h3>
              {partners.map(p => (
                <div key={p.name} className="glass-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{p.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--light)' }}>{p.sector} · {p.year}</div>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue)' }}>{p.amount}</div>
                </div>
              ))}
              <div className="impact-msg" style={{ background: 'rgba(0,91,154,0.04)', borderColor: 'rgba(0,91,154,0.1)', marginTop: '1rem' }}>
                📌 Minimum CSR engagement: ₹5 Lakhs. We can structure both single-year and multi-year partnerships.
              </div>
            </div>
            <div className="glass-card">
              <div className="section-tag">📧 Get in Touch</div>
              <h3 style={{ margin: '0.6rem 0 1.2rem' }}>Request a Partnership Proposal</h3>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>✅</div>
                  <h4>Proposal request sent!</h4>
                  <p style={{ color: 'var(--light)', fontSize: '0.85rem', marginTop: '0.4rem' }}>Our CSR team will reach out within 48 hours.</p>
                </div>
              ) : (
                <>
                  <div className="form-row"><div className="form-group"><label>Company Name *</label><input placeholder="Your company" /></div><div className="form-group"><label>Your Name *</label><input placeholder="Contact person" /></div></div>
                  <div className="form-row"><div className="form-group"><label>Email *</label><input placeholder="you@company.com" /></div><div className="form-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" /></div></div>
                  <div className="form-group"><label>Approx. CSR Budget (₹)</label><select><option>Select range</option><option>₹5L – ₹15L</option><option>₹15L – ₹50L</option><option>₹50L – ₹1 Cr</option><option>₹1 Cr+</option></select></div>
                  <div className="form-group"><label>Focus Area</label><select><option>Any (Maximum Impact)</option><option>Education</option><option>Health</option><option>Environment</option><option>Women Empowerment</option><option>Child Welfare</option></select></div>
                  <div className="form-group"><label>Message</label><textarea rows="3" placeholder="Tell us about your CSR goals..." /></div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSent(true)}>📩 Request Proposal</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
