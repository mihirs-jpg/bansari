import { Link } from 'react-router-dom';
import banshriLogo from '../../assets/images/banshri-logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
          <div>
            <div style={{ marginBottom: '0.9rem' }}>
              <img
                src={banshriLogo}
                alt="Banshri Charitable Trust"
                style={{ height: '152px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1) drop-shadow(0 2px 10px rgba(244,197,66,0.2))' }}
              />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 260, marginBottom: '1rem' }}>Transforming lives in rural Gujarat through education, health, and empowerment since 2018.</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {[
                { icon: 'f', label: 'Facebook', color: '#1877f2' },
                { icon: '▷', label: 'YouTube', color: '#ff0000' },
                { icon: 'in', label: 'LinkedIn', color: '#0a66c2' },
                { icon: 'X', label: 'Twitter/X', color: '#ffffff' },
                { icon: '📷', label: 'Instagram', color: '#e1306c' },
              ].map(s => (
                <a key={s.label} href="#" title={s.label} style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'background 0.2s' }}>{s.icon}</a>
              ))}
            </div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>80G · 12(A) · FCRA · DARPAN Registered</p>
          </div>
          <div>
            <h4>Programs</h4>
            <ul className="footer-links">
              <li><Link to="/programs">All Programs</Link></li>
              <li><Link to="/programs/shiksha-daan">Shiksha Daan</Link></li>
              <li><Link to="/programs/shakti-abhiyan">Shakti Abhiyan</Link></li>
              <li><Link to="/programs/nirogi-gaon">Nirogi Gaon</Link></li>
              <li><Link to="/programs/harit-bharat">Harit Bharat</Link></li>
              <li><Link to="/impact">Our Impact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/csr">CSR Partnership</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/stories">Impact Stories</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/media">Media Coverage</Link></li>
              <li><Link to="/annual-reports">Annual Reports</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/transparency">Transparency</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Banshri Charitable Trust. All rights reserved. | Registered Society, Govt. of Gujarat</span>
          <span>Made with ❤️ for Gujarat</span>
        </div>
      </div>
    </footer>
  );
}
