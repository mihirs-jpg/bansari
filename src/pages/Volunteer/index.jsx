import { useState } from 'react';
import { Link } from 'react-router-dom';
import { testimonials, volunteerBenefits } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import { useParallax } from '../../hooks/useTilt3D';
import { useEffect } from 'react';
import './Volunteer.css';

/* ── Photos (Unsplash) ───────────────────────────────────────── */
const PHOTOS = {
  intro: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=560&fit=crop&q=80',
  cta: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=700&fit=crop&q=70',
  roles: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=320&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&h=320&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=320&fit=crop&q=80',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=320&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=320&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=320&fit=crop&q=80',
  ],
};

/* ── Inline SVG icon set (no emoji, matches About page language) ─ */
const Icon = {
  check: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2 3 7v6c0 4.97 3.8 9.63 9 10.93C17.2 22.63 21 17.97 21 13V7L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

const RoleIcon = {
  book: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 8-4-16-3 8H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M9 18 3 12l6-6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 8h2.5L8 5h8l1.5 3H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.8" /></svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8" /><path d="M16 3.2a3.5 3.5 0 0 1 0 6.6M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  ),
};

const BenefitIcon = [
  <svg key="cert" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.7" /></svg>,
  <svg key="net" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.7" /><circle cx="18" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="17" r="2.6" stroke="currentColor" strokeWidth="1.7" /><path d="M7.8 9 10.5 14.6M16.2 9 13.5 14.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="learn" viewBox="0 0 24 24" fill="none"><path d="M2 6.5c3-1.6 6-1.6 9 0v12c-3-1.6-6-1.6-9 0v-12zM22 6.5c-3-1.6-6-1.6-9 0v12c3-1.6 6-1.6 9 0v-12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  <svg key="purp" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>,
];

const ProcessIcon = [
  <svg key="app" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" /><path d="M14 2v6h6M9 13h6M9 17h6" stroke="white" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  <svg key="call" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.67 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.54 2.81.67A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" /></svg>,
  <svg key="train" viewBox="0 0 24 24" fill="none"><path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" /><path d="M6 11.5v4.7c0 .5 3 2.3 6 2.3s6-1.8 6-2.3v-4.7" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="onb" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.6" stroke="white" strokeWidth="1.7" /></svg>,
];

/* ── Data ─────────────────────────────────────────────────────── */
const skills = ['Teaching', 'Healthcare', 'Technology', 'Legal', 'Design', 'Photography', 'Writing', 'Fundraising', 'Engineering', 'Social Work'];

const roleColors = ['var(--blue)', 'var(--teal)', 'var(--gold)', 'var(--green)', 'var(--blue)', 'var(--teal)'];

const volunteerRoles = [
  { icon: RoleIcon.book, title: 'Education Volunteer', desc: 'Teach digital literacy, English, or science to rural students in our Shiksha Daan schools.', time: '4 hrs/week', mode: 'On-site / Remote' },
  { icon: RoleIcon.pulse, title: 'Health Camp Assistant', desc: 'Support doctors and nurses at mobile health camps — patient registration, crowd coordination, pharmacy.', time: 'Camp days', mode: 'On-site' },
  { icon: RoleIcon.code, title: 'Tech & Data Volunteer', desc: 'Build tools, dashboards, or apps that help our team track program data and reach more communities.', time: 'Flexible', mode: 'Remote' },
  { icon: RoleIcon.camera, title: 'Media & Documentation', desc: 'Photograph and film field activities to help us tell our story and attract donors and partners.', time: 'Flexible', mode: 'On-site' },
  { icon: RoleIcon.pen, title: 'Content & Grant Writing', desc: 'Write grant proposals, social media content, and donor newsletters that fund our work.', time: '3–5 hrs/week', mode: 'Remote' },
  { icon: RoleIcon.users, title: 'Community Mobilizer', desc: 'Be our link to rural communities. Help identify needs, build trust, and enroll beneficiaries.', time: 'Weekends', mode: 'On-site' },
];

const trainingSteps = [
  { title: 'Application', desc: 'Submit your registration form below. It takes about 5 minutes to complete.' },
  { title: 'Orientation Call', desc: 'A 30-minute call with our team to understand your skills and match the right role.' },
  { title: 'Training Module', desc: 'Complete a short online training on our programs, values, and field protocols.' },
  { title: 'Field Onboarding', desc: 'Join your first session with an experienced mentor. We are always with you.' },
];

const impactNumbers = [
  { n: '350+', l: 'Active Volunteers' },
  { n: '12,000+', l: 'Hours Contributed' },
  { n: '18', l: 'States Represented' },
  { n: '92%', l: 'Return for Another Term' },
];

export default function Volunteer() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const orb1 = useParallax(0.4);
  const orb2 = useParallax(-0.3);

  useEffect(() => {
    const handlers = [orb1.handleScroll, orb2.handleScroll];
    const onScroll = () => handlers.forEach((h) => h());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [orb1, orb2]);

  const toggleSkill = skill => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const pickRole = title => {
    setSelectedRole(prev => prev === title ? '' : title);
  };

  return (
    <>
      {/* ============ HEADER ============ */}
      <div className="vol-header">
        <div className="vol-header-orb vol-header-orb-1" ref={orb1.ref}></div>
        <div className="vol-header-orb vol-header-orb-2" ref={orb2.ref}></div>
        <PageHeader title="Volunteer with Banshri" subtitle="Your skills and time are the most precious gift you can give. Join 350+ changemakers from across India." />
      </div>

      {/* ============ INTRO SPLIT ============ */}
      <section className="section">
        <div className="container">
          <div className="vol-intro-split">
            <Reveal direction="left" className="vol-intro-text">
              <div className="section-tag">Get Involved</div>
              <h2 className="section-title">Your Time. Their Tomorrow.</h2>
              <p className="vol-lead">
                Every Banshri program runs on the energy of people who show up — teachers, designers,
                doctors, writers, students. Whatever skill you bring, there is a community in Gujarat
                waiting for it.
              </p>
              <div className="vol-checklist">
                {['No prior NGO experience needed', 'Flexible on-site & remote roles', 'Verified certificate after 20+ hrs'].map(t => (
                  <div className="vol-checklist-item" key={t}>{Icon.check}<span>{t}</span></div>
                ))}
              </div>
              <div className="vol-intro-cta">
                <a href="#apply-now" className="btn-primary">Apply Now </a>
                <a href="#open-roles" className="btn-outline">View Open Roles</a>
              </div>
            </Reveal>

            <Reveal direction="right" delay={120} className="vol-intro-photo-col">
              <div className="vol-intro-photo-wrap">
                <img src={PHOTOS.intro} alt="Banshri volunteers working with the community" className="vol-intro-photo" loading="lazy" />
                <div className="vol-photo-badge vpb-1">
                  <div className="vpb-num">350+</div>
                  <div className="vpb-lbl">Volunteers</div>
                </div>
                <div className="vol-photo-badge vpb-2">
                  <div className="vpb-num">18</div>
                  <div className="vpb-lbl">States</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHY VOLUNTEER ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Why Volunteer</div>
            <h2 className="section-title">More Than Just Giving Time</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Volunteering with Banshri is a two-way journey — you grow as much as the communities you serve.</p>
          </Reveal>
          <div className="vbenefits-grid">
            {volunteerBenefits.map((b, i) => (
              <Reveal direction="up" delay={i * 80} key={b.name}>
                <TiltCard max={7} scale={1.02} className="vbenefit-card">
                  <div className="vbenefit-icon-wrap" style={{ color: roleColors[i], background: `${roleColors[i]}14` }}>
                    <span className="vbenefit-svg">{BenefitIcon[i % BenefitIcon.length]}</span>
                  </div>
                  <h4 className="vbenefit-name">{b.name}</h4>
                  <p className="vbenefit-desc">{b.desc}</p>
                  <div className="vbenefit-accent-bar" style={{ background: roleColors[i] }}></div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT NUMBERS ============ */}
      <div className="impact-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="vol-impact-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>Our Volunteer Community in Numbers</h2>
          </Reveal>
          <div className="impact-grid">
            {impactNumbers.map((s, i) => (
              <Reveal direction="scale" delay={i * 90} key={s.l}>
                <TiltCard max={12} scale={1.05} className="impact-card">
                  <div className="impact-num"><CountUp target={s.n} /></div>
                  <div className="impact-lbl">{s.l}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============ OPEN ROLES ============ */}
      <section className="section" id="open-roles">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Open Roles</div>
            <h2 className="section-title">Find Your Place</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>We have roles for every skill set — on-site and remote.</p>
          </Reveal>
          <div className="roles-grid">
            {volunteerRoles.map((r, i) => (
              <Reveal direction="up" delay={i * 70} key={r.title}>
                <TiltCard max={6} scale={1.015} className="role-card">
                  <div className="role-img-wrap">
                    <img src={PHOTOS.roles[i]} alt={r.title} className="role-img" loading="lazy" />
                    <div className="role-img-fade"></div>
                    <div className="role-badge-icon" style={{ background: roleColors[i] }}>{r.icon}</div>
                    <div className="role-mode-chip">{r.mode}</div>
                  </div>
                  <div className="role-body">
                    <h4 className="role-title">{r.title}</h4>
                    <p className="role-desc">{r.desc}</p>
                    <div className="role-foot">
                      <span className="role-time">{Icon.clock}{r.time}</span>
                      <a href="#apply-now" className="role-apply-link" onClick={() => setSelectedRole(r.title)}>
                        Apply 
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAINING PROCESS ============ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Training Process</div>
            <h2 className="section-title">We Prepare You for Impact</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>No prior NGO experience needed. We walk you through every step.</p>
          </Reveal>
          <div className="process-row">
            <div className="process-line"></div>
            <div className="process-grid">
              {trainingSteps.map((s, i) => (
                <Reveal direction="up" delay={i * 90} key={s.title}>
                  <div className="process-step">
                    <div className="process-icon-circle" style={{ background: roleColors[i] }}>
                      {ProcessIcon[i]}
                      <span className="process-num-badge">{`0${i + 1}`}</span>
                    </div>
                    <div className="process-card">
                      <h4 className="process-title">{s.title}</h4>
                      <p className="process-desc">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ VOICES + REGISTRATION ============ */}
      <section className="section" id="apply-now">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="mission-grid">

            {/* Volunteer Voices */}
            <Reveal direction="left">
              <div className="section-tag">Volunteer Voices</div>
              <h3 style={{ margin: '0.6rem 0 0.4rem' }}>What Our Volunteers Say</h3>
              <p className="vol-voices-tagline">Real stories from people who said yes and never looked back.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {testimonials.map((t, i) => (
                  <Reveal direction="up" delay={i * 100} key={t.author}>
                    <div className="testimonial-card">
                      <p>{t.text}</p>
                      <div className="testimonial-author">
                        <div className="author-avatar">{t.emo}</div>
                        <div>
                          <div className="author-name">{t.author}</div>
                          <div className="author-role">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Registration Form */}
            <Reveal direction="right" delay={120}>
              <div className="glass-card">
                <div className="apply-card-head">
                  <div className="apply-card-icon">{Icon.mail}</div>
                  <div>
                    <h3 style={{ margin: 0 }}>Volunteer Registration</h3>
                    <div className="apply-meta">{Icon.clock}Takes about 5 minutes</div>
                  </div>
                </div>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 1rem 0.5rem' }}>
                    <div className="apply-success-icon-wrap">{Icon.check}</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Application Received!</h3>
                    <p style={{ color: 'var(--light)', fontSize: '0.88rem' }}>Thank you for stepping forward. Here is what happens next:</p>
                    <ul className="apply-success-list">
                      <li>{Icon.check}<span>A confirmation email is on its way to your inbox right now.</span></li>
                      <li>{Icon.check}<span>Our team will call you within 48 hours to schedule your orientation.</span></li>
                      <li>{Icon.check}<span>You'll receive access to our training portal and welcome kit.</span></li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <div className="form-row">
                      <div className="form-group"><label>Full Name *</label><input placeholder="Your full name" /></div>
                      <div className="form-group"><label>Email *</label><input placeholder="you@email.com" /></div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label>Phone *</label><input placeholder="+91 XXXXX XXXXX" /></div>
                      <div className="form-group"><label>City *</label><input placeholder="Your city" /></div>
                    </div>
                    <div className="form-group">
                      <label>Your Skills</label>
                      <div className="apply-pill-row">
                        {skills.map(s => (
                          <button key={s} className={`cat-pill${selectedSkills.includes(s) ? ' active' : ''}`} onClick={() => toggleSkill(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Role of Interest</label>
                      <div className="apply-pill-row">
                        {volunteerRoles.map(r => (
                          <button key={r.title} className={`cat-pill${selectedRole === r.title ? ' active' : ''}`} onClick={() => pickRole(r.title)}>{r.title}</button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Availability</label>
                      <select>
                        <option>Select availability</option>
                        <option>Weekends</option>
                        <option>Weekdays</option>
                        <option>Full-time</option>
                        <option>Remote only</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tell us about yourself</label>
                      <textarea rows="3" placeholder="Share your motivation and what you hope to contribute..." />
                    </div>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSubmitted(true)}>
                      Submit Application 
                    </button>
                    <div className="apply-trust-row">
                      <div className="apply-trust-item">{Icon.shield}100% Confidential</div>
                      <div className="apply-trust-item">{Icon.clock}48-hr Response</div>
                      <div className="apply-trust-item">{Icon.heart}Always Free</div>
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <div className="vol-cta-banner">
        <img src={PHOTOS.cta} alt="" className="vol-cta-bg-img" />
        <div className="vol-cta-overlay"></div>
        <Reveal direction="up" className="vol-cta-content">
          <h2>Still Have Questions?</h2>
          <p>Our volunteer team is happy to help you find the perfect role, answer anything about the
            process, or talk through how your skills can make the biggest difference.</p>
          <div className="vol-cta-actions">
            <a href="#apply-now" className="btn-primary">Apply Now </a>
            <Link to="/contact" className="btn-outline-white">Contact Us</Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
