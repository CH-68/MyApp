import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "info";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono font-medium ${styles[variant]}`}>{children}</span>;
}
