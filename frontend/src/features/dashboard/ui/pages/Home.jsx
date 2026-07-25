import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  FileText,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  CalendarDays,
  CheckCircle2,
  Clock,
} from "lucide-react";

/* ---------- Animated counter ---------- */
const useCountUp = (target, duration = 900) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(target * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
};

/* ---------- Stat card ---------- */
const StatCard = ({ icon: Icon, label, value, delta, up = true, tint }) => {
  const n = useCountUp(value);
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="ts-card p-5 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl grid place-items-center"
          style={{ background: tint || "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary-600)" }}
        >
          <Icon size={20} />
        </div>
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            background: up ? "color-mix(in oklab, var(--success) 15%, transparent)" : "color-mix(in oklab, var(--danger) 15%, transparent)",
            color: up ? "var(--success)" : "var(--danger)",
          }}
        >
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta}
        </span>
      </div>
      <div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
        <h3 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
          {n.toLocaleString()}
        </h3>
      </div>
    </motion.div>
  );
};

/* ---------- Mini bar chart (SVG, no deps) ---------- */
const AttendanceChart = () => {
  const data = [72, 84, 68, 92, 88, 76, 95, 82, 90, 78, 86, 94];
  const max = Math.max(...data);
  return (
    <div className="ts-card p-6 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Attendance overview
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last 12 weeks
          </p>
        </div>
        <button className="ts-btn-ghost text-sm">Export</button>
      </div>
      <div className="flex items-end gap-2 sm:gap-3 h-48">
        {data.map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(v / max) * 100}%`, opacity: 1 }}
            transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
            className="flex-1 rounded-t-lg"
            style={{
              background: "var(--grad-primary)",
              minHeight: 4,
              boxShadow: "0 6px 20px -8px color-mix(in oklab, var(--primary) 60%, transparent)",
            }}
            title={`${v}%`}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------- Activity feed ---------- */
const activities = [
  { name: "Aarav Sharma", action: "checked in", time: "2m ago", tint: "var(--success)" },
  { name: "HR Team", action: "approved 3 leave requests", time: "24m ago", tint: "var(--primary)" },
  { name: "Priya Nair", action: "uploaded 'Q4-report.pdf'", time: "1h ago", tint: "var(--info)" },
  { name: "Kabir Roy", action: "completed onboarding", time: "3h ago", tint: "var(--secondary)" },
];

const RecentActivity = () => (
  <div className="ts-card p-6">
    <h3 className="text-lg font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
      Recent activity
    </h3>
    <ul className="flex flex-col gap-4">
      {activities.map((a, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-start gap-3"
        >
          <span
            className="w-9 h-9 rounded-full grid place-items-center text-xs font-bold text-white shrink-0"
            style={{ background: a.tint }}
          >
            {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              <span className="font-semibold">{a.name}</span>{" "}
              <span style={{ color: "var(--text-muted)" }}>{a.action}</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{a.time}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  </div>
);

/* ---------- Tasks ---------- */
const tasks = [
  { title: "Review Q4 payroll batch", due: "Today", priority: "high" },
  { title: "Sign contract – Kabir Roy", due: "Tomorrow", priority: "med" },
  { title: "Publish HR handbook v3.2", due: "Fri", priority: "low" },
];

const PendingTasks = () => (
  <div className="ts-card p-6">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
        Pending tasks
      </h3>
      <button className="text-sm font-medium" style={{ color: "var(--primary-600)" }}>
        View all
      </button>
    </div>
    <ul className="flex flex-col gap-3">
      {tasks.map((t, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-3 p-3 rounded-xl transition-colors"
          style={{ background: "var(--bg-subtle)" }}
        >
          <span
            className="w-8 h-8 grid place-items-center rounded-lg shrink-0"
            style={{
              background:
                t.priority === "high"
                  ? "color-mix(in oklab, var(--danger) 18%, transparent)"
                  : t.priority === "med"
                  ? "color-mix(in oklab, var(--warning) 20%, transparent)"
                  : "color-mix(in oklab, var(--success) 18%, transparent)",
              color:
                t.priority === "high"
                  ? "var(--danger)"
                  : t.priority === "med"
                  ? "var(--warning)"
                  : "var(--success)",
            }}
          >
            {t.priority === "high" ? <Clock size={16} /> : <CheckCircle2 size={16} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {t.title}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Due {t.due}</p>
          </div>
          <ArrowUpRight size={16} style={{ color: "var(--text-muted)" }} />
        </motion.li>
      ))}
    </ul>
  </div>
);

/* ---------- Quick actions ---------- */
const quickActions = [
  { icon: Plus, label: "Add employee" },
  { icon: Building2, label: "New department" },
  { icon: FileText, label: "Upload doc" },
  { icon: CalendarDays, label: "Schedule" },
];

const QuickActions = () => (
  <div className="ts-card p-6">
    <h3 className="text-lg font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Quick actions</h3>
    <div className="grid grid-cols-2 gap-3">
      {quickActions.map((q, i) => (
        <motion.button
          key={i}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex flex-col items-start gap-2 p-4 rounded-xl border transition-colors text-left"
          style={{ borderColor: "var(--border-color)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
        >
          <span
            className="w-9 h-9 grid place-items-center rounded-lg"
            style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary-600)" }}
          >
            <q.icon size={18} />
          </span>
          <span className="text-sm font-medium">{q.label}</span>
        </motion.button>
      ))}
    </div>
  </div>
);

/* ---------- Page ---------- */
const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        style={{ background: "var(--grad-cover)", color: "#fff", boxShadow: "var(--shadow-lg)" }}
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-white/80 text-sm">Welcome back 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">Here's what's happening today</h1>
            <p className="text-white/80 text-sm mt-2 max-w-lg">
              You have 3 pending approvals, 12 check-ins this morning, and 2 documents awaiting review.
            </p>
          </div>
          <button className="bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2.5 rounded-xl font-medium text-sm border border-white/20 transition">
            View reports
          </button>
        </div>
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total employees" value={248} delta="+12%" up />
        <StatCard icon={Building2} label="Departments" value={14} delta="+2" up tint="color-mix(in oklab, var(--secondary) 15%, transparent)" />
        <StatCard icon={ClipboardList} label="Open tasks" value={37} delta="-4%" up={false} tint="color-mix(in oklab, var(--warning) 20%, transparent)" />
        <StatCard icon={FileText} label="Documents" value={1284} delta="+8%" up tint="color-mix(in oklab, var(--success) 18%, transparent)" />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AttendanceChart />
        <QuickActions />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <PendingTasks />
      </div>
    </div>
  );
};

export default Home;
