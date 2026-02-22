import { AppShell } from "@/components/AppShell";

export default function RulesPage() {
  return (
    <AppShell title="Rules" subtitle="Merchant rules to auto-classify future transactions.">
      <div className="grid gap-4">
        <div className="card">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <div className="text-sm font-extrabold">Create rule</div>
            <div className="text-xs text-[var(--muted)] mt-1">MVP: UI only</div>
          </div>
          <div className="p-5 grid gap-3 sm:grid-cols-3">
            <input className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm" placeholder="Merchant contains…" />
            <input className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm" placeholder="Category" />
            <button
              className="rounded-xl px-4 py-2 text-sm font-extrabold"
              style={{ background: "var(--green)", boxShadow: "var(--shadow)", color: "#0b3d2a" }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <div className="text-sm font-extrabold">Rules</div>
            <div className="text-xs text-[var(--muted)] mt-1">0 rules</div>
          </div>
          <div className="p-5 text-sm text-[var(--muted)]">No rules yet.</div>
        </div>
      </div>
    </AppShell>
  );
}
