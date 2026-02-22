import { AppShell } from "@/components/AppShell";

export default function TransactionsPage() {
  return (
    <AppShell title="Transactions" subtitle="Search, filter, and classify.">
      <div className="card">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm font-extrabold">All Transactions</div>
          <div className="flex gap-2">
            <input
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm w-[220px]"
              placeholder="Search merchant…"
            />
            <button
              className="rounded-full px-3 py-2 text-xs font-extrabold"
              style={{ background: "var(--green-soft)", color: "var(--green-dark)" }}
            >
              Needs review
            </button>
          </div>
        </div>
        <div className="p-5 text-sm text-[var(--muted)]">No transactions yet.</div>
      </div>
    </AppShell>
  );
}
