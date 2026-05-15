// ============================================================
//  ProjectHealthCard.jsx
//  Displays project health as an SVG circular progress chart.
//
//  Props:
//    pct      number   — completion percentage (0-100)
//    onPlan   number   — tasks on schedule count
//    delayed  number   — delayed tasks count
// ============================================================

import React from 'react';

export default function ProjectHealthCard({ pct = 78, onPlan = 18, delayed = 2 }) {
  // Circle math
  const r            = 54;                           // radius
  const circumference = 2 * Math.PI * r;             // ~339.3
  const dashOffset   = circumference * (1 - pct / 100);

  return (
    <div className="h-panel">
      <div className="h-panel-header">
        <div className="h-panel-title-wrap">
          <div className="h-panel-icon" style={{ background: 'var(--blue-dim)' }}>
            <i className="ti ti-chart-pie" style={{ color: 'var(--blue)' }} aria-hidden="true"></i>
          </div>
          <div className="h-panel-title">สุขภาพโครงการ</div>
        </div>
      </div>

      <div className="h-health-wrap">
        <svg
          className="h-circle-svg"
          width="130"
          height="130"
          viewBox="0 0 130 130"
          aria-label={`สุขภาพโครงการ ${pct}%`}
          role="img"
        >
          {/* Track */}
          <circle
            cx="65" cy="65" r={r}
            fill="none"
            stroke="rgba(79,126,255,0.1)"
            strokeWidth="12"
          />
          {/* Fill */}
          <circle
            cx="65" cy="65" r={r}
            fill="none"
            stroke="var(--indigo)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
          />
          {/* Labels */}
          <text className="h-health-pct" x="65" y="61">{pct}%</text>
          <text className="h-health-label" x="65" y="77">เสร็จสิ้น</text>
        </svg>

        <div className="h-health-stats">
          <div className="h-hstat">
            <div className="h-hstat-dot" style={{ background: 'var(--indigo)' }}></div>
            ในแผน: {onPlan}
          </div>
          <div className="h-hstat">
            <div className="h-hstat-dot" style={{ background: 'var(--red)' }}></div>
            ล่าช้า: {delayed}
          </div>
        </div>
      </div>
    </div>
  );
}