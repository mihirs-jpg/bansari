import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';

const deptContacts = [
  { emo: '💛', dept: 'Donations & Finance', email: 'donate@banshri.org', phone: '+91 79 2630 4501' },
  { emo: '🌟', dept: 'Volunteer Coordination', email: 'volunteer@banshri.org', phone: '+91 79 2630 4502' },
  { emo: '🏢', dept: 'Corporate CSR', email: 'csr@banshri.org', phone: '+91 79 2630 4503' },
  { emo: '🗞️', dept: 'Media & Press', email: 'media@banshri.org', phone: '+91 79 2630 4504' },
  { emo: '📋', dept: 'Programs & Impact', email: 'programs@banshri.org', phone: '+91 79 2630 4505' },
  { emo: '🤝', dept: 'Partnerships', email: 'partnerships@banshri.org', phone: '+91 79 2630 4506' },
];

const officeFaqs = [
  { q: 'How quickly do you respond to emails?', a: 'We respond to all emails within 24 working hours. For urgent matters, call us directly during office hours.' },
  { q: 'Can I visit your office?', a: 'Yes! Our office is open Mon–Sat, 9 AM to 6 PM. For field site visits, write to visit@banshri.org with your preferred dates.' },
  { q: 'Do you have regional offices?', a: 'Our head office is in Ahmedabad. We have field coordination offices in Patan, Mehsana, and Banaskantha districts.' },
  { q: 'How do I report a complaint or concern?', a: 'Write directly to grievance@banshri.org. All concerns are acknowledged within 48 hours and resolved within 7 working days.' },
];

const socialLinks = [
  { icon: '📘', name: 'Facebook', url: '#', handle: '/BanshriNGO' },
  { icon: '📸', name: 'Instagram', url: '#', handle: '@banshri_ngo' },
  { icon: '🐦', name: 'Twitter / X', url: '#', handle: '@BanshriNGO' },
  { icon: '▶️', name: 'YouTube', url: '#', handle: 'Banshri NGO' },
  { icon: '💼', name: 'LinkedIn', url: '#', handle: 'Banshri Foundation' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you — reach out any time" crumb="Contact" />

      {/* Quick Info Bar */}
      <section style={{ background: 'linear-gradient(135deg,var(--dark-blue),var(--blue))', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['📍','Ahmedabad, Gujarat'],['📞','+91 79 2630 4500'],['✉️','info@banshri.org'],['🕐','Mon–Sat  9 AM – 6 PM']].map(([icon,val]) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '0.85rem' }}>
                <span>{icon}</span><span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form + Info */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Form */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Send us a Message</h3>
              <div className="form-row">
                <div className="form-group"><label>Full Name *</label><input placeholder="Your name" /></div>
                <div className="form-group"><label>Email *</label><input placeholder="you@email.com" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" /></div>
                <div className="form-group"><label>Department</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Donations</option>
                    <option>Volunteering</option>
                    <option>Corporate CSR</option>
                    <option>Media</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Subject</label><input placeholder="How can we help?" /></div>
              <div className="form-group"><label>Message *</label><textarea rows="5" placeholder="Tell us more..." /></div>
              {sent
                ? <div style={{ background: 'rgba(0,184,148,0.1)', border: '1px solid rgba(0,184,148,0.3)', borderRadius: 12, padding: '1rem', color: 'var(--green)', fontWeight: 600 }}>✅ Message sent! We'll get back to you within 24 hours.</div>
                : <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSent(true)}>📩 Send Message</button>
              }
            </div>

            {/* Right: Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Contact Info */}
              <div className="contact-info-card">
                <h4 style={{ marginBottom: '1.2rem' }}>Contact Information</h4>
                {[
                  { icon: '📍', label: 'Head Office', val: '42 Sardar Patel Marg, Navrangpura, Ahmedabad, Gujarat 380009' },
                  { icon: '📞', label: 'Main Phone', val: '+91 79 2630 4500' },
                  { icon: '✉️', label: 'General Email', val: 'info@banshri.org' },
                  { icon: '🕐', label: 'Office Hours', val: 'Mon–Sat, 9 AM – 6 PM IST' },
                  { icon: '🚨', label: 'Emergency', val: '+91 98250 XXXXX (24/7)' },
                ].map(i => (
                  <div className="contact-info-item" key={i.label}>
                    <span className="contact-icon">{i.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{i.label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>{i.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="contact-info-card">
                <h4 style={{ marginBottom: '1rem' }}>Find Us Online</h4>
                {socialLinks.map(s => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(0,91,154,0.06)' }}>
                    <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--dark)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--teal)' }}>{s.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Placeholder */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container">
          <div style={{ borderRadius: 20, overflow: 'hidden', height: 300, background: 'linear-gradient(135deg,rgba(0,91,154,0.08),rgba(0,167,167,0.08))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,91,154,0.1)', gap: '1rem' }}>
            <span style={{ fontSize: '3rem' }}>📍</span>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '0.3rem' }}>42 Sardar Patel Marg, Navrangpura</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--light)' }}>Ahmedabad, Gujarat 380009</div>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-sm" style={{ textDecoration: 'none' }}>Open in Google Maps →</a>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">🏢 Department Contacts</div>
            <h2 className="section-title">Reach the Right Team</h2>
            <p className="section-sub">Skip the queue — write directly to the department that can help you best.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem' }}>
            {deptContacts.map(d => (
              <div key={d.dept} className="cause-card">
                <span className="cause-icon">{d.emo}</span>
                <h4>{d.dept}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--teal)', fontWeight: 600, margin: '0.4rem 0' }}>✉️ {d.email}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--light)' }}>📞 {d.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">❓ FAQ</div>
            <h2 className="section-title">Quick Answers</h2>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {officeFaqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q} <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
                </div>
                <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
