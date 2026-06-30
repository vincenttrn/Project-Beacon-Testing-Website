const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function parseEnquiry(body) {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body')
  }

  const enquiry = {
    school_name: cleanText(body.school_name, 200),
    name: cleanText(body.name, 200),
    email: cleanText(body.email, 320).toLowerCase(),
    phone: cleanText(body.phone, 50),
    year_level: cleanText(body.year_level, 50),
    students: cleanText(body.students, 20),
    preferred_date: cleanText(body.preferred_date, 200),
    message: cleanText(body.message, 5000),
  }

  if (!enquiry.school_name) throw new Error('School name is required')
  if (!enquiry.name) throw new Error('Your name is required')
  if (!enquiry.email || !EMAIL_PATTERN.test(enquiry.email)) throw new Error('A valid email is required')
  if (!enquiry.year_level) throw new Error('Year level is required')
  if (!enquiry.students) throw new Error('Number of students is required')

  return enquiry
}

function cleanText(value, maxLength) {
  if (value == null) return ''
  return String(value).trim().slice(0, maxLength)
}
