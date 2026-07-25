import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Settings as Cog,
  User,
  Shield,
  Bell,
  Palette,
  KeyRound,
  Save,
  Sun,
  Moon,
} from "lucide-react";
import { toggleTheme } from "../../../../shared/state/themeSlice";

const sections = [
  { id: "general", label: "General", icon: Cog },
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "password", label: "Password", icon: KeyRound },
];

const Row = ({ title, description, children }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
    <div className="min-w-0">
      <p className="font-medium" style={{ color: "var(--text-primary)" }}>{title}</p>
      {description && <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{description}</p>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Toggle = ({ on, onChange }) => (
  <button
    onClick={() => onChange?.(!on)}
    className="relative w-11 h-6 rounded-full transition-colors"
    style={{ background: on ? "var(--primary)" : "var(--border-strong)" }}
    aria-pressed={on}
  >
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
      style={{ left: on ? 22 : 2 }}
    />
  </button>
);

const Setting = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((s) => s.theme);
  const [active, setActive] = useState("general");
  const [notif, setNotif] = useState({ email: true, push: false, weekly: true });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your workspace preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar tabs */}
        <aside className="ts-card p-2 h-max sticky top-20">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition"
              style={
                active === s.id
                  ? { background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary-600)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="ts-card p-6">
          {active === "general" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>General</h2>
              <Row title="Workspace name" description="Displayed in the sidebar and reports">
                <input className="ts-input max-w-xs" defaultValue="TeamSync HQ" />
              </Row>
              <Row title="Language" description="Interface language">
                <select className="ts-input max-w-xs">
                  <option>English (US)</option><option>Hindi</option><option>Spanish</option>
                </select>
              </Row>
              <Row title="Time zone">
                <select className="ts-input max-w-xs">
                  <option>Asia/Kolkata (GMT+5:30)</option><option>UTC</option><option>America/New_York</option>
                </select>
              </Row>
            </>
          )}

          {active === "account" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Account</h2>
              <Row title="Full name"><input className="ts-input max-w-xs" defaultValue="Alex Morgan" /></Row>
              <Row title="Email"><input className="ts-input max-w-xs" defaultValue="alex@teamsync.io" /></Row>
              <Row title="Phone"><input className="ts-input max-w-xs" defaultValue="+91 98765 43210" /></Row>
            </>
          )}

          {active === "security" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Security</h2>
              <Row title="Two-factor authentication" description="Add an extra layer of security to your account">
                <Toggle on onChange={() => {}} />
              </Row>
              <Row title="Active sessions" description="You are signed in on 2 devices">
                <button className="ts-btn-ghost text-sm">Manage</button>
              </Row>
            </>
          )}

          {active === "notifications" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Notifications</h2>
              <Row title="Email notifications">
                <Toggle on={notif.email} onChange={(v) => setNotif({ ...notif, email: v })} />
              </Row>
              <Row title="Push notifications">
                <Toggle on={notif.push} onChange={(v) => setNotif({ ...notif, push: v })} />
              </Row>
              <Row title="Weekly digest">
                <Toggle on={notif.weekly} onChange={(v) => setNotif({ ...notif, weekly: v })} />
              </Row>
            </>
          )}

          {active === "appearance" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Appearance</h2>
              <Row title="Theme" description="Switch between light and dark mode">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => mode !== "light" && dispatch(toggleTheme())}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                    style={
                      mode === "light"
                        ? { background: "var(--grad-primary)", color: "#fff" }
                        : { background: "var(--bg-subtle)", color: "var(--text-secondary)" }
                    }
                  >
                    <Sun size={14} /> Light
                  </button>
                  <button
                    onClick={() => mode !== "dark" && dispatch(toggleTheme())}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                    style={
                      mode === "dark"
                        ? { background: "var(--grad-primary)", color: "#fff" }
                        : { background: "var(--bg-subtle)", color: "var(--text-secondary)" }
                    }
                  >
                    <Moon size={14} /> Dark
                  </button>
                </div>
              </Row>
            </>
          )}

          {active === "password" && (
            <>
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Change password</h2>
              <Row title="Current password"><input type="password" className="ts-input max-w-xs" /></Row>
              <Row title="New password"><input type="password" className="ts-input max-w-xs" /></Row>
              <Row title="Confirm new password"><input type="password" className="ts-input max-w-xs" /></Row>
            </>
          )}

          <div className="pt-5 flex justify-end">
            <motion.button whileTap={{ scale: 0.97 }} className="ts-btn-primary inline-flex items-center gap-2 text-sm">
              <Save size={16} /> Save changes
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
