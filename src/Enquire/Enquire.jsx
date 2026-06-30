import './Enquire.css'
import { useRef, useState } from 'react'
import emailjs from 'emailjs-com'

import AlternativeFooter from '../Footer/AlternativeFooter'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import SEO from '../SEO/SEO'

function Enquire() {
  const formRef = useRef()

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    emailjs
      .sendForm(
        'service_cqgyohi',
        'template_emalvgp',
        formRef.current,
        'WUiNf9ApK_txsx0VX'
      )
      .then(() => {
        setStatus('success')
        setLoading(false)
        formRef.current.reset()
      })
      .catch(() => {
        setStatus('error')
        setLoading(false)
      })
  }

  return (
    <>
      <SEO
        title="Enquire | Project Beacon"
        description="lorem ipsum"
      />

      <div className="enquire-container">

        {/* HERO / PAGE HEADER */}
        <div className="enquire-header">
          <h1 className="enquire-title">Enquire About a Workshop</h1>

          <p className="enquire-subtitle">
            Complete the form below and we'll get back to you within 24 hours with availability, pricing confirmation, and next steps.
          </p>
        </div>

        <div className="enquire-content">

          {/* FORM SECTION */}
          <form className="enquire-form" ref={formRef} onSubmit={sendEmail}>

            {status === 'success' && (
              <div className="enquire-message success">
                <CheckCircleRoundedIcon />
                <div>
                  <strong>Enquiry Sent Successfully!</strong>
                  <p>Our team will respond within 24 hours.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="enquire-message error">
                <ErrorRoundedIcon />
                <div>
                  <strong>Something went wrong.</strong>
                  <p>Please try again or email us directly.</p>
                </div>
              </div>
            )}

            <div className="enquire-grid">
              <div className="enquire-field">
                <label>School Name *</label>
                <input type="text" name="school_name" required />
              </div>

              <div className="enquire-field">
                <label>Your Name *</label>
                <input type="text" name="name" required />
              </div>

              <div className="enquire-field">
                <label>Email Address *</label>
                <input type="email" name="email" required />
              </div>

              <div className="enquire-field">
                <label>Phone Number</label>
                <input type="tel" name="phone" />
              </div>

              <div className="enquire-field">
                <label>Year Level *</label>
                <select name="year_level" required>
                  <option value="Year 7">Year 7</option>
                  <option value="Year 8">Year 8</option>
                  <option value="Year 9">Year 9</option>
                  <option value="Year 10">Year 10</option>
                  <option value="Mixed Years">Mixed Years</option>
                </select>
              </div>

              <div className="enquire-field">
                <label>Number of Students *</label>
                <input type="number" name="students" required />
              </div>
            </div>

            <div className="enquire-field full">
              <label>Preferred Date / Term</label>
              <input
                type="text"
                name="preferred_date"
                placeholder="e.g. Term 2, Week 5"
              />
            </div>

            <div className="enquire-field full">
              <label>Additional Information</label>
              <textarea name="message" rows="5" />
            </div>

            <button
              type="submit"
              className="enquire-submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit Enquiry'}
            </button>
          </form>

          {/* SIDEBAR */}
          <div className="enquire-sidebar">

            <div className="enquire-info-card">
              <h2>Contact Information</h2>

              <div className="enquire-info-item">
                <EmailRoundedIcon />
                <div>
                  <span>Email</span>
                  <p>support@projectbeacon.org.au</p>
                </div>
              </div>

              <div className="enquire-info-item">
                <LocationOnRoundedIcon />
                <div>
                  <span>Service Area</span>
                  <p>Sydney & Greater Sydney</p>
                </div>
              </div>
            </div>

            <div className="enquire-quick-card">
              <div className="enquire-quick-title">
                <ElectricBoltRoundedIcon />
                <span>Quick Response</span>
              </div>

              <p>
                We typically respond within 24 hours with availability and next steps.
              </p>

              <div className="enquire-availability">
                <span className="dot"></span>
                Team available Mon-Fri, 9am-5pm AEST
              </div>
            </div>

          </div>
        </div>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default Enquire
