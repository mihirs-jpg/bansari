import PageHeader from '../../components/common/PageHeader';

const reports = [
  { year: '2024–25', highlights: ['₹1.24 Cr raised','4,200 students enrolled','50K trees planted','100 villages reached'], pages: 48, status: 'Published', color: 'var(--blue)' },
  { year: '2023–24', highlights: ['₹98 L raised','3,800 students','40K trees planted','80 villages reached'], pages: 44, status: 'Published', color: 'var(--teal)' },
  { year: '2022–23', highlights: ['₹72 L raised','3,100 students','30K trees planted','60 villages reached'], pages: 40, status: 'Published', color: 'var(--green)' },
  { year: '2021–22', highlights: ['₹58 L raised','2,500 students','20K trees planted','45 villages reached'], pages: 36, status: 'Published', color: 'var(--gold)' },
  { year: '2020–21', highlights: ['₹41 L raised','COVID response: 2K families supported'], pages: 32, status: 'Published', color: 'var(--light)' },
];

export default function AnnualReports() {
  return (
    <>
      <PageHeader title="Annual Reports" subtitle="Complete transparency, year after year. Every rupee, every outcome, publicly reported." crumb="Annual Reports" />
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">📄 Financial Reports</div>
            <h2 className="section-title">Our Annual Reports</h2>
            <p className="section-sub">Independently audited by a certified CA firm. Compliant with IT Act Section 12(A) and FCRA regulations.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {reports.map(r => (
              <div key={r.year} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${r.color}11`, borderRadius: 12, border: `1px solid ${r.color}33` }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '1.4rem', fontWeight: 800, color: r.color }}>{r.year}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--light)', marginTop: '0.2rem' }}>{r.pages} pages</div>
                </div>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {r.highlights.map(h => (
                      <span key={h} style={{ background: 'var(--bg)', border: '1px solid rgba(0,91,154,0.1)', borderRadius: 8, padding: '0.25rem 0.7rem', fontSize: '0.78rem', color: 'var(--dark)', fontWeight: 500 }}>✓ {h}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ background: 'rgba(0,184,148,0.1)', color: 'var(--green)', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 10 }}>{r.status}</span>
                  <button className="btn-sm">📥 Download PDF</button>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'center', background: 'linear-gradient(135deg,rgba(0,91,154,0.04),rgba(0,167,167,0.04))' }}>
            <p style={{ color: 'var(--light)', fontSize: '0.85rem' }}>📋 All reports are audited by <strong>M/s Rajesh & Associates, Chartered Accountants, Ahmedabad</strong>. Copies available on request at <a href="mailto:info@banshri.org" style={{ color: 'var(--teal)' }}>info@banshri.org</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
