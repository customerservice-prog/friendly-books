import { AppShell } from "@/components/AppShell";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function fmtUsd(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default async function BreakdownPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) || {};
  const selectedMonth = typeof sp.month === "string" ? sp.month : "";

  const prisma = getPrisma();

  const rows = await prisma.transaction.findMany({
    orderBy: { datePosted: "desc" },
    take: 500,
    select: {
      id: true,
      datePosted: true,
      nameRaw: true,
      amount: true,
      classification: {
        select: {
          businessUse: true,
          taxCategory: true,
          locked: true,
          confidence: true,
        },
      },
    },
  });

  const filtered = rows.filter((t) => {
    const bu = t.classification?.businessUse ?? "unsure";
    if (bu !== "yes" && bu !== "unsure") return false; // hide personal
    if (selectedMonth) return monthKey(t.datePosted) === selectedMonth;
    return true;
  });

  // Monthly category totals
  const byMonthCategory = new Map<string, number>();
  const byMonth = new Map<string, number>();

  for (const t of filtered) {
    const m = monthKey(t.datePosted);
    const cat = t.classification?.taxCategory || "Uncategorized";
    const amt = Number(t.amount);

    // Expenses are positive; if negative, treat as income/refund and ignore for expense breakdown.
    if (amt <= 0) continue;

    const k = `${m}::${cat}`;
    byMonthCategory.set(k, (byMonthCategory.get(k) || 0) + amt);
    byMonth.set(m, (byMonth.get(m) || 0) + amt);
  }

  const months = Array.from(byMonth.keys()).sort().reverse();
  const activeMonth = selectedMonth || months[0] || "";

  const categoriesForMonth = new Map<string, number>();
  for (const [k, v] of byMonthCategory.entries()) {
    const [m, cat] = k.split("::");
    if (m !== activeMonth) continue;
    categoriesForMonth.set(cat, v);
  }

  const categoryList = Array.from(categoriesForMonth.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <AppShell title="Business Expense Breakdown" subtitle="Shows Business + Unsure. Auto-generated categories.">
      <div className="grid gap-4">
        <div className="card">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-sm font-extrabold">Monthly rollup</div>
              <div className="text-xs text-[var(--muted)] mt-1">Select a month to see category totals.</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs font-bold text-[var(--muted)]">Month</div>
              <select
                className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm bg-white"
                value={activeMonth}
                onChange={() => {}}
              >
                {(months.length ? months : [""]).map((m) => (
                  <option key={m || "none"} value={m}>
                    {m || "(no data)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-5">
            {!activeMonth ? (
              <div className="text-sm text-[var(--muted)]">No transactions yet.</div>
            ) : (
              <div className="grid gap-2">
                {categoryList.length ? (
                  categoryList.map(([cat, total]) => (
                    <div key={cat} className="flex items-center justify-between border-b border-[var(--border)] py-2">
                      <div className="text-sm font-bold">{cat}</div>
                      <div className="text-sm font-extrabold">{fmtUsd(total)}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-[var(--muted)]">No expenses for this month.</div>
                )}

                <div className="flex items-center justify-between pt-3">
                  <div className="text-sm font-extrabold">Month total</div>
                  <div className="text-lg font-black">{fmtUsd(byMonth.get(activeMonth) || 0)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-sm font-extrabold">Detailed expenses</div>
              <div className="text-xs text-[var(--muted)] mt-1">
                Includes Business=yes and Unsure. Personal is hidden.
              </div>
            </div>
            <div className="text-xs text-[var(--muted)]">Showing {filtered.length} rows</div>
          </div>

          <div className="p-5 overflow-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead>
                <tr className="text-xs text-[var(--muted)]">
                  <th className="text-left font-extrabold py-2">Date of purchase</th>
                  <th className="text-left font-extrabold py-2">Expense name</th>
                  <th className="text-left font-extrabold py-2">Category</th>
                  <th className="text-left font-extrabold py-2">Month</th>
                  <th className="text-right font-extrabold py-2">Expense amount</th>
                  <th className="text-left font-extrabold py-2">Business?</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const bu = t.classification?.businessUse ?? "unsure";
                  const cat = t.classification?.taxCategory || "Uncategorized";
                  const amt = Number(t.amount);
                  return (
                    <tr key={t.id} className="border-t border-[var(--border)]">
                      <td className="py-3 pr-4 whitespace-nowrap">{t.datePosted.toISOString().slice(0, 10)}</td>
                      <td className="py-3 pr-4">
                        <div className="font-bold">{t.nameRaw}</div>
                      </td>
                      <td className="py-3 pr-4">{cat}</td>
                      <td className="py-3 pr-4 whitespace-nowrap">{monthKey(t.datePosted)}</td>
                      <td className="py-3 text-right font-extrabold whitespace-nowrap">{fmtUsd(amt)}</td>
                      <td className="py-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-extrabold"
                          style={
                            bu === "yes"
                              ? { background: "var(--green-soft)", color: "var(--green-dark)" }
                              : { background: "#f2f4f7", color: "#344054" }
                          }
                        >
                          {bu.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
