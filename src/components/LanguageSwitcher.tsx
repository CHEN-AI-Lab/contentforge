"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

/**
 * Language switcher — toggles between zh-CN and en.
 * Sets NEXT_LOCALE cookie and triggers server re-render.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "zh-CN" ? "en" : "zh-CN";
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/20 hover:text-slate-200 disabled:opacity-50"
      aria-label={locale === "zh-CN" ? "Switch to English" : "切换到中文"}
    >
      {locale === "zh-CN" ? "English" : "中文"}
    </button>
  );
}