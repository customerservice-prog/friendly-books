import { AppShell } from "@/components/AppShell";

export default function ReportsPage() {
  return (
    <AppShell title="Reports" subtitle="Monthly totals and exports.">
      <div className="card">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold">This month</div>
            <div className="text-xs text-[var(--muted)] mt-1">Business totals, categories, export.</div>
          </div>
          <button className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-bold">Export CSV</button>
        </div>
        <div className="p-5 text-sm text-[var(--muted)]">No data yet.</div>
      </div>
    </AppShell>
  );
}
