import { Link } from 'react-router-dom';
import { useState } from 'react';
import banshriLogo from '../../assets/images/banshri-logo.png';

const footerSections = [
  {
    title: 'Programs',
    links: [
      { to: '/programs', label: 'All Programs' },
      { to: '/programs/shiksha-daan', label: 'Shiksha Daan' },
      { to: '/programs/shakti-abhiyan', label: 'Shakti Abhiyan' },
      { to: '/programs/nirogi-gaon', label: 'Nirogi Gaon' },
      { to: '/programs/harit-bharat', label: 'Harit Bharat' },
      { to: '/impact', label: 'Our Impact' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { to: '/donate', label: 'Donate' },
      { to: '/volunteer', label: 'Volunteer' },
      { to: '/csr', label: 'CSR Partnership' },
      { to: '/careers', label: 'Careers' },
      { to: '/events', label: 'Events' },
      { to: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'About',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/team', label: 'Our Team' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/media', label: 'Media Coverage' },
      { to: '/annual-reports', label: 'Annual Reports' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/transparency', label: 'Transparency' },
      { to: '/contact', label: 'Contact' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Use' },
    ],
  },
];

const socials = [
  { icon: 'f', label: 'Facebook', color: '#1877f2' },
  { icon: '▷', label: 'YouTube', color: '#ff0000' },
  { icon: 'in', label: 'LinkedIn', color: '#0a66c2' },
  { icon: 'X', label: 'Twitter/X', color: '#ffffff' },
  { icon: '📷', label: 'Instagram', color: '#e1306c' },
];

function FooterAccordion({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ft-acc">
      <button className="ft-acc-head" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{section.title}</span>
        <span className={`ft-acc-chevron${open ? ' ft-acc-open' : ''}`}>▾</span>
      </button>
      <div className={`ft-acc-body${open ? ' ft-acc-body-open' : ''}`}>
        <ul className="footer-links">
          {section.links.map(l => (
            <li key={l.label}>
              {l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        {/* Grid: brand col + link cols */}
        <div className="ft-grid">
          {/* Brand column */}
          <div className="ft-brand-col">
            <img src={banshriLogo} alt="Banshri Charitable Trust" className="ft-logo" />
            <p className="ft-tagline">Transforming lives in rural Gujarat through education, health, and empowerment since 2018.</p>
            <div className="ft-socials">
              {socials.map(s => (
                <a key={s.label} href="#" title={s.label} className="ft-social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="ft-certs">80G · 12(A) · FCRA · DARPAN Registered</p>
          </div>

          {/* Desktop link columns */}
          <div className="ft-link-cols">
            {footerSections.map(sec => (
              <div key={sec.title} className="ft-col">
                <h4>{sec.title}</h4>
                <ul className="footer-links">
                  {sec.links.map(l => (
                    <li key={l.label}>
                      {l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile accordions */}
          <div className="ft-accordions">
            {footerSections.map(sec => (
              <FooterAccordion key={sec.title} section={sec} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2025 Banshri Charitable Trust. All rights reserved. | Registered Society, Govt. of Gujarat</span>
          <span>Made with ❤️ for Gujarat</span>
        </div>
      </div>
    </footer>
  );
}
