import { useNavigate, useLocation } from 'react-router-dom';

export default function StickyDonate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (pathname === '/donate') return null;
  return (
    <button className="sticky-donate" onClick={() => navigate('/donate')}>
      ❤️ Donate Now
    </button>
  );
}
