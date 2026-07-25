import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  LogIn,
  LogOut,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

const history = [
  { date: "Jul 24, Fri", in: "09:02", out: "18:10", hours: "9h 08m", status: "Present" },
  { date: "Jul 23, Thu", in: "09:31", out: "18:05", hours: "8h 34m", status: "Late" },
  { date: "Jul 22, Wed", in: "08:58", out: "18:00", hours: "9h 02m", status: "Present" },
  { date: "Jul 21, Tue", in: "—", out: "—", hours: "—", status: "Absent" },
  { date: "Jul 20, Mon", in: "09:00", out: "17:58", hours: "8h 58m", status: "Present" },
];

const statusStyle = (s) => {
  if (s === "Present")
    return { bg: "color-mix(in oklab, var(--success) 18%, transparent)", fg: "var(--success)", icon: CheckCircle2 };
  if (s === "Late")
    return { bg: "color-mix(in oklab, var(--warning) 20%, transparent)", fg: "var(--warning)", icon: AlertCircle };
  return { bg: "color-mix(in oklab, var(--danger) 18%, transparent)", fg: "var(--danger)", icon: XCircle };
};

const pad = (n) => String(n).padStart(2, "0");

const Attendance = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!clockedIn || !startedAt) return;
    const t = setInterval(() => setElapsed(Date.now() - startedAt), 1000);
    return () => clearInterval(t);
  }, [clockedIn, startedAt]);

  const toggle = () => {
    if (clockedIn) {
      setClockedIn(false);
      setStartedAt(null);
      setElapsed(0);
    } else {
      setClockedIn(true);
      setStartedAt(Date.now());
    }
  };

  const fmt = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Attendance
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {now.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className="text-sm px-3 py-1.5 rounded-lg font-mono"
          style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
        >
          {now.toLocaleTimeString()}
        </div>
      </div>

      {/* Clock + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="ts-card p-6 lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center"
              style={{
                background: "color-mix(in oklab, var(--primary) 15%, transparent)",
                color: "var(--primary-600)",
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Current session
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {clockedIn && startedAt
                  ? `Started at ${new Date(startedAt).toLocaleTimeString()}`
                  : "You are not clocked in"}
              </p>
            </div>
          </div>

          <p
            className="font-mono text-5xl sm:text-6xl font-bold tabular-nums tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {clockedIn ? fmt(elapsed) : "00:00:00"}
          </p>

          <div>
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{
                background: clockedIn ? "var(--danger)" : "var(--grad-primary)",
                boxShadow: clockedIn
                  ? "0 8px 20px -8px color-mix(in oklab, var(--danger) 60%, transparent)"
                  : "0 8px 20px -8px color-mix(in oklab, var(--primary) 60%, transparent)",
              }}
            >
              {clockedIn ? <LogOut size={16} /> : <LogIn size={16} />}
              {clockedIn ? "Clock Out" : "Clock In"}
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div whileHover={{ y: -2 }} className="ts-card p-5 flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center"
              style={{
                background: "color-mix(in oklab, var(--info) 15%, transparent)",
                color: "var(--info)",
              }}
            >
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>This week</p>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                38h 42m
              </p>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="ts-card p-5 flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center"
              style={{
                background: "color-mix(in oklab, var(--success) 15%, transparent)",
                color: "var(--success)",
              }}
            >
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>On-time rate</p>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                92%
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* History */}
      <div className="ts-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Recent history
          </h3>
          <button className="ts-btn-ghost text-sm">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="text-left text-xs uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Clock in</th>
                <th className="py-3 pr-4">Clock out</th>
                <th className="py-3 pr-4">Hours</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((e, i) => {
                const s = statusStyle(e.status);
                const Icon = s.icon;
                return (
                  <motion.tr
                    key={e.date}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ borderTop: "1px solid var(--border, #e5e7eb)" }}
                  >
                    <td className="py-3 pr-4 font-medium" style={{ color: "var(--text-primary)" }}>
                      {e.date}
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{e.in}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{e.out}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{e.hours}</td>
                    <td className="py-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ background: s.bg, color: s.fg }}
                      >
                        <Icon size={12} />
                        {e.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
