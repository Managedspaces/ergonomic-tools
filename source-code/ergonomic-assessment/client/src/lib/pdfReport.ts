/**
 * PDF Report Generation — Employee & Employer Reports
 * Uses jsPDF + jspdf-autotable for client-side PDF generation
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { AssessmentResult, Recommendation } from "./scoring";
import type { EmployeeInfo } from "@/contexts/AssessmentContext";
import type { ComplianceTemplate } from "./compliance";
import type { QuestionResponse } from "./scoring";
import { CATEGORIES } from "./questionnaire";
import { getActionTimeline } from "./scoring";

// Colors
const NAVY = [27, 42, 74] as const;
const WHITE = [255, 255, 255] as const;
const LIGHT_BG = [250, 250, 248] as const;
const RISK_COLORS: Record<string, readonly [number, number, number]> = {
  low: [45, 106, 79],
  moderate: [212, 160, 23],
  high: [196, 69, 54],
  critical: [155, 34, 38],
};

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  // Navy header bar
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(...WHITE);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(title, 15, 15);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, 15, 23);

  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, 15, 30);
}

function addFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const y = 285;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y - 3, 195, y - 3);
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(7);
  doc.text("Ergonomic Risk Self-Assessment Tool — For informational purposes only. Does not constitute medical advice.", 15, y);
  doc.text(`Page ${pageNum} of ${totalPages}`, 195, y, { align: "right" });
}

function addSectionTitle(doc: jsPDF, y: number, title: string): number {
  doc.setFillColor(...NAVY);
  doc.rect(15, y, 3, 8, "F");
  doc.setTextColor(...NAVY);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(title, 22, y + 6);
  return y + 14;
}

function checkPageBreak(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > 270) {
    doc.addPage();
    return 15;
  }
  return y;
}

// ==================== EMPLOYEE REPORT ====================

export function generateEmployeePDF(
  result: AssessmentResult,
  info: EmployeeInfo,
  responses: QuestionResponse[],
  compliance: ComplianceTemplate | null,
  photoDataUrl: string | null
) {
  const doc = new jsPDF();

  addHeader(doc, "Ergonomic Assessment Report", `Personalized report for ${info.name}`);

  let y = 45;

  // Employee Info
  y = addSectionTitle(doc, y, "Employee Information");

  autoTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 45, textColor: NAVY as any } },
    body: [
      ["Name", info.name],
      ["Email", info.email],
      ["Job Title", info.jobTitle || "Not specified"],
      ["Department", info.department || "Not specified"],
      ["Work Location", info.workLocation.charAt(0).toUpperCase() + info.workLocation.slice(1)],
      ["Country", compliance?.countryName || info.country],
      ["Assessment Date", new Date().toLocaleDateString("en-GB")],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Overall Score
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, "Overall Risk Assessment");

  const rColor = RISK_COLORS[result.overallRating] || NAVY;

  doc.setFillColor(rColor[0], rColor[1], rColor[2]);
  doc.roundedRect(15, y, 180, 25, 3, 3, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${result.overallScore.toFixed(1)} / 100`, 25, y + 11);
  doc.setFontSize(12);
  doc.text(result.overallRatingLabel, 25, y + 20);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(getActionTimeline(result.overallRating), 120, y + 16);

  y += 35;

  // Category Scores
  y = checkPageBreak(doc, y, 60);
  y = addSectionTitle(doc, y, "Category Breakdown");

  const catRows = result.categoryScores.map((cs) => [
    cs.categoryTitle,
    `${cs.score.toFixed(1)}`,
    cs.ratingLabel,
    `${cs.answeredCount}/${cs.questionCount}`,
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    head: [["Category", "Score", "Rating", "Questions"]],
    body: catRows,
    theme: "striped",
    headStyles: { fillColor: NAVY as any, fontSize: 9, fontStyle: "bold" },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      1: { halign: "center", fontStyle: "bold" },
      2: { halign: "center" },
      3: { halign: "center" },
    },
    didParseCell: (data: any) => {
      if (data.section === "body" && data.column.index === 2) {
        const rating = result.categoryScores[data.row.index]?.rating;
        if (rating && RISK_COLORS[rating]) {
          data.cell.styles.textColor = RISK_COLORS[rating];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Recommendations
  if (result.recommendations.length > 0) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionTitle(doc, y, "Recommendations & Action Plan");

    const recRows = result.recommendations.map((rec) => [
      rec.priority.toUpperCase(),
      rec.categoryTitle,
      rec.text,
    ]);

    autoTable(doc, {
      startY: y,
      margin: { left: 15, right: 15 },
      head: [["Priority", "Category", "Recommendation"]],
      body: recRows,
      theme: "striped",
      headStyles: { fillColor: NAVY as any, fontSize: 8, fontStyle: "bold" },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 22, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 35 },
      },
      didParseCell: (data: any) => {
        if (data.section === "body" && data.column.index === 0) {
          const priority = result.recommendations[data.row.index]?.priority;
          if (priority && RISK_COLORS[priority === "medium" ? "moderate" : priority]) {
            data.cell.styles.textColor = RISK_COLORS[priority === "medium" ? "moderate" : priority];
          }
        }
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // Category-specific recommendations
  for (const cs of result.categoryScores) {
    if (cs.recommendations.length === 0) continue;

    y = checkPageBreak(doc, y, 30);

    doc.setTextColor(...NAVY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${cs.categoryTitle} — ${cs.ratingLabel}`, 15, y);
    y += 6;

    for (const rec of cs.recommendations) {
      y = checkPageBreak(doc, y, 10);
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(`• ${rec}`, 170);
      doc.text(lines, 20, y);
      y += lines.length * 4 + 2;
    }
    y += 4;
  }

  // Disclaimer
  y = checkPageBreak(doc, y, 20);
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y, 195, y);
  y += 5;
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  const disclaimer = "This assessment is a self-evaluation tool and does not constitute a professional ergonomic assessment or medical diagnosis. It is intended to identify potential ergonomic risks and provide general recommendations. For specific health concerns, please consult a qualified occupational health professional.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, 170);
  doc.text(disclaimerLines, 15, y);

  // Add page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(`ergonomic-assessment-${info.name.replace(/\s+/g, "-").toLowerCase()}-employee.pdf`);
}

// ==================== EMPLOYER REPORT ====================

export function generateEmployerPDF(
  result: AssessmentResult,
  info: EmployeeInfo,
  responses: QuestionResponse[],
  compliance: ComplianceTemplate | null
) {
  const doc = new jsPDF();

  const title = compliance?.reportTitle || "Ergonomic Risk Assessment Report";
  const subtitle = compliance?.reportSubtitle || "Workplace Ergonomic Assessment";

  addHeader(doc, title, subtitle);

  let y = 45;

  // Document metadata
  y = addSectionTitle(doc, y, "Document Information");

  const term = compliance?.terminology;

  autoTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 55, textColor: NAVY as any } },
    body: [
      ["Assessment ID", `ERA-${Date.now().toString(36).toUpperCase()}`],
      ["Assessment Date", new Date().toLocaleDateString("en-GB")],
      ["Regulatory Framework", compliance?.regulatoryFramework || "General"],
      ["Regulatory Body", compliance?.regulatoryBody || "N/A"],
      [term?.assessor || "Assessor", "Self-Assessment (System-Generated Analysis)"],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Subject Profile
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, `${term?.employee || "Employee"} Profile`);

  autoTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 45, textColor: NAVY as any } },
    body: [
      ["Name", info.name],
      ["Role", info.jobTitle || "Not specified"],
      ["Department", info.department || "Not specified"],
      ["Work Location", info.workLocation.charAt(0).toUpperCase() + info.workLocation.slice(1)],
      ["Jurisdiction", compliance?.countryName || info.country],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Executive Summary
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, "Executive Summary");

  const rColor = RISK_COLORS[result.overallRating] || NAVY;
  doc.setFillColor(rColor[0], rColor[1], rColor[2]);
  doc.roundedRect(15, y, 180, 20, 3, 3, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Overall ${term?.riskLevel || "Risk Rating"}: ${result.overallRatingLabel} (${result.overallScore.toFixed(1)}/100)`, 25, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(getActionTimeline(result.overallRating), 25, y + 15);

  y += 28;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  const summaryText = `This ${term?.employee?.toLowerCase() || "employee"} self-assessment has been conducted in accordance with the ${compliance?.regulatoryFramework || "applicable workplace health and safety regulations"}. The assessment evaluates six key ergonomic risk categories and produces a weighted overall risk score. The overall risk rating of "${result.overallRatingLabel}" indicates that ${getActionTimeline(result.overallRating).toLowerCase()}.`;
  const summaryLines = doc.splitTextToSize(summaryText, 170);
  doc.text(summaryLines, 15, y);
  y += summaryLines.length * 4 + 8;

  // Risk Evaluation Matrix
  y = checkPageBreak(doc, y, 60);
  y = addSectionTitle(doc, y, `${term?.riskLevel || "Risk"} Evaluation Matrix`);

  const matrixRows = result.categoryScores.map((cs) => [
    cs.categoryTitle,
    `${cs.score.toFixed(1)}`,
    cs.ratingLabel,
    getActionTimeline(cs.rating),
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    head: [["Category", "Score", term?.riskLevel || "Risk Level", "Required Action"]],
    body: matrixRows,
    theme: "striped",
    headStyles: { fillColor: NAVY as any, fontSize: 8, fontStyle: "bold" },
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      1: { halign: "center", fontStyle: "bold" },
      2: { halign: "center" },
    },
    didParseCell: (data: any) => {
      if (data.section === "body" && data.column.index === 2) {
        const rating = result.categoryScores[data.row.index]?.rating;
        if (rating && RISK_COLORS[rating]) {
          data.cell.styles.textColor = RISK_COLORS[rating];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Action Plan
  if (result.recommendations.length > 0) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionTitle(doc, y, term?.actionPlan || "Action Plan");

    const actionRows = result.recommendations.map((rec) => {
      const responsibility = rec.priority === "critical" || rec.priority === "high"
        ? "Employer Action"
        : "Employee Action";
      return [
        rec.priority.toUpperCase(),
        rec.categoryTitle,
        rec.text,
        responsibility,
      ];
    });

    autoTable(doc, {
      startY: y,
      margin: { left: 15, right: 15 },
      head: [["Priority", "Category", term?.controlMeasures || "Control Measure", "Responsibility"]],
      body: actionRows,
      theme: "striped",
      headStyles: { fillColor: NAVY as any, fontSize: 8, fontStyle: "bold" },
      styles: { fontSize: 7, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 18, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 30 },
        3: { cellWidth: 25, halign: "center" },
      },
      didParseCell: (data: any) => {
        if (data.section === "body" && data.column.index === 0) {
          const priority = result.recommendations[data.row.index]?.priority;
          if (priority && RISK_COLORS[priority === "medium" ? "moderate" : priority]) {
            data.cell.styles.textColor = RISK_COLORS[priority === "medium" ? "moderate" : priority];
          }
        }
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // Legal References
  if (compliance) {
    y = checkPageBreak(doc, y, 40);
    y = addSectionTitle(doc, y, "Legal References & Compliance");

    autoTable(doc, {
      startY: y,
      margin: { left: 15, right: 15 },
      theme: "plain",
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50, textColor: NAVY as any } },
      body: [
        ["Regulatory Framework", compliance.regulatoryFramework],
        ["Regulatory Body", compliance.regulatoryBody],
        ["Key Regulations", compliance.keyRegulations.join("; ")],
        ["Assessment Frequency", compliance.assessmentFrequency],
      ],
    });

    y = (doc as any).lastAutoTable.finalY + 8;

    // Employer Obligations
    y = checkPageBreak(doc, y, 30);
    doc.setTextColor(...NAVY);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Employer Obligations:", 15, y);
    y += 5;

    for (const obl of compliance.employerObligations) {
      y = checkPageBreak(doc, y, 8);
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(`• ${obl}`, 170);
      doc.text(lines, 20, y);
      y += lines.length * 4 + 1;
    }

    y += 4;

    // Employee Rights
    y = checkPageBreak(doc, y, 30);
    doc.setTextColor(...NAVY);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${term?.employee || "Employee"} Rights:`, 15, y);
    y += 5;

    for (const right of compliance.employeeRights) {
      y = checkPageBreak(doc, y, 8);
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(`• ${right}`, 170);
      doc.text(lines, 20, y);
      y += lines.length * 4 + 1;
    }
  }

  // Signature Block
  y = checkPageBreak(doc, y + 10, 40);
  y = addSectionTitle(doc, y, "Signatures & Verification");

  y += 5;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(8);

  doc.text(`${term?.employee || "Employee"} Self-Assessment Completed:`, 15, y);
  y += 12;
  doc.line(15, y, 90, y);
  doc.text(`${info.name}`, 15, y + 5);
  doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 15, y + 10);

  doc.text("Management Review:", 110, y - 12);
  doc.line(110, y, 195, y);
  doc.text("Name: ___________________", 110, y + 5);
  doc.text("Date: ___________________", 110, y + 10);

  y += 20;

  // Legal Disclaimer
  y = checkPageBreak(doc, y, 20);
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y, 195, y);
  y += 5;
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  const disclaimer = compliance?.legalDisclaimer ||
    "This assessment is a self-evaluation tool and does not replace a professional ergonomic assessment. It serves as documentation for the employer's risk assessment obligations.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, 170);
  doc.text(disclaimerLines, 15, y);

  // Add page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(`ergonomic-assessment-${info.name.replace(/\s+/g, "-").toLowerCase()}-employer.pdf`);
}
