import Link from "next/link";
import Image from "next/image";
import { BookOpen, ChartPie, ListChecks, Receipt, SlidersHorizontal } from "lucide-react";

import type { ComponentType } from "react";

function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: ComponentType<{ size?: number; className?: string }> }) {
  return (
    <Link
      href={href}
      className={
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
      }
    >
      <Icon size={18} className="opacity-70" />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-[270px] p-5 bg-[var(--card)] border-r border-[var(--border)] hidden md:flex md:flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="rounded-xl overflow-hidden bg-white border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <Image
              src="/friendly-books.jpg"
              alt="Friendly Books"
              width={96}
              height={96}
              priority
              className="block w-[96px] h-[96px] object-cover"
            />
          </div>
          <div>
            <div className="font-extrabold leading-4 text-base">Friendly Books</div>
            <div className="text-xs text-[var(--muted)] mt-1">Business expenses & taxes</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <NavItem href="/" label="Dashboard" icon={ChartPie} />
          <NavItem href="/transactions" label="Transactions" icon={Receipt} />
          <NavItem href="/review" label="Review Inbox" icon={ListChecks} />
          <NavItem href="/rules" label="Rules" icon={SlidersHorizontal} />
          <NavItem href="/reports" label="Reports" icon={BookOpen} />
        </nav>

        <div className="mt-auto pt-4">
          <div className="border-t border-[var(--border)] pt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eef2f6] grid place-items-center font-bold">B</div>
            <div>
              <div className="text-sm font-bold">Signed in</div>
              <div className="text-xs text-[var(--muted)]">(auth wired)</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-7">
        <header className="flex items-start justify-between gap-6 flex-wrap mb-5">
          <div>
            <div className="text-2xl font-extrabold">{title}</div>
            {subtitle ? <div className="text-sm text-[var(--muted)] mt-1">{subtitle}</div> : null}
          </div>

          <div className="flex gap-2">
            <button className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-bold">
              This Month
            </button>
            <button
              className="rounded-xl px-4 py-2 text-sm font-extrabold"
              style={{ background: "var(--green)", boxShadow: "var(--shadow)", color: "#0b3d2a" }}
            >
              Connect Accounts
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
