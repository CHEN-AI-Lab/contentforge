"use client";

import { useTranslations } from "next-intl";
import type { PlatformId, PlatformMeta } from "@/types/content";

interface PlatformGridProps {
  platforms: PlatformMeta[];
  selected: PlatformId[];
  hoverPlatform: PlatformId;
  onToggle: (id: PlatformId) => void;
  onSetPlatforms: (ids: PlatformId[]) => void;
  onHover: (id: PlatformId) => void;
  helpText: string;
  helpName: string;
}

export function PlatformGrid({
  platforms,
  selected,
  hoverPlatform,
  onToggle,
  onSetPlatforms,
  onHover,
  helpText,
  helpName,
}: PlatformGridProps) {
  const t = useTranslations("tool");

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-300">
          {t("platformTitle")}
          <span className="ml-2 text-xs font-normal text-slate-500">
            {t("platformSelected", { count: selected.length, total: platforms.length })}
          </span>
        </p>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSetPlatforms(platforms.map((p) => p.id))}
          className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400 hover:bg-white/5"
        >
          {t("selectAll")}
        </button>
        <button
          type="button"
          onClick={() => onSetPlatforms([])}
          className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400 hover:bg-white/5"
        >
          {t("clearAll")}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onToggle(p.id)}
            onMouseEnter={() => onHover(p.id)}
            aria-pressed={selected.includes(p.id)}
            className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
              selected.includes(p.id)
                ? "border-brand-500 bg-brand-500/20 text-white"
                : "border-white/10 text-slate-400 hover:border-white/20"
            }`}
          >
            <span>
              {p.icon} {p.name}
            </span>
            <span className="mt-0.5 block text-xs opacity-70">
              {p.description}
            </span>
          </button>
        ))}
      </div>
      <p
        className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500"
        aria-live="polite"
      >
        <span className="text-slate-400">{helpName}：</span>
        {helpText}
      </p>
    </div>
  );
}