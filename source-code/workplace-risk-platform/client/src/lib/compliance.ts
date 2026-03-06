/**
 * Country-Specific Compliance Framework
 * Supports: DE, CH, DK, UK, IE, AU
 */

export interface ComplianceTemplate {
  countryCode: string;
  countryName: string;
  regulatoryFramework: string;
  regulatoryBody: string;
  keyRegulations: string[];
  assessmentFrequency: string;
  employerObligations: string[];
  employeeRights: string[];
  documentationRequirements: string[];
  reportTitle: string;
  reportSubtitle: string;
  legalDisclaimer: string;
  terminology: {
    employee: string;
    assessor: string;
    riskLevel: string;
    controlMeasures: string;
    actionPlan: string;
  };
}

export const COMPLIANCE_TEMPLATES: Record<string, ComplianceTemplate> = {
  DE: {
    countryCode: "DE",
    countryName: "Germany",
    regulatoryFramework: "Arbeitsschutzgesetz (ArbSchG) & Arbeitsstättenverordnung (ArbStättV)",
    regulatoryBody: "DGUV / BAuA",
    keyRegulations: [
      "Arbeitsschutzgesetz (ArbSchG) §§ 5, 6",
      "Arbeitsstättenverordnung (ArbStättV) § 3, Anhang 6",
      "DGUV Information 215-410",
    ],
    assessmentFrequency: "Must be reviewed regularly (typically annually) and updated when significant changes occur.",
    employerObligations: [
      "Conduct and document risk assessments (Gefährdungsbeurteilung) for all workstations",
      "Provide suitable work equipment meeting minimum ergonomic requirements",
      "Offer eye examinations and corrective appliances for DSE workers",
      "Ensure adequate breaks from screen work",
      "Implement identified control measures within documented timelines",
    ],
    employeeRights: [
      "Right to a workstation risk assessment",
      "Right to eye and eyesight tests at employer's expense",
      "Right to special corrective appliances if needed for DSE work",
      "Right to information about health and safety measures",
    ],
    documentationRequirements: [
      "Written Gefährdungsbeurteilung with identified hazards",
      "Documented control measures and implementation timeline",
      "Effectiveness review (Wirksamkeitskontrolle) records",
      "Employee consultation documentation",
    ],
    reportTitle: "Gefährdungsbeurteilung: Bildschirmarbeitsplatz",
    reportSubtitle: "Nach § 5 ArbSchG und Anhang 6 ArbStättV",
    legalDisclaimer: "Diese Beurteilung wurde als Selbstbewertung durchgeführt und dient als Grundlage für die gesetzlich vorgeschriebene Gefährdungsbeurteilung gemäß § 5 ArbSchG. Sie ersetzt nicht die Pflicht des Arbeitgebers zur professionellen Gefährdungsbeurteilung.",
    terminology: {
      employee: "Beschäftigte(r)",
      assessor: "Beurteiler",
      riskLevel: "Gefährdungsstufe",
      controlMeasures: "Schutzmaßnahmen",
      actionPlan: "Maßnahmenplan",
    },
  },
  CH: {
    countryCode: "CH",
    countryName: "Switzerland",
    regulatoryFramework: "Arbeitsgesetz (ArG) & Verordnung 3 (ArGV 3)",
    regulatoryBody: "SECO / SUVA",
    keyRegulations: [
      "Arbeitsgesetz (ArG)",
      "Verordnung 3 zum Arbeitsgesetz (ArGV 3), Art. 23 & 24",
      "SECO Wegleitung zur ArGV 3",
    ],
    assessmentFrequency: "Regularly, or when significant changes to the workstation or work processes occur.",
    employerObligations: [
      "Ensure health protection at the workplace (Gesundheitsschutz)",
      "Provide ergonomic workstations meeting ArGV 3 requirements",
      "Conduct workplace assessments for screen work",
      "Implement preventive measures for identified risks",
    ],
    employeeRights: [
      "Right to a healthy and safe workplace",
      "Right to participate in workplace health measures",
      "Right to information about workplace hazards",
    ],
    documentationRequirements: [
      "Arbeitsplatzbeurteilung documentation",
      "Risk assessment records",
      "Implemented measures documentation",
    ],
    reportTitle: "Arbeitsplatzbeurteilung: Bildschirmarbeit",
    reportSubtitle: "Gemäss Arbeitsgesetz (ArG) und Verordnung 3 (ArGV 3)",
    legalDisclaimer: "Diese Dokumentation dient dem Nachweis der Einhaltung der Vorschriften zum Gesundheitsschutz am Arbeitsplatz gemäss ArG und ArGV 3.",
    terminology: {
      employee: "Arbeitnehmer",
      assessor: "Beurteiler",
      riskLevel: "Risikostufe",
      controlMeasures: "Massnahmen",
      actionPlan: "Massnahmenplan",
    },
  },
  DK: {
    countryCode: "DK",
    countryName: "Denmark",
    regulatoryFramework: "Arbejdsmiljøloven (Working Environment Act)",
    regulatoryBody: "Arbejdstilsynet",
    keyRegulations: [
      "Arbejdsmiljøloven (Consolidated Act No. 268)",
      "Bekendtgørelse om arbejde ved skærmterminaler (nr. 1108)",
    ],
    assessmentFrequency: "At least every three years, or when changes affect the working environment.",
    employerObligations: [
      "Conduct APV (Arbejdspladsvurdering) with employee involvement",
      "Ensure workstations meet minimum requirements for screen work",
      "Provide eye examinations for screen workers",
      "Involve health and safety organization in assessments",
    ],
    employeeRights: [
      "Right to participate in workplace assessment process",
      "Right to eye examinations at employer's expense",
      "Right to appropriate corrective appliances",
      "Right to adequate breaks from screen work",
    ],
    documentationRequirements: [
      "APV (Arbejdspladsvurdering) documentation",
      "Employee involvement records",
      "Action plan with timelines",
      "Follow-up assessment records",
    ],
    reportTitle: "Arbejdspladsvurdering (APV): Skærmterminalarbejdsplads",
    reportSubtitle: "I henhold til Arbejdsmiljøloven og Bekendtgørelse nr. 1108",
    legalDisclaimer: "Denne APV er udarbejdet i samarbejde mellem ledelse og medarbejdere som et led i virksomhedens systematiske arbejdsmiljøarbejde.",
    terminology: {
      employee: "Medarbejder",
      assessor: "Vurderer",
      riskLevel: "Risikoniveau",
      controlMeasures: "Forebyggende foranstaltninger",
      actionPlan: "Handlingsplan",
    },
  },
  UK: {
    countryCode: "UK",
    countryName: "United Kingdom",
    regulatoryFramework: "Health and Safety (Display Screen Equipment) Regulations 1992",
    regulatoryBody: "Health and Safety Executive (HSE)",
    keyRegulations: [
      "Health and Safety (Display Screen Equipment) Regulations 1992 (as amended 2002)",
      "Management of Health and Safety at Work Regulations 1999",
    ],
    assessmentFrequency: "When a new workstation is set up, a new user starts, substantial changes are made, or users complain of discomfort.",
    employerObligations: [
      "Analyse workstations to assess and reduce risks",
      "Ensure workstations meet minimum requirements in the Schedule",
      "Plan work activities to include breaks or changes of activity",
      "Provide eye and eyesight tests on request",
      "Provide training and information to DSE users",
    ],
    employeeRights: [
      "Right to a workstation assessment",
      "Right to eye and eyesight tests",
      "Right to corrective appliances if needed for DSE work",
      "Right to breaks from DSE work",
      "Right to health and safety training",
    ],
    documentationRequirements: [
      "DSE Workstation Assessment Record",
      "Risk assessment findings",
      "Remedial action plan",
      "Training records",
    ],
    reportTitle: "DSE Workstation Assessment Record",
    reportSubtitle: "In compliance with Health and Safety (Display Screen Equipment) Regulations 1992",
    legalDisclaimer: "This document serves as a record of a suitable and sufficient analysis of the user's workstation as required by Regulation 2 of the Health and Safety (Display Screen Equipment) Regulations 1992.",
    terminology: {
      employee: "User",
      assessor: "Assessor",
      riskLevel: "Risk Rating",
      controlMeasures: "Remedial Action",
      actionPlan: "Action Plan",
    },
  },
  IE: {
    countryCode: "IE",
    countryName: "Ireland",
    regulatoryFramework: "Safety, Health and Welfare at Work (General Application) Regulations 2007",
    regulatoryBody: "Health and Safety Authority (HSA)",
    keyRegulations: [
      "Safety, Health and Welfare at Work Act 2005",
      "General Application Regulations 2007, Part 2, Chapter 5",
      "Schedule 4: Minimum Requirements for all Display Screen Equipment",
    ],
    assessmentFrequency: "Before commencing DSE work, at regular intervals, or when significant changes occur.",
    employerObligations: [
      "Analyse workstations to evaluate safety and health conditions",
      "Ensure workstations meet Schedule 4 minimum requirements",
      "Plan daily work routine to include periodic breaks",
      "Provide eye and eyesight tests",
      "Provide appropriate training",
    ],
    employeeRights: [
      "Right to workstation analysis",
      "Right to eye and eyesight tests",
      "Right to special corrective appliances",
      "Right to breaks from DSE work",
    ],
    documentationRequirements: [
      "Workstation Risk Assessment record",
      "Schedule 4 compliance check",
      "Action plan documentation",
    ],
    reportTitle: "Workstation Risk Assessment (DSE/VDU)",
    reportSubtitle: "Safety, Health and Welfare at Work (General Application) Regulations 2007",
    legalDisclaimer: "This assessment confirms that the minimum requirements from Schedule 4 have been considered in accordance with the General Application Regulations 2007.",
    terminology: {
      employee: "Employee",
      assessor: "Assessor",
      riskLevel: "Risk Level",
      controlMeasures: "Control Measures",
      actionPlan: "Action Plan",
    },
  },
  AU: {
    countryCode: "AU",
    countryName: "Australia",
    regulatoryFramework: "Work Health and Safety Act 2011",
    regulatoryBody: "Safe Work Australia / State Regulator",
    keyRegulations: [
      "Work Health and Safety Act 2011, Section 19",
      "Work Health and Safety Regulations 2011, Chapter 4, Part 4.2",
      "Model Code of Practice: Hazardous manual tasks",
    ],
    assessmentFrequency: "Regularly reviewed, especially when new hazards are identified or before significant workplace changes.",
    employerObligations: [
      "Ensure health and safety of workers so far as reasonably practicable",
      "Identify hazards and assess risks associated with manual tasks",
      "Implement control measures using the hierarchy of controls",
      "Provide information, training, instruction, and supervision",
      "Consult with workers on health and safety matters",
    ],
    employeeRights: [
      "Right to a safe working environment",
      "Right to be consulted on health and safety matters",
      "Right to cease unsafe work",
      "Right to health and safety training",
    ],
    documentationRequirements: [
      "WHS Risk Assessment Record",
      "Hazard identification documentation",
      "Risk management plan with hierarchy of controls",
      "Worker consultation records",
    ],
    reportTitle: "WHS Risk Assessment Record: Office Ergonomics",
    reportSubtitle: "In accordance with the Work Health and Safety Act 2011",
    legalDisclaimer: "This record documents the risk management process undertaken by the PCBU to identify, assess, and control risks associated with hazardous manual tasks in accordance with the WHS Act 2011.",
    terminology: {
      employee: "Worker",
      assessor: "Assessor",
      riskLevel: "Risk Level",
      controlMeasures: "Control Measures",
      actionPlan: "Risk Management Plan",
    },
  },
};

export const SUPPORTED_COUNTRIES = Object.values(COMPLIANCE_TEMPLATES).map((t) => ({
  code: t.countryCode,
  name: t.countryName,
}));

export function getComplianceTemplate(countryCode: string): ComplianceTemplate | null {
  return COMPLIANCE_TEMPLATES[countryCode] || null;
}
