import { ChevronDown, FileText, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCaseWorkflow } from "../../providers/CaseWorkflowProvider";
import type { TransactionType } from "../../types";

export function CaseInputPanel() {
  const { files, transactionType, isProcessing, canProcess, addFiles, removeFile, setTransactionType, processCase } = useCaseWorkflow();
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1048576).toFixed(1)} MB`;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Case Intake</h2>
        <p className="mt-1 text-xs text-muted-foreground">Upload documents and define the transaction context.</p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-5 text-center transition-all ${dragging ? "border-primary bg-accent/40" : "border-border hover:border-primary/40 hover:bg-secondary/30"}`}
      >
        <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${dragging ? "bg-primary/10" : "bg-muted"}`}>
          <Upload size={16} className={dragging ? "text-primary" : "text-muted-foreground"} />
        </div>
        <p className="text-sm font-semibold">Drop files here</p>
        <p className="mt-1 text-xs text-muted-foreground">or click to browse local documents</p>
        <p className="mt-2 text-[11px] font-mono text-muted-foreground/70">PDF · DOCX · XLSX · PNG</p>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(event) => event.target.files && addFiles(event.target.files)} accept=".pdf,.doc,.docx,.xlsx,.png,.jpg" />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <div key={file.id} className="group flex items-center gap-2 rounded-md bg-secondary/60 px-3 py-2">
              <FileText size={13} className="flex-shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{file.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              <button onClick={() => removeFile(file.id)} className="opacity-0 transition-opacity group-hover:opacity-100">
                <X size={12} className="text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold">Transaction Type</label>
        <div className="relative">
          <select value={transactionType} onChange={(event) => setTransactionType(event.target.value as TransactionType)} className="w-full appearance-none rounded-md border border-border bg-input-background px-3 py-2 pr-8 text-xs text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="">Select type…</option>
            <option value="grant">Research Grant</option>
            <option value="license">Operating License</option>
            <option value="approval">Regulatory Approval</option>
            <option value="permit">Environmental Permit</option>
            <option value="exemption">Policy Exemption</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <button onClick={() => void processCase()} disabled={!canProcess} className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40">
        {isProcessing ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Upload size={14} />
            Process Case
          </>
        )}
      </button>

      {files.length === 0 && <p className="text-center text-[10px] font-mono text-muted-foreground">Upload at least one document to continue</p>}
    </div>
  );
}
