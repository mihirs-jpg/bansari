import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import './Contact.css';

/* ── Data ──────────────────────────────────────────────── */
const deptContacts = [
  { emo: '💛', dept: 'Donations & Finance', email: 'donate@banshri.org', phone: '+91 79 2630 4501', color: '#F4C542', bg: 'rgba(244,197,66,0.1)' },
  { emo: '🌟', dept: 'Volunteer Coordination', email: 'volunteer@banshri.org', phone: '+91 79 2630 4502', color: '#00B894', bg: 'rgba(0,184,148,0.1)' },
  { emo: '🏢', dept: 'Corporate CSR', email: 'csr@banshri.org', phone: '+91 79 2630 4503', color: '#005B9A', bg: 'rgba(0,91,154,0.1)' },
  { emo: '🗞️', dept: 'Media & Press', email: 'media@banshri.org', phone: '+91 79 2630 4504', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  { emo: '📋', dept: 'Programs & Impact', email: 'programs@banshri.org', phone: '+91 79 2630 4505', color: '#00A7A7', bg: 'rgba(0,167,167,0.1)' },
  { emo: '🤝', dept: 'Partnerships', email: 'partnerships@banshri.org', phone: '+91 79 2630 4506', color: '#e17055', bg: 'rgba(225,112,85,0.1)' },
];

const officeFaqs = [
  { q: 'How quickly do you respond to emails?', a: 'We respond to all emails within 24 working hours. For urgent matters, call us directly during office hours. Our team monitors messages throughout the day.' },
  { q: 'Can I visit your office?', a: 'Yes! Our office is open Mon–Sat, 9 AM to 6 PM. For field site visits to our program locations, write to visit@banshri.org with your preferred dates and areas of interest.' },
  { q: 'Do you have regional offices?', a: 'Our head office is in Ahmedabad. We have field coordination offices in Patan, Mehsana, and Banaskantha districts, each supporting local program delivery.' },
  { q: 'How do I report a complaint or concern?', a: 'Write directly to grievance@banshri.org. All concerns are acknowledged within 48 hours and resolved within 7 working days. We take every feedback seriously.' },
];

const socialLinks = [
  { name: 'Facebook', handle: '/BanshriNGO', color: '#1877f2', bg: 'rgba(24,119,242,0.1)',
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877f2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { name: 'Instagram', handle: '@banshri_ngo', color: '#e1306c', bg: 'rgba(225,48,108,0.1)',
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e1306c" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#e1306c"/></svg> },
  { name: 'Twitter / X', handle: '@BanshriNGO', color: '#1da1f2', bg: 'rgba(29,161,242,0.1)',
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#1da1f2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> },
  { name: 'YouTube', handle: 'Banshri NGO', color: '#ff0000', bg: 'rgba(255,0,0,0.08)',
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#ff0000"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 00-1.95 1.95A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
  { name: 'LinkedIn', handle: 'Banshri Foundation', color: '#0a66c2', bg: 'rgba(10,102,194,0.1)',
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#0a66c2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
];

/* ── SVG Icons ─────────────────────────────────────────── */
const icons = {
  location: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18C.07 1.07.98 0 2.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  email: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  clock: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  alert: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#e17055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  send: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  map: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  plus: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

/* ── Strip data ────────────────────────────────────────── */
const stripData = [
  { icon: icons.location, label: 'Address', val: 'Navrangpura, Ahmedabad', iconBg: 'rgba(0,91,154,0.1)' },
  { icon: icons.phone, label: 'Main Phone', val: '+91 79 2630 4500', iconBg: 'rgba(0,167,167,0.1)' },
  { icon: icons.email, label: 'General Email', val: 'info@banshri.org', iconBg: 'rgba(0,184,148,0.1)' },
  { icon: icons.clock, label: 'Office Hours', val: 'Mon–Sat, 9 AM – 6 PM', iconBg: 'rgba(244,197,66,0.1)' },
];

const infoItems = [
  { icon: icons.location, label: 'Head Office', val: '42 Sardar Patel Marg, Navrangpura, Ahmedabad — 380009', iconBg: 'rgba(0,91,154,0.08)' },
  { icon: icons.phone, label: 'Main Phone', val: '+91 79 2630 4500', iconBg: 'rgba(0,167,167,0.08)' },
  { icon: icons.email, label: 'General Email', val: 'info@banshri.org', iconBg: 'rgba(0,184,148,0.08)' },
  { icon: icons.clock, label: 'Office Hours', val: 'Mon–Sat, 9 AM – 6 PM IST', iconBg: 'rgba(244,197,66,0.08)' },
  { icon: icons.alert, label: 'Emergency', val: '+91 98250 XXXXX (24/7)', iconBg: 'rgba(225,112,85,0.08)' },
];

/* ── Animation variants ────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section className="contact-hero" ref={heroRef}>
        <div className="contact-hero-orb contact-hero-orb-1" />
        <div className="contact-hero-orb contact-hero-orb-2" />
        <div className="contact-hero-orb contact-hero-orb-3" />
        <motion.div className="container" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="contact-hero-inner">
            {/* Left Text */}
            <motion.div className="contact-hero-text"
              initial="hidden" animate="show" variants={stagger}>
              <motion.div className="contact-hero-eyebrow" variants={fadeUp}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Get In Touch
              </motion.div>
              <motion.h1 variants={fadeUp}>
                We're Here to <span className="h-accent">Help</span><br />& Listen
              </motion.h1>
              <motion.p className="contact-hero-sub" variants={fadeUp}>
                Whether you want to volunteer, donate, partner, or simply learn more — our team is ready to connect with you.
              </motion.p>
              <motion.div className="contact-hero-badges" variants={fadeUp}>
                {[
                  { svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: '24hr Response' },
                  { svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-8.6-8.59 19.79 19.79 0 01-3-8.62C1 2.9 2 2 3.12 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, text: 'Mon–Sat Open' },
                  { svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, text: 'Dedicated Team' },
                ].map(b => (
                  <div className="chero-badge" key={b.text}>{b.svg}{b.text}</div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Floating Info Card (3D tilt) */}
            <motion.div initial={{ opacity: 0, x: 50, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <TiltCard max={6} scale={1.02} style={{ borderRadius: '24px' }}>
                <div className="contact-hero-card">
                  <div className="chc-title">Quick Contact Info</div>
                  <div className="chc-items">
                    {[
                      { icon: icons.location, label: 'Address', val: '42 Sardar Patel Marg, Ahmedabad', iconBg: 'rgba(0,91,154,0.2)' },
                      { icon: icons.phone, label: 'Phone', val: '+91 79 2630 4500', iconBg: 'rgba(0,167,167,0.2)' },
                      { icon: icons.email, label: 'Email', val: 'info@banshri.org', iconBg: 'rgba(0,184,148,0.2)' },
                      { icon: icons.clock, label: 'Hours', val: 'Mon–Sat, 9 AM – 6 PM', iconBg: 'rgba(244,197,66,0.2)' },
                    ].map(i => (
                      <div className="chc-item" key={i.label}>
                        <div className="chc-icon-wrap" style={{ background: i.iconBg }}>{i.icon}</div>
                        <div>
                          <div className="chc-label">{i.label}</div>
                          <div className="chc-val">{i.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ QUICK STRIP ════════════════════════════════════ */}
      <div className="contact-strip">
        <div className="container">
          <div className="contact-strip-inner">
            {stripData.map((s, i) => (
              <motion.div className="cstrip-item" key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}>
                <div className="cstrip-icon" style={{ background: s.iconBg }}>{s.icon}</div>
                <div>
                  <div className="cstrip-label">{s.label}</div>
                  <div className="cstrip-val">{s.val}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MAIN FORM + INFO ═══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Form Card */}
            <Reveal direction="left">
              <TiltCard max={3} scale={1.005} className="contact-form-card">
                <div className="cform-header">
                  <h3>Send us a Message</h3>
                  <p>Fill in the form and our team will get back to you within 24 hours.</p>
                </div>
                <div className="cform-row">
                  <div className="cform-group"><label>Full Name *</label><input placeholder="Your name" /></div>
                  <div className="cform-group"><label>Email *</label><input type="email" placeholder="you@email.com" /></div>
                </div>
                <div className="cform-row">
                  <div className="cform-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="cform-group"><label>Department</label>
                    <select>
                      <option>General Inquiry</option>
                      <option>Donations</option>
                      <option>Volunteering</option>
                      <option>Corporate CSR</option>
                      <option>Media & Press</option>
                      <option>Partnerships</option>
                    </select>
                  </div>
                </div>
                <div className="cform-group"><label>Subject</label><input placeholder="How can we help?" /></div>
                <div className="cform-group"><label>Message *</label><textarea placeholder="Tell us more about how we can help you..." /></div>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div className="cform-success" key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="cform-success-icon">{icons.check}</div>
                      <div>
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for reaching out. We'll get back to you within 24 working hours.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button className="cform-submit" key="btn" onClick={() => setSent(true)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {icons.send} Send Message
                    </motion.button>
                  )}
                </AnimatePresence>
              </TiltCard>
            </Reveal>

            {/* Info Panel */}
            <div className="contact-info-panel">
              {/* Contact Info Card */}
              <Reveal direction="right" delay={100}>
                <div className="cinfo-card">
                  <div className="cinfo-card-title">Contact Information</div>
                  <div className="cinfo-items">
                    {infoItems.map(item => (
                      <div className="cinfo-item" key={item.label}>
                        <div className="cinfo-icon-wrap" style={{ background: item.iconBg }}>{item.icon}</div>
                        <div>
                          <div className="cinfo-label">{item.label}</div>
                          <div className="cinfo-val">{item.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Social Links */}
              <Reveal direction="right" delay={200}>
                <div className="cinfo-card">
                  <div className="cinfo-card-title">Find Us Online</div>
                  <div className="csocial-grid">
                    {socialLinks.map(s => (
                      <a key={s.name} href="#" className="csocial-item">
                        <div className="csocial-icon" style={{ background: s.bg }}>{s.icon}</div>
                        <div>
                          <div className="csocial-name">{s.name}</div>
                          <div className="csocial-handle">{s.handle}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ════════════════════════════════════════════ */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <Reveal direction="up">
            <div className="contact-map-wrap">
              <div className="map-pin-anim">
                <div className="map-pin-ring" />
                <div className="map-pin-ring" />
                <div className="map-pin-ring" />
                <div className="map-pin-dot" />
              </div>
              <div className="map-address">
                <strong>42 Sardar Patel Marg, Navrangpura</strong>
                <span>Ahmedabad, Gujarat — 380009</span>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="map-open-btn">
                {icons.map} Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ DEPARTMENT CONTACTS ════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal direction="up">
            <div className="section-header center">
              <div className="section-tag">🏢 Department Contacts</div>
              <h2 className="section-title">Reach the Right Team</h2>
              <p className="section-sub">Skip the queue — write directly to the department that can help you best.</p>
            </div>
          </Reveal>
          <div className="dept-grid">
            {deptContacts.map((d, i) => (
              <Reveal key={d.dept} direction="up" delay={i * 80}>
                <TiltCard max={7} scale={1.03}
                  className="dept-card"
                  style={{ '--dept-color': d.color, '--dept-bg': d.bg }}>
                  <div className="dept-card-icon" style={{ background: d.bg }}>
                    <span style={{ fontSize: '1.5rem' }}>{d.emo}</span>
                  </div>
                  <h4>{d.dept}</h4>
                  <div className="dept-contact-row">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href={`mailto:${d.email}`}>{d.email}</a>
                  </div>
                  <div className="dept-contact-row">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-8.6-8.59 19.79 19.79 0 01-3-8.62C1 2.9 2 2 3.12 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    <span>{d.phone}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <Reveal direction="up">
            <div className="section-header center">
              <div className="section-tag">❓ FAQ</div>
              <h2 className="section-title">Quick Answers</h2>
              <p className="section-sub">Everything you need to know about getting in touch with us.</p>
            </div>
          </Reveal>
          <div className="contact-faq-list">
            {officeFaqs.map((f, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div className={`cfaq-item${openFaq === i ? ' is-open' : ''}`}>
                  <div className="cfaq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="cfaq-q-text">{f.q}</span>
                    <div className="cfaq-toggle">
                      <span style={{ color: openFaq === i ? 'white' : 'var(--blue)', display: 'flex' }}>{icons.plus}</span>
                    </div>
                  </div>
                  <div className={`cfaq-a${openFaq === i ? ' open' : ''}`}>{f.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="contact-cta-section">
        <div className="container">
          <Reveal direction="up">
            <div className="contact-cta-inner">
              <h2>Ready to Make a Difference?</h2>
              <p>Join thousands of supporters who are transforming lives across Gujarat. Every action counts.</p>
              <div className="contact-cta-btns">
                <a href="/donate" className="ccta-btn-white">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  Donate Now
                </a>
                <a href="/volunteer" className="ccta-btn-outline">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  Become a Volunteer
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}