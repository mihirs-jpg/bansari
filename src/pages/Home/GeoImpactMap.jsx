import { useState, useMemo, useEffect, useRef } from 'react';
import { districtImpact, impactMapTotals } from '../../constants/data';
import CountUp from '../../components/common/CountUp';

/* ── Icons ── */
const IconVillage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconSchool = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconFarmer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M12 2a3 3 0 100 6 3 3 0 000-6z"/>
    <path d="M17 22v-2a4 4 0 00-4-4H11a4 4 0 00-4 4v2"/>
    <path d="M3 8c0 4 3 7 5 8M21 8c0 4-3 7-5 8"/>
  </svg>
);
const IconMedical = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const METRICS = [
  { key: 'villages',     label: 'Villages',  Icon: IconVillage, color: '#005B9A' },
  { key: 'schools',      label: 'Schools',   Icon: IconSchool,  color: '#00A7A7' },
  { key: 'farmers',      label: 'Farmers',   Icon: IconFarmer,  color: '#F4C542' },
  { key: 'medicalCamps', label: 'Med Camps', Icon: IconMedical, color: '#00B894' },
];

const TOTALS = [
  { key: 'villages',     Icon: IconVillage, label: 'Villages Covered',  color: '#005B9A' },
  { key: 'schools',      Icon: IconSchool,  label: 'Schools Supported', color: '#00A7A7' },
  { key: 'farmers',      Icon: IconFarmer,  label: 'Farmers Helped',    color: '#F4C542' },
  { key: 'medicalCamps', Icon: IconMedical, label: 'Medical Camps',     color: '#00B894' },
];

export default function GeoImpactMap() {
  const [activeMetric, setActiveMetric] = useState('villages');
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const pulseRef = useRef({});

  const maxValue = useMemo(
    () => Math.max(...districtImpact.map((d) => d[activeMetric])),
    [activeMetric]
  );

  const hovered = districtImpact.find((d) => d.id === activeDistrict) || null;
  const activeMetricObj = METRICS.find(m => m.key === activeMetric);

  const handleMetricChange = (key) => {
    setActiveMetric(key);
    setAnimKey(k => k + 1);
  };

  return (
    <div className="geo-wrap">

      {/* ── Metric tabs ── */}
      <div className="geo-tabs">
        {METRICS.map(({ key, label, Icon, color }) => (
          <button
            key={key}
            className={`geo-tab ${activeMetric === key ? 'active' : ''}`}
            style={{ '--tab-color': color }}
            onClick={() => handleMetricChange(key)}
          >
            <span className="geo-tab-icon" style={{ color: activeMetric === key ? '#fff' : color }}><Icon /></span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="geo-grid">

        {/* MAP PANEL */}
        <div className="geo-map-panel">
          {/* Header */}
          <div className="geo-map-header">
            <div className="geo-map-title">
              <span className="geo-map-dot" style={{ background: activeMetricObj?.color }} />
              Gujarat Impact Map
            </div>
            <div className="geo-map-legend">
              <span className="geo-legend-sm" style={{ background: activeMetricObj?.color + '33', color: activeMetricObj?.color }}>Low</span>
              <div className="geo-legend-bar" style={{ background: `linear-gradient(90deg, ${activeMetricObj?.color}33, ${activeMetricObj?.color})` }} />
              <span className="geo-legend-sm" style={{ background: activeMetricObj?.color + '33', color: activeMetricObj?.color }}>High</span>
            </div>
          </div>

          {/* SVG Map */}
          <div className="geo-svg-wrap">
            <svg viewBox="0 0 100 75" className="geo-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,91,154,0.12)" />
                  <stop offset="100%" stopColor="rgba(0,91,154,0.03)" />
                </radialGradient>
                <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.3" />
                </filter>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Gujarat outline — more detailed */}
              <path
                className="geo-outline"
                d="
                  M 22,36
                  C 20,30 21,24 25,20
                  C 28,15 33,12 38,11
                  C 42,9  47,8  52,9
                  C 56,7  61,8  65,11
                  C 69,9  74,11 77,16
                  C 81,17 84,21 83,27
                  C 87,30 87,36 84,41
                  C 86,45 85,51 81,55
                  C 82,60 78,64 73,63
                  C 70,67 64,68 59,65
                  C 55,68 49,68 44,64
                  C 39,66 33,64 30,59
                  C 25,59 20,55 20,49
                  C 15,48 14,42 18,38
                  Z
                "
                fill="url(#mapGlow)"
                stroke="rgba(0,91,154,0.25)"
                strokeWidth="0.5"
              />

              {/* Inner texture lines */}
              <path d="M30,25 Q50,35 72,30" stroke="rgba(0,91,154,0.06)" strokeWidth="0.4" fill="none" />
              <path d="M25,40 Q50,45 78,42" stroke="rgba(0,91,154,0.06)" strokeWidth="0.4" fill="none" />
              <path d="M28,55 Q52,55 75,52" stroke="rgba(0,91,154,0.06)" strokeWidth="0.4" fill="none" />

              {/* Network lines from center */}
              {districtImpact.map((d) => (
                <line
                  key={`nl-${d.id}`}
                  x1="50" y1="37"
                  x2={d.x} y2={d.y}
                  stroke={d.color}
                  strokeWidth="0.25"
                  strokeDasharray="1 2"
                  opacity="0.3"
                  className="geo-net-line"
                />
              ))}

              {/* Central hub */}
              <circle cx="50" cy="37" r="1.8" fill="rgba(0,91,154,0.15)" stroke="rgba(0,91,154,0.4)" strokeWidth="0.4" />
              <circle cx="50" cy="37" r="0.7" fill="var(--blue, #005B9A)" />

              {/* District pins */}
              {districtImpact.map((d) => {
                const intensity = d[activeMetric] / maxValue;
                const r = 1.8 + intensity * 3.2;
                const isActive = activeDistrict === d.id;
                return (
                  <g
                    key={d.id}
                    className={`geo-pin ${isActive ? 'pin-active' : ''}`}
                    onMouseEnter={() => setActiveDistrict(d.id)}
                    onMouseLeave={() => setActiveDistrict(null)}
                    onClick={() => setActiveDistrict(d.id === activeDistrict ? null : d.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring */}
                    <circle
                      cx={d.x} cy={d.y}
                      r={r + 3}
                      fill={d.color}
                      opacity={isActive ? 0.2 : 0.1}
                      className="pin-pulse-ring"
                    />
                    {/* Outer ring */}
                    <circle
                      cx={d.x} cy={d.y}
                      r={r + 1}
                      fill={d.color}
                      opacity={isActive ? 0.35 : 0.15}
                    />
                    {/* Main pin */}
                    <circle
                      cx={d.x} cy={d.y}
                      r={r}
                      fill={d.color}
                      opacity={isActive ? 1 : 0.85}
                      stroke="white"
                      strokeWidth={isActive ? 0.7 : 0.4}
                      filter="url(#pinShadow)"
                      style={{ transition: 'r 0.3s ease, opacity 0.2s' }}
                    />
                    {/* Label */}
                    <text
                      x={d.x}
                      y={d.y - r - 2}
                      textAnchor="middle"
                      className="geo-label"
                      fontSize="2.8"
                      fill={isActive ? d.color : 'rgba(0,31,63,0.75)'}
                      fontWeight={isActive ? '700' : '500'}
                      style={{ transition: 'fill 0.2s, font-weight 0.2s' }}
                    >
                      {d.name}
                    </text>
                    {/* Value label when active */}
                    {isActive && (
                      <text
                        x={d.x}
                        y={d.y + 0.5}
                        textAnchor="middle"
                        fontSize="2.2"
                        fill="white"
                        fontWeight="800"
                      >
                        {d[activeMetric].toLocaleString()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating tooltip */}
            <div className={`geo-tooltip ${hovered ? 'visible' : ''}`}>
              {hovered ? (
                <>
                  <div className="geo-tooltip-header" style={{ borderColor: hovered.color }}>
                    <span className="geo-tooltip-dot" style={{ background: hovered.color }} />
                    <strong>{hovered.name} District</strong>
                  </div>
                  <div className="geo-tooltip-grid">
                    {TOTALS.map(({ key, Icon, label, color }) => (
                      <div key={key} className={`geo-tooltip-item ${activeMetric === key ? 'highlighted' : ''}`} style={{ '--hi': color }}>
                        <span className="geo-tooltip-icon" style={{ color }}><Icon /></span>
                        <span className="geo-tooltip-val">{hovered[key].toLocaleString()}</span>
                        <span className="geo-tooltip-lbl">{label}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="geo-tooltip-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                  Hover a district to explore
                </div>
              )}
            </div>
          </div>

          {/* District chips */}
          <div className="geo-chips">
            {districtImpact.map((d) => (
              <button
                key={d.id}
                className={`geo-chip ${activeDistrict === d.id ? 'active' : ''}`}
                style={{ '--c': d.color }}
                onMouseEnter={() => setActiveDistrict(d.id)}
                onMouseLeave={() => setActiveDistrict(null)}
                onClick={() => setActiveDistrict(d.id === activeDistrict ? null : d.id)}
              >
                <span className="geo-chip-dot" style={{ background: d.color }} />
                <span className="geo-chip-name">{d.name}</span>
                <span className="geo-chip-val" style={{ color: d.color }}>{d[activeMetric].toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STATS PANEL */}
        <div className="geo-stats-panel">
          <div className="geo-stats-heading">Total Impact</div>
          <div className="geo-stats-subhead">Across 8 districts of Gujarat</div>

          <div className="geo-stats-cards">
            {TOTALS.map(({ key, Icon, label, color }) => (
              <div
                key={key}
                className={`geo-stat-card ${activeMetric === key ? 'active' : ''}`}
                style={{ '--sc': color }}
                onClick={() => handleMetricChange(key)}
              >
                <div className="geo-stat-icon-wrap" style={{ background: color + '18', border: `1.5px solid ${color}30` }}>
                  <span style={{ color }}><Icon /></span>
                </div>
                <div className="geo-stat-body">
                  <div className="geo-stat-num" style={{ color }}>
                    <CountUp key={animKey + key} target={impactMapTotals[key]} />+
                  </div>
                  <div className="geo-stat-lbl">{label}</div>
                </div>
                <div className="geo-stat-bar-wrap">
                  <div
                    className="geo-stat-bar"
                    style={{ background: color, width: `${(impactMapTotals[key] / 7020) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* District rank */}
          <div className="geo-rank-section">
            <div className="geo-rank-label">
              <span className="geo-rank-icon" style={{ color: activeMetricObj?.color }}><activeMetricObj.Icon /></span>
              Top Districts · {activeMetricObj?.label}
            </div>
            <div className="geo-rank-list">
              {[...districtImpact]
                .sort((a, b) => b[activeMetric] - a[activeMetric])
                .slice(0, 4)
                .map((d, i) => (
                  <div key={d.id} className="geo-rank-item">
                    <span className="geo-rank-pos" style={{ color: activeMetricObj?.color }}>#{i + 1}</span>
                    <span className="geo-rank-name">{d.name}</span>
                    <div className="geo-rank-bar-wrap">
                      <div
                        className="geo-rank-bar"
                        style={{
                          background: d.color,
                          width: `${(d[activeMetric] / districtImpact[0][activeMetric]) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="geo-rank-val" style={{ color: d.color }}>{d[activeMetric].toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
