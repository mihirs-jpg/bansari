import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  { to: '/team', label: '👥 Our Team' },
  { to: '/annual-reports', label: '📄 Annual Reports' },
  { to: '/csr', label: '🏢 CSR Partnership' },
  { to: '/transparency', label: '📊 Transparency' },
  { to: '/media', label: '📰 Media Coverage' },
  { to: '/careers', label: '💼 Careers' },
];

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0' }}>
        <img
          src={banshriLogo}
          alt="Banshri Charitable Trust"
          style={{ height: '152px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.05) drop-shadow(0 2px 8px rgba(0,91,154,0.18))' }}
        />
      </NavLink>

      {/* Desktop Links */}
      <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
        {mainLinks.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{l.label}</NavLink>
        ))}

        {/* More Dropdown */}
        <div style={{ position: 'relative' }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
          <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontWeight: 500, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            More ▾
          </button>
          {moreOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, background: 'var(--dark-blue)', borderRadius: 12, padding: '0.5rem', minWidth: 200, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', zIndex: 200 }}>
              {moreLinks.map(l => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} style={{ display: 'block', padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

      </div>
              <NavLink to="/donate" className="nav-link nav-donate">❤️ Donate</NavLink>


      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', cursor: 'pointer' }} className="mobile-menu-btn">
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 70, left: 0, right: 0, bottom: 0, background: 'var(--dark-blue)', zIndex: 999, overflowY: 'auto', padding: '1rem' }}>
          {[...mainLinks, ...moreLinks].map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} style={{ display: 'block', padding: '0.8rem 1rem', fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/donate" onClick={() => setMenuOpen(false)} className="nav-link nav-donate" style={{ display: 'block', margin: '1rem 0', textAlign: 'center' }}>❤️ Donate</NavLink>
        </div>
      )}
    </nav>
  );
}
