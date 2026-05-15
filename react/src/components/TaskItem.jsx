// ============================================================
//  TaskItem.jsx
//  Single task row. Clicking toggles done ↔ in-progress.
//
//  Props:
//    task      { id, name, due, status, priority }
//    onToggle  (id: number) => void
//
//  Status values:  'done' | 'prog' | 'overdue'
//  Priority values: 'สำคัญ' | 'ปานกลาง' | 'ทั่วไป'
// ============================================================

import React from 'react';

// ── Helpers ──────────────────────────────────────────────────

function StatusTag({ status }) {
  const map = {
    done:    { cls: 'tag-done', label: 'เสร็จสิ้น' },
    overdue: { cls: 'tag-over', label: 'เกินกำหนด' },
    prog:    { cls: 'tag-prog', label: 'กำลังทำ'   },
  };
  const { cls, label } = map[status] ?? map.prog;
  return <span className={`tag ${cls}`}>{label}</span>;
}

function PriorityTag({ priority }) {
  if (!priority || priority === 'ทั่วไป') return null;
  const cls = priority === 'สำคัญ' ? 'tag-pri-hi' : 'tag-pri-mid';
  return <span className={`tag ${cls}`}>{priority}</span>;
}

// ── Component ─────────────────────────────────────────────────

export default function TaskItem({ task, onToggle }) {
  const isDone = task.status === 'done';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(task.id);
    }
  };

  return (
    <div
      className="task-item"
      onClick={() => onToggle(task.id)}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isDone}
      tabIndex={0}
    >
      {/* Checkbox */}
      <div className={`task-check ${isDone ? 'done' : ''}`} aria-hidden="true">
        {isDone && <i className="ti ti-check"></i>}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className={`task-name ${isDone ? 'done' : ''}`}>{task.name}</div>
        <div className="task-meta">
          <span className="tag tag-due">ส่ง {task.due}</span>
          <StatusTag status={task.status} />
          <PriorityTag priority={task.priority} />
        </div>
      </div>
    </div>
  );
}