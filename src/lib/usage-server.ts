import { createHash } from "crypto";

/**
 * Server-side signed daily usage token.
 * Prevents naive localStorage bypass (client clears storage → resets count).
 *
 * On each successful generation, the API returns a signed token.
 * The client sends it back on subsequent requests. Server validates the
 * signature and current date before counting.
 */

const SIGNING_KEY =
  process.env.USAGE_SIGNING_KEY ??
  "contentforge-dev-fallback-key-do-not-use-in-prod-32ch";

interface SignedToken {
  date: string; // YYYY-MM-DD
  count: number;
  sig: string;
}

function sign(date: string, count: number): string {
  const h = createHash("sha256");
  h.update(`${date}:${count}:${SIGNING_KEY}`);
  return h.digest("hex").slice(0, 16);
}

export function createToken(count: number): string {
  const date = new Date().toISOString().slice(0, 10);
  const sig = sign(date, count);
  return JSON.stringify({ date, count, sig });
}

export function verifyToken(
  token: string | undefined | null,
  limit: number,
): { valid: boolean; count: number; remaining: number } {
  const fail = { valid: false, count: 0, remaining: limit };

  if (!token) return fail;

  let parsed: SignedToken;
  try {
    parsed = JSON.parse(token) as SignedToken;
  } catch {
    return fail;
  }

  const { date, count, sig } = parsed;
  const today = new Date().toISOString().slice(0, 10);

  if (date !== today) return fail;
  if (count > limit) return { valid: false, count, remaining: 0 };
  if (sig !== sign(date, count)) return fail;

  return { valid: true, count, remaining: limit - count };
}
