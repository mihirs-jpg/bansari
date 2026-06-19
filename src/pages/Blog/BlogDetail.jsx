import { useNavigate } from 'react-router-dom';
import { blogs } from '../../constants/data';

const authorAvatars = {
  'Dr. Kavita Sharma': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&q=80',
  'Priya Desai':       'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=64&h=64&fit=crop&q=80',
  'Ramesh Mehta':      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=64&h=64&fit=crop&q=80',
};

export default function BlogDetail() {
  const navigate = useNavigate();
  const blog = blogs[0];

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 70 }}>
        <img
          src={blog.img || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&h=480&fit=crop&q=80'}
          alt={blog.title}
          style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,20,60,0.35) 0%,rgba(0,20,60,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem' }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="breadcrumb" style={{ marginBottom: '0.8rem' }}>
              <span onClick={() => navigate('/blog')} style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Blog</span>
              <span className="sep" style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
              <span className="cur" style={{ color: 'rgba(255,255,255,0.8)' }}>Article</span>
            </div>
            <span style={{ background: 'var(--gold)', color: '#1a1a2e', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.8rem', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.8rem', display: 'inline-block' }}>{blog.cat}</span>
            <h1 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', lineHeight: 1.3 }}>{blog.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <img
                src={authorAvatars[blog.author] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&q=80'}
                alt={blog.author}
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }}
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>{blog.author}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>{blog.date} · {blog.readTime || '5 min'} read</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 1060 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }} className="mission-grid">
            {/* Article body */}
            <div>
              <p style={{ color: 'var(--light)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                When a tablet arrives in a rural classroom for the first time, something magical happens. Children who had never seen a touchscreen begin tapping and swiping instinctively — their eyes wide with wonder. This is the moment Banshri's Shiksha Daan program lives for.
              </p>
              <p style={{ color: 'var(--light)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                In three villages — Chandrapur, Hadiyol, and Motibagasan — we introduced tablet-based learning kits in early 2024. Within six months, student attendance rose by 34%, and dropout rates fell to near zero.
              </p>

              {/* Inline image */}
              <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop&q=80"
                  alt="Digital classroom"
                  style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ background: 'rgba(0,91,154,0.04)', padding: '0.6rem 1rem', fontSize: '0.78rem', color: 'var(--light)', fontStyle: 'italic' }}>
                  Students at Chandrapur learning center using their new tablets
                </div>
              </div>

              <h3 style={{ margin: '1.5rem 0 0.8rem' }}>What the Numbers Say</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[{ n: '34%', l: 'Attendance rise' }, { n: '0%', l: 'Dropout rate' }, { n: '89%', l: 'Pass rate' }].map(s => (
                  <div key={s.l} style={{ background: 'rgba(0,91,154,0.05)', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '1px solid rgba(0,91,154,0.1)' }}>
                    <div style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '1.4rem' }}>{s.n}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--light)' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <p style={{ color: 'var(--light)', lineHeight: 1.9, fontSize: '0.95rem' }}>
                The teachers tell us the shift isn't just academic. Children are more confident, more curious, and more willing to express themselves. That's the real transformation — digital literacy as a gateway to human dignity.
              </p>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'sticky', top: 90, alignSelf: 'start' }}>

              {/* Related Posts */}
              <div className="glass-card">
                <h4 style={{ marginBottom: '1rem' }}>Related Posts</h4>
                {blogs.slice(1, 4).map(b => (
                  <div
                    key={b.title}
                    style={{ display: 'flex', gap: '0.7rem', padding: '0.65rem 0', borderBottom: '1px solid rgba(0,91,154,0.06)', cursor: 'pointer' }}
                    onClick={() => navigate('/blog/article')}
                  >
                    <img
                      src={b.img || 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=80&h=80&fit=crop&q=80'}
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

              {/* CTA */}
              <div className="glass-card" style={{ background: 'linear-gradient(135deg,var(--blue),var(--teal))', textAlign: 'center' }}>
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=80&h=80&fit=crop&q=80"
                  alt="Children"
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.7rem', display: 'block', border: '3px solid rgba(255,255,255,0.4)' }}
                />
                <h4 style={{ color: 'white', marginBottom: '0.4rem' }}>Support Shiksha Daan</h4>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>Your donation funds tablets, teachers, and futures.</p>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'white', color: 'var(--blue)' }} onClick={() => navigate('/donate')}>
                  Donate Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
