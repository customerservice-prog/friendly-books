import { AppShell } from "@/components/AppShell";

export default function ReviewPage() {
  return (
    <AppShell title="Review Inbox" subtitle="Approve classifications and create rules.">
      <div className="card">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <div className="text-sm font-extrabold">Needs review (0)</div>
          <div className="text-xs text-[var(--muted)] mt-1">When you import transactions, items will appear here.</div>
        </div>
        <div className="p-5 text-sm text-[var(--muted)]">Nothing to review.</div>
      </div>
    </AppShell>
  );
}
