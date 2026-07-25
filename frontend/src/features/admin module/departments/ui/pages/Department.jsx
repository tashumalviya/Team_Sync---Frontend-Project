import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Code2,
  Palette,
  Megaphone,
  HeartHandshake,
  DollarSign,
  Users,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";

const mock = [
  { name: "Engineering", manager: "Aarav Sharma", count: 42, icon: Code2, tint: "var(--primary)" },
  { name: "Design",      manager: "Priya Nair",    count: 14, icon: Palette, tint: "var(--secondary)" },
  { name: "Marketing",   manager: "Rohan Iyer",    count: 22, icon: Megaphone, tint: "var(--warning)" },
  { name: "Human Resources", manager: "Sana Kapoor", count: 9, icon: HeartHandshake, tint: "var(--success)" },
  { name: "Finance",     manager: "Kabir Roy",     count: 11, icon: DollarSign, tint: "var(--info)" },
  { name: "Operations",  manager: "Meera Shah",    count: 18, icon: Building2, tint: "var(--danger)" },
];

const Department = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Departments
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Structure, ownership and headcount
          </p>
        </div>
        <button className="ts-btn-primary inline-flex items-center gap-2 text-sm">
          <Plus size={16} /> New department
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {mock.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="ts-card p-6 relative"
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-xl grid place-items-center"
                style={{ background: `color-mix(in oklab, ${d.tint} 16%, transparent)`, color: d.tint }}
              >
                <d.icon size={22} />
              </div>
              <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition" style={{ color: "var(--text-muted)" }}>
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3 className="text-lg font-semibold mt-4" style={{ color: "var(--text-primary)" }}>{d.name}</h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Managed by <span style={{ color: "var(--text-secondary)" }}>{d.manager}</span>
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <Users size={14} /> {d.count} members
              </span>
              <button
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: "var(--primary-600)" }}
              >
                View <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Department;
