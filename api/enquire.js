import { randomUUID } from 'crypto'
import { parseEnquiry } from '../lib/enquiry.js'
import { saveEnquiry } from '../lib/redis.js'
import { postEnquiryToDiscord } from '../lib/discord.js'
import { sendEnquirerConfirmation, sendTeamNotification } from '../lib/email.js'
import { sendEnquiryViaEmailJS } from '../lib/emailjs.js'

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json()
    const enquiry = parseEnquiry(body)
    const enquiryId = randomUUID()

    await saveEnquiry(enquiryId, enquiry)
    await postEnquiryToDiscord(enquiry, enquiryId)

    const emailResults = await Promise.allSettled([
      sendTeamNotification(enquiry),
      sendEnquirerConfirmation(enquiry),
      sendEnquiryViaEmailJS(enquiry),
    ])

    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        const channels = ['Resend team email', 'Resend confirmation', 'EmailJS']
        console.error(`${channels[index]} failed:`, result.reason)
      }
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Enquiry submission failed:', error)

    const message = error instanceof Error ? error.message : 'Failed to submit enquiry'
    const status = message.startsWith('Invalid') || message.includes('required') || message.includes('valid email')
      ? 400
      : 500

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
