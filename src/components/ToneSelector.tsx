"use client";

import { useTranslations } from "next-intl";
import type { ContentTone } from "@/types/content";

interface ToneOption {
  id: ContentTone;
  label: string;
  desc: string;
}

interface ToneSelectorProps {
  options: ToneOption[];
  tone: ContentTone;
  toneLabel: string;
  onSelect: (id: ContentTone) => void;
}

export function ToneSelector({ options, tone, toneLabel, onSelect }: ToneSelectorProps) {
  const t = useTranslations("tool");

  return (
    <div className="glass rounded-2xl p-6">
      <p className="mb-3 text-sm font-medium text-slate-300">{t("toneTitle")}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            title={opt.desc}
            aria-pressed={tone === opt.id}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              tone === opt.id
                ? "border-accent-500 bg-accent-500/20 text-white"
                : "border-white/10 text-slate-400 hover:border-white/20"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {t("toneCurrent", { label: toneLabel })}
      </p>
    </div>
  );
}