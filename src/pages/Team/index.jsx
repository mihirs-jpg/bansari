import PageHeader from '../../components/common/PageHeader';

const leadership = [
  { name: 'Dr. Kavita Sharma', role: 'Founder & Executive Director', emo: '👩‍💼', bio: 'A social entrepreneur with 20 years in rural development. Founded Banshri after witnessing the education gap firsthand in North Gujarat. Ph.D. in Social Policy from TISS Mumbai.', linkedin: '#' },
  { name: 'Ramesh Mehta', role: 'Head of Programs', emo: '👨‍💼', bio: 'Former UNICEF program officer with deep expertise in community health and livelihood projects across South Asia. MBA in Development Management.', linkedin: '#' },
  { name: 'Priya Desai', role: 'Director of Fundraising', emo: '👩', bio: 'Built partnerships with Tata Trusts, Azim Premji Foundation, and 15+ corporates, growing Banshri\'s annual budget 5x in three years.', linkedin: '#' },
];

const fieldTeam = [
  { name: 'Dinesh Solanki', role: 'Field Coordinator – Patan', emo: '👨', years: 5 },
  { name: 'Anita Parmar', role: 'Program Officer – Health', emo: '👩', years: 4 },
  { name: 'Nilesh Thakkar', role: 'Data & Impact Analyst', emo: '👨‍💻', years: 3 },
  { name: 'Kinjal Panchal', role: 'Communications Lead', emo: '👩', years: 4 },
  { name: 'Hitesh Rabari', role: 'Field Coordinator – Banaskantha', emo: '👨', years: 6 },
  { name: 'Manisha Vyas', role: 'Finance Manager', emo: '👩‍💼', years: 5 },
];

const board = [
  { name: 'Justice A.K. Patel (Retd.)', role: 'Chairman, Board of Trustees' },
  { name: 'Dr. Sheela Iyer', role: 'Trustee – Public Health' },
  { name: 'CA Suresh Gujarati', role: 'Trustee – Finance & Audit' },
  { name: 'Prof. Nalini Bhatt', role: 'Trustee – Education Policy' },
];

export default function Team() {
  return (
    <>
      <PageHeader title="Our Team" subtitle="The people who make it happen — on the ground, in the field, every day." crumb="Team" />
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">👥 Leadership</div>
            <h2 className="section-title">The People Who Lead</h2>
          </div>
          <div className="cards-grid">
            {leadership.map(m => (
              <div key={m.name} className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,var(--blue),var(--teal))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>{m.emo}</div>
                <h3 style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>{m.name}</h3>
                <div style={{ color: 'var(--teal)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.8rem' }}>{m.role}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--light)', lineHeight: 1.7 }}>{m.bio}</p>
                <a href={m.linkedin} style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--blue)', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>💼 LinkedIn →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">🌾 Field Team</div>
            <h2 className="section-title">The People in the Villages</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {fieldTeam.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">{m.emo}</div>
                <div className="team-body">
                  <h4>{m.name}</h4>
                  <div className="role">{m.role}</div>
                  <p>{m.years} years with Banshri</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag">🏛️ Board of Trustees</div>
            <h2 className="section-title">Governance</h2>
          </div>
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {board.map(b => (
              <div key={b.name} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{b.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 600 }}>{b.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
