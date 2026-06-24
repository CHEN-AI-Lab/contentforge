import { PLATFORMS } from "@/config/platforms";
import { getToneStyle } from "@/services/tone-style";
import type { ToneStyle } from "@/services/tone-style";
import type {
  ContentTone,
  PlatformId,
  PlatformOutput,
  RepurposeInput,
  RepurposeResult,
} from "@/types/content";

/* ──────────  Shared helpers ────────── */

function extractSentences(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/[。！？\n?~…—;；]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
}

function extractKeywords(text: string, count = 6): string[] {
  const stop = new Set([
    "的", "了", "是", "在", "和", "与", "或", "也", "就", "都", "而", "及",
    "一个", "我们", "他们", "可以", "这个", "那个", "如何", "什么", "因为",
  ]);
  const chars = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, " ");
  const words: Record<string, number> = {};
  for (const w of chars.split(/\s+/)) {
    if (w.length < 2 || stop.has(w)) continue;
    words[w] = (words[w] ?? 0) + 1;
  }
  return Object.entries(words)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([w]) => w);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + "…";
}

/* ──────────  Builder context & factory ────────── */

interface BuilderContext {
  sentences: string[];
  keywords: string[];
  ts: ToneStyle;
  tone: ContentTone;
  /** Get sentence with index and fallback */
  s: (i: number, fallback?: string) => string;
  /** Truncate to this platform's maxChars */
  trunc: (text: string) => string;
  /** Platform config entry */
  meta: (typeof PLATFORMS)[number];
}

type Builder = (ctx: BuilderContext) => PlatformOutput;

function createBuilder(
  platformId: PlatformId,
  build: (ctx: BuilderContext) => Omit<PlatformOutput, "platform">,
): Builder {
  return (ctx) => {
    const output = build(ctx);
    return { platform: platformId, ...output };
  };
}

/* ──────────  Individual builders ────────── */

const buildXiaohongshu = createBuilder("xiaohongshu", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const fallback = "这篇内容值得收藏";
  const hookLine = s(0, fallback);
  const hook = ts.emoji
    ? ctx.tone === "viral"
      ? `🔥 ${hookLine}（必看）`
      : `✨ ${hookLine}`
    : `【要点】${hookLine}`;

  const points = [s(1), s(2), s(3), s(4)]
    .filter(Boolean)
    .map((sentence, i) => `${ts.listMarker(i)} ${sentence}`);

  const ending =
    ctx.tone === "viral"
      ? "🔥 速收藏！评论区扣「1」领资料！"
      : ctx.tone === "professional"
        ? "欢迎转发至需要的同事与朋友。"
        : "👇 你觉得哪条最有用？评论区聊聊";

  const body = [
    hook,
    "",
    ...points,
    "",
    ts.emoji ? "💡 划重点：" : "【总结】",
    s(5, "实践出真知"),
    "",
    ending,
  ].join("\n");

  return {
    outputType: `种草笔记（${ts.label}）`,
    title: trunc(hook.replace(/^✨ |^🔥 |^【要点】/, "").slice(0, 20)),
    body: trunc(body),
    hashtags: keywords.slice(0, 5).map((k) => `#${k}`),
    tips: [
      ts.emoji ? "封面：大字 + 高对比" : "封面：简洁信息图风格",
      "发布时段：工作日晚 8–10 点",
    ],
  };
});

const buildWechat = createBuilder("wechat", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const rawTitle = s(0, "深度解读");
  const title = trunc(`${ts.wechatTitlePrefix}${rawTitle}`);

  const summaryLead =
    ctx.tone === "viral"
      ? `【导读】${[s(0), s(1)].filter(Boolean).join("！")}！`
      : ctx.tone === "professional"
        ? `【摘要】${[s(0), s(1)].filter(Boolean).join("。")}。`
        : `【写在前面】${[s(0), s(1)].filter(Boolean).join("。")}。`;

  const body = [
    summaryLead,
    "",
    ctx.tone === "professional" ? "## 一、问题定义" : "## 一、开头",
    s(1, "先看问题本质。"),
    "",
    "## 二、核心观点",
    ...[s(2), s(3), s(4)].filter(Boolean).map((x) => `- ${x}`),
    "",
    "## 三、行动建议",
    s(5, "把想法落地，比完美计划更重要。"),
    "",
    "---",
    ts.wechatFooter,
  ].join("\n");

  return {
    outputType: `公众号推文（${ts.label}）`,
    title,
    body: trunc(body),
    hashtags: keywords.slice(0, 3),
    tips: ["标题与语气风格一致", "首段 3 行内给出价值承诺"],
  };
});

const buildWeibo = createBuilder("weibo", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const core =
    ctx.tone === "viral"
      ? `${s(0, "")}！${s(1, "真的绝了")}！`
      : [s(0), s(1)].filter(Boolean).join("。");
  const tags = keywords.slice(0, 3).map((k) => `#${k}#`).join(" ");
  const body = trunc(`${ts.weiboTag}${core} ${tags}`);

  return {
    outputType: `微博正文（${ts.label}）`,
    title: trunc(s(0, "微博文案")),
    body,
    hashtags: keywords.slice(0, 3).map((k) => `#${k}#`),
    tips: ["配 1 张信息图或九宫格", "@相关账号增加曝光"],
  };
});

const buildDouyin = createBuilder("douyin", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const s0 = s(0, "这件事");
  const s1 = s(1, "大多数人只看到了表面");
  const s2 = s(2, "真正有效的是下面这套方法");
  const s3 = s(3, "照着做就能看到变化");
  const hook = ts.videoHook(s0);

  const body = [
    "【成片建议】竖屏 9:16 | 时长 45–60 秒 | 字幕必开",
    "",
    `【发布标题】${trunc(ctx.tone === "viral" ? `🔥${s0}` : s0)}`,
    "",
    "━━ 分镜口播脚本 ━━",
    "",
    "[0:00 – 0:03] 黄金 3 秒钩子",
    `画面：近景直视镜头 / 大字幕「${trunc(s0.slice(0, 12))}」`,
    `口播：${hook}`,
    "",
    "[0:03 – 0:15] 痛点共鸣",
    `口播：${ctx.tone === "professional" ? "核心结论是：" : "先说结论——"}${s1}。`,
    "",
    "[0:15 – 0:35] 干货 1–2 点",
    `口播：第一，${s2}。第二，${s3}。`,
    "",
    "[0:35 – 0:50] 总结 + 互动",
    `口播：${ts.douyinMidCta}`,
    "",
    "[0:50 – 0:60] 关注引导",
    `口播：${ts.douyinEndCta}`,
    "",
    "【字幕高亮词】" + keywords.slice(0, 4).join(" / "),
    "【评论区置顶】" + trunc(s0.slice(0, 50)),
    "【BGM 建议】" +
      (ctx.tone === "viral" ? "热门卡点音乐，节奏要快" : "轻电子或纯音乐，音量低于人声"),
  ].join("\n");

  return {
    outputType: `分镜口播（${ts.label}）`,
    title: trunc(s0.slice(0, 25)),
    body: trunc(body),
    hashtags: ["#干货", "#口播", ...keywords.slice(0, 3).map((k) => `#${k}`)],
    tips: ["口播=念脚本拍摄，不是上传视频再优化", "前 3 秒决定完播率"],
  };
});

const buildShipinhao = createBuilder("shipinhao", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const title = trunc(
    ctx.tone === "viral" ? `⚠️${s(0, "本期分享")}` : s(0, "本期分享"),
  );

  const body = [
    `【视频号标题】${title}`,
    "",
    "【描述区文案】",
    trunc(`${[s(0), s(1)].filter(Boolean).join("。")}。${ts.shipinhaoDescEnd}`),
    "",
    "【口播脚本 · 约 90 秒】",
    "",
    `[开场] ${ts.shipinhaoGreet}${s(0, "")}。`,
    "",
    "[主体]",
    ...[s(1), s(2), s(3)].filter(Boolean).map((sen, i) => `要点${i + 1}：${sen}`),
    "",
    `[收尾] ${s(4, "以上就是本期核心内容")}。${ts.cta}`,
    "",
    "【话题】" + keywords.slice(0, 4).map((k) => `#${k}`).join(" "),
  ].join("\n");

  return {
    outputType: `视频号发布包（${ts.label}）`,
    title,
    body: trunc(body),
    hashtags: keywords.slice(0, 4).map((k) => `#${k}`),
    tips: ["描述区第一句决定朋友圈打开率", "可与公众号联动导流"],
  };
});

const buildBilibili = createBuilder("bilibili", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const s0 = s(0, "本期主题");
  const title = trunc(
    ctx.tone === "viral"
      ? `【必看】${s0}！`
      : ctx.tone === "professional"
        ? `【系统梳理】${s0}`
        : `【分享】${s0}`,
  );

  const partition = ctx.tone === "professional" ? "知识区 / 科技数码" : "生活 / 知识分享";
  const desc = trunc(`${ts.bilibiliOpen}${[s(0), s(1)].filter(Boolean).join("。")}。\n\n时间轴与要点见视频。${ts.bilibiliClose}`);

  const body = [
    `【投稿标题】${title}`,
    "",
    "【视频简介（粘贴到 B 站）】",
    desc,
    "",
    "【建议分区】" + partition,
    "",
    "━━ 口播 / 字幕脚本（约 3–5 分钟）━━",
    "",
    "[00:00-00:20] 开场",
    ts.bilibiliOpen + s0 + "。",
    "",
    "[00:20-01:30] 问题背景",
    s(1, "先说说为什么这件事重要。"),
    "",
    "[01:30-03:00] 核心内容",
    ...[s(2), s(3)].filter(Boolean).map((sen, i) => `· 要点${i + 1}：${sen}`),
    "",
    "[03:00-04:00] 总结",
    s(4, "以上就是本期核心。"),
    "",
    "[04:00-04:30] 结尾",
    ts.bilibiliClose,
    "",
    "【弹幕互动点】",
    ctx.tone === "viral"
      ? "· 03:20 刷「学到了」\n· 结尾刷「下次一定」"
      : "· 02:00 可提问「你卡在哪一步」\n· 结尾引导三连",
    "",
    "【标签】" + keywords.slice(0, 6).join("、"),
  ].join("\n");

  return {
    outputType: `B站投稿包（${ts.label}）`,
    title,
    body: trunc(body),
    hashtags: keywords.slice(0, 6),
    tips: ["标题控制在 80 字内", "封面建议 16:9，大字 + 人物", "前 30 秒留住观众"],
  };
});

const buildSeo = createBuilder("seo", (ctx) => {
  const { s, ts, keywords, trunc } = ctx;
  const base = s(0, "内容创作");
  const kw = keywords.slice(0, 5);
  const titles = ts.seoTitleTemplates(base, kw);

  const metaDesc =
    ctx.tone === "viral"
      ? trunc(`🔥${[s(0), s(1)].filter(Boolean).join("！")}！${kw[0] ?? "干货"}全在这，建议收藏！`)
      : ctx.tone === "professional"
        ? trunc(`本文系统阐述${base}，涵盖${kw.slice(0, 2).join("、")}等要素，供读者参考与引用。`)
        : trunc(`${[s(0), s(1)].filter(Boolean).join("。")}。从${kw[0] ?? "实操"}角度拆解，建议收藏。`);

  const body = [
    `【语气】${ts.label}`,
    "",
    "【标题候选】",
    ...titles.map((t, i) => `${i + 1}. ${t}`),
    "",
    "【页面描述 Meta】",
    metaDesc,
    "",
    "【核心关键词】",
    kw.join("、"),
    "",
    "【长尾词】",
    ...kw.map((k) => `- ${k}怎么做`),
  ].join("\n");

  return {
    outputType: `SEO 文案包（${ts.label}）`,
    title: "SEO 标题 + 描述 + 关键词",
    body: trunc(body),
    hashtags: kw,
    tips: ["主关键词放标题前 15 字", "描述写清读者收益"],
  };
});

/* ──────────  Builder registry ────────── */

const builders: Record<PlatformId, Builder> = {
  xiaohongshu: buildXiaohongshu,
  wechat: buildWechat,
  weibo: buildWeibo,
  douyin: buildDouyin,
  shipinhao: buildShipinhao,
  bilibili: buildBilibili,
  seo: buildSeo,
};

/* ──────────  Public entry point ────────── */

export function repurposeContent(input: RepurposeInput): RepurposeResult {
  const { sourceText, platforms } = input;
  const tone = input.tone ?? "casual";
  const ts = getToneStyle(tone);
  const sentences = extractSentences(sourceText);
  const keywords = extractKeywords(sourceText);
  const wordCount = sourceText.replace(/\s/g, "").length;

  // Pre-build context for each requested platform
  const ctx: BuilderContext = {
    sentences,
    keywords,
    ts,
    tone,
    s: (i, fallback = "") => sentences[i] ?? fallback,
    trunc: (text: string) => truncate(text, 1200),
    meta: PLATFORMS[0],
  };

  const outputs = platforms
    .filter((p): p is PlatformId => p in builders)
    .map((p) => {
      const meta = PLATFORMS.find((m) => m.id === p);
      return builders[p]({
        ...ctx,
        trunc: (text: string) => truncate(text, meta?.maxChars ?? 1200),
        meta: meta ?? PLATFORMS[0],
      });
    });

  const summary = sentences[0] ?? truncate(sourceText, 80) ?? "已根据原文生成多平台适配版本";
  return { outputs, summary, wordCount, tone, toneLabel: ts.label };
}