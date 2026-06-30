import './Footer.css'
import { Link } from 'react-router-dom'
import AlternativeFooter from './AlternativeFooter.jsx'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import StarBorder from '../components/StarBorder.jsx'

function Footer() {
  return (
    <footer className='homepage-footer-container'>
      {/* CTA section */}
      <section className='homepage-footer-cta-section'>
        <h2 className='homepage-footer-cta-title'>
          Let's collaborate together for the next big workshop
        </h2>

        <StarBorder
          as={Link}
          to="/enquire"
          className="homepage-footer-contact-button"
          color="white"
          speed="6s"
        >
          <EmailRoundedIcon />
          <span className='contact-link'>Contact Us</span>
        </StarBorder>
      </section>

      <AlternativeFooter />
    </footer>
  )
}

export default Footer
