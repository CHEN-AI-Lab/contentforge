"use client";

import { PLATFORMS, TONE_OPTIONS } from "@/config/platforms";
import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  savePlatforms,
  savePreferences,
  type ToolPreferences as Prefs,
} from "@/lib/tool-preferences";
import type { ContentTone, PlatformId } from "@/types/content";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";

interface ToolPreferencesProps {
  tone: ContentTone;
  selected: PlatformId[];
  onApply: (prefs: Prefs, platforms?: PlatformId[]) => void;
}

export function ToolPreferences({ tone, selected, onApply }: ToolPreferencesProps) {
  const t = useTranslations("toolPref");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Prefs>(DEFAULT_PREFERENCES);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(loadPreferences());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const apply = useCallback(() => {
    savePreferences(draft);
    onApply(draft);
    setOpen(false);
  }, [draft, onApply]);

  const reset = useCallback(() => {
    setDraft(DEFAULT_PREFERENCES);
    savePreferences(DEFAULT_PREFERENCES);
    savePlatforms(PLATFORMS.map((p) => p.id));
    onApply(DEFAULT_PREFERENCES, PLATFORMS.map((p) => p.id));
    setOpen(false);
  }, [onApply]);

  const setPlatformFilter = useCallback(
    (filter: (p: (typeof PLATFORMS)[number]) => boolean) => {
      const ids = PLATFORMS.filter(filter).map((p) => p.id as PlatformId);
      savePlatforms(ids);
      onApply(draft, ids);
      setOpen(false);
    },
    [draft, onApply],
  );

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/20 hover:text-slate-200"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span aria-hidden>⚙</span>
        {t("trigger")}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="absolute bottom-full right-0 z-50 mb-2 w-72 rounded-xl border border-white/15 bg-gray-900 p-4 shadow-xl sm:left-0 sm:right-auto"
        >
          <p className="text-sm font-medium text-white">{t("title")}</p>
          <p className="mt-1 text-xs text-slate-500">{t("desc")}</p>

          <label className="mt-4 block text-xs text-slate-400">
            {t("defaultTone")}
            <select
              value={draft.defaultTone}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  defaultTone: e.target.value as ContentTone,
                }))
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-2 py-2 text-sm text-slate-200"
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-3 space-y-2 text-xs text-slate-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={draft.clearOnToneChange}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, clearOnToneChange: e.target.checked }))
                }
                className="rounded border-white/20"
              />
              {t("clearOnChange")}
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={draft.scrollToResult}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, scrollToResult: e.target.checked }))
                }
                className="rounded border-white/20"
              />
              {t("scrollToResult")}
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={draft.rememberPlatforms}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, rememberPlatforms: e.target.checked }))
                }
                className="rounded border-white/20"
              />
              {t("rememberPlatforms")}
            </label>
          </div>

          <p className="mt-4 text-xs text-slate-500">{t("quickFilter")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setPlatformFilter((p) => ["douyin", "shipinhao", "bilibili"].includes(p.id))
              }
              className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/5"
            >
              {t("videoOnly")}
            </button>
            <button
              type="button"
              onClick={() =>
                setPlatformFilter((p) => ["xiaohongshu", "wechat", "weibo", "seo"].includes(p.id))
              }
              className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/5"
            >
              {t("textOnly")}
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            {t("currentInfo", {
              tone: TONE_OPTIONS.find((opt) => opt.id === tone)?.label ?? tone,
              count: selected.length,
            })}
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={apply}
              className="flex-1 rounded-lg bg-brand-600 py-2 text-xs font-medium text-white hover:bg-brand-500"
            >
              {t("saveApply")}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 hover:bg-white/5"
            >
              {t("reset")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}