import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Pencil,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";

const Profile = () => {
  const { employee } = useSelector((store) => store.auth);

  const info = {
    name: employee?.name || "Alex Morgan",
    role: employee?.role || "Senior Product Designer",
    email: employee?.email || "alex.morgan@teamsync.io",
    phone: employee?.phone || "+91 98765 43210",
    location: employee?.location || "Bengaluru, IN",
    department: employee?.department || "Design",
    joined: employee?.createdAt ? new Date(employee.createdAt).toLocaleDateString() : "Feb 12, 2024",
    avatar:
      employee?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(employee?.name || "Alex Morgan")}&background=6366F1&color=fff&size=256`,
  };

  const skills = ["Figma", "Design Systems", "UX Research", "React", "Tailwind", "Framer Motion"];
  const timeline = [
    { icon: CheckCircle2, tint: "var(--success)", text: "Shipped onboarding v3 revamp", time: "Yesterday" },
    { icon: MessageSquare, tint: "var(--info)", text: "Commented on 'Q4 Roadmap' doc", time: "2 days ago" },
    { icon: Award, tint: "var(--warning)", text: "Received 'Craft champion' award", time: "Last week" },
    { icon: Clock, tint: "var(--secondary)", text: "Requested leave (Aug 12–14)", time: "2 weeks ago" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Cover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative rounded-2xl h-44 sm:h-56 overflow-hidden"
        style={{ background: "var(--grad-cover)" }}
      >
        <div className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      </motion.div>

      {/* Header card */}
      <div className="relative -mt-14 sm:-mt-20 px-2 sm:px-6">
        <div className="ts-card p-6 flex flex-col sm:flex-row sm:items-end gap-5">
          <img
            src={info.avatar}
            alt=""
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover -mt-16 sm:-mt-20 ring-4"
            style={{ boxShadow: "var(--shadow-lg)", ringColor: "var(--bg-surface)" }}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{info.name}</h2>
            <p className="text-sm capitalize" style={{ color: "var(--text-muted)" }}>{info.role}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="inline-flex items-center gap-1.5"><Building2 size={14} /> {info.department}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {info.location}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> Joined {info.joined}</span>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} className="ts-btn-primary inline-flex items-center gap-2 text-sm shrink-0">
            <Pencil size={14} /> Edit profile
          </motion.button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="ts-card p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Contact</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <Mail size={16} style={{ color: "var(--primary-600)" }} /> {info.email}
            </li>
            <li className="flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <Phone size={16} style={{ color: "var(--primary-600)" }} /> {info.phone}
            </li>
            <li className="flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <Briefcase size={16} style={{ color: "var(--primary-600)" }} /> {info.role}
            </li>
          </ul>
        </div>

        <div className="ts-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Personal info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              ["Full name", info.name],
              ["Employee ID", employee?._id?.slice(-8) || "EMP-2049"],
              ["Department", info.department],
              ["Manager", "Priya Nair"],
              ["Employment type", "Full-time"],
              ["Work location", info.location],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{k}</p>
                <p className="mt-1 font-medium" style={{ color: "var(--text-primary)" }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ts-card p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary-600)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="ts-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Activity</h3>
          <ol className="relative flex flex-col gap-4 pl-4 border-l" style={{ borderColor: "var(--border-color)" }}>
            {timeline.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <span
                  className="absolute -left-[22px] top-1 w-8 h-8 rounded-full grid place-items-center"
                  style={{ background: `color-mix(in oklab, ${t.tint} 16%, transparent)`, color: t.tint }}
                >
                  <t.icon size={14} />
                </span>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{t.text}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.time}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Profile;
