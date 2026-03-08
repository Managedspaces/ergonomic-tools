/**
 * Contact Page — Enquiry form, services, and contact details
 * Sabine brand design system
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, CheckCircle2,
  Globe, MessageSquare, Briefcase, Users, ArrowRight
} from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Workplace Risk Assessments",
    desc: "Structured, audit-ready risk assessments for remote, hybrid, and office-based teams. Covering ergonomics, home office safety, psychosocial risk, and bespoke hazard registers.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Cross-Border Compliance",
    desc: "Operating across Germany, Switzerland, Austria, Ireland, the UK, or Australia? Sabine works with multilingual teams and understands the regulatory differences that matter.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Remote & Hybrid Work Strategy",
    desc: "Practical guidance for SMEs building sustainable remote and hybrid working policies — grounded in occupational health science, not generic HR templates.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Occupational Health Consultancy",
    desc: "Hands-on consultancy for businesses that need more than a digital tool. Sabine works directly with your team to identify, assess, and control workplace health risks.",
  },
];

const enquiryTypes = [
  "General enquiry",
  "Custom tool development",
  "Enterprise deployment",
  "Jurisdiction expansion",
  "H&S consultancy",
  "Technical support",
  "Partnership / reseller",
];

const inputClass = "w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all";

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    enquiryType: "General enquiry", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    borderColor: "var(--sabine-border)",
    backgroundColor: "var(--sabine-card)",
    color: "var(--sabine-text)",
    fontFamily: "'Open Sans', sans-serif",
  };

  const focusRingStyle = "focus:ring-[var(--sabine-cta)] focus:border-[var(--sabine-cta)]";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Hero ── */}
      <section
        className="pt-14 pb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(26,43,95,0.72), rgba(26,43,95,0.82)), url('/ergonomic-tools/img-contact-space.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label section-label-light mb-3">Get in Touch</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Let's discuss your requirements.
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              You will speak directly with Sabine. No account managers, no sales team. A straightforward
              conversation about your workforce, your obligations, and the most practical way to address them.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-14">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Contact Form ── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--sabine-card)", border: "1px solid var(--sabine-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="px-8 py-6" style={{ borderBottom: "1px solid var(--sabine-border)", backgroundColor: "rgba(26,43,95,0.04)" }}>
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Send Sabine a message</h2>
                <p className="text-sm mt-1" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                  Typically replied to within one business day. No automated responses.
                </p>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="px-8 py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(46,204,113,0.12)" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "var(--sabine-risk-low)" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Message sent!</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                    Thank you, <strong>{form.name}</strong>. We'll be in touch at <strong>{form.email}</strong> within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", enquiryType: "General enquiry", message: "" }); }}
                    className="text-sm font-semibold transition-colors"
                    style={{ color: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Full Name *</label>
                      <input
                        type="text" required value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className={`${inputClass} ${focusRingStyle}`} style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Email Address *</label>
                      <input
                        type="email" required value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jane@company.com"
                        className={`${inputClass} ${focusRingStyle}`} style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Company / Organisation</label>
                      <input
                        type="text" value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Acme Ltd"
                        className={`${inputClass} ${focusRingStyle}`} style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Phone Number</label>
                      <input
                        type="tel" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+353 1 234 5678"
                        className={`${inputClass} ${focusRingStyle}`} style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Enquiry Type *</label>
                    <select
                      required value={form.enquiryType}
                      onChange={e => setForm(f => ({ ...f, enquiryType: e.target.value }))}
                      className={`${inputClass} ${focusRingStyle}`} style={inputStyle}
                    >
                      {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--sabine-text)", fontFamily: "'Roboto', sans-serif" }}>Message *</label>
                    <textarea
                      required rows={5} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your team, your current setup, and what you're trying to solve..."
                      className={`${inputClass} ${focusRingStyle} resize-none`} style={inputStyle}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                      * Required fields. We respect your privacy and will never share your details.
                    </p>
                    <button
                      type="submit" disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-60"
                      style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif", minWidth: "140px" }}
                      onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)"; }}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* Contact Details */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
              <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>Contact Details</h3>
              <div className="space-y-4">
                <a href="mailto:info@sabine-risk.com" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(217,108,52,0.1)", color: "var(--sabine-cta)" }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-muted-text)" }}>Email</p>
                    <p className="text-sm transition-colors" style={{ color: "var(--sabine-cta)", fontFamily: "'Open Sans', sans-serif" }}>info@sabine-risk.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(26,43,95,0.08)", color: "var(--sabine-navy)" }}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-muted-text)" }}>Phone</p>
                    <p className="text-sm" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>+353 (0)1 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(42,157,143,0.1)", color: "var(--sabine-teal)" }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-muted-text)" }}>Location</p>
                    <p className="text-sm" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>Dublin, Ireland</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>Serving clients across Ireland & Europe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(26,43,95,0.08)", color: "var(--sabine-navy)" }}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-muted-text)" }}>Website</p>
                    <a href="https://sabine-risk-consultancy.netlify.app/de/" target="_blank" rel="noopener noreferrer"
                      className="text-sm transition-colors" style={{ color: "var(--sabine-cta)", fontFamily: "'Open Sans', sans-serif" }}>
                      sabine-risk-consultancy.netlify.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "rgba(217,108,52,0.06)", borderColor: "rgba(217,108,52,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--sabine-cta)" }} />
                <p className="text-xs font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-cta)" }}>Response Commitment</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-text)", fontFamily: "'Open Sans', sans-serif" }}>
                All enquiries receive a response within <strong>1 business day</strong>. For urgent compliance matters, please indicate this in your message.
              </p>
            </div>
          </div>
        </div>

        {/* ── Services ── */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <p className="section-label mb-2">Services</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              How we can help
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl border p-5" style={{ backgroundColor: "var(--sabine-card)", borderColor: "var(--sabine-border)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(26,43,95,0.08)", color: "var(--sabine-navy)" }}>
                  {s.icon}
                </div>
                <p className="font-semibold text-sm mb-1.5" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>{s.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
