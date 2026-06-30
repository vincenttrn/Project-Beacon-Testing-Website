import './Homepage.css'
import SEO from '../SEO/SEO.jsx'

import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Footer from '../Footer/Footer.jsx'
import DarkVeil from '../components/DarkVeil.jsx'

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

const heroImages = [
  '/alarm-bot-workshop/DSC_4146.jpg',
  '/alarm-bot-workshop/computer_with_code_and_bot.JPG',
  '/alarm-bot-workshop/DSC_4223.jpg',
]

const acncLogo = '/logo/ACNC_logo.png'
const missionImage = '/alarm-bot-workshop/DSC_4146.jpg'
const incursionImage = '/alarm-bot-workshop/DSC_4223.jpg'

const pathsData = [
  {
    number: 'I',
    title: 'Educate.',
    description:
      'Students are educated on the fundamentals required to build a robot. This includes the 3D printing process to make the robot chassis, the workings and wiring of electrical components and the Arduino skills necessary to make their bot functional.',
  },
  {
    number: 'II',
    // label: 'Learn',
    // tag: 'Teachers',
    title: 'Empower.',
    description:
      'Students are empowered to tackle robotics with a hands-on building and programming experience that replicates the troubleshooting and testing environment present in real-world engineering industries.',
  },
  {
    number: 'III',
    // label: 'Take Home',
    // tag: 'Families',
    title: 'Instill.',
    description:
      'Students are instilled with a lasting curiosity for STEM through a concluding industry-focused Q&A session, alongside the opportunity to bring their robot home for continued experimentation.',
  },
]

const schoolReadyData = [
  {
    icon: <ContentPasteRoundedIcon />,
    title: 'Risk Assessment Provided',
    description:
      "Complete risk assessment documentation prepared for your school's approval process.",
  },
  {
    icon: <SecurityRoundedIcon />,
    title: 'Public Liability Insurance',
    description:
      'Fully insured program with comprehensive public liability coverage for school activities.',
  },
  {
    icon: <CheckCircleRoundedIcon />,
    title: 'WWCC Compliance',
    description:
      'All facilitators hold valid Working With Children Checks and relevant certifications.',
  },
]

function Homepage() {
  const heroShowcaseRef = useScrollReveal()
  const pathsRef = useScrollReveal()
  const missionRef = useScrollReveal()
  const notForProfitRef = useScrollReveal()
  const bannerRef = useScrollReveal()
  const incursionsRef = useScrollReveal()
  const schoolReadyRef = useScrollReveal()

  const scrollToInfo = () => {
    pathsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <SEO
        title="Robotics Incursions for NSW Schools | Project Beacon"
        description="Curriculum-aligned robotics incursions for NSW schools. Project Beacon delivers hands-on STEM incursions where students build, code, and test Arduino-powered robots."
      />

      <div className="dark-veil-background">
        <DarkVeil />
      </div>

      <main className="homepage-container">
        <section className="homepage-hero-container">
          <div className="homepage-hero-text-container">
            <h1 className="homepage-hero-title">
              High School Robotics Incursions
            </h1>

            <p className="homepage-hero-subtitle">
              Students build, code, test, and take home their own robot through a fun classroom workshop built for curious young makers.
              {/* Project Beacon brings practical STEM into the classroom through a playful, build-it-yourself robotics workshop where students code, test, troubleshoot, and take home their own robot. */}
            </p>
          </div>

          <div
            className="homepage-hero-showcase scroll-reveal"
            ref={heroShowcaseRef}
          >
            {heroImages.map((img, index) => (
              <div className="homepage-hero-showcase-card" key={index}>
                <img
                  src={img}
                  alt={`Project Beacon robotics incursion moment ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="homepage-hero-call-to-action-container">
            <button
              type="button"
              className="homepage-hero-call-to-action-info-button"
              onClick={scrollToInfo}
            >
              <span>View Info</span>
              <ArrowForwardRoundedIcon />
            </button>
          </div>
        </section>

        <section className="homepage-paths-section scroll-reveal" ref={pathsRef}>
          <div className="homepage-section-intro">
            <p className="homepage-chapter-label">Ch. 01 Paths</p>
            <h2>Three ways students enter robotics.</h2>
            <p>
              Build it, understand it, then keep experimenting after the workshop.
            </p>
          </div>

          <div className="homepage-paths-grid">
            {pathsData.map((path) => (
              <article className="homepage-path-card" key={path.number}>
                <div className="homepage-path-number">{path.number}</div>

                <div className="homepage-path-meta">
                  <span>{path.label}</span>
                  <span>{path.tag}</span>
                </div>

                <h3>{path.title}</h3>
                <p>{path.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="homepage-editorial-section homepage-mission-section scroll-reveal"
          ref={missionRef}
        >
          <div className="homepage-editorial-copy">
            <p className="homepage-chapter-label">Ch. 02 Mission</p>
            <h2>Our Mission</h2>
            <p>
              Project Beacon is a not-for-profit organisation based in Sydney whose goal is to bring the world of STEM directly into the hands of young student innovators. All our presenters are current university students pursuing STEM degrees, allowing them to provide an engaging and relatable learning experience for each student. 
            </p>
            <br></br>
            <p>
              Our interactive and curriculum-aligned workshops aim to teach students the fundamentals of robotics, from manufacturing through to programming and testing. Each workshop is built around students creating robots they can take home, inspiring continual experimentation and future learning.
            </p>
          </div>

          <div className="homepage-editorial-image">
            <img src={missionImage} alt="Students working on robots in class" />
          </div>
        </section>

        <section
          className="homepage-not-for-profit-section scroll-reveal"
          ref={notForProfitRef}
        >
          <div className="homepage-logo-cloud homepage-logo-cloud-single">
            <div className="homepage-logo-card">
              <img src={acncLogo} alt="ACNC logo" />
            </div>
          </div>

          <div className="homepage-not-for-profit-copy">
            <p className="homepage-chapter-label">Ch. 03 Not-For-Profit</p>
            <h2>Built to make STEM more accessible.</h2>
            <p>
              Our prices are governed by our not-for-profit initiative. Workshop
              prices only cover the supply costs for each robot and the workshop
              setup. There are no labour costs attached.
            </p>
            <br />
            <p>
              Our ultimate goal is to bring free STEM workshops to
              low-socioeconomic and all-girl schools around Sydney.
            </p>
          </div>
        </section>

        <section className="homepage-alarm-bot-banner scroll-reveal" ref={bannerRef}>
          <div>
            <p className="homepage-chapter-label">Ch. 04 Workshop</p>
            <h2>New Alarm Bot Workshop</h2>
            <p>
              A practical robotics incursion where students build, code, customise,
              and test their own robot in one classroom-ready experience.
            </p>
          </div>

          <Link to="/workshops/alarm-bot" className="homepage-alarm-bot-button">
            <span>View Workshop</span>
            <ArrowForwardRoundedIcon />
          </Link>
        </section>

        {/* <section
          className="homepage-editorial-section homepage-incursions-section scroll-reveal"
          ref={incursionsRef}
        >
          <div className="homepage-editorial-image">
            <img src={incursionImage} alt="Alarm Bot robotics workshop activity" />
          </div>

          <div className="homepage-editorial-copy">
            <p className="homepage-chapter-label">Ch. 05 Incursions</p>
            <h2>Our Incursions</h2>
            <p>
              Our incursions are designed for teachers who want a practical,
              school-ready STEM activity without needing to build the whole program
              from scratch.
            </p>
            <br />
            <p>
              Students learn Arduino coding, electronics, motors, sensors,
              circuitry, 3D printing, troubleshooting, and engineering design
              through a working robot they can take home.
            </p>
          </div>
        </section> */}

        {/* <section
          className="homepage-school-ready-section scroll-reveal"
          ref={schoolReadyRef}
        >
          <div className="homepage-section-intro">
            <p className="homepage-chapter-label">Ch. 06 School Ready</p>
            <h2>Built for teachers, not just students.</h2>
            <p>
              The fun part is the robot. The useful part is that the workshop is
              already prepared for school delivery.
            </p>
          </div>

          <div className="homepage-school-ready-list">
            {schoolReadyData.map((item, index) => (
              <article className="homepage-school-ready-item" key={item.title}>
                <div className="homepage-school-ready-index">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="homepage-school-ready-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section> */}

        {/* <section className="homepage-closing-section">
          <p className="homepage-chapter-label">Fin.</p>
          <h2>Bring robotics into the classroom.</h2>

          <Link to="/workshops/alarm-bot" className="homepage-final-button">
            <span>Explore the Alarm Bot Workshop</span>
            <ArrowForwardRoundedIcon />
          </Link>
        </section> */}
      </main>

      <Footer />
    </>
  )
}

export default Homepage