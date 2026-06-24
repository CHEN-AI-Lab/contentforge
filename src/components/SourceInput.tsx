"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

const SAMPLE_TEXT = `做自媒体最耗时的不是写作，而是同一篇文章要改五遍：小红书要 emoji，公众号要结构，微博要短，抖音要口播感。

ContentForge 的思路很简单：你只写一次「母版」长文，系统自动按平台规则改编。实测能省下 70% 以上的分发时间。

适合人群：独立创作者、品牌运营、知识博主。免费版每天 5 次，够你验证工作流；专业版解锁批量导出与历史记录。`;

interface SourceInputProps {
  text: string;
  onChange: (text: string) => void;
  charCount: number;
  onSubmit: () => void;
  canSubmit: boolean;
}

export function SourceInput({ text, onChange, charCount, onSubmit, canSubmit }: SourceInputProps) {
  const t = useTranslations("tool");

  return (
    <div className="glass rounded-2xl p-6">
      <label htmlFor="source-text" className="mb-2 block text-sm font-medium text-slate-300">
        {t("sourceLabel")}
      </label>
      <textarea
        id="source-text"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && canSubmit) {
            e.preventDefault();
            onSubmit();
          }
        }}
        rows={10}
        placeholder={t("sourcePlaceholder")}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(SAMPLE_TEXT)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"
        >
          {t("sampleBtn")}
        </button>
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"
        >
          {t("clearBtn")}
        </button>
        <span className="text-xs text-slate-500">
          {t("chars", { count: charCount })}
        </span>
        <span className="hidden text-xs text-slate-600 sm:inline">
          {t("shortcut")}
        </span>
      </div>
    </div>
  );
}