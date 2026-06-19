import { stories } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';

export default function Stories() {
  return (
    <>
      <PageHeader title="Stories of Hope" subtitle="Real people, real change — witness how Banshri transforms lives across Gujarat" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {stories.map(s => (
              <div className="story-card" key={s.name}>
                <div className="story-before">
                  <span style={{ fontSize: '3rem' }}>{s.emo}</span>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--teal)' }}>Before</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>{s.loc}</div>
                </div>
                <div className="story-body">
                  <h3>{s.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '0.8rem 0' }}>
                    <div style={{ background: 'rgba(239,68,68,0.05)', borderRadius: '12px', padding: '0.8rem', borderLeft: '3px solid rgba(239,68,68,0.3)' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.3rem' }}>BEFORE</div>
                      <p style={{ fontSize: '0.83rem', color: 'var(--light)', lineHeight: 1.6 }}>{s.before}</p>
                    </div>
                    <div style={{ background: 'rgba(0,184,148,0.05)', borderRadius: '12px', padding: '0.8rem', borderLeft: '3px solid rgba(0,184,148,0.4)' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.3rem' }}>AFTER</div>
                      <p style={{ fontSize: '0.83rem', color: 'var(--light)', lineHeight: 1.6 }}>{s.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
