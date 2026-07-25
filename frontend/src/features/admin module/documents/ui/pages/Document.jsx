import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Search,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

const categories = ["All", "Contracts", "Payroll", "Policies", "Reports", "Images"];

const iconFor = (type) => {
  if (["png", "jpg", "jpeg", "svg"].includes(type)) return { Icon: FileImage, tint: "var(--info)" };
  if (["xls", "xlsx", "csv"].includes(type)) return { Icon: FileSpreadsheet, tint: "var(--success)" };
  if (["zip", "rar"].includes(type)) return { Icon: FileArchive, tint: "var(--warning)" };
  return { Icon: FileText, tint: "var(--primary)" };
};

const files = [
  { name: "Employee-Handbook-v3.pdf", type: "pdf", size: "2.4 MB", date: "Jul 21, 2026", category: "Policies" },
  { name: "Payroll-Q3-2026.xlsx",     type: "xlsx", size: "812 KB", date: "Jul 18, 2026", category: "Payroll" },
  { name: "Offer-Letter-Kabir.pdf",   type: "pdf", size: "184 KB", date: "Jul 12, 2026", category: "Contracts" },
  { name: "Team-Photo.jpg",           type: "jpg", size: "3.1 MB", date: "Jul 08, 2026", category: "Images" },
  { name: "Compliance-Audit.pdf",     type: "pdf", size: "1.2 MB", date: "Jul 04, 2026", category: "Reports" },
  { name: "Backup-July.zip",          type: "zip", size: "18.6 MB", date: "Jul 01, 2026", category: "Reports" },
];

const Document = () => {
  const [drag, setDrag] = useState(false);
  const [cat, setCat] = useState("All");

  const list = cat === "All" ? files : files.filter((f) => f.category === cat);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Documents
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Central library for policies, contracts and reports
          </p>
        </div>
      </div>

      {/* Upload */}
      <motion.label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); }}
        htmlFor="ts-file"
        className="ts-card cursor-pointer p-8 flex flex-col items-center justify-center text-center border-dashed transition"
        style={{
          borderStyle: "dashed",
          borderColor: drag ? "var(--primary)" : "var(--border-color)",
          background: drag ? "color-mix(in oklab, var(--primary) 8%, var(--bg-surface))" : undefined,
        }}
        whileHover={{ y: -2 }}
      >
        <input id="ts-file" type="file" className="hidden" />
        <div
          className="w-14 h-14 rounded-2xl grid place-items-center mb-3"
          style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary-600)" }}
        >
          <UploadCloud size={28} />
        </div>
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Drag & drop files, or click to upload
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          PDF, DOCX, XLSX, PNG • up to 25 MB each
        </p>
      </motion.label>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 flex-1 min-w-[240px] h-11 px-3 rounded-xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search documents…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <button className="ts-btn-ghost inline-flex items-center gap-2 text-sm">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition"
            style={
              c === cat
                ? { background: "var(--grad-primary)", color: "#fff", boxShadow: "var(--shadow-glow)" }
                : { background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((f, i) => {
          const { Icon, tint } = iconFor(f.type);
          return (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="ts-card p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
                style={{ background: `color-mix(in oklab, ${tint} 15%, transparent)`, color: tint }}
              >
                <Icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {f.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {f.size} • {f.date}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: "var(--bg-subtle)", color: "var(--text-secondary)" }}
                  >
                    {f.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)]" style={{ color: "var(--text-secondary)" }}>
                  <Download size={16} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)]" style={{ color: "var(--text-secondary)" }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Document;
