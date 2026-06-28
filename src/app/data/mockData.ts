import type { ComplianceIssue, ExtractedData, PolicyRule } from "../types";

export const MOCK_EXTRACTED: ExtractedData = {
  caseId: "GOV-2024-08831",
  applicant: "Dr. Sarah Chen",
  organisation: "National Research Institute of Applied Sciences",
  amount: "$2,450,000",
  submittedDate: "12 June 2024",
  transactionType: "Research Grant",
  projectTitle: "Advanced Carbon Capture Technology for Industrial Applications",
  duration: "36 months",
  keyFacts: [
    "Applicant holds 14 peer-reviewed publications in carbon capture",
    "Proposal aligns with Green Economy Framework 2030 objectives",
    "Projected CO₂ reduction: 840,000 tonnes annually at scale",
    "Co-funded by TechVenture Corp at 20% match",
    "Ethics clearance: IRB/2024/0712 approved",
  ],
  rawJson: {
    case_id: "GOV-2024-08831",
    applicant: { name: "Dr. Sarah Chen", id: "NR-4421-C", orcid: "0000-0002-1825-0097" },
    organisation: { name: "National Research Institute of Applied Sciences", abn: "51 824 753 556" },
    financial: { requested: 2450000, currency: "AUD", co_funding: 490000, co_funder: "TechVenture Corp" },
    timeline: { submitted: "2024-06-12", start: "2024-09-01", end: "2027-08-31" },
    ethics_clearance: "IRB/2024/0712",
    keywords: ["carbon capture", "industrial emissions", "climate tech", "CCS"],
  },
};

export const MOCK_SUBMISSION = `CASE REFERENCE: GOV-2024-08831
TRANSACTION TYPE: Research Grant
PREPARED BY: AI Case Processing System · 18 June 2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BACKGROUND

The National Research Institute of Applied Sciences (NRIAS), through its lead investigator Dr. Sarah Chen, has submitted a grant application for the development of advanced carbon capture technology tailored for large-scale industrial deployment. NRIAS is a registered statutory body under the Research Institutions Act 2001, with an established track record of applied science contributions to national environmental and energy policy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT DETAILS

Project Title: Advanced Carbon Capture Technology for Industrial Applications
Requested Funding: AUD $2,450,000 (36-month duration)
Co-Funding Commitment: AUD $490,000 from TechVenture Corp (20% match ratio)

The project proposes development and pilot testing of a modular post-combustion capture system targeting cement and steel manufacturing sectors. The proposed solution targets a capture rate of 90% at an estimated cost of AUD $58 per tonne of CO₂ at commercial scale.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JUSTIFICATION

The proposal demonstrates strong alignment with the Green Economy Framework 2030 and the National Climate Action Plan's industrial decarbonisation targets. Dr. Chen's 14 peer-reviewed publications and two prior successfully delivered national grants establish high applicant credibility. The 20% co-funding commitment from an industry partner indicates commercial viability interest and reduces public funding risk. Ethics clearance (IRB/2024/0712) has been granted.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDATION

The Grants Assessment Division recommends CONDITIONAL APPROVAL of Case GOV-2024-08831, subject to:
  1. Submission of a detailed milestone schedule (M1–M9) within 30 days of approval
  2. Execution of a Co-Funding Agreement with TechVenture Corp prior to fund disbursement
  3. Quarterly progress reporting commencing Q4 2024

Funding to be disbursed in three tranches aligned to milestone completion.`;

export const MOCK_POLICY_RULES: PolicyRule[] = [
  {
    id: "P-001",
    rule: "All grant applications exceeding AUD $1,000,000 must include a co-funding commitment of at least 15% from non-government sources.",
    source: "National Grants Policy Framework 2023",
    section: "Section 4.2 — Major Grants",
  },
  {
    id: "P-002",
    rule: "Research involving human subjects or sensitive data must hold current ethics clearance from an accredited IRB prior to processing.",
    source: "Research Ethics and Integrity Regulations 2021",
    section: "Regulation 7(b)",
  },
  {
    id: "P-003",
    rule: "Lead investigators must demonstrate a minimum of five years active research output in the relevant domain.",
    source: "Applicant Eligibility Standards v4",
    section: "Clause 3.1 — Lead Investigator Criteria",
  },
  {
    id: "P-004",
    rule: "Industrial decarbonisation projects must demonstrate projected emissions reduction aligned with Green Economy Framework 2030 targets.",
    source: "Green Economy Framework 2030",
    section: "Appendix B — Eligible Research Domains",
  },
  {
    id: "P-005",
    rule: "Grant duration for technology development projects must not exceed 48 months without additional ministerial approval.",
    source: "National Grants Policy Framework 2023",
    section: "Section 6.1 — Project Duration",
  },
];

export const MOCK_COMPLIANCE_PASS = {
  status: "pass" as const,
  score: 96,
  checkedAt: "18 June 2024 · 14:32 AEST",
  passedChecks: [
    "Co-funding ratio meets 20% threshold (≥15% required)",
    "Ethics clearance IRB/2024/0712 is current and valid",
    "Lead investigator meets domain publication requirements",
    "Project duration (36 months) within permitted maximum",
    "Emissions reduction target meets GEF 2030 alignment criteria",
  ],
  nextActions: [
    "Forward to Grants Assessment Division for panel review",
    "Issue conditional approval letter with three listed conditions",
    "Schedule co-funding agreement execution within 14 days",
    "Create milestone monitoring record in GAMS",
  ],
};

export const MOCK_COMPLIANCE_FAIL = {
  status: "fail" as const,
  score: 61,
  checkedAt: "18 June 2024 · 14:32 AEST",
  issues: [
    {
      code: "E-101",
      description: "Co-funding documentation is incomplete — TechVenture Corp commitment letter not attached.",
      recommendation: "Request co-funding letter on company letterhead, signed by CFO, within 10 business days.",
    },
    {
      code: "E-204",
      description: "Project budget breakdown does not itemise indirect costs separately as required under Section 5.3.",
      recommendation: "Return submission for revised budget schedule with indirect cost line-items disaggregated.",
    },
  ] as ComplianceIssue[],
  warnings: [
    "Milestone schedule not provided — required within 30 days of approval",
    "IP ownership clause not addressed in project plan",
  ],
};
