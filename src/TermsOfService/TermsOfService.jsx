import './TermsOfService.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

function TermsOfService() {
  return (
    <>
      {/* main container */}
      <div className="terms-container">
      <div className="terms-header">
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-updated">
          Last updated: January 2025
          </p>
      </div>

      <div className="terms-card">
          <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
              By accessing or using our website, services, or educational resources,
              you agree to be bound by these Terms of Service. If you do not agree,
              please do not use the service.
          </p>
          </section>

          <section className="terms-section">
          <h2>2. Educational Use</h2>
          <p>
              Our workshops, materials, and online resources are provided for
              educational purposes only. Schools and educators are responsible
              for supervising students during any hands-on activities.
          </p>
          </section>

          <section className="terms-section">
          <h2>3. Access to Resources</h2>
          <p>
              Some resources are protected and require an access code. You agree
              not to share access codes or restricted materials with unauthorised
              parties.
          </p>
          </section>

          <section className="terms-section">
          <h2>4. Intellectual Property</h2>
          <p>
              All content, including documents, code templates, graphics, and
              instructional materials, remains our intellectual property unless
              otherwise stated. Materials may not be redistributed or resold
              without written permission.
          </p>
          </section>

          <section className="terms-section">
          <h2>5. Acceptable Use</h2>
          <p>
              You agree not to misuse the website or resources, including attempting
              to bypass security features, disrupt services, or use materials for
              unlawful purposes.
          </p>
          </section>

          <section className="terms-section">
          <h2>6. Limitation of Liability</h2>
          <p>
              To the maximum extent permitted by law, we are not liable for any
              direct or indirect damages arising from the use of our website,
              workshops, or educational materials.
          </p>
          </section>

          <section className="terms-section">
          <h2>7. Changes to the Service</h2>
          <p>
              We may update or modify the service, resources, or these Terms at
              any time. Continued use of the service constitutes acceptance of
              any updated terms.
          </p>
          </section>

          <section className="terms-section">
          <h2>8. Governing Law</h2>
          <p>
              These Terms are governed by the laws applicable in your jurisdiction,
              without regard to conflict of law principles.
          </p>
          </section>

          <section className="terms-section">
          <h2>9. Contact</h2>
          <p>
              If you have questions about these Terms of Service, please contact us
              through our official support channels.
          </p>
          </section>
      </div>
      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default TermsOfService
