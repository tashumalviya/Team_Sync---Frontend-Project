import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Flag,
  ArrowUpRight,
} from "lucide-react";

const seedTasks = [
  { id: 1, title: "Design login screen", project: "HRMS", due: "Today", priority: "high", status: "in-progress" },
  { id: 2, title: "Fix attendance bug on Safari", project: "HRMS", due: "Tomorrow", priority: "high", status: "todo" },
  { id: 3, title: "Write API documentation", project: "Docs", due: "Fri", priority: "med", status: "todo" },
  { id: 4, title: "Deploy staging build", project: "DevOps", due: "Mon", priority: "low", status: "done" },
  { id: 5, title: "Review PR #218", project: "HRMS", due: "Today", priority: "med", status: "in-progress" },
];

const priorityStyle = (p) => ({
  bg:
    p === "high"
      ? "color-mix(in oklab, var(--danger) 18%, transparent)"
      : p === "med"
      ? "color-mix(in oklab, var(--warning) 20%, transparent)"
      : "color-mix(in oklab, var(--success) 18%, transparent)",
  fg: p === "high" ? "var(--danger)" : p === "med" ? "var(--warning)" : "var(--success)",
  label: p === "high" ? "High" : p === "med" ? "Medium" : "Low",
});

const MyTask = () => {
  const [tasks, setTasks] = useState(seedTasks);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      "in-progress": tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks]
  );

  const filtered = tasks
    .filter((t) => (filter === "all" ? true : t.status === filter))
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));

  const cycle = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "todo" ? "in-progress" : t.status === "in-progress" ? "done" : "todo",
            }
          : t
      )
    );

  const tabs = [
    { key: "all", label: "All" },
    { key: "todo", label: "To do" },
    { key: "in-progress", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            My Tasks
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {counts["in-progress"]} in progress · {counts.todo} pending · {counts.done} done
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--grad-primary)" }}
        >
          <Plus size={16} /> New task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: "Total", value: counts.all, tint: "var(--primary)" },
          { icon: Clock, label: "In progress", value: counts["in-progress"], tint: "var(--warning)" },
          { icon: Flag, label: "Pending", value: counts.todo, tint: "var(--info)" },
          { icon: CheckCircle2, label: "Completed", value: counts.done, tint: "var(--success)" },
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            className="ts-card p-5 flex items-center gap-4"
          >
            <div
              className="w-11 h-11 rounded-xl grid place-items-center"
              style={{ background: `color-mix(in oklab, ${s.tint} 15%, transparent)`, color: s.tint }}
            >
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</p>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="ts-card p-4 flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[220px]"
          style={{ background: "var(--bg-subtle)" }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition"
              style={
                filter === t.key
                  ? { background: "var(--grad-primary)", color: "#fff" }
                  : { background: "var(--bg-subtle)", color: "var(--text-muted)" }
              }
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="ts-card p-2 sm:p-4">
        <ul className="flex flex-col">
          {filtered.map((t, i) => {
            const p = priorityStyle(t.priority);
            const done = t.status === "done";
            return (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "transparent" }}
              >
                <button
                  onClick={() => cycle(t.id)}
                  aria-label="Cycle status"
                  className="w-6 h-6 rounded-md grid place-items-center shrink-0 transition"
                  style={{
                    background: done
                      ? "var(--grad-primary)"
                      : t.status === "in-progress"
                      ? "color-mix(in oklab, var(--primary) 25%, transparent)"
                      : "transparent",
                    border: `2px solid ${done ? "transparent" : "var(--border, #d1d5db)"}`,
                    color: "#fff",
                  }}
                >
                  {done && <CheckCircle2 size={14} />}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-medium truncate"
                    style={{
                      color: "var(--text-primary)",
                      textDecoration: done ? "line-through" : "none",
                      opacity: done ? 0.6 : 1,
                    }}
                  >
                    {t.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t.project} · Due {t.due}
                  </p>
                </div>

                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: p.bg, color: p.fg }}
                >
                  <Flag size={12} /> {p.label}
                </span>

                <ArrowUpRight size={16} style={{ color: "var(--text-muted)" }} />
              </motion.li>
            );
          })}
          {filtered.length === 0 && (
            <li className="p-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
              No tasks match your filters.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyTask;
