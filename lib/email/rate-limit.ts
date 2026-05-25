import 'server-only'

/**
 * Lightweight per-IP token bucket. Pure in-memory — fine for a single
 * Node process. Multi-instance deployments should swap for Redis
 * (Upstash, ioredis) using the same `check()` signature.
 *
 * Defaults: 5 submissions per IP per 10 minutes. The form is not
 * something a real user submits dozens of times in a row, so this
 * cuts off bots and dumb flooders without inconveniencing humans.
 */

interface Bucket {
  tokens: number
  resetAt: number
}

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_BUCKETS = 50_000        // prevent unbounded growth under attack

declare global {
  // eslint-disable-next-line no-var
  var __rateBuckets: Map<string, Bucket> | undefined
}

function store(): Map<string, Bucket> {
  if (!globalThis.__rateBuckets) globalThis.__rateBuckets = new Map()
  return globalThis.__rateBuckets
}

export function checkRate(ip: string): { ok: boolean; retryAfterSec: number } {
  const s = store()
  const now = Date.now()

  // Opportunistic cleanup so the map doesn't grow forever.
  if (s.size > MAX_BUCKETS) {
    for (const [k, v] of s) {
      if (v.resetAt <= now) s.delete(k)
      if (s.size <= MAX_BUCKETS / 2) break
    }
  }

  let b = s.get(ip)
  if (!b || b.resetAt <= now) {
    b = { tokens: MAX_PER_WINDOW, resetAt: now + WINDOW_MS }
    s.set(ip, b)
  }

  if (b.tokens <= 0) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) }
  }
  b.tokens--
  return { ok: true, retryAfterSec: 0 }
}
