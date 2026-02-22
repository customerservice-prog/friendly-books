import Link from "next/link";
import { AppShell } from "@/components/AppShell";

type Source = "all" | "bank" | "novo" | "chime" | "wisely" | "paypal" | "skrill" | "amazon";

const SOURCES: Array<{ key: Source; label: string }> = [
  { key: "all", label: "All" },
  { key: "bank", label: "Bank" },
  { key: "novo", label: "Novo" },
  { key: "chime", label: "Chime" },
  { key: "wisely", label: "Wisely" },
  { key: "paypal", label: "PayPal" },
  { key: "skrill", label: "Skrill" },
  { key: "amazon", label: "Amazon" },
];

function Tabs({ active }: { active: Source }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {SOURCES.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.key}
            href={t.key === "all" ? "/" : `/?source=${t.key}`}
            className="px-4 py-2 rounded-xl text-sm font-extrabold border"
            style={
              isActive
                ? {
                    background: "var(--green-soft)",
                    borderColor: "rgba(50, 210, 132, 0.25)",
                    color: "var(--green-dark)",
                  }
                : { background: "white", borderColor: "var(--border)", color: "var(--text)" }
            }
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

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

function mockKpis(source: Source) {
  // Placeholder values to prove the tabs work visually.
  // Next step: compute from DB filtered by connected items/accounts.
  const m: Record<Source, { expenses: string; deductible: string; review: string; top: string }> = {
    all: { expenses: "$12,340", deductible: "$7,980", review: "14", top: "Fuel" },
    bank: { expenses: "$8,120", deductible: "$5,500", review: "8", top: "Supplies" },
    novo: { expenses: "$3,410", deductible: "$2,900", review: "3", top: "Meals" },
    chime: { expenses: "$1,220", deductible: "$420", review: "2", top: "Fuel" },
    wisely: { expenses: "$490", deductible: "$140", review: "1", top: "Equipment" },
    paypal: { expenses: "$1,870", deductible: "$1,220", review: "4", top: "Software" },
    skrill: { expenses: "$620", deductible: "$240", review: "1", top: "Fees" },
    amazon: { expenses: "$2,330", deductible: "$1,610", review: "5", top: "Supplies" },
  };
  return m[source];
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) || {};
  const source = (typeof sp.source === "string" ? sp.source : "all") as Source;
  const active: Source = SOURCES.some((s) => s.key === source) ? source : "all";
  const k = mockKpis(active);

  return (
    <AppShell title="Dashboard" subtitle="Transactions → Business/Personal → Review → Reports">
      <div className="mb-4">
        <Tabs active={active} />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi label="Total Expenses" value={k.expenses} delta="+0%" />
          <Kpi label="Tax-Deductible" value={k.deductible} delta="+0%" />
          <Kpi label="Needs Review" value={k.review} delta="0" />
          <Kpi label="Top Category" value={k.top} delta="" />
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
