// ============================================================
//  CheckinCard.jsx
//  Displays today's attendance status + a checkout button.
//
//  Props:
//    isCheckedIn  boolean               — current check-in state
//    onToggle     () => void            — toggle handler
//    checkInTime  string                — e.g. "08:47"
//    hoursWorked  string                — e.g. "7 ชั่วโมง 13 นาที"
// ============================================================

import React from 'react';

export default function CheckinCard({
  isCheckedIn  = true,
  onToggle,
  checkInTime  = '08:47',
  hoursWorked  = '7 ชั่วโมง 13 นาที',
}) {
  return (
    <div className="checkin-card">
      <div className="checkin-left">
        {/* Icon */}
        <div className="checkin-icon">
          <i className="ti ti-clock" aria-hidden="true"></i>
          {isCheckedIn && <div className="dot-green" aria-hidden="true"></div>}
        </div>

        {/* Text */}
        <div>
          <div className="checkin-label">สถานะวันนี้</div>
          <div className="checkin-title">
            {isCheckedIn ? 'เข้างานแล้ว' : 'ยังไม่ได้เข้างาน'}{' '}
            {isCheckedIn && <span className="checkin-badge">On-Time</span>}
          </div>
          {isCheckedIn && (
            <div className="checkin-meta">
              เข้างาน {checkInTime} น. &nbsp;·&nbsp; ทำงานมาแล้ว{' '}
              <span>{hoursWorked}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action button */}
      <button
        className="checkout-btn"
        onClick={onToggle}
        aria-label={isCheckedIn ? 'ลงเวลาออก' : 'ลงเวลาเข้า'}
      >
        <i
          className={`ti ${isCheckedIn ? 'ti-door-exit' : 'ti-door-enter'}`}
          aria-hidden="true"
        ></i>
        {isCheckedIn ? 'ลงเวลาออก' : 'ลงเวลาเข้า'}
      </button>
    </div>
  );
}