const DISCORD_API = 'https://discord.com/api/v10'

function getBotToken() {
  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) {
    throw new Error('DISCORD_BOT_TOKEN must be set')
  }
  return token
}

function getChannelId() {
  const channelId = process.env.DISCORD_CHANNEL_ID
  if (!channelId) {
    throw new Error('DISCORD_CHANNEL_ID must be set')
  }
  return channelId
}

export async function postEnquiryToDiscord(enquiry, enquiryId) {
  const response = await fetch(`${DISCORD_API}/channels/${getChannelId()}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${getBotToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [buildEnquiryEmbed(enquiry)],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: 'Reply',
              custom_id: `reply:${enquiryId}`,
            },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Discord API error: ${error}`)
  }

  return response.json()
}

function buildEnquiryEmbed(enquiry) {
  const fields = [
    { name: 'School', value: enquiry.school_name, inline: true },
    { name: 'Contact', value: enquiry.name, inline: true },
    { name: 'Email', value: enquiry.email, inline: true },
    { name: 'Phone', value: enquiry.phone || 'Not provided', inline: true },
    { name: 'Year level', value: enquiry.year_level, inline: true },
    { name: 'Students', value: String(enquiry.students), inline: true },
    { name: 'Preferred date/term', value: enquiry.preferred_date || 'Not provided', inline: false },
  ]

  if (enquiry.message) {
    fields.push({
      name: 'Message',
      value: enquiry.message.slice(0, 1024),
      inline: false,
    })
  }

  return {
    title: 'New workshop enquiry',
    color: 0x5865f2,
    fields,
    footer: { text: 'Click Reply to email the contact directly' },
    timestamp: new Date().toISOString(),
  }
}

export function buildReplyModal(enquiryId) {
  return {
    type: 9,
    data: {
      custom_id: `reply_modal:${enquiryId}`,
      title: 'Reply to enquiry',
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: 'reply_message',
              label: 'Your reply',
              style: 2,
              min_length: 1,
              max_length: 2000,
              required: true,
            },
          ],
        },
      ],
    },
  }
}

export function extractModalReply(interaction) {
  const row = interaction.data?.components?.[0]
  const input = row?.components?.[0]
  return input?.value?.trim() || ''
}

export function getInteractionEnquiryId(interaction) {
  const customId = interaction.data?.custom_id || ''

  if (customId.startsWith('reply:')) {
    return customId.slice('reply:'.length)
  }

  if (customId.startsWith('reply_modal:')) {
    return customId.slice('reply_modal:'.length)
  }

  return null
}
