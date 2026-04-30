import React, { useState } from "react";

export default function TaskItem({ task }) {
  // สร้าง State ภายในเพื่อรองรับการกด Toggle
  const [isDone, setIsDone] = useState(task.status === "done");

  const toggle = () => {
    setIsDone(!isDone);
    // ที่นี่คุณสามารถเพิ่มการเรียก API ไปยัง Node.js เพื่ออัปเดต DB ได้
  };

  return (
    <div className="task-row" onClick={toggle}>
      {/* ส่วนของวงกลม Checkbox */}
      <div className={`tcheck ${isDone ? 'done' : ''}`}>
        {isDone && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>

      <div className="tinfo">
        {/* ชื่อดีไซน์จะถูกขีดฆ่าถ้าเสร็จแล้ว */}
        <div className={`tname ${isDone ? "done" : ""}`}>
          {task.name}
        </div>

        <div className="tmeta">
          <span className="ttag" style={{background: 'rgba(255,255,255,0.05)', color: '#94A3B8'}}>
            ส่ง {task.due}
          </span>

          <span className={`ttag ${isDone ? "done" : "prog"}`}>
            {isDone ? "เสร็จสิ้น" : "กำลังทำ"}
          </span>
          
          {task.priority && (
             <span className="ttag" style={{background: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E'}}>
              {task.priority}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}