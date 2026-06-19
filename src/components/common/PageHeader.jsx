import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle, crumb }) {
  const navigate = useNavigate();
  return (
    <div className="page-header">
      <div className="container">
        {crumb && (
          <div className="breadcrumb">
            <span onClick={() => navigate('/')} style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Home</span>
            <span className="sep">/</span>
            <span className="cur">{crumb || title}</span>
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
