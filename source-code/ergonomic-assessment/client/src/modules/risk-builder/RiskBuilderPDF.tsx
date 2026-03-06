/**
 * Risk Assessment Builder — PDF Report Generator
 * Generates a formal, tabular risk assessment document suitable for safety audits.
 */

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { RiskBuilderAssessment } from "./types";
import { getBuilderCompliance } from "./compliance";

interface Props {
  assessment: RiskBuilderAssessment;
}

const RISK_COLORS: Record<string, [number, number, number]> = {
  low:      [220, 252, 231],
  moderate: [254, 243, 199],
  high:     [255, 237, 213],
  critical: [254, 226, 226],
};

const RISK_TEXT_COLORS: Record<string, [number, number, number]> = {
  low:      [21, 128, 61],
  moderate: [146, 64, 14],
  high:     [154, 52, 18],
  critical: [153, 27, 27],
};

export function RiskBuilderPDF({ assessment }: Props) {
  const [generating, setGenerating] = useState(false);

  async function generatePDF() {
    setGenerating(true);
    try {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const compliance = getBuilderCompliance(assessment.country ?? "IE");
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 15;

      // ── Cover Page ──────────────────────────────────────────────────────
      doc.setFillColor(220, 38, 38); // rose-600
      doc.rect(0, 0, pageW, 45, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("WORKPLACE RISK ASSESSMENT", margin, 20);

      doc.setFontSize(13);
      doc.setFont("helvetica", "normal");
      doc.text("Formal Risk Assessment Document — Confidential", margin, 30);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" })}`, margin, 40);

      // Assessment details box
      doc.setTextColor(30, 30, 30);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, 52, pageW - margin * 2, 40, 3, 3, "F");

      const details = [
        ["Organisation:", assessment.companyName],
        ["Location / Site:", assessment.location],
        ["Department:", assessment.department || "—"],
        ["Assessor:", `${assessment.assessorName} (${assessment.assessorRole})`],
        ["Assessment Date:", assessment.assessmentDate],
        ["Review Date:", assessment.reviewDate],
        ["Jurisdiction:", compliance.country],
      ];

      const colW = (pageW - margin * 2) / 2;
      details.forEach(([label, value], i) => {
        const col = i < 4 ? 0 : 1;
        const row = i < 4 ? i : i - 4;
        const x = margin + 5 + col * colW;
        const y = 62 + row * 8;
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text(label, x, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(30, 30, 30);
        doc.text(value, x + 40, y);
      });

      // Overall rating
      const overallColor = RISK_COLORS[assessment.overallRating] ?? [200, 200, 200];
      const overallText = RISK_TEXT_COLORS[assessment.overallRating] ?? [50, 50, 50];
      doc.setFillColor(...overallColor);
      doc.roundedRect(pageW - margin - 60, 52, 60, 20, 3, 3, "F");
      doc.setTextColor(...overallText);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("OVERALL RISK RATING", pageW - margin - 55, 61);
      doc.setFontSize(14);
      doc.text(assessment.overallRating.toUpperCase(), pageW - margin - 55, 69);

      // Summary stats
      const counts = { critical: 0, high: 0, moderate: 0, low: 0 };
      assessment.hazards.forEach((h) => { counts[h.riskLevel] = (counts[h.riskLevel] ?? 0) + 1; });

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`Total Hazards Identified: ${assessment.hazards.length}`, margin, 100);

      const statLabels = [
        { label: "Critical", count: counts.critical, level: "critical" },
        { label: "High", count: counts.high, level: "high" },
        { label: "Moderate", count: counts.moderate, level: "moderate" },
        { label: "Low", count: counts.low, level: "low" },
      ];
      statLabels.forEach(({ label, count, level }, i) => {
        const x = margin + i * 55;
        const color = RISK_COLORS[level] ?? [200, 200, 200];
        const textColor = RISK_TEXT_COLORS[level] ?? [50, 50, 50];
        doc.setFillColor(...color);
        doc.roundedRect(x, 104, 50, 14, 2, 2, "F");
        doc.setTextColor(...textColor);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(String(count), x + 5, 114);
        doc.setFontSize(7);
        doc.text(label, x + 18, 114);
      });

      // ── Hazard Register Table ────────────────────────────────────────────
      doc.addPage();
      doc.setFillColor(220, 38, 38);
      doc.rect(0, 0, pageW, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("HAZARD REGISTER", margin, 8.5);

      const sortedHazards = [...assessment.hazards].sort((a, b) => b.riskScore - a.riskScore);

      const tableRows = sortedHazards.map((h, i) => [
        String(i + 1),
        h.categoryTitle,
        h.hazardDescription || "—",
        h.personsAtRisk || "—",
        h.existingControls || "—",
        `${h.likelihood}`,
        `${h.severity}`,
        `${h.riskScore}`,
        h.riskLevel.toUpperCase(),
        [...h.selectedControls, h.customControl].filter(Boolean).join("; ") || "—",
        `${h.residualScore}`,
        h.residualLevel.toUpperCase(),
        h.actionBy || "—",
        h.actionDate || "—",
      ]);

      autoTable(doc, {
        startY: 16,
        head: [["#", "Category", "Hazard", "Persons at Risk", "Existing Controls", "L", "S", "Score", "Risk Level", "Additional Controls", "Res. Score", "Res. Level", "Action By", "Target Date"]],
        body: tableRows,
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255], fontStyle: "bold" },
        columnStyles: {
          0: { cellWidth: 8 },
          1: { cellWidth: 28 },
          2: { cellWidth: 35 },
          3: { cellWidth: 25 },
          4: { cellWidth: 30 },
          5: { cellWidth: 8, halign: "center" },
          6: { cellWidth: 8, halign: "center" },
          7: { cellWidth: 12, halign: "center" },
          8: { cellWidth: 18, halign: "center" },
          9: { cellWidth: 40 },
          10: { cellWidth: 14, halign: "center" },
          11: { cellWidth: 16, halign: "center" },
          12: { cellWidth: 22 },
          13: { cellWidth: 18 },
        },
        didParseCell: (data) => {
          if (data.section === "body" && data.column.index === 8) {
            const level = (data.cell.raw as string).toLowerCase() as keyof typeof RISK_COLORS;
            if (RISK_COLORS[level]) {
              data.cell.styles.fillColor = RISK_COLORS[level];
              data.cell.styles.textColor = RISK_TEXT_COLORS[level];
              data.cell.styles.fontStyle = "bold";
            }
          }
          if (data.section === "body" && data.column.index === 11) {
            const level = (data.cell.raw as string).toLowerCase() as keyof typeof RISK_COLORS;
            if (RISK_COLORS[level]) {
              data.cell.styles.fillColor = RISK_COLORS[level];
              data.cell.styles.textColor = RISK_TEXT_COLORS[level];
            }
          }
        },
      });

      // ── Compliance Page ──────────────────────────────────────────────────
      doc.addPage();
      doc.setFillColor(220, 38, 38);
      doc.rect(0, 0, pageW, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`LEGAL COMPLIANCE — ${compliance.country.toUpperCase()}`, margin, 8.5);

      let y = 22;
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Applicable Legislation", margin, y);
      y += 6;
      compliance.legislation.forEach((leg) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);
        doc.text(`• ${leg}`, margin + 3, y);
        y += 5;
      });

      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      doc.text("Employer Obligations", margin, y);
      y += 6;
      compliance.employerObligations.forEach((ob) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(`• ${ob}`, pageW - margin * 2 - 5);
        doc.text(lines, margin + 3, y);
        y += lines.length * 5 + 2;
      });

      y += 4;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, y, pageW - margin * 2, 20, 2, 2, "F");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      const noteLines = doc.splitTextToSize(compliance.reportingNote, pageW - margin * 2 - 10);
      doc.text(noteLines, margin + 5, y + 7);

      // ── Footer on all pages ──────────────────────────────────────────────
      const totalPages = doc.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFillColor(245, 245, 245);
        doc.rect(0, pageH - 8, pageW, 8, "F");
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text("Workplace Risk Platform — Risk Assessment Builder", margin, pageH - 3);
        doc.text(`Page ${p} of ${totalPages}`, pageW - margin - 20, pageH - 3);
        doc.text("CONFIDENTIAL — For authorised use only", pageW / 2, pageH - 3, { align: "center" });
      }

      doc.save(`Risk-Assessment-${assessment.location.replace(/\s+/g, "-")}-${assessment.assessmentDate}.pdf`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Button onClick={generatePDF} disabled={generating} className="w-full bg-rose-600 hover:bg-rose-700 text-white">
      {generating ? (
        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating PDF...</>
      ) : (
        <><FileText className="w-4 h-4 mr-2" /> Download Risk Assessment PDF</>
      )}
    </Button>
  );
}
