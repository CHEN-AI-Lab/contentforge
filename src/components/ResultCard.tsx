"use client";

import { useTranslations } from "next-intl";
import type { PlatformOutput, PlatformMeta } from "@/types/content";

interface ResultCardProps {
  out: PlatformOutput;
  meta: PlatformMeta;
  copied: string | null;
  onCopy: (id: string, content: string) => void;
}

export function ResultCard({ out, meta, copied, onCopy }: ResultCardProps) {
  const t = useTranslations("tool");

  const full = [out.title, "", out.body, "", out.hashtags.join(" ")].join("\n");
  const bodyId = `${out.platform}-body`;

  return (
    <article className="glass rounded-2xl p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {meta.icon} {meta.name}
          </h3>
          <p className="mt-1 text-xs text-brand-400">{out.outputType}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onCopy(bodyId, out.body)}
            className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10"
          >
            {copied === bodyId ? t("copiedBody") : t("copyBody")}
          </button>
          <button
            type="button"
            onClick={() => onCopy(out.platform, full)}
            className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10"
          >
            {copied === out.platform ? t("copiedFull") : t("copyFull")}
          </button>
        </div>
      </div>
      <p className="mb-2 text-sm font-medium text-slate-200">{out.title}</p>
      <pre className="mb-4 whitespace-pre-wrap rounded-lg bg-black/30 p-4 text-sm leading-relaxed text-slate-300">
        {out.body}
      </pre>
      {out.hashtags.length > 0 && (
        <p className="mb-3 text-xs text-accent-300">{out.hashtags.join(" ")}</p>
      )}
      <ul className="list-inside list-disc text-xs text-slate-500">
        {out.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </article>
  );
}