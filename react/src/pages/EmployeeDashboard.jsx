import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  Users, 
  User, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ChevronDown,
  AlertCircle,
  Circle,
  HelpCircle,
  LogOut,
  Search,
  Check
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('หน้าหลัก');
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // ข้อมูลจำลองสำหรับงาน
  const [tasks, setTasks] = useState([
    { id: 1, name: "ออกแบบ UI หน้า Login", due: "3 พ.ค.", status: "prog", priority: "สำคัญ" },
    { id: 2, name: "เขียน unit test ระบบ auth", due: "1 พ.ค.", status: "overdue", priority: "สำคัญ" },
    { id: 3, name: "เขียน component สำหรับ form validation", due: "6 พ.ค.", status: "prog", priority: "ปานกลาง" },
    { id: 4, name: "ทำ wireframe หน้า Register", due: "เสร็จแล้ว", status: "done", priority: "ทั่วไป" },
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'prog' : 'done' } : t));
  };

  const navItems = [
    { name: 'หน้าหลัก', icon: <LayoutDashboard size={18} /> },
    { name: 'งานของฉัน', icon: <ClipboardList size={18} /> },
    { name: 'ตารางงาน', icon: <Calendar size={18} /> },
    { name: 'ทีมของฉัน', icon: <Users size={18} /> },
    { name: 'โปรไฟล์', icon: <User size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0F1117] text-slate-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#161B26] border-right border-white/5 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black text-white tracking-tighter">WorkSpace</span>
            <span className="text-slate-600 font-light">|</span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Pro</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Employee Portal v2.4</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 mb-3">Main Menu</p>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.name 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* HELP BOX */}
        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <HelpCircle size={16} />
              <span className="text-[12px] font-bold">ต้องการความช่วยเหลือ?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              ติดต่อฝ่าย IT หรือ HR ได้ผ่านระบบ Ticket เพื่อความรวดเร็ว
            </p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-bold transition-colors">
              เปิด Ticket ใหม่
            </button>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-4 mt-4 text-slate-500 hover:text-rose-400 transition-colors border-t border-white/5">
            <LogOut size={18} />
            <span className="text-sm font-semibold">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0F1117]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="ค้นหางาน, เอกสาร หรือเพื่อนร่วมงาน..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-[#0F1117]">2</span>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold text-white">อรพรรณ พาหุรัตน์</p>
                <p className="text-[11px] text-slate-500">UX/UI Designer</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-600/20">
                อป
              </div>
              <ChevronDown size={16} className="text-slate-500" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* WELCOME SECTION */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-black text-white mb-1">สวัสดีตอนเช้า, อรพรรณ 👋</h1>
              <p className="text-slate-500 text-sm italic">"ขอให้วันนี้เป็นวันที่ดีและสนุกกับการทำงานนะคะ"</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-300">วันพฤหัสบดีที่ 30 เมษายน 2569</p>
              <p className="text-xs text-slate-500">สัปดาห์ที่ 17 ของปี</p>
            </div>
          </div>

          {/* CHECK-IN BAR */}
          <div className="bg-[#161B26] border border-white/5 rounded-[28px] p-6 mb-8 flex items-center justify-between shadow-xl shadow-black/20">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 relative">
                <Clock size={28} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#161B26]"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-white">เข้างานแล้ว</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">On-Time</span>
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-slate-300 italic">Check-in: 08:53 น.</span> — วันนี้คุณทำงานมาแล้ว <span className="text-blue-400 font-bold">5 ชม. 24 นาที</span>
                </p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white/5 hover:bg-rose-500 hover:text-white border border-white/10 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2">
              <LogOut size={16} />
              Check-out
            </button>
          </div>

          {/* METRICS GRID */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#161B26] p-6 rounded-[28px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ClipboardList size={64} />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">งานที่ต้องทำวันนี้</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">05</span>
                <span className="text-xs text-emerald-500 font-bold mb-1.5 flex items-center gap-1">
                  <CheckCircle2 size={12} /> +2 ใหม่
                </span>
              </div>
            </div>
            
            <div className="bg-[#161B26] p-6 rounded-[28px] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={64} />
              </div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">เสร็จสัปดาห์นี้</p>
                <p className="text-[10px] font-medium text-slate-600 bg-white/5 px-2 py-0.5 rounded-md">26 เม.ย. - 2 พ.ค.</p>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">12</span>
                <span className="text-xs text-blue-400 font-bold mb-1.5">บรรลุเป้าหมาย 80%</span>
              </div>
            </div>

            <div className="bg-[#161B26] p-6 rounded-[28px] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock size={64} />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">เวลาทำงานสะสม</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">142</span>
                <span className="text-sm font-bold text-slate-400 mb-1.5">ชั่วโมง / เดือน</span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT: TASK LIST */}
            <div className="col-span-8 bg-[#161B26] rounded-[32px] border border-white/5 p-8 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <ClipboardList size={20} />
                  </div>
                  <h2 className="text-xl font-black text-white">งานที่ได้รับมอบหมาย</h2>
                </div>
                <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">ดูทั้งหมด</button>
              </div>

              <div className="space-y-3">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className="group flex items-center gap-5 p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-all cursor-pointer"
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-700 group-hover:border-blue-500'
                    }`}>
                      {task.status === 'done' && <Check size={14} className="text-white" strokeWidth={4} />}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-bold text-[15px] transition-all ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                        {task.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${task.status === 'overdue' ? 'text-rose-400' : 'text-slate-500'}`}>
                          กำหนดส่ง: {task.due}
                        </span>
                        {task.priority && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                            task.priority === 'สำคัญ' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500">
                          <ChevronDown size={18} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: TEAM & ALERTS */}
            <div className="col-span-4 space-y-8">
              
              {/* TEAM MEMBERS */}
              <div className="bg-[#161B26] rounded-[32px] border border-white/5 p-8 shadow-xl shadow-black/10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                    <Users size={20} />
                  </div>
                  <h2 className="text-xl font-black text-white">เพื่อนร่วมทีม</h2>
                </div>
                
                <div className="space-y-6">
                  {[
                    { name: 'สวิตต์ วานิช', role: 'Senior Dev', initial: 'สว', online: true },
                    { name: 'กิตติยา ใจดี', role: 'Project Manager', initial: 'กจ', online: true },
                    { name: 'ธนภูมิ สุขุม', role: 'Backend Dev', initial: 'ธส', online: false },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-slate-300">
                          {member.initial}
                        </div>
                        {member.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-4 border-[#161B26] rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-bold text-white">{member.name}</p>
                        <p className="text-[11px] text-slate-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ALERT NOTICE */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-[32px] p-8 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 text-amber-500/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <AlertCircle size={120} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle size={20} className="text-amber-500" />
                  <span className="text-xs font-black text-amber-500 uppercase tracking-widest">แจ้งเตือนสำคัญ</span>
                </div>
                <p className="text-sm text-amber-200/80 leading-relaxed font-medium">
                  งาน <span className="text-amber-400 font-bold underline underline-offset-4">Unit Test</span> เกินกำหนดแล้ว กรุณาอัปเดตความคืบหน้าให้หัวหน้าทีมทราบภายในวันนี้ด้วยค่ะ
                </p>
                <button className="mt-6 w-full py-3 bg-amber-500 text-amber-950 rounded-2xl font-black text-[12px] hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                  รับทราบและอัปเดตงาน
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  );
};

export default App;