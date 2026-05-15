// ============================================================
//  useDashboard.js  —  Custom Hook
//  Manages all dashboard state: tasks, team, active tab,
//  check-in status, and derived stats.
//  Usage: const { tasks, toggleTask, stats, ... } = useDashboard()
// ============================================================

import { useState, useMemo } from 'react';

// ── Initial data (replace with API calls in production) ──────

const INITIAL_TASKS = [
  { id: 1, name: 'ออกแบบ UI หน้า Login',                    due: '3 พ.ค.',    status: 'prog',    priority: 'สำคัญ'   },
  { id: 2, name: 'เขียน unit test ระบบ auth',               due: '1 พ.ค.',    status: 'overdue', priority: 'สำคัญ'   },
  { id: 3, name: 'เขียน component สำหรับ form validation',  due: '6 พ.ค.',    status: 'prog',    priority: 'ปานกลาง' },
  { id: 4, name: 'ทำ wireframe หน้า Register',              due: 'เสร็จแล้ว', status: 'done',    priority: 'ทั่วไป'  },
];

const INITIAL_TEAM = [
  { id: 1, name: 'สวิตต์ วานิช',  role: 'Senior Dev',      initial: 'สว', online: true  },
  { id: 2, name: 'กิตติยา ใจดี',  role: 'Project Manager', initial: 'กจ', online: true  },
  { id: 3, name: 'ธนภูมิ สุขุม',  role: 'Backend Dev',     initial: 'ธส', online: false },
];

// ── Nav items definition ─────────────────────────────────────
export const NAV_ITEMS = [
  { name: 'หน้าหลัก',  icon: 'layout-dashboard' },
  { name: 'งานของฉัน', icon: 'clipboard-list'    },
  { name: 'ตารางงาน',  icon: 'calendar'          },
  { name: 'ทีมของฉัน', icon: 'users'             },
  { name: 'โปรไฟล์',   icon: 'user'              },
];

// ── Hook ─────────────────────────────────────────────────────
export function useDashboard() {
  const [tasks,       setTasks]       = useState(INITIAL_TASKS);
  const [team]                        = useState(INITIAL_TEAM);
  const [activeTab,   setActiveTab]   = useState('หน้าหลัก');
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // Toggle task between done ↔ prog
  // TODO: call PUT /api/tasks/:id here before updating state
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'done' ? 'prog' : 'done' }
          : t
      )
    );
  };

  // Toggle check-in state
  // TODO: call POST /api/attendance here before updating state
  const toggleCheckIn = () => setIsCheckedIn(prev => !prev);

  // Derived stats (memoised so they don't recompute every render)
  const stats = useMemo(() => ({
    total:   tasks.length,
    done:    tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
    inProg:  tasks.filter(t => t.status === 'prog').length,
  }), [tasks]);

  return {
    tasks,
    team,
    activeTab,
    setActiveTab,
    isCheckedIn,
    toggleCheckIn,
    toggleTask,
    stats,
  };
}