export type TransactionType = "grant" | "license" | "approval" | "permit" | "exemption";
export type ProcessingStage = "idle" | "extracting" | "drafting" | "policy" | "compliance" | "done";
export type ComplianceStatus = "pass" | "fail";
export type ActiveTab = "extract" | "draft" | "policy" | "compliance";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface ExtractedData {
  caseId: string;
  applicant: string;
  organisation: string;
  amount: string;
  submittedDate: string;
  transactionType: string;
  projectTitle: string;
  duration: string;
  keyFacts: string[];
  rawJson: object;
}

export interface PolicyRule {
  id: string;
  rule: string;
  source: string;
  section: string;
}

export interface ComplianceIssue {
  code: string;
  description: string;
  recommendation: string;
}

export interface WorkflowState {
  files: UploadedFile[];
  transactionType: TransactionType | "";
  stage: ProcessingStage;
  activeTab: ActiveTab;
  showRawJson: boolean;
  complianceMode: ComplianceStatus;
  copied: boolean;
  caseId: string;
}
