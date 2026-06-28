import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  headerRight?: ReactNode;
}

export function SectionCard({ title, icon, children, collapsible = true, defaultOpen = true, headerRight }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <button
        onClick={() => collapsible && setOpen((value) => !value)}
        className={`flex w-full items-center justify-between px-5 py-4 ${collapsible ? "cursor-pointer transition-colors hover:bg-secondary/40" : "cursor-default"}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-semibold tracking-tight text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {headerRight}
          {collapsible && <ChevronDown size={15} className={`text-muted-foreground transition-transform duration-200 ${open ? "" : "-rotate-90"}`} />}
        </div>
      </button>
      {open && <div className="border-t border-border">{children}</div>}
    </div>
  );
}
