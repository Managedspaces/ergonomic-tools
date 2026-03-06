/**
 * Platform Home — Tool Selector
 * Displays all registered tools and lets the user choose which assessment to take.
 * Tools with isBuilder=true launch their own standalone page component.
 */

import { useState } from "react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { TOOL_REGISTRY } from "@/modules/registry";
import { Button } from "@/components/ui/button";
import {
  Shield, ArrowRight, Monitor, Home, Clock, Flame, Zap, AlertTriangle, Brain, Eye, User, Wrench
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

const toolColors: Record<string, string> = {
  "ergonomic":      "from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400",
  "home-office":    "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400",
  "psychosocial":   "from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400",
  "risk-builder":   "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
};

const toolAccents: Record<string, string> = {
  "ergonomic":      "bg-blue-600",
  "home-office":    "bg-emerald-600",
  "psychosocial":   "bg-violet-600",
  "risk-builder":   "bg-rose-600",
};

export default function PlatformHome() {
  const { setTool, setStep } = useAssessment();
  const [activeBuilder, setActiveBuilder] = useState<string | null>(null);

  function handleSelectTool(toolId: string) {
    const tool = TOOL_REGISTRY.find((t) => t.id === toolId);
    if (!tool) return;

    if (tool.isBuilder) {
      // Launch the standalone builder UI
      setActiveBuilder(toolId);
    } else {
      // Launch the generic assessment flow
      setTool(tool);
      setStep("welcome");
    }
  }

  // If a builder tool is active, render it full-screen
  if (activeBuilder === "risk-builder") {
    return <RiskBuilderPage onBack={() => setActiveBuilder(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none">Workplace Risk Platform</p>
            <p className="text-xs text-muted-foreground mt-0.5">Compliance Assessment Tools</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Assessment Tools
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground leading-[1.1] mb-4">
            Select your<br />
            <span className="italic">assessment tool</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            Each tool guides you through a structured risk assessment and generates
            a compliance-ready report for your jurisdiction. Assessments take 5–10 minutes.
          </p>
        </motion.div>
      </section>

      {/* Tool Cards */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl">
          {TOOL_REGISTRY.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`rounded-xl border-2 bg-gradient-to-br p-6 transition-all cursor-pointer group ${toolColors[tool.id] ?? "from-gray-50 to-slate-50 border-gray-200 hover:border-gray-400"}`}
              onClick={() => handleSelectTool(tool.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${toolAccents[tool.id] ?? "bg-gray-600"}`}>
                  {iconMap[tool.icon] ?? <Shield className="w-6 h-6" />}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>

              <h2 className="font-heading text-xl text-foreground mb-2">{tool.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.description}</p>

              {/* For the builder, show hazard categories differently */}
              {tool.isBuilder ? (
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Slips & Trips", "Manual Handling", "Fire", "Electrical", "Chemicals", "Height", "Stress", "DSE", "Custom"].map((label) => (
                    <span key={label} className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-white/70 border border-border/50 text-muted-foreground">
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mb-5">
                  {tool.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/70 border border-border/50 text-muted-foreground"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {tool.isBuilder ? (
                    <>
                      <span>9 hazard types</span>
                      <span>5×5 matrix</span>
                    </>
                  ) : (
                    <>
                      <span>{tool.categories.reduce((s, c) => s + c.questions.filter(q => q.type !== "text_comment").length, 0)} questions</span>
                      <span>{tool.categories.length} categories</span>
                    </>
                  )}
                  <span>6 jurisdictions</span>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); handleSelectTool(tool.id); }}
                  className={`text-xs text-white ${toolAccents[tool.id] ?? "bg-gray-600"} hover:opacity-90 border-0`}
                >
                  {tool.isBuilder ? "Build" : "Start"}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 container py-6 text-center text-xs text-muted-foreground">
        <p>Workplace Risk Platform · Compliance Assessment Tools · For informational purposes only</p>
      </footer>
    </div>
  );
}
