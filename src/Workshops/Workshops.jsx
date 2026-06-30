import './Workshops.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'
import SEO from '../SEO/SEO.jsx'

/* workshops data */
const workshopsData = [
  {
    icon: <img src="/logo/alarmbot_icon.png" alt="Alarm Bot Icon" style={{ width: '72px', height: '72px' }} />,
    title: 'Alarm Bot Workshop',
    tagline: 'Build, wire, and program an alarm bot to take home',
    description:
      'Students learn about the necessary engineering skills required to build a wheeled Alarm Bot, with a customisable buzzer sequence and motion path - perfect for waking themselves up just in time for school! The workshop guides the student all the way from the fundamentals of small-scale circuitry to programming the bot in Arduino.',
    duration: '2 hours',
    yearLevels: 'Years 7 - 10',
    link: '/workshops/alarm-bot'
  },
]

const faqData = [
  {
    question: 'Do students need prior coding or electronics experience?',
    answer: 'No, all required learning content and skills are taught during the workshop. For higher-level skills such as coding in Arduino, we provide templates for the majority of the code and only ask students to code small snippets which they can then test.'
  },
  {
    question: 'What do schools need to provide?',
    answer: 'Specific requirements for each type of workshop can be found within their respective incursion packs. Though we usually ask that workshops be held in computer labs, or if a school has a BYOD policy, then students bring their own laptops.'
  },
  {
    question: 'Why should I choose you as an incursion provider?',
    answer: 'We pride ourselves on being the only STEM incursion provider that allows students an opportunity to take home what they create, ensuring a lasting and tangible connection to the world of robotics, post-workshop.'
  },
]

function Workshops() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* CHANGE THIS CODY */}
      <SEO
        title="Robotics Incursions for Schools | Project Beacon NSW"
        description="Hands-on STEM robotics incursions for NSW schools. Students design, build, and program real robots including the Alarm Bot workshop. No prior experience required."
      />

      {/* main container */}
      <div className="workshops-container">

        {/* header */}
        <div className="workshops-header">

          {/* FIX: label should NOT be H1 (keep semantic structure clean) */}
          <div className="workshops-label">
            <SchoolRoundedIcon />
            <span>Our Workshops</span>
          </div>

          {/* FIX: MAIN PAGE TITLE → H1 */}
          <h1 className="workshops-title">
            Hands-On Engineering Workshops
          </h1>

          <p className="workshops-subtitle">
            Purpose-built robotics incursions that place students in the role of engineers; designing, building, and programming real systems.
          </p>
        </div>

        {/* workshops grid */}
        <div className="workshops-grid">
          {workshopsData.map((workshop, index) => (
            <div key={index} className="workshops-card">

              {/* FIX: workshop title → H2 (important SEO keyword target) */}
              <h2 className="workshops-card-title">
                {workshop.title}
              </h2>

              <div className="workshops-card-icon">
                {workshop.icon}
              </div>

              <div className="workshops-card-tagline">
                {workshop.tagline}
              </div>

              <p className="workshops-card-description">
                {workshop.description}
              </p>

              <div className="workshops-card-meta">
                <span>{workshop.duration}</span>
                <span>{workshop.yearLevels}</span>
              </div>

              <Link to={workshop.link} className="workshops-cta-button">
                Find Out More
              </Link>
            </div>
          ))}

          {/* upcoming workshop */}
          <div className="workshops-card upcoming">

            {/* FIX: H2 so it stays part of page structure */}
            <h2 className="workshops-card-title">
              More Workshops Coming
            </h2>

            <div className="workshops-card-icon muted">
              <UpdateRoundedIcon />
            </div>

            <p className="workshops-card-description">
              We're actively developing new hands-on engineering workshops that build on
              electronics, robotics, and real-world problem solving.
            </p>

            <span className="workshops-upcoming-tag">
              Launching soon
            </span>
          </div>
        </div>

        {/* divider */}
        <div className="workshops-divider"></div>

        {/* FAQ Section */}
        <div className="workshops-faq">

          {/* FIX: section heading → H2 */}
          <h2 className="workshops-faq-title">
            Frequently Asked Questions
          </h2>

          <div className="workshops-faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`workshops-faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button
                  className="workshops-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>

                <div className="workshops-faq-answer">
                  <div className="workshops-faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  );
}

export default Workshops