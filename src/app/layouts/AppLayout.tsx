import { NavLink, Outlet } from "react-router";
import { Cpu, FolderOpenDot, LayoutGrid, Sparkles } from "lucide-react";

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-shell flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Cpu size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">AI-Assisted Case Workspace</p>
              <p className="text-xs text-muted-foreground">Structured intake, drafting, and compliance review</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 rounded-full border border-border bg-card/80 p-1 shadow-sm">
            <NavLink to="/" className={({ isActive }) => `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutGrid size={15} />
              Dashboard
            </NavLink>
            <NavLink to="/cases/gov-2024-08831" className={({ isActive }) => `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <FolderOpenDot size={15} />
              Case Review
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="page-shell py-8">
        <Outlet />
      </main>

      <footer className="page-shell pb-8 pt-2 text-center text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2">
          <Sparkles size={14} />
          Production-ready workflow shell with reusable patterns and route-based navigation.
        </div>
      </footer>
    </div>
  );
}
