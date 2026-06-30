import { verifyKey } from 'discord-interactions'
import {
  buildReplyModal,
  extractModalReply,
  getInteractionEnquiryId,
} from '../lib/discord.js'
import { getEnquiry } from '../lib/redis.js'
import { sendEnquirerReply } from '../lib/email.js'

const INTERACTION_PING = 1
const INTERACTION_MODAL_SUBMIT = 5
const INTERACTION_MESSAGE_COMPONENT = 3

const RESPONSE_PONG = 1
const RESPONSE_CHANNEL_MESSAGE = 4

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const signature = request.headers.get('x-signature-ed25519')
  const timestamp = request.headers.get('x-signature-timestamp')
  const rawBody = await request.text()

  const isValid = verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY || ''
  )

  if (!isValid) {
    return new Response('Invalid request signature', { status: 401 })
  }

  const interaction = JSON.parse(rawBody)

  if (interaction.type === INTERACTION_PING) {
    return jsonResponse({ type: RESPONSE_PONG })
  }

  if (interaction.type === INTERACTION_MESSAGE_COMPONENT) {
    const enquiryId = getInteractionEnquiryId(interaction)

    if (!enquiryId) {
      return ephemeralResponse('This button is no longer valid.')
    }

    const enquiry = await getEnquiry(enquiryId)

    if (!enquiry) {
      return ephemeralResponse('This enquiry has expired or was not found.')
    }

    return jsonResponse(buildReplyModal(enquiryId))
  }

  if (interaction.type === INTERACTION_MODAL_SUBMIT) {
    const enquiryId = getInteractionEnquiryId(interaction)

    if (!enquiryId) {
      return ephemeralResponse('This reply form is no longer valid.')
    }

    const enquiry = await getEnquiry(enquiryId)

    if (!enquiry) {
      return ephemeralResponse('This enquiry has expired or was not found.')
    }

    const replyMessage = extractModalReply(interaction)

    if (!replyMessage) {
      return ephemeralResponse('Please enter a reply message.')
    }

    const staffName = interaction.member?.display_name
      || interaction.member?.user?.global_name
      || interaction.member?.user?.username
      || interaction.user?.global_name
      || interaction.user?.username
      || 'Project Beacon Team'

    try {
      await sendEnquirerReply(enquiry, replyMessage, staffName)
      return ephemeralResponse(`Reply sent to ${enquiry.email}`)
    } catch (error) {
      console.error('Discord reply failed:', error)
      return ephemeralResponse('Failed to send the email. Please try again or reply manually.')
    }
  }

  return new Response('Unhandled interaction', { status: 400 })
}

function jsonResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

function ephemeralResponse(content) {
  return jsonResponse({
    type: RESPONSE_CHANNEL_MESSAGE,
    data: {
      content,
      flags: 64,
    },
  })
}
