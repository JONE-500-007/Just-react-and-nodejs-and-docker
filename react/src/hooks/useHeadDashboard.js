// ============================================================
//  useHeadDashboard.js  —  Custom Hook
//  Manages state for Head/Manager dashboard:
//    - team member list + status
//    - active nav tab
//    - project metrics (derived)
//
//  Usage:
//    const { team, metrics, activeTab, setActiveTab } = useHeadDashboard()
// ============================================================

import { useState, useMemo } from 'react';

// ── Initial data (replace with API calls in production) ──────

const INITIAL_TEAM = [
  { id: 1, name: 'สวิตต์ วานิช',  initial: 'สว', role: 'UI Designer',        status: 'online',  progress: 85,  task: 'ออกแบบ Dashboard'      },
  { id: 2, name: 'อรพรรณ ใจดี',   initial: 'อร', role: 'Frontend Developer',  status: 'online',  progress: 40,  task: 'เขียน API Integration'  },
  { id: 3, name: 'ธนพล มั่นคง',   initial: 'ธน', role: 'Backend Developer',   status: 'away',    progress: 10,  task: 'Setup Database'         },
  { id: 4, name: 'จิราพร สมบัติ', initial: 'จร', role: 'QA Engineer',         status: 'offline', progress: 100, task: 'Testing Auth Flow'      },
];

const INITIAL_ACTIVITY = [
  { id: 1, type: 'upload',  actor: 'สวิตต์',  message: 'อัปโหลดไฟล์',  highlight: 'Design-v2.fig',              time: '10 นาทีที่แล้ว' },
  { id: 2, type: 'warning', actor: 'ระบบ',    message: 'ตรวจพบงานเกินกำหนด', highlight: '2 รายการ',             time: '1 ชม. ที่แล้ว'   },
  { id: 3, type: 'done',    actor: 'จิราพร',  message: 'ปิดงาน',        highlight: 'Testing Auth Flow เรียบร้อย', time: '2 ชม. ที่แล้ว'   },
];

// ── Nav items ─────────────────────────────────────────────────
export const HEAD_NAV_ITEMS = [
  { name: 'ภาพรวมทีม',        icon: 'chart-bar'    },
  { name: 'สมาชิกและภาระงาน', icon: 'users'         },
  { name: 'ผลการทำงาน',       icon: 'trending-up'  },
  { name: 'แผนงานโครงการ',    icon: 'calendar'     },
];

export const HEAD_BOTTOM_NAV = [
  { name: 'ภาพรวม',  icon: 'chart-bar'   },
  { name: 'ทีม',     icon: 'users'        },
  { name: 'ผลงาน',   icon: 'trending-up' },
  { name: 'แผนงาน',  icon: 'calendar'    },
  { name: 'โปรไฟล์', icon: 'user'         },
];

// ── Hook ──────────────────────────────────────────────────────
export function useHeadDashboard() {
  const [team]       = useState(INITIAL_TEAM);
  const [activity]   = useState(INITIAL_ACTIVITY);
  const [activeTab, setActiveTab] = useState('ภาพรวมทีม');

  // Derived project metrics
  const metrics = useMemo(() => {
    const totalTasks   = 32;
    const doneTasks    = 24;
    const inProgTasks  = 12;
    const overdueTasks = 3;
    const healthPct    = Math.round((doneTasks / totalTasks) * 100);

    return {
      done:    doneTasks,
      total:   totalTasks,
      inProg:  inProgTasks,
      overdue: overdueTasks,
      health:  healthPct,       // % for the circle chart
      onPlan:  18,              // tasks on schedule
      delayed: 2,               // tasks delayed
    };
  }, []);

  // Progress bar colour logic
  const progressColor = (pct) => {
    if (pct >= 80) return 'var(--green)';
    if (pct >= 40) return 'var(--blue)';
    return 'var(--amber)';
  };

  return {
    team,
    activity,
    metrics,
    activeTab,
    setActiveTab,
    progressColor,
  };
}