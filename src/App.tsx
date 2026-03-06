/**
 * Platform App — Root component
 * Handles platform-level navigation (Home, Tools, Reports, About, Contact)
 * and the assessment flow per selected tool.
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AssessmentProvider, useAssessment } from "./contexts/AssessmentContext";
import PlatformHome from "./pages/PlatformHome";
import ToolsPage from "./pages/ToolsPage";
import ReportsPage from "./pages/ReportsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import WelcomeStep from "./components/WelcomeStep";
import InfoStep from "./components/InfoStep";
import QuestionsStep from "./components/QuestionsStep";
import ResultsStep from "./components/ResultsStep";
import RiskBuilderPage from "./modules/risk-builder/RiskBuilderPage";
import { TOOL_REGISTRY } from "./modules/registry";
import { Shield, Menu, X } from "lucide-react";

type NavPage = "home" | "tools" | "reports" | "about" | "contact";

// ── Shared Navigation Bar ─────────────────────────────────────────────────────
function NavBar({
  currentPage,
  onNavigate,
  onBack,
  showBack,
}: {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onBack?: () => void;
  showBack?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { id: NavPage; label: string }[] = [
    { id: "tools", label: "Tools" },
    { id: "reports", label: "Reports" },
    { id: "about", label: "About" },
  ];

  function handleNav(page: NavPage) {
    setMobileOpen(false);
    onNavigate(page);
  }

  return (
    <nav style={{ backgroundColor: "var(--sabine-navy)" }} className="sticky top-0 z-20 shadow-lg">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 text-left"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--sabine-cta)" }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className="text-sm font-bold text-white leading-none"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Workplace Risk Platform
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
              Compliance Assessment Tools
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-sm transition-colors"
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: currentPage === link.id ? "#fff" : "rgba(255,255,255,0.65)",
                fontWeight: currentPage === link.id ? 700 : 400,
                borderBottom: currentPage === link.id ? "2px solid var(--sabine-cta)" : "2px solid transparent",
                paddingBottom: "2px",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = currentPage === link.id ? "#fff" : "rgba(255,255,255,0.65)")}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contact")}
            className="text-sm font-semibold px-5 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: currentPage === "contact" ? "var(--sabine-cta-hover)" : "var(--sabine-cta)",
              color: "#fff",
              fontFamily: "'Roboto', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = currentPage === "contact" ? "var(--sabine-cta-hover)" : "var(--sabine-cta)")}
          >
            Contact
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: currentPage === link.id ? "#fff" : "rgba(255,255,255,0.7)",
                backgroundColor: currentPage === link.id ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contact")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold mt-2"
            style={{
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "var(--sabine-cta)",
              color: "#fff",
            }}
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (page: NavPage) => void }) {
  return (
    <footer style={{ backgroundColor: "var(--sabine-navy)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="container py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Workplace Risk Platform</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Open Sans', sans-serif" }}>
              Professional compliance assessment tools for ergonomics, home office safety, psychosocial wellbeing, and custom risk registers.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Roboto', sans-serif" }}>Platform</p>
            <div className="space-y-2">
              {(["home", "tools", "reports", "about", "contact"] as NavPage[]).map(p => (
                <button key={p} onClick={() => onNavigate(p)}
                  className="block text-xs capitalize transition-colors"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >{p}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Roboto', sans-serif" }}>Jurisdictions</p>
            <div className="space-y-1.5">
              {["🇮🇪 Ireland", "🇬🇧 United Kingdom", "🇩🇪 Germany", "🇨🇭 Switzerland", "🇩🇰 Denmark", "🇦🇺 Australia"].map(j => (
                <p key={j} className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Open Sans', sans-serif" }}>{j}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Open Sans', sans-serif" }}>
            © {new Date().getFullYear()} Workplace Risk Platform · Powered by Sabine Risk Consultancy
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Open Sans', sans-serif" }}>
            Built for compliance · ISO 45001 · ISO 45003 · ISO 31000
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Main App Content ──────────────────────────────────────────────────────────
function AppContent() {
  const { tool, step, setTool, setStep } = useAssessment();
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [activeBuilder, setActiveBuilder] = useState<string | null>(null);

  function handleNavigate(page: NavPage) {
    // If navigating away from an assessment, clear the tool
    setCurrentPage(page);
    setActiveBuilder(null);
    if (tool) {
      setTool(null);
    }
  }

  function handleSelectTool(toolId: string) {
    const found = TOOL_REGISTRY.find(t => t.id === toolId);
    if (!found) return;
    if (found.isBuilder) {
      setActiveBuilder(toolId);
      setCurrentPage("home"); // builder is fullscreen
    } else {
      setTool(found);
      setStep("welcome");
      setCurrentPage("home");
    }
  }

  // ── Risk Builder (fullscreen, has its own header) ──
  if (activeBuilder === "risk-builder") {
    return <RiskBuilderPage onBack={() => setActiveBuilder(null)} />;
  }

  // ── Assessment flow (tool selected) ──
  if (tool) {
    return (
      <>
        {/* Assessment flow has its own header inside each step component */}
        {step === "welcome" && <WelcomeStep />}
        {step === "info" && <InfoStep />}
        {step === "questions" && <QuestionsStep />}
        {step === "results" && <ResultsStep />}
        {!["welcome","info","questions","results"].includes(step) && <WelcomeStep />}
      </>
    );
  }

  // ── Platform pages ──
  const showFooter = ["home","tools","reports","about","contact"].includes(currentPage);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {currentPage === "home"    && <PlatformHome onNavigate={handleNavigate} onSelectTool={handleSelectTool} />}
        {currentPage === "tools"   && <ToolsPage onSelectTool={handleSelectTool} onNavigate={handleNavigate} />}
        {currentPage === "reports" && <ReportsPage onNavigate={handleNavigate} onSelectTool={handleSelectTool} />}
        {currentPage === "about"   && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
      </main>
      {showFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AssessmentProvider>
            <Toaster />
            <AppContent />
          </AssessmentProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
