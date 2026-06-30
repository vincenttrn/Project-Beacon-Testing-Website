import './PrivacyPolicy.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

function PrivacyPolicy() {
  return (
    <>
      <div className="privacy-container">
        <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-updated">
            Last updated: 11 February 2026
          </p>
        </div>

        <div className="privacy-card">

          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Project Beacon (“we”, “our”, or “us”) is committed to protecting your privacy
              and handling your personal information in a safe and responsible manner.
              This Privacy Policy explains how we collect, use, store, and disclose personal
              information when you engage with our programs, workshops, website, and services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Who We Are</h2>
            <p>
              Project Beacon is an educational initiative that delivers hands-on STEM
              workshops, school programs, and learning resources for students. We work with
              schools, students, parents, and educators to provide engaging and practical
              educational experiences.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. What Is Personal Information?</h2>
            <p>
              Personal information is any information that identifies you or could reasonably
              identify you. This may include your name, contact details, school information,
              and other details you provide when participating in our programs or contacting us.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. What Information We Collect</h2>
            <ul>
              <li>Name of student, parent/guardian, or teacher</li>
              <li>Email address and phone number</li>
              <li>School or organisation name</li>
              <li>Year level or age group (for workshop suitability)</li>
              <li>Program registrations and enquiry details</li>
              <li>Feedback, survey responses, or support messages</li>
              <li>Basic website usage data (such as pages visited)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. How We Collect Information</h2>
            <ul>
              <li>When a school or parent registers for a workshop or program</li>
              <li>When you submit a form on our website</li>
              <li>When you contact us by email or phone</li>
              <li>Through feedback forms and surveys</li>
              <li>Through standard website technologies such as cookies</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>6. Why We Collect Your Information</h2>
            <ul>
              <li>To organise and deliver workshops and educational programs</li>
              <li>To communicate important information about sessions and bookings</li>
              <li>To respond to enquiries and provide support</li>
              <li>To improve our programs and learning resources</li>
              <li>For basic administrative and record-keeping purposes</li>
              <li>To meet legal or school-related requirements where necessary</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Disclosure of Information</h2>
            <p>
              We do not sell or rent personal information. We may share information with
              trusted service providers who help us operate our website, manage bookings,
              or deliver our programs. These providers are required to keep information secure.
            </p>
            <p>
              We may also disclose information if required by law or to protect the safety
              of students, staff, or participants.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Data Security</h2>
            <p>
              We take reasonable steps to protect personal information from misuse, loss,
              unauthorised access, modification, or disclosure. This includes secure digital
              storage and limiting access to authorised personnel only.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Data Retention</h2>
            <p>
              We keep personal information only for as long as it is needed to deliver our
              services, maintain records, and meet legal obligations. When information is no
              longer required, it is securely deleted or de-identified.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Access and Correction</h2>
            <p>
              You may request access to or correction of the personal information we hold
              about you by contacting us using the details below.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Cookies</h2>
            <p>
              Our website may use cookies or similar technologies to improve user experience
              and understand how visitors use our site. You can control cookies through your
              browser settings.
            </p>
          </section>

          <section className="privacy-section">
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted
              on our website, and the updated date will be shown at the top of this policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your information is
              handled, please contact Project Beacon at:
            </p>
            <p className="privacy-contact">
              Email: hello@projectbeacon.org
            </p>
          </section>

        </div>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default PrivacyPolicy
