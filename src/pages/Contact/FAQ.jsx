import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqs } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const navigate = useNavigate();

  const toggle = i => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Quick answers to help you understand and engage with Banshri" crumb="FAQ" />
      <section className="section">
        <div className="container" style={{ maxWidth: '750px' }}>
          {faqs.map((f, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q" onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <span className={`faq-icon${openIdx === i ? ' open' : ''}`}>+</span>
              </div>
              <div className={`faq-a${openIdx === i ? ' open' : ''}`}>{f.a}</div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '2rem', background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,91,154,0.08)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Still Have Questions?</h3>
            <p style={{ color: 'var(--light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Our team is ready to help you.</p>
            <button className="btn-primary" onClick={() => navigate('/contact')}>Contact Us →</button>
          </div>
        </div>
      </section>
    </>
  );
}
