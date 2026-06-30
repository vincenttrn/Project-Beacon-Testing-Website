import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      <div className='navbar-container'>
        {/* logo */}
        <Link to="/" className='navbar-logo-container'>
          <img src="/logo/pb.png" alt="Project Beacon Logo" className="navbar-logo-image" />
          <div className='navbar-logo-text'>Project Beacon</div>
        </Link>

        {/* desktop links */}
        <div className='navbar-main-links-container'>
          <Link to="/workshops" className='navbar-main-link'>
            Workshops
          </Link>
          {/* <Link to="/our-mission" className='navbar-main-link'>Our Mission</Link> */}
          <Link to="/resources" className='navbar-main-link'>Resources</Link>
        </div>

        {/* CTA */}
        <Link to="/enquire" className='navbar-call-to-action-link-container'>
          <div className='navbar-call-to-action-link-text'>Book Now</div>
        </Link>

        {/* hamburger */}
        <div
          className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* overlay */}
      <div
        className={`navbar-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* mobile menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/workshops" onClick={() => setMenuOpen(false)}>Workshops</Link>
        {/* <Link to="/our-mission" onClick={() => setMenuOpen(false)}>Our Mission</Link> */}
        <Link to="/resources" onClick={() => setMenuOpen(false)}>Resources</Link>
        <Link
          to="/enquire"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </>
  )
}

export default Navbar
