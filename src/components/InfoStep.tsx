/**
 * Employee Information Step
 * Sabine brand design — navy header, orange CTA, clean form layout
 */

import { useState } from "react";
import { useAssessment, type EmployeeInfo } from "@/contexts/AssessmentContext";
import { SUPPORTED_COUNTRIES } from "@/lib/compliance";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Shield, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function InfoStep() {
  const { setStep, setEmployeeInfo, employeeInfo, setPhotoDataUrl, photoDataUrl, tool } = useAssessment();
  const [form, setForm] = useState<EmployeeInfo>(employeeInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setEmployeeInfo(form);
    setStep("questions");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("Photo must be under 10MB"); return; }
    const reader = new FileReader();
    reader.onload = () => { setPhotoDataUrl(reader.result as string); toast.success("Workstation photo uploaded"); };
    reader.readAsDataURL(file);
  };

  const inputStyle = {
    borderColor: "var(--sabine-border)",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "0.9rem",
    color: "var(--sabine-text)",
  };

  const labelStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "var(--sabine-text)",
    display: "block",
    marginBottom: "0.375rem",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sabine-bg)" }}>

      {/* ── Navigation ── */}
      <nav style={{ backgroundColor: "var(--sabine-navy)" }} className="sticky top-0 z-20 shadow-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--sabine-cta)" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Workplace Risk Platform
            </span>
          </div>
          <button
            onClick={() => setStep("welcome")}
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Roboto', sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </nav>

      {/* ── Progress indicator ── */}
      <div style={{ backgroundColor: "var(--sabine-navy)" }} className="pb-6 pt-2">
        <div className="container">
          <div className="flex items-center gap-3">
            {["Employee Info", "Assessment", "Results"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: i === 0 ? "var(--sabine-cta)" : "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.45)", fontFamily: "'Roboto', sans-serif" }}>
                  {label}
                </span>
                {i < 2 && <div className="w-8 h-px mx-1" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Heading */}
            <p className="section-label mb-2">Step 1 of 3</p>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Roboto', sans-serif", color: "var(--sabine-text)" }}>
              Employee Information
            </h1>
            <p className="mb-8" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
              Please provide your details. This information will appear on your assessment report.
            </p>

            {/* Form card */}
            <div className="brand-card">
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      style={{ ...inputStyle, borderColor: errors.name ? "var(--sabine-risk-critical)" : "var(--sabine-border)" }}
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: "var(--sabine-risk-critical)" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      style={{ ...inputStyle, borderColor: errors.email ? "var(--sabine-risk-critical)" : "var(--sabine-border)" }}
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "var(--sabine-risk-critical)" }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Job Title</label>
                    <Input
                      value={form.jobTitle}
                      onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                      placeholder="Software Engineer"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Department</label>
                    <Input
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      placeholder="Engineering"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block" style={{ fontFamily: "'Roboto', sans-serif" }}>Work Location</Label>
                    <Select value={form.workLocation} onValueChange={(v) => setForm({ ...form, workLocation: v as EmployeeInfo["workLocation"] })}>
                      <SelectTrigger style={inputStyle}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="home">Home / Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block" style={{ fontFamily: "'Roboto', sans-serif" }}>Country (for compliance)</Label>
                    <Select value={form.country} onValueChange={(v) => setForm({ ...form, country: v })}>
                      <SelectTrigger style={inputStyle}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_COUNTRIES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>{c.name} ({c.code})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label style={labelStyle}>Workstation Photo (optional)</label>
                  <div
                    className="border-2 border-dashed rounded-xl p-6 text-center transition-colors"
                    style={{ borderColor: "var(--sabine-border)", backgroundColor: "var(--sabine-muted)" }}
                  >
                    {photoDataUrl ? (
                      <div className="space-y-3">
                        <img src={photoDataUrl} alt="Workstation" className="max-h-40 mx-auto rounded-lg" />
                        <button
                          onClick={() => setPhotoDataUrl(null)}
                          className="text-xs underline"
                          style={{ color: "var(--sabine-muted-text)" }}
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--sabine-muted-text)" }} />
                        <p className="text-sm" style={{ color: "var(--sabine-muted-text)", fontFamily: "'Open Sans', sans-serif" }}>
                          Click to upload a photo of your workstation
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--sabine-muted-text)" }}>JPG, PNG up to 10MB</p>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-white transition-all mt-2"
                  style={{ backgroundColor: "var(--sabine-cta)", fontFamily: "'Roboto', sans-serif", fontSize: "1rem" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta-hover)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--sabine-cta)")}
                >
                  Continue to Assessment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
