import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';

const jobs = [
  { title: 'Program Manager – Education', type: 'Full-time', location: 'Ahmedabad', dept: 'Programs', desc: 'Lead the Shiksha Daan program across 52 schools. Manage a team of 8 field coordinators.' },
  { title: 'Field Coordinator – Health', type: 'Full-time', location: 'Patan', dept: 'Programs', desc: 'Coordinate Nirogi Gaon mobile health camps. Liaise with doctors, volunteers, and community leaders.' },
  { title: 'Digital Marketing Executive', type: 'Full-time', location: 'Ahmedabad / Remote', dept: 'Communications', desc: 'Manage social media, email campaigns, and donor communications.' },
  { title: 'Fundraising Associate', type: 'Full-time', location: 'Ahmedabad', dept: 'Resource Mobilization', desc: 'Research and apply to grants, build donor pipelines, and support CSR outreach.' },
  { title: 'Data & Impact Analyst', type: 'Full-time / Part-time', location: 'Remote', dept: 'Programs', desc: 'Build dashboards, analyze program data, and write impact reports.' },
  { title: 'Environmental Intern', type: 'Internship (3 months)', location: 'Gandhinagar', dept: 'Harit Bharat', desc: 'Support plantation drives, watershed documentation, and community mobilization.' },
];

export default function Careers() {
  const [applied, setApplied] = useState(null);
  return (
    <>
      <PageHeader title="Careers & Internships" subtitle="Build a career that means something. Join a team of committed changemakers in Gujarat." crumb="Careers" />
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginBottom: '3rem' }}>
            {[['🌟','Purpose-Driven Work','Every task connects to real impact in rural Gujarat.'],['📈','Growth & Learning','Mentorship, training budgets, and conference opportunities.'],['❤️','Great Culture','A collaborative, transparent, and caring workplace.']].map(([icon,title,desc]) => (
              <div key={title} className="cause-card" style={{ textAlign: 'center' }}>
                <span className="cause-icon">{icon}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="section-header center">
            <div className="section-tag">💼 Open Positions</div>
            <h2 className="section-title">Current Openings</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map((j, i) => (
              <div key={j.title} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="card-tag">{j.dept}</span>
                    <span style={{ background: 'rgba(0,184,148,0.1)', color: 'var(--green)', padding: '0.2rem 0.6rem', borderRadius: 10, fontSize: '0.72rem', fontWeight: 600 }}>{j.type}</span>
                    <span style={{ background: 'rgba(0,91,154,0.08)', color: 'var(--blue)', padding: '0.2rem 0.6rem', borderRadius: 10, fontSize: '0.72rem', fontWeight: 600 }}>📍 {j.location}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>{j.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--light)' }}>{j.desc}</p>
                </div>
                <div>
                  {applied === i ? (
                    <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.83rem' }}>✅ Applied!</span>
                  ) : (
                    <button className="btn-sm" onClick={() => setApplied(i)}>Apply Now →</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--light)', fontSize: '0.83rem', marginTop: '1.5rem' }}>Don't see the right role? Send your CV to <a href="mailto:careers@banshri.org" style={{ color: 'var(--teal)', fontWeight: 600 }}>careers@banshri.org</a></p>
        </div>
      </section>
    </>
  );
}
