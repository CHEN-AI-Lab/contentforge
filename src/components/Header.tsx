"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  const nav = [
    { href: "/tool", label: t("navTool") },
    { href: "/pricing", label: t("navPricing") },
    { href: "/blog", label: t("navBlog") },
    { href: "/about", label: t("navAbout") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-2xl" aria-hidden>
            ⚡
          </span>
          <span className="text-gradient">{t("brand")}</span>
          <span className="hidden text-xs font-normal text-slate-400 sm:inline">
            {t("brandSub")}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <nav className="hidden items-center gap-1 md:flex md:gap-4">
            {nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <Link
              href="/tool"
              className="ml-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
            >
              {t("cta")}
            </Link>
          </nav>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 md:hidden"
          aria-expanded={open}
          aria-label={open ? t("menuClose") : t("menuOpen")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="mb-2 flex justify-end">
            <LanguageSwitcher />
          </div>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
            <li>
              <Link
                href="/tool"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-brand-600 px-3 py-2 text-center text-sm font-medium text-white"
              >
                {t("cta")}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}