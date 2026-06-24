import { FREE_DAILY_LIMIT } from "@/config/platforms";

const STORAGE_KEY = "contentforge-daily-usage";
const TOKEN_KEY = "contentforge-usage-token";

interface UsageRecord {
  date: string;
  count: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(): UsageRecord {
  if (typeof window === "undefined") {
    return { date: todayKey(), count: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const data = JSON.parse(raw) as UsageRecord;
    if (data.date !== todayKey()) return { date: todayKey(), count: 0 };
    return data;
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function write(record: UsageRecord): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Read server-signed usage token from localStorage */
function readToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Save server-signed usage token from API response header */
export function saveUsageToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Use stricter of local counter vs server token */
function pickMinCount(): number {
  const local = read().count;
  const raw = readToken();
  if (!raw) return local;
  try {
    const parsed = JSON.parse(raw) as { count: number };
    return Math.min(local, parsed.count);
  } catch {
    return local;
  }
}

export function getUsageStats(limit = FREE_DAILY_LIMIT) {
  const count = pickMinCount();
  return {
    used: count,
    limit,
    remaining: Math.max(0, limit - count),
    exhausted: count >= limit,
  };
}

export function tryConsumeUsage(limit = FREE_DAILY_LIMIT): {
  ok: boolean;
  remaining: number;
} {
  const syncedCount = pickMinCount();
  if (syncedCount >= limit) {
    return { ok: false, remaining: 0 };
  }
  const next = { date: todayKey(), count: syncedCount + 1 };
  write(next);
  return { ok: true, remaining: limit - next.count };
}

export function formatUsageHint(limit = FREE_DAILY_LIMIT): string {
  const { used, remaining } = getUsageStats(limit);
  return `今日免费额度 ${used}/${limit} 次，剩余 ${remaining} 次`;
}