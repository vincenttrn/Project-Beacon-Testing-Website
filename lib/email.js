import { Resend } from 'resend'

function hasResend() {
  return Boolean(process.env.RESEND_API_KEY)
}

function getResend() {
  if (!hasResend()) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

function fromAddress() {
  return process.env.ENQUIRY_FROM_EMAIL || 'support@projectbeacon.org.au'
}

function teamAddress() {
  return process.env.TEAM_EMAIL || fromAddress()
}

export async function sendTeamNotification(enquiry) {
  if (!hasResend()) return

  const resend = getResend()

  await resend.emails.send({
    from: `Project Beacon <${fromAddress()}>`,
    to: teamAddress(),
    subject: `New workshop enquiry — ${enquiry.school_name}`,
    text: formatEnquiryText(enquiry),
    html: formatEnquiryHtml(enquiry),
  })
}

export async function sendEnquirerConfirmation(enquiry) {
  if (!hasResend()) return

  const resend = getResend()

  await resend.emails.send({
    from: `Project Beacon <${fromAddress()}>`,
    to: enquiry.email,
    replyTo: fromAddress(),
    subject: 'We received your workshop enquiry',
    text: `Hi ${enquiry.name},\n\nThanks for enquiring about a Project Beacon workshop for ${enquiry.school_name}. Our team will get back to you within 24 hours.\n\n— Project Beacon`,
    html: `<p>Hi ${escapeHtml(enquiry.name)},</p><p>Thanks for enquiring about a Project Beacon workshop for <strong>${escapeHtml(enquiry.school_name)}</strong>. Our team will get back to you within 24 hours.</p><p>— Project Beacon</p>`,
  })
}

export async function sendEnquirerReply(enquiry, replyMessage, staffName) {
  const resend = getResend()
  const signedBy = staffName ? `\n\n— ${staffName}, Project Beacon` : '\n\n— Project Beacon'

  await resend.emails.send({
    from: `Project Beacon <${fromAddress()}>`,
    to: enquiry.email,
    replyTo: fromAddress(),
    subject: `Re: Your workshop enquiry — ${enquiry.school_name}`,
    text: `${replyMessage}${signedBy}`,
    html: `<p>${escapeHtml(replyMessage).replace(/\n/g, '<br>')}</p><p>${staffName ? `— ${escapeHtml(staffName)}, Project Beacon` : '— Project Beacon'}</p>`,
  })
}

function formatEnquiryText(enquiry) {
  return [
    'New workshop enquiry',
    '',
    `School: ${enquiry.school_name}`,
    `Contact: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || 'Not provided'}`,
    `Year level: ${enquiry.year_level}`,
    `Students: ${enquiry.students}`,
    `Preferred date/term: ${enquiry.preferred_date || 'Not provided'}`,
    '',
    'Message:',
    enquiry.message || 'None',
  ].join('\n')
}

function formatEnquiryHtml(enquiry) {
  return `
    <h2>New workshop enquiry</h2>
    <p><strong>School:</strong> ${escapeHtml(enquiry.school_name)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(enquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || 'Not provided')}</p>
    <p><strong>Year level:</strong> ${escapeHtml(enquiry.year_level)}</p>
    <p><strong>Students:</strong> ${escapeHtml(String(enquiry.students))}</p>
    <p><strong>Preferred date/term:</strong> ${escapeHtml(enquiry.preferred_date || 'Not provided')}</p>
    <p><strong>Message:</strong><br>${escapeHtml(enquiry.message || 'None').replace(/\n/g, '<br>')}</p>
  `
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
