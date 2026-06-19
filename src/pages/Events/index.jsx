import { useState } from 'react';
import { events } from '../../constants/data';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import './event.css';

/* ─── Upcoming Events ──────────────────────────────────────── */
const upcomingEvents = [
  {
    name: 'Annual Fundraising Gala',
    desc: 'An evening of music, stories, and celebrating our 2024–25 milestones with donors, volunteers, and community leaders.',
    day: '15', month: 'Jul', year: '2026',
    loc: 'The Grand Ballroom, Ahmedabad',
    type: 'Fundraiser', color: 'var(--gold)',
    time: '6:30 PM onwards', seats: '200 seats · Invite only',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=360&fit=crop&q=80',
  },
  {
    name: 'Shiksha Daan Summer Camp',
    desc: 'Two-week residential camp for 200 rural students in science, technology, and digital literacy.',
    day: '01', month: 'Aug', year: '2026',
    loc: 'Banshri Learning Centre, Patan',
    type: 'Education', color: 'var(--blue)',
    time: 'Aug 1 – Aug 14', seats: '200 students',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=360&fit=crop&q=80',
  },
  {
    name: 'Tree Plantation Drive',
    desc: 'Community plantation of 5,000 saplings along the Sabarmati riverfront. Families, schools, and corporates welcome.',
    day: '20', month: 'Aug', year: '2026',
    loc: 'Sabarmati Riverfront, Gandhinagar',
    type: 'Environment', color: '#16a34a',
    time: '7:00 AM – 12:00 PM', seats: 'Open registration',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=360&fit=crop&q=80',
  },
  {
    name: 'Shakti Skills Mela',
    desc: 'Job fair and skills showcase by 300+ Shakti Abhiyan graduates. Connect with employers and SHG leaders.',
    day: '05', month: 'Sep', year: '2026',
    loc: 'District Hall, Mehsana',
    type: 'Women', color: '#e91e8c',
    time: '10:00 AM – 5:00 PM', seats: 'Open to all',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=360&fit=crop&q=80',
  },
  {
    name: 'Nirogi Gaon Health Camp',
    desc: 'Free health screenings, dental check-ups, eye testing, and medicine distribution in 5 villages over 2 days.',
    day: '18', month: 'Sep', year: '2026',
    loc: 'Banaskantha District',
    type: 'Health', color: 'var(--teal)',
    time: 'Sep 18–19 · 8 AM – 4 PM', seats: '500+ beneficiaries',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=360&fit=crop&q=80',
  },
  {
    name: 'CSR Partner Summit',
    desc: 'Annual meeting of our corporate partners to review impact reports, plan 2027 programs, and align CSR goals.',
    day: '10', month: 'Oct', year: '2026',
    loc: 'Taj Hotel, Ahmedabad',
    type: 'Fundraiser', color: 'var(--blue)',
    time: '9:00 AM – 4:00 PM', seats: 'By invitation',
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=360&fit=crop&q=80',
  },
];

/* ─── Past Events ──────────────────────────────────────────── */
const pastEvents = [
  {
    name: 'Banshri Foundation Day 2025', month: 'Mar 2025', type: 'Milestone',
    highlight: '500+ attendees · 7 years celebrated', loc: 'Ahmedabad',
    img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=400&h=220&fit=crop&q=80',
  },
  {
    name: 'Winter Plantation Drive', month: 'Dec 2024', type: 'Environment',
    highlight: '8,000 saplings · 12 school teams', loc: 'Mehsana',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=220&fit=crop&q=80',
  },
  {
    name: 'Diwali Donation Camp', month: 'Oct 2024', type: 'Fundraiser',
    highlight: '₹18 lakh raised · 340 donors', loc: 'Multiple Cities',
    img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=220&fit=crop&q=80',
  },
  {
    name: 'Nirogi Gaon Camp Series', month: 'Sep 2024', type: 'Health',
    highlight: '1,200 consultations · 8 villages', loc: 'Banaskantha',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=220&fit=crop&q=80',
  },
  {
    name: 'Shakti Graduation Ceremony', month: 'Jul 2024', type: 'Women',
    highlight: '280 women graduated · 92% placed', loc: 'Mehsana',
    img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=220&fit=crop&q=80',
  },
  {
    name: 'Annual Fundraising Gala 2024', month: 'Jun 2024', type: 'Fundraiser',
    highlight: '₹32 lakh raised · 180 guests', loc: 'Ahmedabad',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=220&fit=crop&q=80',
  },
];

/* ─── Event Statistics ─────────────────────────────────────── */
const eventStats = [
  { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&fit=crop&q=80', num: '48', suffix: '+', label: 'Events in 2024–25' },
  { img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&h=80&fit=crop&q=80', num: '12000', suffix: '+', label: 'Total Attendees' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&q=80', num: '8', suffix: '', label: 'Districts Covered' },
  { img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=80&h=80&fit=crop&q=80', num: '320', suffix: '+', label: 'Volunteers Deployed' },
  { img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=80&h=80&fit=crop&q=80', num: '62', suffix: 'L+', label: 'Funds Raised at Events' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop&q=80', num: '13000', suffix: '+', label: 'Trees Planted at Drives' },
];

/* ─── Gallery items ────────────────────────────────────────── */
const galleryItems = [
  { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=500&fit=crop&q=80', label: 'Annual Gala 2024', cat: 'Fundraiser' },
  { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop&q=80', label: 'Plantation Drive', cat: 'Environment' },
  { img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=500&fit=crop&q=80', label: 'Shakti Graduation', cat: 'Women' },
  { img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=500&fit=crop&q=80', label: 'Health Camp Setup', cat: 'Health' },
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop&q=80', label: 'Summer Camp Students', cat: 'Education' },
  { img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=500&fit=crop&q=80', label: 'Diwali Donation Camp', cat: 'Fundraiser' },
  { img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=500&h=500&fit=crop&q=80', label: 'Foundation Day', cat: 'Milestone' },
  { img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=500&fit=crop&q=80', label: 'Child Safety Workshop', cat: 'Child Welfare' },
];

/* ─── Volunteer roles ──────────────────────────────────────── */
const volunteerRoles = [
  { img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=120&h=120&fit=crop&q=80', role: 'Event Host / MC', time: '1 day', skills: 'Communication, Gujarati/Hindi' },
  { img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop&q=80', role: 'Photographer', time: '4–8 hrs', skills: 'Photography, editing' },
  { img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=120&h=120&fit=crop&q=80', role: 'Logistics Support', time: '1–2 days', skills: 'Driving, coordination' },
  { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&h=120&fit=crop&q=80', role: 'Medical Volunteer', time: '1 day', skills: 'MBBS / Nursing degree' },
  { img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&q=80', role: 'Registration Desk', time: '4–6 hrs', skills: 'Basic computer skills' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&h=120&fit=crop&q=80', role: 'Plantation Lead', time: '1 morning', skills: 'Outdoor fitness' },
];

/* ─── Calendar months ──────────────────────────────────────── */
const calendarMonths = [
  { month: 'Jul', events: [{ day: 15, name: 'Fundraising Gala', type: 'Fundraiser' }] },
  { month: 'Aug', events: [{ day: 1, name: 'Summer Camp', type: 'Education' }, { day: 20, name: 'Plantation Drive', type: 'Environment' }] },
  { month: 'Sep', events: [{ day: 5, name: 'Shakti Mela', type: 'Women' }, { day: 18, name: 'Health Camp', type: 'Health' }] },
  { month: 'Oct', events: [{ day: 10, name: 'CSR Summit', type: 'Fundraiser' }] },
];

const typeColors = {
  Fundraiser: 'var(--gold)', Education: 'var(--blue)', Environment: '#16a34a',
  Women: '#e91e8c', Health: 'var(--teal)', Milestone: '#a855f7', 'Child Welfare': '#f97316',
};

export default function Events() {
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', phone: '', role: '', event: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => setVolunteerForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFormSubmit = () => {
    if (!volunteerForm.name || !volunteerForm.email) return;
    setFormSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Events & Activities"
        subtitle="Join us — every hand, every presence, every rupee makes a difference"
        crumb="Events"
      />

      {/* ══════ UPCOMING EVENTS ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Mark Your Calendar</div>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Six events across Gujarat this season — find one near you.</p>
          </Reveal>
          <div className="upcoming-grid">
            {upcomingEvents.map((e, i) => (
              <Reveal direction="up" delay={i * 70} key={e.name}>
                <TiltCard max={5} scale={1.01} className="upcoming-card">
                  <div className="uc-img-wrap">
                    <img src={e.img} alt={e.name} className="uc-img" />
                    <div className="uc-img-overlay" style={{ background: `linear-gradient(to top, rgba(0,10,30,0.85), transparent 55%)` }}></div>
                    <div className="uc-type-badge" style={{ background: e.color === 'var(--gold)' ? 'var(--gold)' : e.color, color: e.color === 'var(--gold)' ? '#1a2535' : 'white' }}>{e.type}</div>
                    <div className="uc-date-block" style={{ borderColor: e.color }}>
                      <span className="uc-day">{e.day}</span>
                      <span className="uc-month">{e.month}</span>
                      <span className="uc-year">{e.year}</span>
                    </div>
                  </div>
                  <div className="uc-body">
                    <div className="uc-accent" style={{ background: e.color }}></div>
                    <h4 className="uc-name">{e.name}</h4>
                    <p className="uc-desc">{e.desc}</p>
                    <div className="uc-meta">
                      <span>📍 {e.loc}</span>
                      <span>⏰ {e.time}</span>
                      <span>🎟️ {e.seats}</span>
                    </div>
                    <button className="uc-btn" style={{ background: e.color, color: e.color === 'var(--gold)' ? '#1a2535' : 'white' }}>
                      Register Now →
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ EVENT STATISTICS ══════ */}
      <div className="event-stats-band">
        <div className="event-stats-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal direction="up" className="section-header center" style={{ marginBottom: '2.5rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 0.5rem', background: 'rgba(255,255,255,0.12)', color: 'white' }}>By the Numbers</div>
            <h2 className="section-title" style={{ color: 'white' }}>Event Statistics</h2>
          </Reveal>
          <div className="event-stats-grid">
            {eventStats.map((s, i) => (
              <Reveal direction="scale" delay={i * 80} key={s.label}>
                <div className="event-stat-card">
                  <div className="es-img-wrap">
                    <img src={s.img} alt={s.label} className="es-img" />
                  </div>
                  <div className="es-num">
                    <CountUp target={Number(s.num.replace(/,/g,''))} />{s.suffix}
                  </div>
                  <div className="es-label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ EVENT CALENDAR ══════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Visual Overview</div>
            <h2 className="section-title">Event Calendar</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Events scheduled across Jul – Oct 2026.</p>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <div className="calendar-strip">
              {calendarMonths.map((m) => (
                <div className="cal-month" key={m.month}>
                  <div className="cal-month-label">{m.month} 2026</div>
                  <div className="cal-events-list">
                    {m.events.map((ev) => (
                      <div className="cal-event-pill" key={ev.name} style={{ borderLeft: `3px solid ${typeColors[ev.type] || 'var(--blue)'}` }}>
                        <span className="cal-pill-day" style={{ color: typeColors[ev.type] || 'var(--blue)' }}>{ev.day}</span>
                        <span className="cal-pill-name">{ev.name}</span>
                        <span className="cal-pill-type" style={{ color: typeColors[ev.type] || 'var(--blue)' }}>{ev.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="cal-legend">
              {Object.entries(typeColors).map(([type, color]) => (
                <div className="cal-legend-item" key={type}>
                  <span className="cal-legend-dot" style={{ background: color }}></span>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ PAST EVENTS ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Our History</div>
            <h2 className="section-title">Past Events</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Events we ran in 2024–25 — each one a story of community and change.</p>
          </Reveal>
          <div className="past-events-grid">
            {pastEvents.map((e, i) => (
              <Reveal direction="up" delay={i * 70} key={e.name}>
                <div className="past-card">
                  <div className="past-img-wrap">
                    <img src={e.img} alt={e.name} className="past-img" />
                    <div className="past-img-overlay"></div>
                    <span className="past-type-badge" style={{ color: typeColors[e.type] || 'var(--blue)', background: `${typeColors[e.type] || 'var(--blue)'}15` }}>{e.type}</span>
                  </div>
                  <div className="past-body">
                    <div className="past-month">{e.month}</div>
                    <h4 className="past-name">{e.name}</h4>
                    <div className="past-highlight">✨ {e.highlight}</div>
                    <div className="past-loc">📍 {e.loc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ EVENT GALLERY ══════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Captured Moments</div>
            <h2 className="section-title">Event Gallery</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Glimpses from our events across Gujarat.</p>
          </Reveal>
          <div className="event-gallery">
            {galleryItems.map((g, i) => (
              <Reveal direction="scale" delay={i * 60} key={g.label}>
                <div className="evt-gallery-item">
                  <img src={g.img} alt={g.label} className="evt-gallery-img" />
                  <div className="evt-gallery-overlay">
                    <span className="evt-gallery-label">{g.label}</span>
                    <span className="evt-gallery-cat" style={{ color: typeColors[g.cat] || 'white' }}>{g.cat}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ REGISTER AS VOLUNTEER ══════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up" className="section-header center">
            <div className="section-tag" style={{ margin: '0 auto 0.5rem' }}>Get Involved</div>
            <h2 className="section-title">Register as a Volunteer</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Pick a role, pick an event, and show up. That's all it takes.</p>
          </Reveal>

          <div className="vol-roles-grid">
            {volunteerRoles.map((r, i) => (
              <Reveal direction="up" delay={i * 70} key={r.role}>
                <TiltCard max={6} scale={1.01} className="vol-role-card">
                  <div className="vol-role-img-wrap">
                    <img src={r.img} alt={r.role} className="vol-role-img" />
                  </div>
                  <h4 className="vol-role-title">{r.role}</h4>
                  <div className="vol-role-meta">
                    <span>⏱️ {r.time}</span>
                    <span>🛠️ {r.skills}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" delay={100}>
            <div className="vol-form-wrap">
              {formSubmitted ? (
                <div className="vol-success">
                  <div className="vol-success-img-wrap">
                    <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=120&h=120&fit=crop&q=80" alt="Success" className="vol-success-img" />
                  </div>
                  <h3>You're Registered!</h3>
                  <p>Thank you, <strong>{volunteerForm.name}</strong>! We'll contact you at <strong>{volunteerForm.email}</strong> with event details soon.</p>
                  <button className="btn-sm" style={{ marginTop: '1.25rem' }} onClick={() => setFormSubmitted(false)}>Register Another</button>
                </div>
              ) : (
                <>
                  <div className="vol-form-header">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&h=80&fit=crop&q=80" alt="Volunteer" className="vol-form-header-img" />
                    <div>
                      <h3>Volunteer Registration Form</h3>
                      <p>Fill in your details and we'll reach out with the event schedule.</p>
                    </div>
                  </div>
                  <div className="vol-form-grid">
                    <div className="vol-field">
                      <label>Full Name *</label>
                      <input name="name" placeholder="Your full name" value={volunteerForm.name} onChange={handleFormChange} />
                    </div>
                    <div className="vol-field">
                      <label>Email Address *</label>
                      <input name="email" type="email" placeholder="your@email.com" value={volunteerForm.email} onChange={handleFormChange} />
                    </div>
                    <div className="vol-field">
                      <label>Phone Number</label>
                      <input name="phone" placeholder="+91 XXXXX XXXXX" value={volunteerForm.phone} onChange={handleFormChange} />
                    </div>
                    <div className="vol-field">
                      <label>Preferred Role</label>
                      <select name="role" value={volunteerForm.role} onChange={handleFormChange}>
                        <option value="">Select a role</option>
                        {volunteerRoles.map(r => <option key={r.role} value={r.role}>{r.role}</option>)}
                      </select>
                    </div>
                    <div className="vol-field vol-field-full">
                      <label>Which Event?</label>
                      <select name="event" value={volunteerForm.event} onChange={handleFormChange}>
                        <option value="">Select an event</option>
                        {upcomingEvents.map(e => <option key={e.name} value={e.name}>{e.name} — {e.day} {e.month}</option>)}
                        <option value="any">Any upcoming event</option>
                      </select>
                    </div>
                    <div className="vol-field vol-field-full">
                      <label>Message / Special Skills</label>
                      <textarea name="message" rows="3" placeholder="Tell us about any special skills or availability..." value={volunteerForm.message} onChange={handleFormChange}></textarea>
                    </div>
                  </div>
                  <div className="vol-form-footer">
                    <button className="btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }} onClick={handleFormSubmit}>
                      Submit Registration
                    </button>
                    <span className="vol-privacy">🔒 Your info is private and never shared</span>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
