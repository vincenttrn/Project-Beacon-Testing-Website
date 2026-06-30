import emailjs from '@emailjs/nodejs'

function getEmailJSConfig() {
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY

  if (!serviceId || !templateId || !publicKey) {
    return null
  }

  return { serviceId, templateId, publicKey, privateKey }
}

export function isEmailJSConfigured() {
  return getEmailJSConfig() !== null
}

export async function sendEnquiryViaEmailJS(enquiry) {
  const config = getEmailJSConfig()
  if (!config) {
    return
  }

  const options = { publicKey: config.publicKey }
  if (config.privateKey) {
    options.privateKey = config.privateKey
  }

  await emailjs.send(
    config.serviceId,
    config.templateId,
    {
      school_name: enquiry.school_name,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone || '',
      year_level: enquiry.year_level,
      students: enquiry.students,
      preferred_date: enquiry.preferred_date || '',
      message: enquiry.message || '',
    },
    options
  )
}
