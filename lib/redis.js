import { Redis } from '@upstash/redis'

const ENQUIRY_TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set')
  }

  return new Redis({ url, token })
}

export async function saveEnquiry(id, enquiry) {
  const redis = getRedis()
  await redis.set(`enquiry:${id}`, enquiry, { ex: ENQUIRY_TTL_SECONDS })
}

export async function getEnquiry(id) {
  const redis = getRedis()
  return redis.get(`enquiry:${id}`)
}
