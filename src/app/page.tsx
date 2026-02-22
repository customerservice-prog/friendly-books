import { AppShell } from "@/components/AppShell";

function Kpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="card">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-[var(--muted)]">{label}</div>
            <div className="text-3xl font-black mt-2">{value}</div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-extrabold"
            style={{ background: "var(--green-soft)", color: "var(--green-dark)" }}
          >
            {delta}
          </div>
        </div>
        <div className="text-xs text-[var(--muted)] mt-3">vs last month</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Transactions → Business/Personal → Review → Reports"
    >
      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi label="Total Expenses" value="$0" delta="+0%" />
          <Kpi label="Tax-Deductible" value="$0" delta="+0%" />
          <Kpi label="Needs Review" value="0" delta="0" />
          <Kpi label="Top Category" value="—" delta="" />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 items-start">
          <div className="card lg:col-span-2">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <div className="text-sm font-extrabold">Top Expense Sources</div>
                <div className="text-xs text-[var(--muted)] mt-1">(placeholder chart)</div>
              </div>
              <div className="text-xs font-bold text-[var(--muted)]">Last 30 days</div>
            </div>
            <div className="p-5">
              <div className="h-56 rounded-xl border border-[var(--border)] bg-[#fbfcfc] grid place-items-center text-sm text-[var(--muted)]">
                Bar chart goes here
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card">
              <div className="px-5 py-4 border-b border-[var(--border)]">
                <div className="text-sm font-extrabold">Recent Expenses</div>
                <div className="text-xs text-[var(--muted)] mt-1">No data yet</div>
              </div>
              <div className="p-5 text-sm text-[var(--muted)]">Import transactions to see activity.</div>
            </div>

            <div className="card">
              <div className="px-5 py-4 border-b border-[var(--border)]">
                <div className="text-sm font-extrabold">Tax Deductible</div>
                <div className="text-xs text-[var(--muted)] mt-1">This month</div>
              </div>
              <div className="p-5">
                <div className="text-2xl font-black">$0</div>
                <div className="text-xs text-[var(--muted)] mt-2">Will populate after classification.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <div className="card">
            <div className="px-5 py-4 border-b border-[var(--border)]">
              <div className="text-sm font-extrabold">Category Split</div>
              <div className="text-xs text-[var(--muted)] mt-1">(placeholder donut)</div>
            </div>
            <div className="p-5">
              <div className="h-56 rounded-xl border border-[var(--border)] bg-[#fbfcfc] grid place-items-center text-sm text-[var(--muted)]">
                Donut chart goes here
              </div>
            </div>
          </div>

          <div className="card">
            <div className="px-5 py-4 border-b border-[var(--border)]">
              <div className="text-sm font-extrabold">Expenses Over Time</div>
              <div className="text-xs text-[var(--muted)] mt-1">(placeholder line)</div>
            </div>
            <div className="p-5">
              <div className="h-56 rounded-xl border border-[var(--border)] bg-[#fbfcfc] grid place-items-center text-sm text-[var(--muted)]">
                Line chart goes here
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
