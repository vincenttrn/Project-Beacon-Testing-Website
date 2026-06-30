import './AlternativeFooter.css'
import { Link } from 'react-router-dom'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function AlternativeFooter() {
  return (
    <div className='alternative-footer-container'>
      {/* main info section */}
      <div className='alternative-footer-main-block'>
        <div className='alternative-footer-brand-section'>
          <div className='alternative-footer-brand-logo'>
            <div className='alternative-footer-logo-icon'>
              {/* <img src="/src/Footer/logo/pb.png" alt="PB Logo" /> */}
              <img src="/logo/pb.png" alt="PB Logo" />
            </div>

            {/* CHANGED: span → H2 for semantic brand heading */}
            <h2 className="alternative-footer-brand-name">
              Project Beacon
            </h2>
          </div>

          <p className='alternative-footer-brand-description'>
            Bringing accessible hands-on robotics workshops. It is STEM learning that builds both technical skills and belief in their ability to innovate. We focus on capability, confidence, and real-world application.
          </p>

          <div className='alternative-footer-contact-links-section'>
            <a
              href="mailto:support@projectbeacon.org.au"
              className='alternative-footer-email'
            >
              <EmailRoundedIcon />
              support@projectbeacon.org.au
            </a>

            <a
              href="https://www.linkedin.com/company/project-beacon-aus/"
              target='_blank'
              className='alternative-footer-email'
            >
              <LinkedInIcon />
              Project Beacon Linkedin
            </a>
          </div>
        </div>

        <div className='alternative-footer-links-section'>
          <div className='alternative-footer-links-column'>
            <h3>Navigation</h3>
            <Link to="/workshops">Workshops</Link>
            {/* <Link to="/our-mission">Our Mission</Link> */}
            {/* <Link to="/our-team">Our Team</Link> */}
            <Link to="/resources">Resources</Link>
            <Link to="/enquire">Enquire</Link>
          </div>

          <div className='alternative-footer-links-column'>
            <h3>Information</h3>
            <a
              href="footer-files/Privacy Policy.pdf"
              download
              className="footer-download-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>

            <a
              href="footer-files/Project Beacon Child Safe Statement of Commitment.pdf"
              download
              className="footer-download-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Child Safety Policy
            </a>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className='alternative-footer-bottom-container'>
        <div className='alternative-footer-bottom'>
          <p>© 2025 Project Beacon. All rights reserved.</p>
          <p className='alternative-footer-badges'>
            NSW Curriculum Aligned · Fully Insured · WWCC Compliant
          </p>
        </div>
      </div>
    </div>
  )
}

export default AlternativeFooter
