import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react";

const contacts = [
  { id: 1, name: "Aisha Khan", role: "HR Manager", initials: "AK", online: true, last: "Are the leave forms updated?" },
  { id: 2, name: "Rahul Verma", role: "Designer", initials: "RV", online: true, last: "Sharing the mockups in 5." },
  { id: 3, name: "Sara Ali", role: "Developer", initials: "SA", online: false, last: "Can you review the PR?" },
  { id: 4, name: "#general", role: "4 members", initials: "TG", online: true, last: "Standup at 11:00 sharp." },
  { id: 5, name: "Kabir Roy", role: "Onboarding", initials: "KR", online: false, last: "Thanks for the help!" },
];

const initialThreads = {
  1: [
    { id: 1, from: "them", text: "Hey! Are the leave forms updated?", time: "09:12" },
    { id: 2, from: "me", text: "Yes, pushed this morning ✅", time: "09:14" },
    { id: 3, from: "them", text: "Perfect, thank you!", time: "09:15" },
  ],
  2: [{ id: 1, from: "them", text: "Sharing the new mockups in 5.", time: "10:02" }],
  3: [{ id: 1, from: "them", text: "Can you review the PR?", time: "Yesterday" }],
  4: [{ id: 1, from: "them", text: "Standup at 11:00 sharp.", time: "08:55" }],
  5: [{ id: 1, from: "them", text: "Thanks for the help!", time: "Mon" }],
};

const Chat = () => {
  const [activeId, setActiveId] = useState(1);
  const [threads, setThreads] = useState(initialThreads);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const scrollRef = useRef(null);

  const active = contacts.find((c) => c.id === activeId);
  const msgs = threads[activeId] || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length, activeId]);

  const send = (e) => {
    e?.preventDefault();
    if (!draft.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), { id: Date.now(), from: "me", text: draft.trim(), time: now }],
    }));
    setDraft("");
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div
        className="ts-card overflow-hidden grid grid-cols-1 md:grid-cols-[320px_1fr]"
        style={{ height: "calc(100vh - 8rem)" }}
      >
        {/* Sidebar */}
        <aside
          className="flex flex-col"
          style={{ borderRight: "1px solid var(--border, #e5e7eb)" }}
        >
          <div className="p-4" style={{ borderBottom: "1px solid var(--border, #e5e7eb)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Messages
            </h2>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "var(--bg-subtle)" }}
            >
              <Search size={16} style={{ color: "var(--text-muted)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {filteredContacts.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition"
                  style={{
                    background:
                      activeId === c.id
                        ? "color-mix(in oklab, var(--primary) 10%, transparent)"
                        : "transparent",
                  }}
                >
                  <div className="relative">
                    <div
                      className="w-11 h-11 rounded-full grid place-items-center text-sm font-bold text-white"
                      style={{ background: "var(--grad-primary)" }}
                    >
                      {c.initials}
                    </div>
                    {c.online && (
                      <span
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                        style={{
                          background: "var(--success)",
                          border: "2px solid var(--bg-card, #fff)",
                        }}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {c.last}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation */}
        <section className="flex flex-col min-h-0">
          {/* Header */}
          <header
            className="flex items-center gap-3 p-4"
            style={{ borderBottom: "1px solid var(--border, #e5e7eb)" }}
          >
            <div
              className="w-10 h-10 rounded-full grid place-items-center text-sm font-bold text-white"
              style={{ background: "var(--grad-primary)" }}
            >
              {active.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {active.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {active.online ? "Online" : "Offline"} · {active.role}
              </p>
            </div>
            <button className="ts-btn-ghost p-2 rounded-lg"><Phone size={18} /></button>
            <button className="ts-btn-ghost p-2 rounded-lg"><Video size={18} /></button>
            <button className="ts-btn-ghost p-2 rounded-lg"><MoreVertical size={18} /></button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 flex flex-col gap-3"
            style={{ background: "var(--bg-subtle)" }}
          >
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[75%] px-4 py-2 rounded-2xl text-sm"
                    style={
                      m.from === "me"
                        ? {
                            background: "var(--grad-primary)",
                            color: "#fff",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: "var(--bg-card, #fff)",
                            color: "var(--text-primary)",
                            borderBottomLeftRadius: 4,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          }
                    }
                  >
                    <p>{m.text}</p>
                    <p
                      className="text-[10px] mt-1"
                      style={{
                        color:
                          m.from === "me"
                            ? "rgba(255,255,255,0.75)"
                            : "var(--text-muted)",
                      }}
                    >
                      {m.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 p-3"
            style={{ borderTop: "1px solid var(--border, #e5e7eb)" }}
          >
            <button type="button" className="ts-btn-ghost p-2 rounded-lg">
              <Paperclip size={18} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
              style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
            />
            <button type="button" className="ts-btn-ghost p-2 rounded-lg">
              <Smile size={18} />
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: "var(--grad-primary)" }}
            >
              <Send size={16} /> Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Chat;
