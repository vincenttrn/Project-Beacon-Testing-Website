import AlternativeFooter from '../Footer/AlternativeFooter'
import './Compliance.css'

function Compliance() {
  return (
    <>
      {/* main container */}
      <div className="safety-container">
      <div className="safety-header">
          <h1 className="safety-title">Safety & Compliance</h1>
          <p className="safety-updated">
          Last updated: January 2025
          </p>
      </div>

      <div className="safety-card">
          <section className="safety-section">
          <h2>1. Our Commitment to Safety</h2>
          <p>
              Student safety is our highest priority. All workshops and educational
              activities are designed to be age-appropriate, supervised, and conducted
              using safe, low-voltage electronics and approved equipment.
          </p>
          </section>

          <section className="safety-section">
          <h2>2. Supervision Requirements</h2>
          <p>
              Workshops are delivered with appropriate supervision by trained facilitators.
              Schools and educators remain responsible for student behaviour, wellbeing,
              and adherence to instructions during hands-on activities.
          </p>
          </section>

          <section className="safety-section">
          <h2>3. Equipment & Materials</h2>
          <p>
              All components used in our programs are selected to meet educational safety
              standards. Students work with low-voltage systems, enclosed electronics,
              and non-hazardous materials wherever possible.
          </p>
          </section>

          <section className="safety-section">
          <h2>4. Risk Management</h2>
          <p>
              Risk assessments are conducted for workshop activities, and safety briefings
              are provided prior to practical work. Students are instructed on correct
              handling of tools, components, and devices.
          </p>
          </section>

          <section className="safety-section">
          <h2>5. Compliance with Education Standards</h2>
          <p>
              Our programs are designed to align with relevant curriculum frameworks
              and educational guidelines. Curriculum mapping documents are available
              to support school compliance requirements.
          </p>
          </section>

          <section className="safety-section">
          <h2>6. Child Safety & Conduct</h2>
          <p>
              Facilitators are expected to maintain professional conduct at all times.
              Any inappropriate behaviour, safety concerns, or incidents should be
              reported immediately through official school or organisational channels.
          </p>
          </section>

          <section className="safety-section">
          <h2>7. Incident Reporting</h2>
          <p>
              In the unlikely event of an incident, appropriate steps will be taken
              to ensure student wellbeing. Schools are encouraged to follow their
              established incident reporting and emergency procedures.
          </p>
          </section>

          <section className="safety-section">
          <h2>8. Policy Updates</h2>
          <p>
              This Safety & Compliance information may be updated periodically to
              reflect changes in best practices, regulations, or program delivery.
          </p>
          </section>

          <section className="safety-section">
          <h2>9. Contact</h2>
          <p>
              If you have questions regarding safety procedures or compliance matters,
              please contact us through our official support channels.
          </p>
          </section>
      </div>
      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Compliance
