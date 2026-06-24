import { PLATFORM_IDS, FREE_DAILY_LIMIT, TONE_OPTIONS } from "@/config/platforms";
import { repurposeContent } from "@/services/repurpose";
import type { ContentTone, PlatformId, RepurposeInput } from "@/types/content";
import { verifyToken, createToken } from "@/lib/usage-server";
import { NextResponse } from "next/server";

const VALID_TONES = new Set(TONE_OPTIONS.map((t) => t.id));

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RepurposeInput>;

    /* ── input validation ── */

    if (!body.sourceText || body.sourceText.trim().length < 20) {
      return NextResponse.json(
        { error: "请输入至少 20 字的原文内容" },
        { status: 400 },
      );
    }

    if (body.sourceText.length > 10000) {
      return NextResponse.json(
        { error: "原文不超过 10000 字" },
        { status: 400 },
      );
    }

    const platforms = (body.platforms ?? PLATFORM_IDS).filter((p) =>
      PLATFORM_IDS.includes(p as PlatformId),
    ) as PlatformId[];

    if (platforms.length === 0) {
      return NextResponse.json(
        { error: "请至少选择一个目标平台" },
        { status: 400 },
      );
    }

    const tone: ContentTone =
      body.tone && VALID_TONES.has(body.tone) ? body.tone : "casual";

    /* ── server-side usage check ── */

    const clientToken = request.headers.get("x-usage-token");

    // No token → first request today, allow it, issue token with count=1
    if (!clientToken) {
      return respond(body.sourceText.trim(), platforms, tone, 1);
    }

    const { valid, count } = verifyToken(clientToken, FREE_DAILY_LIMIT);

    // Invalid token → tampered or expired → block
    if (!valid) {
      return NextResponse.json(
        { error: `今日免费额度已用完（${FREE_DAILY_LIMIT} 次/天）` },
        { status: 429 },
      );
    }

    // Reached limit → block
    if (count >= FREE_DAILY_LIMIT) {
      return NextResponse.json(
        { error: `今日免费额度已用完（${FREE_DAILY_LIMIT} 次/天）` },
        { status: 429 },
      );
    }

    // Allow with incremented count
    return respond(body.sourceText.trim(), platforms, tone, count + 1);
  } catch {
    return NextResponse.json(
      { error: "处理失败，请稍后重试" },
      { status: 500 },
    );
  }
}

function respond(
  sourceText: string,
  platforms: PlatformId[],
  tone: ContentTone,
  newCount: number,
) {
  const result = repurposeContent({ sourceText, platforms, tone });
  return NextResponse.json(result, {
    headers: { "x-usage-token": createToken(newCount) },
  });
}
