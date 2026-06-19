import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';

const amounts = [500, 1000, 5000, 10000];
const paymentMethods = ['UPI', 'Visa', 'Mastercard', 'Net Banking', 'Paytm', 'PhonePe'];

const impactMap = {
  500:   { icon: '📚', text: 'Provides textbooks to 1 child for a full year.' },
  1000:  { icon: '🎒', text: 'A complete school kit: bag, books, stationery, and uniform for 1 child.' },
  2500:  { icon: '💊', text: 'Medicines and checkup for 5 patients at a mobile health camp.' },
  5000:  { icon: '🏕️', text: 'Funds one full Medical Camp day in a remote village.' },
  10000: { icon: '🧒', text: 'Sponsors a child\'s education, nutrition, and healthcare for 3 months.' },
};

const financialData = [
  { year: '2024–25', income: '₹1.24 Cr', program: '88%', admin: '12%', link: '#' },
  { year: '2023–24', income: '₹98 L', program: '86%', admin: '14%', link: '#' },
  { year: '2022–23', income: '₹72 L', program: '85%', admin: '15%', link: '#' },
];

const donorTestimonials = [
  { emo: '👨‍💼', name: 'Sanjay Gupta', role: 'Monthly Donor, Ahmedabad', text: 'I donate ₹1,000 every month. What keeps me going is the detailed impact report Banshri sends — I can see exactly which village my money reached.' },
  { emo: '🏢', name: 'Infoway Solutions', role: 'Corporate CSR Partner', text: 'We\'ve partnered with Banshri for two years under our CSR mandate. Their transparency and on-ground impact are unlike any NGO we\'ve worked with.' },
  { emo: '👩', name: 'Meera Joshi', role: 'One-Time Donor, Mumbai', text: 'Donating online was incredibly simple. I got my 80G receipt instantly and a WhatsApp update within a week showing what my ₹5,000 funded.' },
];

const faqs = [
  { q: 'Is my donation tax-exempt?', a: 'Yes! Banshri holds an 80G certificate. You\'ll receive an instant digital receipt valid for tax deduction.' },
  { q: 'What % goes to programs?', a: 'At least 85 paise of every rupee goes directly to field programs. We publish audited annual reports for full transparency.' },
  { q: 'Can I donate in someone\'s memory?', a: 'Yes. Add a note in the "Tribute" field during checkout and we will send a special acknowledgment letter.' },
  { q: 'How do I cancel a monthly donation?', a: 'Write to donate@banshri.org with your email and we will process the cancellation within 48 hours, no questions asked.' },
  { q: 'Do you accept foreign donations?', a: 'Yes. Banshri is FCRA registered and can legally receive donations from abroad. All foreign contributions are reported annually to MHA.' },
];

export default function Donate() {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [calcAmount, setCalcAmount] = useState(1000);
  const [openFaq, setOpenFaq] = useState(null);

  const displayAmount = selectedAmount === 0 ? (customAmount || '0') : selectedAmount;
  const currentImpact = impactMap[selectedAmount] || impactMap[calcAmount] || impactMap[1000];

  const calcImpact = (val) => {
    const num = parseInt(val);
    if (num >= 10000) return impactMap[10000];
    if (num >= 5000) return impactMap[5000];
    if (num >= 2500) return impactMap[2500];
    if (num >= 1000) return impactMap[1000];
    return impactMap[500];
  };

  return (
    <>
      <PageHeader
        title="Make a Difference Today"
        subtitle="Every rupee you give creates ripples of hope across Gujarat's most underserved communities"
      />

      {/* Why Donate */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">💛 Why Donate to Banshri?</div>
            <h2 className="section-title">Your Rupee Does Real Work</h2>
            <p className="section-sub">We are GuideStar-verified, 80G-certified, and FCRA-registered. Every donation is tracked, reported, and shown to you.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.2rem' }}>
            {[
              { icon: '📊', title: '85% to Programs', desc: 'At least 85 paise of every rupee goes directly to field programs, not overhead.' },
              { icon: '📜', title: '80G Tax Benefit', desc: 'Your donation is fully tax-deductible. Instant digital receipt on every transaction.' },
              { icon: '🔒', title: '100% Secure', desc: 'Powered by Razorpay with 256-bit SSL encryption. Your data is always safe.' },
              { icon: '📍', title: 'Gujarat-Rooted', desc: '7 years on the ground in 100+ villages across 8 districts of Gujarat.' },
            ].map(w => (
              <div key={w.title} className="cause-card" style={{ textAlign: 'center' }}>
                <span className="cause-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="donate-page">
        <div className="donate-container">
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.2rem' }}>Choose Donation Type</h3>
            <div className="donation-type">
              <button className={`type-btn${donationType === 'one-time' ? ' active' : ''}`} onClick={() => setDonationType('one-time')}>💛 One-Time</button>
              <button className={`type-btn${donationType === 'monthly' ? ' active' : ''}`} onClick={() => setDonationType('monthly')}>🔄 Monthly</button>
            </div>
            <h3 style={{ marginBottom: '0.8rem', fontSize: '1rem' }}>Select Amount</h3>
            <div className="amount-grid">
              {amounts.map(a => (
                <button key={a} className={`amount-btn${selectedAmount === a ? ' active' : ''}`} onClick={() => setSelectedAmount(a)}>₹{a.toLocaleString('en-IN')}</button>
              ))}
              <button className={`amount-btn${selectedAmount === 0 ? ' active' : ''}`} style={{ gridColumn: 'span 2' }} onClick={() => setSelectedAmount(0)}>✏️ Custom Amount</button>
            </div>
            {selectedAmount === 0 && (
              <div className="form-group">
                <label>Enter Custom Amount (₹)</label>
                <input type="number" placeholder="e.g. 750" value={customAmount} onChange={e => setCustomAmount(e.target.value)} />
              </div>
            )}
            <div className="impact-msg">
              <span style={{ fontSize: '1.4rem', marginRight: '0.5rem' }}>{currentImpact?.icon}</span>
              <span>{currentImpact?.text}</span>
            </div>
            <div className="form-group">
              <label>Donate to a Cause (Optional)</label>
              <select>
                <option>General Fund (Maximum Impact)</option>
                <option>Shiksha Daan – Education</option>
                <option>Shakti Abhiyan – Women</option>
                <option>Nirogi Gaon – Health</option>
                <option>Harit Bharat – Environment</option>
                <option>Bal Suraksha – Children</option>
                <option>Grameen Unnati – Rural Dev</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tribute / In Memory Of (Optional)</label>
              <input placeholder="Dedicate this donation to someone special" />
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Your Information</h3>
            <div className="form-row">
              <div className="form-group"><label>Full Name *</label><input placeholder="As per PAN card" /></div>
              <div className="form-group"><label>Email *</label><input placeholder="For receipt" /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone *</label><input placeholder="+91 XXXXX XXXXX" /></div>
              <div className="form-group"><label>PAN Number *</label><input placeholder="For 80G certificate" /></div>
            </div>
            <div className="form-group"><label>Address</label><input placeholder="For official receipt" /></div>
            <div style={{ background: 'rgba(0,91,154,0.04)', borderRadius: 12, padding: '1.2rem', marginBottom: '1.2rem', border: '1px solid rgba(0,91,154,0.1)' }}>
              <div className="section-tag" style={{ marginBottom: '0.5rem' }}>💳 Payment Methods</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--light)', marginBottom: '0.8rem' }}>Secure payment powered by Razorpay — UPI, Cards, Net Banking, Wallets</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {paymentMethods.map(p => (
                  <span key={p} style={{ background: 'white', border: '1px solid rgba(0,91,154,0.15)', borderRadius: 8, padding: '0.3rem 0.7rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--light)' }}>{p}</span>
                ))}
              </div>
            </div>
            <div className="impact-msg" style={{ background: 'rgba(0,184,148,0.08)', borderColor: 'rgba(0,184,148,0.2)' }}>
              ✅ Your donation is 80G tax-exempt. Instant digital receipt sent automatically.
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}>
              💛 Proceed to Pay ₹{Number(displayAmount).toLocaleString('en-IN')}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--light)', marginTop: '0.8rem' }}>
              🔒 Secured by 256-bit SSL · FCRA Registered · 80G Certified
            </p>
          </div>
        </div>
      </section>

      {/* Donation Impact Calculator */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">🧮 Impact Calculator</div>
            <h2 className="section-title">See Your Donation's Impact</h2>
            <p className="section-sub">Move the slider to discover what your contribution unlocks.</p>
          </div>
          <div className="glass-card" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Inter', fontWeight: 800, color: 'var(--blue)', marginBottom: '0.5rem' }}>₹{calcAmount.toLocaleString('en-IN')}</div>
            <input type="range" min="100" max="25000" step="100" value={calcAmount} onChange={e => setCalcAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--blue)', marginBottom: '1.5rem', height: 6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--light)', marginBottom: '2rem', marginTop: '-1rem' }}>
              <span>₹100</span><span>₹25,000</span>
            </div>
            <div style={{ background: 'linear-gradient(135deg,rgba(0,91,154,0.06),rgba(0,167,167,0.06))', borderRadius: 16, padding: '2rem', border: '1px solid rgba(0,91,154,0.1)' }}>
              <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '0.8rem' }}>{calcImpact(calcAmount)?.icon}</span>
              <p style={{ fontSize: '1rem', color: 'var(--dark)', fontWeight: 500 }}>{calcImpact(calcAmount)?.text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.8rem', marginTop: '1.5rem' }}>
              {[['₹500','📚 Books'],['₹1,000','🎒 School Kit'],['₹5,000','🏕️ Medical Camp'],['₹10,000','🧒 Sponsor Child']].map(([amt,lbl]) => (
                <div key={amt} style={{ textAlign: 'center', padding: '0.6rem', background: 'white', borderRadius: 10, border: '1px solid rgba(0,91,154,0.1)', fontSize: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue)' }}>{amt}</div>
                  <div style={{ color: 'var(--light)', marginTop: '0.2rem' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">📊 Transparency</div>
            <h2 className="section-title">Where Your Money Goes</h2>
            <p className="section-sub">We publish audited financial reports every year. No secrets.</p>
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,91,154,0.08)' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg,var(--dark-blue),var(--blue))', color: 'white' }}>
                  {['Year', 'Total Income', 'Programs %', 'Admin %', 'Report'].map(h => (
                    <th key={h} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.83rem', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financialData.map((row, i) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid rgba(0,91,154,0.07)', background: i % 2 === 0 ? 'white' : 'rgba(0,91,154,0.02)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700, fontSize: '0.88rem' }}>{row.year}</td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--blue)', fontWeight: 600, fontSize: '0.88rem' }}>{row.income}</td>
                    <td style={{ padding: '0.9rem 1rem' }}><span style={{ background: 'rgba(0,184,148,0.1)', color: 'var(--green)', padding: '0.2rem 0.6rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700 }}>{row.program}</span></td>
                    <td style={{ padding: '0.9rem 1rem' }}><span style={{ background: 'rgba(0,91,154,0.08)', color: 'var(--blue)', padding: '0.2rem 0.6rem', borderRadius: 10, fontSize: '0.8rem', fontWeight: 700 }}>{row.admin}</span></td>
                    <td style={{ padding: '0.9rem 1rem' }}><a href={row.link} style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none' }}>📄 Download PDF</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Donor Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">💬 Donor Stories</div>
            <h2 className="section-title">Why They Give</h2>
          </div>
          <div className="cards-grid">
            {donorTestimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.emo}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Partnership */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag">🏢 Corporate CSR</div>
              <h2 className="section-title">Partner With Us</h2>
              <p style={{ color: 'var(--light)', marginBottom: '1.2rem', lineHeight: 1.7 }}>We structure CSR programs tailored to your company's ESG goals and employee engagement needs. Get a co-branded impact report, site visits, and a dedicated relationship manager.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {['Co-branded Annual Impact Report','Dedicated program naming rights','Employee volunteering integration','Ministry-compliant CSR documentation'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--dark)' }}><span style={{ color: 'var(--teal)' }}>✓</span>{item}</li>
                ))}
              </ul>
              <a href="mailto:csr@banshri.org" className="btn-primary" style={{ textDecoration: 'none' }}>📧 Contact CSR Team</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['🏭','Manufacturing'],['💻','Technology'],['🏦','Banking / NBFC'],['🏗️','Infrastructure']].map(([emo, sector]) => (
                <div key={sector} className="cause-card" style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{emo}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark)' }}>{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">❓ FAQ</div>
            <h2 className="section-title">Donation Questions</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {faqs.map((f, i) => (
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
