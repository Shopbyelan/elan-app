import { prisma } from "@/lib/prisma";

const PER_IP_HOURLY_LIMIT = 20;
const GLOBAL_DAILY_LIMIT = 120;

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

function secondsUntilNextUtcHour(): number {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() + 1));
  return Math.ceil((next.getTime() - now.getTime()) / 1000);
}

function secondsUntilNextUtcMidnight(): number {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.ceil((next.getTime() - now.getTime()) / 1000);
}

async function bumpBucket(id: string): Promise<number> {
  const bucket = await prisma.chatRateLimit.upsert({
    where: { id },
    create: { id, count: 1 },
    update: { count: { increment: 1 } },
  });
  return bucket.count;
}

/**
 * Two-tier abuse guard for the chat API, backstopping the $10-15/month Claude
 * budget: a per-IP hourly cap (one visitor can't monopolize the budget) and a
 * global daily cap (the actual dollar ceiling — see plan for the math). Both
 * are single upserts against a bucketed key, cheap under the DB's
 * connection_limit=1. Stores counts only, never message content.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const now = new Date();
  const utcDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const utcHour = now.toISOString().slice(0, 13); // YYYY-MM-DDTHH

  const globalCount = await bumpBucket(`global:${utcDate}`);
  if (globalCount > GLOBAL_DAILY_LIMIT) {
    return { allowed: false, retryAfterSeconds: secondsUntilNextUtcMidnight() };
  }

  const ipCount = await bumpBucket(`ip:${ip}:${utcHour}`);
  if (ipCount > PER_IP_HOURLY_LIMIT) {
    return { allowed: false, retryAfterSeconds: secondsUntilNextUtcHour() };
  }

  return { allowed: true };
}
