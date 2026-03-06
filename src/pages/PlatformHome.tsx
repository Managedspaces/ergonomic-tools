/**
 * Platform Home — Tool Selector
 * Sabine brand design: deep navy hero, orange CTA, teal secondary, Roboto/Open Sans.
 */

import { useState } from "react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { TOOL_REGISTRY } from "@/modules/registry";
import {
  Shield, ArrowRight, Monitor, Home, Clock, Flame, Zap,
  AlertTriangle, Brain, Eye, User, Wrench, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import RiskBuilderPage from "@/modules/risk-builder/RiskBuilderPage";

const iconMap: Record<string, React.ReactNode> = {
  Monitor:       <Monitor className="w-6 h-6" />,
  Home:          <Home className="w-6 h-6" />,
  Clock:         <Clock className="w-6 h-6" />,
  Flame:         <Flame className="w-6 h-6" />,
  Zap:           <Zap className="w-6 h-6" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6" />,
  Brain:         <Brain className="w-6 h-6" />,
  Eye:           <Eye className="w-6 h-6" />,
  User:          <User className="w-6 h-6" />,
  Shield:        <Shield className="w-6 h-6" />,
  Wrench:        <Wrench className="w-6 h-6" />,
};

// Tool accent colours — all derived from Sabine brand palette
const toolAccentBg: Record<string, string> = {
  "ergonomic":    "bg-[#1A2B5F]",   // navy
  "home-office":  "bg-[#4C99B0]",   // teal
  "psychosocial": "bg-[#D96C34]",   // orange CTA
  "risk-builder": "bg-[#12204A]",   // dark navy
};

const toolBorderHover: Record<string, string> = {
  "ergonomic":    "hover:border-[#1A2B5F]",
  "home-office":  "hover:border-[#4C99B0]",
  "psychosocial": "hover:border-[#D96C34]",
  "risk-builder": "hover:border-[#12204A]",
};

const toolTagBg: Record<string, string> = {
  "ergonomic":    "bg-blue-50 text-[#1A2B5F]",
  "home-office":  "bg-teal-50 text-[#39798B]",
  "psychosocial": "bg-orange-50 text-[#C45A2B]",
  "risk-builder": "bg-slate-100 text-[#12204A]",
};

const toolButtonStyle: Record<string, string> = {
  "ergonomic":    "bg-[#1A2B5F] hover:bg-[#12204A] text-white",
  "home-office":  "bg-[#4C99B0] hover:bg-[#39798B] text-white",
  "psychosocial": "bg-[#D96C34] hover:bg-[#C45A2B] text-white",
  "risk-builder": "bg-[#12204A] hover:bg-[#0e1836] text-white",
};

const stats = [
  { number: "4", label: "Compliance Tools" },
  { number: "6", label: "Jurisdictions" },
  { number: "100+", label: "Questions" },
  { number: "PDF", label: "Audit Reports" },
];

export default function PlatformHome() {
  const { setTool, setStep } = useAssessment();
  const [activeBuilder, setActiveBuilder] = useState<string | null>(null);

  function handleSelectTool(toolId: string) {
    const tool = TOOL_REGISTRY.find((t) => t.id === toolId);
    if (!tool) return;
    if (tool.isBuilder) {
      setActiveBuilder(toolId);
    } else {
      setTool(tool);
      setStep("welcome");
    }
  }

  if (activeBuilder === "risk-builder") {
    return <RiskBuilderPage onBack={() => setActiveBuilder(null)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)", fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav style={{ backgroundColor: "var(--sabine-navy)" }} className="sticky top-0 z-20 shadow-lg">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Workplace Risk Platform
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                Compliance Assessment Tools
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors" style={{ fontFamily: "'Roboto', sans-serif" }}>Tools</span>
            <span className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors" style={{ fontFamily: "'Roboto', sans-serif" }}>Reports</span>
            <span className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors" style={{ fontFamily: "'Roboto', sans-serif" }}>About</span>
            <button
              className="text-sm font-semibold px-5 py-2 rounded-lg transition-all"
              style={{ backgroundColor: "var(--sabine-cta)", color: "#fff", fontFamily: "'Roboto', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--sabine-navy)" }} className="pb-20 pt-16">
        <div className="container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="section-label section-label-light mb-4">
                Workplace Compliance · Risk Assessment Tools
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Protect your team.<br />
                <span style={{ color: "var(--sabine-cta)" }}>Stay compliant.</span>
              </h1>
              <p className="text-lg mb-8 max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Four structured risk assessment tools covering ergonomics, home office safety,
                psychosocial wellbeing, and custom hazard identification — with PDF compliance
                reports for 6 jurisdictions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleSelectTool("ergonomic")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Start an Assessment <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", fontFamily: "'Roboto', sans-serif", backgroundColor: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold" style={{ color: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}>{s.number}</p>
                <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Roboto', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tool Cards ── */}
      <section className="container py-16">
        <div className="mb-10">
          <p className="section-label mb-2">Assessment Tools</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
            Select your assessment
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {TOOL_REGISTRY.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              onClick={() => handleSelectTool(tool.id)}
              className={`brand-card cursor-pointer group ${toolBorderHover[tool.id] ?? "hover:border-gray-400"}`}
            >
              {/* Icon + arrow */}
              <div className="flex items-start justify-between mb-5">
                <div className={`tool-icon-badge ${toolAccentBg[tool.id] ?? "bg-gray-600"}`}>
                  {iconMap[tool.icon] ?? <Shield className="w-6 h-6" />}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Name + description */}
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
                {tool.name}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--sabine-muted-text)" }}>
                {tool.description}
              </p>

              {/* Category tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tool.isBuilder
                  ? ["Slips & Trips", "Manual Handling", "Fire", "Electrical", "Chemicals", "Height", "Stress", "Custom"].map((label) => (
                      <span key={label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${toolTagBg[tool.id] ?? "bg-gray-100 text-gray-600"}`}>
                        {label}
                      </span>
                    ))
                  : tool.categories.map((cat) => (
                      <span key={cat.id} className={`text-xs px-2 py-0.5 rounded-full font-medium ${toolTagBg[tool.id] ?? "bg-gray-100 text-gray-600"}`}>
                        {cat.title}
                      </span>
                    ))
                }
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--sabine-border)" }}>
                <div className="flex gap-3 text-xs" style={{ color: "var(--sabine-muted-text)" }}>
                  {tool.isBuilder ? (
                    <><span>9 hazard types</span><span>·</span><span>5×5 matrix</span></>
                  ) : (
                    <><span>{tool.categories.reduce((s, c) => s + c.questions.filter(q => q.type !== "text_comment").length, 0)} questions</span><span>·</span><span>{tool.categories.length} categories</span></>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSelectTool(tool.id); }}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${toolButtonStyle[tool.id] ?? "bg-gray-600 text-white"}`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  {tool.isBuilder ? "Build" : "Start"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Jurisdiction Strip ── */}
      <section style={{ backgroundColor: "var(--sabine-muted)" }} className="py-10 border-y" style={{ borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-muted)" }}>
        <div className="container text-center">
          <p className="section-label mb-4">Compliance Coverage</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>
            {["🇮🇪 Ireland", "🇬🇧 United Kingdom", "🇩🇪 Germany", "🇨🇭 Switzerland", "🇩🇰 Denmark", "🇦🇺 Australia"].map((j) => (
              <span key={j} className="flex items-center gap-1">{j}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "var(--sabine-navy)" }} className="py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Workplace Risk Platform</span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            For informational and compliance guidance purposes only. Not a substitute for professional legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
