import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import banshriLogo from '../../assets/images/banshri-logo.png';

const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/impact', label: 'Impact' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
];

const moreLinks = [
  { to: '/team', label: 'Our Team', icon: '👥' },
  { to: '/annual-reports', label: 'Annual Reports', icon: '📄' },
  { to: '/csr', label: 'CSR Partnership', icon: '🏢' },
  { to: '/transparency', label: 'Transparency', icon: '📊' },
  { to: '/media', label: 'Media Coverage', icon: '📰' },
  { to: '/careers', label: 'Careers', icon: '💼' },
];

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileMoreOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navCls = `nb-root${scrolled ? ' nb-scrolled' : ''}${menuOpen ? ' nb-open' : ''}`;

  return (
    <>
      <nav className={navCls}>
        {/* Brand */}
        <NavLink to="/" className="nb-brand" onClick={() => setMenuOpen(false)}>
          <img src={banshriLogo} alt="Banshri Charitable Trust" className="nb-logo" />
        </NavLink>

        {/* Desktop links */}
        <div className="nb-links">
          {mainLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => 'nb-link' + (isActive ? ' nb-active' : '')}>
              {l.label}
            </NavLink>
          ))}

          {/* More dropdown */}
          <div className="nb-more-wrap" ref={moreRef} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button className={`nb-link nb-more-btn${moreOpen ? ' nb-active' : ''}`} aria-expanded={moreOpen}>
              More <span className={`nb-chevron${moreOpen ? ' nb-chevron-open' : ''}`}>▾</span>
            </button>
            {/* Invisible bridge covers the gap between button and dropdown */}
            <div className="nb-dropdown-bridge" aria-hidden="true" />
            <div className={`nb-dropdown${moreOpen ? ' nb-dropdown-open' : ''}`} role="menu">
              <div className="nb-drop-panel">
                {moreLinks.map(l => (
                  <NavLink key={l.to} to={l.to} role="menuitem" className={({ isActive }) => 'nb-drop-item' + (isActive ? ' nb-active' : '')}>
                    <span className="nb-drop-icon">{l.icon}</span> {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop donate */}
        <NavLink to="/donate" className="nb-donate nb-donate-desk">❤️ Donate</NavLink>

        {/* Hamburger */}
        <button
          className={`nb-ham${menuOpen ? ' nb-ham-open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nb-drawer${menuOpen ? ' nb-drawer-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nb-drawer-inner">
          {/* Main links */}
          <div className="nb-mob-section">
            {mainLinks.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => 'nb-mob-link' + (isActive ? ' nb-mob-active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* More accordion */}
          <div className="nb-mob-section">
            <button className="nb-mob-more-toggle" onClick={() => setMobileMoreOpen(v => !v)} aria-expanded={mobileMoreOpen}>
              <span>More</span>
              <span className={`nb-chevron${mobileMoreOpen ? ' nb-chevron-open' : ''}`}>▾</span>
            </button>
            <div className={`nb-mob-more${mobileMoreOpen ? ' nb-mob-more-open' : ''}`}>
              {moreLinks.map(l => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => 'nb-mob-link nb-mob-sub' + (isActive ? ' nb-mob-active' : '')}>
                  <span>{l.icon}</span> {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Donate CTA */}
          <NavLink to="/donate" className="nb-donate nb-donate-mob">❤️ Donate Now</NavLink>

          {/* Trust badges */}
          <p className="nb-mob-badge">80G · 12(A) · FCRA · DARPAN Registered</p>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="nb-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  );
}