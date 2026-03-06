/**
 * Employee Information Step
 * Collects employee details and country selection before assessment
 */

import { useState } from "react";
import { useAssessment, type EmployeeInfo } from "@/contexts/AssessmentContext";
import { SUPPORTED_COUNTRIES } from "@/lib/compliance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Shield, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const WORKSPACE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663036985142/fhRLT49Ux3ps8Kx65JURu8/category-workspace-j34TX2BMqNjeZyQ6vpTsVj.webp";

export default function InfoStep() {
  const { setStep, setEmployeeInfo, employeeInfo, setPhotoDataUrl, photoDataUrl } = useAssessment();
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
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Photo must be under 10MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(reader.result as string);
      toast.success("Workstation photo uploaded");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Workplace Risk Platform
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setStep("welcome")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3"
            >
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
                Step 1 of 3
              </p>
              <h1 className="font-heading text-3xl lg:text-4xl text-foreground mb-2">
                Employee <span className="italic">Information</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Please provide your details. This information will appear on your assessment report.
              </p>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Full Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="jobTitle" className="text-sm font-medium mb-1.5 block">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={form.jobTitle}
                      onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-sm font-medium mb-1.5 block">Department</Label>
                    <Input
                      id="department"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      placeholder="Engineering"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Work Location</Label>
                    <Select
                      value={form.workLocation}
                      onValueChange={(v) => setForm({ ...form, workLocation: v as EmployeeInfo["workLocation"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="home">Home / Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Country (for compliance)</Label>
                    <Select
                      value={form.country}
                      onValueChange={(v) => setForm({ ...form, country: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_COUNTRIES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.name} ({c.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Workstation Photo (optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    {photoDataUrl ? (
                      <div className="space-y-3">
                        <img src={photoDataUrl} alt="Workstation" className="max-h-40 mx-auto rounded-md" />
                        <Button variant="ghost" size="sm" onClick={() => setPhotoDataUrl(null)}>
                          Remove photo
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload a photo of your workstation</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base font-medium gap-2 mt-4"
                >
                  Continue to Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Side Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 hidden lg:block"
            >
              <img
                src={WORKSPACE_IMG}
                alt="Modern ergonomic workspace"
                className="rounded-lg shadow-md w-full object-cover aspect-[3/4]"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center italic">
                A well-configured ergonomic workstation
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
