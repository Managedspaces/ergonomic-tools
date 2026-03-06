/**
 * Home Office Risk Assessment — Compliance Templates
 * Country-specific regulatory frameworks for home/remote working.
 * Supports: DE, CH, DK, UK, IE, AU
 */

import type { ComplianceTemplate } from "@/lib/shared/types";

export const HOME_OFFICE_COMPLIANCE: Record<string, ComplianceTemplate> = {
  DE: {
    countryCode: "DE",
    countryName: "Germany",
    regulatoryFramework: "Arbeitsschutzgesetz (ArbSchG), Arbeitsstättenverordnung (ArbStättV), Homeoffice-Regelungen",
    regulatoryBody: "DGUV / BAuA / Gewerbeaufsichtsamt",
    keyRegulations: [
      "Arbeitsschutzgesetz (ArbSchG) §§ 5, 6 — Gefährdungsbeurteilung",
      "Arbeitsstättenverordnung (ArbStättV) § 2 Abs. 7 — Telearbeitsplätze",
      "DGUV Information 215-410 — Bildschirm- und Büroarbeitsplätze",
      "Arbeitszeitgesetz (ArbZG) — Arbeitszeitgrenzen im Homeoffice",
    ],
    assessmentFrequency: "Gefährdungsbeurteilung muss vor Aufnahme der Telearbeit und bei wesentlichen Änderungen durchgeführt werden.",
    employerObligations: [
      "Durchführung einer Gefährdungsbeurteilung für den Telearbeitsplatz",
      "Bereitstellung geeigneter Arbeitsmittel (Bildschirm, Stuhl, Schreibtisch)",
      "Sicherstellung der Einhaltung des Arbeitszeitgesetzes",
      "Unterweisung der Beschäftigten zu Sicherheit und Gesundheitsschutz",
      "Übernahme der Kosten für notwendige Arbeitsmittel",
    ],
    employeeRights: [
      "Anspruch auf geeignete Arbeitsmittel vom Arbeitgeber",
      "Recht auf Gefährdungsbeurteilung des Heimarbeitsplatzes",
      "Schutz durch das Arbeitszeitgesetz auch im Homeoffice",
      "Recht auf Unterweisung zu Sicherheitsthemen",
    ],
    documentationRequirements: [
      "Schriftliche Gefährdungsbeurteilung für den Telearbeitsplatz",
      "Dokumentation der Unterweisungen",
      "Nachweis der bereitgestellten Arbeitsmittel",
      "Wirksamkeitskontrolle der Schutzmaßnahmen",
    ],
    reportTitle: "Gefährdungsbeurteilung: Telearbeitsplatz / Homeoffice",
    reportSubtitle: "Gemäß ArbSchG § 5 und ArbStättV § 2 Abs. 7",
    legalDisclaimer: "Diese Beurteilung dient der Erfüllung der Dokumentationspflichten nach dem Arbeitsschutzgesetz. Sie ersetzt keine professionelle sicherheitstechnische Beratung.",
    terminology: {
      employee: "Beschäftigte/r",
      assessor: "Beurteilende/r",
      riskLevel: "Gefährdungsstufe",
      controlMeasures: "Schutzmaßnahmen",
      actionPlan: "Maßnahmenplan",
    },
  },

  CH: {
    countryCode: "CH",
    countryName: "Switzerland",
    regulatoryFramework: "Arbeitsgesetz (ArG), Verordnung 3 zum Arbeitsgesetz (ArGV 3), SUVA-Richtlinien",
    regulatoryBody: "SECO / SUVA / Kantonale Arbeitsinspektorate",
    keyRegulations: [
      "Arbeitsgesetz (ArG) Art. 6 — Gesundheitsschutz",
      "ArGV 3 Art. 2 — Ergonomie und Beleuchtung",
      "SUVA-Merkblatt 44073 — Telearbeit und Homeoffice",
      "Obligationenrecht (OR) Art. 328 — Fürsorgepflicht des Arbeitgebers",
    ],
    assessmentFrequency: "Risikobeurteilung bei Einführung von Homeoffice und bei wesentlichen Änderungen der Arbeitsbedingungen.",
    employerObligations: [
      "Sicherstellung geeigneter ergonomischer Arbeitsbedingungen im Homeoffice",
      "Bereitstellung oder Kostenbeteiligung für notwendige Arbeitsmittel",
      "Einhaltung der Arbeits- und Ruhezeitvorschriften",
      "Instruktion der Mitarbeitenden zu Sicherheit und Gesundheitsschutz",
      "Regelmässige Überprüfung der Homeoffice-Bedingungen",
    ],
    employeeRights: [
      "Anspruch auf geeignete Arbeitsmittel",
      "Schutz durch das Arbeitsgesetz auch bei Heimarbeit",
      "Recht auf Instruktion zu Sicherheitsthemen",
      "Anspruch auf Kostenbeteiligung des Arbeitgebers",
    ],
    documentationRequirements: [
      "Schriftliche Homeoffice-Vereinbarung",
      "Dokumentation der Risikobeurteilung",
      "Nachweis der Instruktionen",
      "Arbeitszeiterfassung",
    ],
    reportTitle: "Risikobeurteilung: Homeoffice-Arbeitsplatz",
    reportSubtitle: "Gemäss ArG Art. 6 und ArGV 3",
    legalDisclaimer: "Diese Beurteilung dient der Dokumentation des Gesundheitsschutzes gemäss Schweizer Arbeitsgesetz. Sie ersetzt keine fachkundige Beratung.",
    terminology: {
      employee: "Mitarbeitende/r",
      assessor: "Beurteilende/r",
      riskLevel: "Risikostufe",
      controlMeasures: "Schutzmassnahmen",
      actionPlan: "Massnahmenplan",
    },
  },

  DK: {
    countryCode: "DK",
    countryName: "Denmark",
    regulatoryFramework: "Arbejdsmiljøloven, Bekendtgørelse om hjemmearbejde, AT-vejledninger",
    regulatoryBody: "Arbejdstilsynet (AT)",
    keyRegulations: [
      "Arbejdsmiljøloven (LBK nr. 2062) § 15a — Hjemmearbejde",
      "Bekendtgørelse om arbejde ved skærmterminaler (BEK nr. 1108)",
      "AT-vejledning D.2.13 — Hjemmearbejde",
      "Arbejdstidslov — Arbejdstidsbegrænsninger",
    ],
    assessmentFrequency: "APV (arbejdspladsvurdering) skal gennemføres inden hjemmearbejde påbegyndes og revideres mindst hvert 3. år.",
    employerObligations: [
      "Udføre APV for hjemmearbejdspladsen",
      "Stille egnet arbejdsudstyr til rådighed",
      "Sikre overholdelse af arbejdstidsreglerne",
      "Give instruktion i sikkerhed og sundhed",
      "Dække udgifter til nødvendigt arbejdsudstyr",
    ],
    employeeRights: [
      "Ret til egnet arbejdsudstyr fra arbejdsgiver",
      "Beskyttelse under arbejdsmiljøloven ved hjemmearbejde",
      "Ret til APV af hjemmearbejdspladsen",
      "Ret til instruktion i sikkerhed",
    ],
    documentationRequirements: [
      "Skriftlig APV for hjemmearbejdspladsen",
      "Dokumentation af instruktioner",
      "Aftale om hjemmearbejde",
      "Registrering af arbejdstid",
    ],
    reportTitle: "Arbejdspladsvurdering: Hjemmearbejdsplads",
    reportSubtitle: "I henhold til Arbejdsmiljøloven § 15a",
    legalDisclaimer: "Denne vurdering opfylder dokumentationskravene i henhold til dansk arbejdsmiljølovgivning. Den erstatter ikke professionel rådgivning.",
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
    regulatoryFramework: "Health and Safety at Work Act 1974, DSE Regulations 1992, Management of Health & Safety at Work Regulations 1999",
    regulatoryBody: "Health and Safety Executive (HSE)",
    keyRegulations: [
      "Health and Safety at Work Act 1974 — General duties",
      "Health and Safety (Display Screen Equipment) Regulations 1992",
      "Management of Health and Safety at Work Regulations 1999 — Risk assessment",
      "Working Time Regulations 1998 — Hours and rest",
      "HSE Guidance: Homeworking — Guidance for employers and employees",
    ],
    assessmentFrequency: "DSE risk assessment required before home working begins and reviewed when significant changes occur or upon employee request.",
    employerObligations: [
      "Conduct and document a DSE risk assessment for the home workstation",
      "Provide suitable equipment or contribute to costs of home office equipment",
      "Ensure compliance with Working Time Regulations",
      "Provide training and information on DSE and home working safety",
      "Review the assessment regularly and when circumstances change",
    ],
    employeeRights: [
      "Right to a DSE workstation assessment at employer's expense",
      "Right to an eye test and contribution to corrective eyewear if required for DSE work",
      "Protection under Working Time Regulations including rest breaks",
      "Right to report unsafe working conditions without detriment",
    ],
    documentationRequirements: [
      "Written DSE risk assessment for the home workstation",
      "Record of training and information provided",
      "Documentation of equipment provided or cost contributions",
      "Review records when assessment is updated",
    ],
    reportTitle: "Home Working DSE Risk Assessment",
    reportSubtitle: "Under the Health and Safety (Display Screen Equipment) Regulations 1992",
    legalDisclaimer: "This assessment is for compliance documentation purposes under UK health and safety legislation. It does not constitute professional health and safety advice.",
    terminology: {
      employee: "Worker / Employee",
      assessor: "Assessor",
      riskLevel: "Risk Level",
      controlMeasures: "Control Measures",
      actionPlan: "Action Plan",
    },
  },

  IE: {
    countryCode: "IE",
    countryName: "Ireland",
    regulatoryFramework: "Safety, Health and Welfare at Work Act 2005, General Application Regulations 2007, Code of Practice for Employers and Employees on the Right to Disconnect",
    regulatoryBody: "Health and Safety Authority (HSA)",
    keyRegulations: [
      "Safety, Health and Welfare at Work Act 2005 — General duties",
      "Safety, Health and Welfare at Work (General Application) Regulations 2007 — Chapter 5 (Display Screen Equipment)",
      "HSA Guidance: Working from Home — A Guide for Employers and Employees",
      "Code of Practice for Employers and Employees on the Right to Disconnect 2021",
      "Organisation of Working Time Act 1997",
    ],
    assessmentFrequency: "Risk assessment required before remote working commences and reviewed when significant changes occur or at least annually.",
    employerObligations: [
      "Conduct a risk assessment of the remote workstation",
      "Provide or contribute to suitable home office equipment",
      "Ensure compliance with working time legislation and the Right to Disconnect",
      "Provide information and training on display screen equipment and remote working safety",
      "Establish a remote working policy covering health and safety responsibilities",
    ],
    employeeRights: [
      "Right to a workstation risk assessment",
      "Right to eye and eyesight tests at employer's expense",
      "Right to disconnect outside of normal working hours",
      "Protection under the Safety, Health and Welfare at Work Act",
    ],
    documentationRequirements: [
      "Written risk assessment for the remote workstation",
      "Remote working agreement or policy",
      "Record of training and information provided",
      "Documentation of equipment provided or allowances paid",
    ],
    reportTitle: "Remote Working Risk Assessment",
    reportSubtitle: "Under the Safety, Health and Welfare at Work (General Application) Regulations 2007",
    legalDisclaimer: "This assessment supports compliance with Irish health and safety legislation. It does not constitute professional safety advice. Consult the HSA for further guidance.",
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
    regulatoryFramework: "Work Health and Safety Act 2011 (Model WHS Act), Safe Work Australia — Working from Home Guidance",
    regulatoryBody: "Safe Work Australia / State and Territory WHS Regulators",
    keyRegulations: [
      "Work Health and Safety Act 2011 (Model WHS Act) — Primary duty of care",
      "Work Health and Safety Regulation 2017 — Hazard identification and risk management",
      "Safe Work Australia: Working from Home — A Guide",
      "Fair Work Act 2009 — Working arrangements",
    ],
    assessmentFrequency: "Risk assessment required before working from home commences and reviewed when work arrangements change significantly.",
    employerObligations: [
      "Conduct a risk assessment of the home workspace",
      "Provide or fund suitable work equipment for the home office",
      "Ensure workers are not exposed to unacceptable risks in their home workspace",
      "Provide information, training, and supervision appropriate to home working",
      "Consult with workers on health and safety matters",
    ],
    employeeRights: [
      "Right to a safe working environment, including when working from home",
      "Right to be consulted on health and safety matters",
      "Right to report unsafe conditions without adverse consequences",
      "Workers' compensation coverage for injuries sustained while working from home",
    ],
    documentationRequirements: [
      "Written risk assessment for the home workspace",
      "Working from home agreement",
      "Record of consultation with the worker",
      "Documentation of equipment provided or allowances",
    ],
    reportTitle: "Working from Home Risk Assessment",
    reportSubtitle: "Under the Work Health and Safety Act 2011",
    legalDisclaimer: "This assessment supports compliance with Australian work health and safety legislation. Requirements may vary by state or territory. Consult your relevant WHS regulator for jurisdiction-specific guidance.",
    terminology: {
      employee: "Worker",
      assessor: "Assessor",
      riskLevel: "Risk Level",
      controlMeasures: "Control Measures",
      actionPlan: "Action Plan",
    },
  },
};

export function getHomeOfficeCompliance(countryCode: string): ComplianceTemplate | null {
  return HOME_OFFICE_COMPLIANCE[countryCode.toUpperCase()] ?? null;
}
