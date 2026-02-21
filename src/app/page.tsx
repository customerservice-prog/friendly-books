import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Friendly Books</h1>
          <p className="mt-2 opacity-80 max-w-xl">
            Transactions → Business/Personal/Needs review + tax categories. Rules-first classifier that gets smarter.
          </p>
        </div>
        <div className="flex gap-3">
          <Link className="rounded-lg border px-4 py-2" href="/transactions">Transactions</Link>
          <Link className="rounded-lg border px-4 py-2" href="/review">Review Inbox</Link>
          <Link className="rounded-lg border px-4 py-2" href="/rules">Rules</Link>
          <Link className="rounded-lg border px-4 py-2" href="/reports">Reports</Link>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Connect accounts</h2>
          <p className="text-sm opacity-80 mt-1">MVP uses a Mock Provider. Plaid integration is a swap-in.</p>
          <div className="mt-4">
            <Link className="rounded-lg bg-blue-600 text-white px-4 py-2 inline-flex" href="/connect">Connect</Link>
          </div>
        </div>
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Principle</h2>
          <p className="text-sm opacity-80 mt-1">
            Never delete personal transactions. Store everything; only include <b>business_use=yes</b> in totals.
          </p>
        </div>
      </div>
    </main>
  );
}
