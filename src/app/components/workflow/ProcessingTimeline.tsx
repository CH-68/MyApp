import { CheckCircle2, CircleDot, Loader2 } from "lucide-react";
import type { ProcessingStage } from "../../types";

interface ProcessingTimelineProps {
  stage: ProcessingStage;
}

export function ProcessingTimeline({ stage }: ProcessingTimelineProps) {
  const steps = [
    { id: "extracting", label: "Extract" },
    { id: "drafting", label: "Draft" },
    { id: "policy", label: "Policy" },
    { id: "compliance", label: "Compliance" },
  ] as const;

  const stageOrder: Record<ProcessingStage, number> = {
    idle: -1,
    extracting: 0,
    drafting: 1,
    policy: 2,
    compliance: 3,
    done: 4,
  };

  const current = stageOrder[stage];

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => {
        const stepIndex = stageOrder[step.id as ProcessingStage];
        const isDone = current > stepIndex;
        const isActive = current === stepIndex;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${isDone ? "border-primary bg-primary" : isActive ? "border-primary bg-white" : "border-border bg-white"}`}>
                {isDone ? <CheckCircle2 size={14} className="text-white" /> : isActive ? <Loader2 size={12} className="text-primary animate-spin" /> : <CircleDot size={12} className="text-muted-foreground/40" />}
              </div>
              <span className={`whitespace-nowrap text-[10px] font-mono font-medium transition-colors ${isDone || isActive ? "text-primary" : "text-muted-foreground/50"}`}>{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className={`mb-4 h-px w-10 transition-colors duration-300 ${isDone ? "bg-primary" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}
