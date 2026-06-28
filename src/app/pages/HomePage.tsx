import { AlertCircle, Cpu } from "lucide-react";
import { CaseInputPanel } from "../components/workflow/CaseInputPanel";
import { ProcessingTimeline } from "../components/workflow/ProcessingTimeline";
import { ResultTabs } from "../components/workflow/ResultTabs";
import { useCaseWorkflow } from "../providers/CaseWorkflowProvider";
import { SectionCard } from "../components/shared/SectionCard";

export function HomePage() {
  const { stage, isProcessing } = useCaseWorkflow();
  const isDone = stage === "done";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
        <CaseInputPanel />
        {(isProcessing || isDone) && (
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Processing Pipeline</p>
            <ProcessingTimeline stage={stage} />
          </div>
        )}
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <AlertCircle size={13} className="mt-0.5 flex-shrink-0 text-amber-600" />
          <p className="text-[11px] leading-relaxed text-amber-700">Demo mode — results shown are simulated. In production, AI agents process actual uploaded documents.</p>
        </div>
      </aside>

      <main className="space-y-4">
        {!isDone && !isProcessing && (
          <SectionCard title="Workflow Overview" icon={<Cpu size={16} />}>
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Cpu size={24} className="text-primary/50" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Results Dashboard</h3>
                <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">Upload case documents and select a transaction type, then click Process Case to run the AI workflow.</p>
              </div>
            </div>
          </SectionCard>
        )}

        {isProcessing && (
          <SectionCard title="Processing Status" icon={<Cpu size={16} />}>
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-14">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Running the case processing pipeline…</p>
            </div>
          </SectionCard>
        )}

        {isDone && <ResultTabs />}
      </main>
    </div>
  );
}
