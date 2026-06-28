import { ArrowLeft, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../components/shared/Badge";
import { SectionCard } from "../components/shared/SectionCard";
import { useCaseWorkflow } from "../providers/CaseWorkflowProvider";
import { MOCK_EXTRACTED, MOCK_POLICY_RULES } from "../data/mockData";

export function CaseDetailPage() {
  const { caseId, compliance } = useCaseWorkflow();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={14} />
            Back to workspace
          </Link>
          <h2 className="text-xl font-semibold tracking-tight">Case Review · {caseId}</h2>
          <p className="mt-1 text-sm text-muted-foreground">A dedicated review surface for extracted findings, policy context, and compliance outcomes.</p>
        </div>
        <Badge variant={compliance.status === "pass" ? "success" : "danger"}>Status: {compliance.status.toUpperCase()}</Badge>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Case Summary" icon={<FileText size={16} />}>
          <div className="space-y-4 p-5">
            <div className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">Applicant</p>
              <p className="mt-1 text-sm font-semibold">{MOCK_EXTRACTED.applicant}</p>
              <p className="mt-1 text-sm text-muted-foreground">{MOCK_EXTRACTED.organisation}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">Requested</p>
                <p className="mt-1 text-sm font-semibold">{MOCK_EXTRACTED.amount}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">Duration</p>
                <p className="mt-1 text-sm font-semibold">{MOCK_EXTRACTED.duration}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold">Key findings</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {MOCK_EXTRACTED.keyFacts.slice(0, 3).map((fact) => (
                  <li key={fact} className="flex items-start gap-2">
                    <Sparkles size={14} className="mt-0.5 text-primary" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Compliance Snapshot" icon={<ShieldCheck size={16} />}>
          <div className="space-y-4 p-5">
            <div className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">Score</p>
              <p className="mt-1 text-2xl font-semibold">{compliance.score}/100</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <p>{compliance.status === "pass" ? "All critical checks passed and the case is ready for review." : "Additional documentation is required before the case can proceed."}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold">Matched policy rules</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {MOCK_POLICY_RULES.slice(0, 3).map((rule) => (
                  <Badge key={rule.id} variant="info">{rule.id}</Badge>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
