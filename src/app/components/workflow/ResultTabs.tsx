import { AlertCircle, ArrowRight, BookOpen, ClipboardList, Copy, Download, Eye, EyeOff, ExternalLink, FileText, RefreshCw, Shield, XCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "../shared/Badge";
import { useCaseWorkflow } from "../../providers/CaseWorkflowProvider";
import { MOCK_EXTRACTED, MOCK_POLICY_RULES, MOCK_SUBMISSION } from "../../data/mockData";
import type { ActiveTab } from "../../types";

export function ResultTabs() {
  const { activeTab, setActiveTab, showRawJson, toggleRawJson, compliance, copied, copySubmission, caseId } = useCaseWorkflow();
  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: "extract", label: "Extracted Data", icon: <ClipboardList size={14} /> },
    { id: "draft", label: "Submission", icon: <FileText size={14} /> },
    { id: "policy", label: "Policy Guidance", icon: <BookOpen size={14} /> },
    { id: "compliance", label: "Compliance", icon: <Shield size={14} /> },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-semibold transition-colors ${activeTab === tab.id ? "border-primary bg-accent/20 text-primary" : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
              {tab.icon}
              {tab.label}
              {tab.id === "compliance" && <span className={`ml-1 h-1.5 w-1.5 rounded-full ${compliance.status === "pass" ? "bg-emerald-500" : "bg-red-500"}`} />}
            </button>
          ))}
        </div>

        {activeTab === "extract" && (
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Extracted Case Data</h3>
                <p className="mt-0.5 text-xs font-mono text-muted-foreground">AI-parsed fields from uploaded documents</p>
              </div>
              <button onClick={toggleRawJson} className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {showRawJson ? <EyeOff size={12} /> : <Eye size={12} />}
                {showRawJson ? "Hide" : "View"} Raw JSON
              </button>
            </div>

            {showRawJson ? (
              <pre className="overflow-x-auto rounded-md border border-border bg-muted/50 p-4 text-[11px] font-mono leading-relaxed text-foreground">{JSON.stringify(MOCK_EXTRACTED.rawJson, null, 2)}</pre>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Case ID", value: MOCK_EXTRACTED.caseId },
                  { label: "Transaction Type", value: MOCK_EXTRACTED.transactionType },
                  { label: "Applicant", value: MOCK_EXTRACTED.applicant },
                  { label: "Organisation", value: MOCK_EXTRACTED.organisation },
                  { label: "Requested Amount", value: MOCK_EXTRACTED.amount },
                  { label: "Submitted", value: MOCK_EXTRACTED.submittedDate },
                  { label: "Duration", value: MOCK_EXTRACTED.duration },
                  { label: "Project Title", value: MOCK_EXTRACTED.projectTitle },
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-1 rounded-md bg-secondary/40 px-3 py-2.5">
                    <p className="mb-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="text-xs font-semibold text-foreground">{value}</p>
                  </div>
                ))}

                <div className="col-span-2 rounded-md bg-secondary/40 px-3 py-2.5">
                  <p className="mb-2 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground">Key Facts</p>
                  <ul className="flex flex-col gap-1.5">
                    {MOCK_EXTRACTED.keyFacts.map((fact, index) => (
                      <li key={fact} className="flex items-start gap-2 text-xs text-foreground">
                        <span className="mt-0.5 flex-shrink-0 font-mono font-semibold text-primary">{(index + 1).toString().padStart(2, "0")}</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "draft" && (
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Generated Submission</h3>
                <p className="mt-0.5 text-xs font-mono text-muted-foreground">AI-drafted formal case submission for officer review</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => void copySubmission()} className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Copy size={12} />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  <RefreshCw size={12} />
                  Regenerate
                </button>
              </div>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-4 text-[11.5px] font-mono leading-[1.85] text-foreground">{MOCK_SUBMISSION}</pre>
          </div>
        )}

        {activeTab === "policy" && (
          <div className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Policy Guidance</h3>
              <p className="mt-0.5 text-xs font-mono text-muted-foreground">Retrieved via RAG from the Policy Knowledge Base · {MOCK_POLICY_RULES.length} rules matched</p>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_POLICY_RULES.map((rule) => (
                <div key={rule.id} className="rounded-lg border border-border bg-secondary/20 p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <Badge variant="info">{rule.id}</Badge>
                    <button className="text-muted-foreground transition-colors hover:text-primary">
                      <ExternalLink size={12} />
                    </button>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-foreground">{rule.rule}</p>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-mono font-semibold text-primary">{rule.source}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{rule.section}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="p-5">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">Compliance Check</h3>
                <p className="mt-0.5 text-xs font-mono text-muted-foreground">Checked: {compliance.checkedAt}</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <RefreshCw size={12} />
                Re-check
              </button>
            </div>

            {compliance.status === "pass" ? (
              <div className="mb-5 flex items-center gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 size={22} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="text-sm font-bold tracking-wide text-emerald-700">COMPLIANCE: PASS</span>
                    <Badge variant="success">Score: {compliance.score}/100</Badge>
                  </div>
                  <p className="text-xs text-emerald-600">All {compliance.passedChecks?.length} compliance checks passed. Case is cleared for conditional approval.</p>
                </div>
              </div>
            ) : (
              <div className="mb-5 flex items-center gap-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <XCircle size={22} className="text-red-600" />
                </div>
                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="text-sm font-bold tracking-wide text-red-700">COMPLIANCE: FAIL</span>
                    <Badge variant="danger">Score: {compliance.score}/100</Badge>
                  </div>
                  <p className="text-xs text-red-600">{compliance.issues?.length} critical issues found. Case cannot proceed until resolved.</p>
                </div>
              </div>
            )}

            {compliance.status === "pass" && (
              <>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold">Checks Passed</p>
                  <div className="flex flex-col gap-1.5">
                    {compliance.passedChecks?.map((check) => (
                      <div key={check} className="flex items-start gap-2 text-xs text-foreground">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                        {check}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="mb-2 text-xs font-semibold text-blue-700">Recommended Next Actions</p>
                  <ol className="flex flex-col gap-1.5">
                    {compliance.nextActions?.map((action, index) => (
                      <li key={action} className="flex items-start gap-2 text-xs text-blue-700">
                        <span className="flex-shrink-0 font-mono font-semibold">{index + 1}.</span>
                        {action}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            {compliance.status === "fail" && (
              <>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold">Critical Issues</p>
                  <div className="flex flex-col gap-3">
                    {compliance.issues?.map((issue) => (
                      <div key={issue.code} className="rounded-lg border border-red-200 bg-red-50 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <XCircle size={13} className="flex-shrink-0 text-red-500" />
                          <Badge variant="danger">{issue.code}</Badge>
                        </div>
                        <p className="mb-2 text-xs leading-relaxed text-red-700">{issue.description}</p>
                        <p className="border-t border-red-200 pt-2 text-[11px] font-mono text-red-600"><strong>Next step:</strong> {issue.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="mb-2 text-xs font-semibold text-amber-700">Warnings</p>
                  {compliance.warnings?.map((warning) => (
                    <div key={warning} className="mb-1 flex items-start gap-2 text-xs text-amber-700">
                      <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                      {warning}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5 shadow-sm">
        <div>
          <p className="text-xs font-semibold">Case Processing Complete</p>
          <p className="mt-0.5 text-[11px] font-mono text-muted-foreground">{caseId} · {new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Download size={12} />
            Export Report
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Submit to GAMS
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </>
  );
}
