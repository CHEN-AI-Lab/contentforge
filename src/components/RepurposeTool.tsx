"use client";

import { SourceInput } from "@/components/SourceInput";
import { ToneSelector } from "@/components/ToneSelector";
import { PlatformGrid } from "@/components/PlatformGrid";
import { ResultCard } from "@/components/ResultCard";
import { ToolPreferences } from "@/components/ToolPreferences";
import { PLATFORMS, TONE_OPTIONS, FREE_DAILY_LIMIT } from "@/config/platforms";
import { copyText } from "@/lib/clipboard";
import {
  loadPreferences,
  loadSavedPlatforms,
  savePlatforms,
  type ToolPreferences as Prefs,
} from "@/lib/tool-preferences";
import {
  formatUsageHint,
  getUsageStats,
  tryConsumeUsage,
  saveUsageToken,
} from "@/lib/usage-limit";
import type { ContentTone, PlatformId, RepurposeResult } from "@/types/content";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function RepurposeTool() {
  const t = useTranslations("tool");

  const [text, setText] = useState("");
  const [selected, setSelected] = useState<PlatformId[]>(() =>
    PLATFORMS.map((p) => p.id),
  );
  const [tone, setTone] = useState<ContentTone>("casual");
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RepurposeResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [hoverPlatform, setHoverPlatform] = useState<PlatformId | null>(null);
  const [usageHint, setUsageHint] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  /* ── derived state ── */

  const charCount = useMemo(() => text.replace(/\s/g, "").length, [text]);

  const usageStats = useMemo(() => getUsageStats(FREE_DAILY_LIMIT), [text]);

  const canSubmit =
    !loading && charCount >= 20 && selected.length > 0 && !usageStats.exhausted;

  const helpPlatform = useMemo(
    () => PLATFORMS.find((p) => p.id === (hoverPlatform ?? selected[0])) ?? PLATFORMS[0],
    [hoverPlatform, selected],
  );

  const toneLabel = useMemo(
    () => TONE_OPTIONS.find((t) => t.id === tone)?.label ?? tone,
    [tone],
  );

  /* ── effects ── */

  const refreshUsage = useCallback(() => {
    setUsageHint(formatUsageHint(FREE_DAILY_LIMIT));
  }, []);

  useEffect(() => {
    const p = loadPreferences();
    setPrefs(p);
    setTone(p.defaultTone);
    const saved = loadSavedPlatforms();
    if (p.rememberPlatforms && saved?.length) {
      const valid = saved.filter((id) => PLATFORMS.some((m) => m.id === id));
      if (valid.length) setSelected(valid);
    }
    refreshUsage();
  }, [refreshUsage]);

  useEffect(() => {
    if (!result || prefs?.scrollToResult === false) return;
    const timer = setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, [result, prefs?.scrollToResult]);

  /* ── handlers ── */

  const persistPlatforms = (next: PlatformId[]) => {
    if (prefs?.rememberPlatforms !== false) savePlatforms(next);
  };

  const onSelectTone = (id: ContentTone) => {
    setTone(id);
    if (prefs?.clearOnToneChange !== false) setResult(null);
  };

  const setPlatforms = (next: PlatformId[]) => {
    setSelected(next);
    persistPlatforms(next);
  };

  const togglePlatform = (id: PlatformId) => {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      persistPlatforms(next);
      return next;
    });
  };

  const applyPreferences = (next: Prefs, platforms?: PlatformId[]) => {
    setPrefs(next);
    setTone(next.defaultTone);
    if (platforms) setPlatforms(platforms);
    if (next.clearOnToneChange) setResult(null);
  };

  const run = useCallback(async () => {
    if (selected.length === 0) {
      setError(t("errNoPlatform"));
      return;
    }
    if (usageStats.exhausted) {
      setError(t("errExhausted", { limit: FREE_DAILY_LIMIT }));
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceText: text, platforms: selected, tone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t("errGeneric"));
        return;
      }
      const token = res.headers.get("x-usage-token");
      if (token) saveUsageToken(token);
      tryConsumeUsage(FREE_DAILY_LIMIT);
      refreshUsage();
      setResult(data as RepurposeResult);
    } catch {
      setError(t("errNetwork"));
    } finally {
      setLoading(false);
    }
  }, [text, selected, tone, usageStats.exhausted, refreshUsage, t]);

  const handleCopy = async (id: string, content: string) => {
    const ok = await copyText(content);
    if (ok) {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } else {
      setError(t("errCopy"));
    }
  };

  const copyAllResults = () => {
    if (!result) return;
    const blob = result.outputs
      .map((out) => {
        const meta = PLATFORMS.find((p) => p.id === out.platform)!;
        return [
          `# ${meta.name}`,
          `[${out.outputType}]`,
          out.title,
          "",
          out.body,
          "",
          out.hashtags.join(" "),
        ].join("\n");
      })
      .join("\n\n---\n\n");
    handleCopy("all", blob);
  };

  /* ── render ── */

  return (
    <div className="space-y-8">
      {usageHint && (
        <p className="text-center text-xs text-slate-500">{usageHint}</p>
      )}

      <SourceInput
        text={text}
        onChange={setText}
        charCount={charCount}
        onSubmit={run}
        canSubmit={canSubmit}
      />

      <ToneSelector
        options={TONE_OPTIONS}
        tone={tone}
        toneLabel={toneLabel}
        onSelect={onSelectTone}
      />

      <div className="flex items-start justify-between gap-2">
        <PlatformGrid
          platforms={PLATFORMS}
          selected={selected}
          hoverPlatform={helpPlatform.id}
          onToggle={togglePlatform}
          onSetPlatforms={setPlatforms}
          onHover={setHoverPlatform}
          helpText={helpPlatform.help}
          helpName={helpPlatform.name}
        />
        <div className="shrink-0 pt-1">
          <ToolPreferences
            tone={tone}
            selected={selected}
            onApply={applyPreferences}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={run}
          disabled={!canSubmit}
          className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 py-4 text-center font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-12"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("submitLoading")}
            </span>
          ) : (
            t("submitDefault")
          )}
        </button>
        {!canSubmit && !loading && (
          <p className="text-xs text-slate-500">
            {charCount < 20
              ? t("hintChars")
              : selected.length === 0
                ? t("hintPlatform")
                : usageStats.exhausted
                  ? t("hintExhausted")
                  : ""}
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div ref={resultRef} className="space-y-6 scroll-mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              {t("resultProcessed", {
                count: result.wordCount,
                tone: result.toneLabel ?? toneLabel,
              })}
            </p>
            <button
              type="button"
              onClick={copyAllResults}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10"
            >
              {copied === "all" ? t("copiedAll") : t("copyAll")}
            </button>
          </div>
          {result.outputs.map(
            (out) => {
              const meta = PLATFORMS.find((p) => p.id === out.platform);
              if (!meta) return null;
              return (
                <ResultCard
                  key={out.platform}
                  out={out}
                  meta={meta}
                  copied={copied}
                  onCopy={handleCopy}
                />
              );
            },
          )}
        </div>
      )}
    </div>
  );
}