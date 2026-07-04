import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Terms & Conditions | Refund & Cancellation Policy | Traverse South',
  description:
    'Full Terms and Conditions, Refund Policy, Cancellation Policy, Privacy Statement, and Health & Safety disclosures for Traverse South. Governed by New Zealand law.',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-mono), monospace',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  color: '#ffffff',
  marginBottom: '24px',
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#cccccc',
  marginTop: '28px',
  marginBottom: '10px',
  letterSpacing: '0.02em',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.75',
  color: '#888888',
  marginBottom: '14px',
};

const sectionStyle: React.CSSProperties = {
  borderTop: '1px solid #1e1e1e',
  paddingTop: '40px',
};

export default function LegalPage() {
  return (
    <main
      style={{
        backgroundColor: '#0b0b0b',
        color: '#888888',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: 'var(--spacing-section-lg)',
      }}
    >
      <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '48px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '12px',
              color: 'var(--colors-brand)',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.08em',
            }}
          >
            ← Return to manifests
          </Link>
        </div>

        {/* Page Header */}
        <div
          style={{
            borderBottom: '1px solid #1e1e1e',
            paddingBottom: '40px',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '11px',
              color: '#444444',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            // Legal Documentation
          </p>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-1px',
              marginBottom: '16px',
              lineHeight: '1.2',
            }}
          >
            Terms &amp; Conditions
          </h1>
          <p style={{ ...bodyStyle, marginBottom: '8px' }}>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Traverse South
            website and your engagement with our booking and logistics services. By making a
            booking with Traverse South, you confirm that you have read, understood, and agree to
            be bound by these Terms in their entirety.
          </p>
          <p style={{ ...bodyStyle, marginBottom: '8px' }}>
            These Terms are governed by the laws of New Zealand and are intended to be read alongside
            the Consumer Guarantees Act 1993, the Fair Trading Act 1986, the Health and Safety at Work
            Act 2015, and the Privacy Act 2020. Nothing in these Terms is intended to limit or exclude
            any rights you hold under applicable New Zealand consumer protection legislation.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono), monospace',
              fontSize: '11px',
              color: '#444444',
              letterSpacing: '0.05em',
              marginTop: '24px',
            }}
          >
            Last updated: July 2026 &nbsp;|&nbsp; Jurisdiction: New Zealand &nbsp;|&nbsp; Currency: NZD
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

          {/* ─────────────────────────────────────────────── */}
          {/* 1. About Traverse South & Agency Relationship   */}
          {/* ─────────────────────────────────────────────── */}
          <section>
            <h2 style={sectionHeadingStyle}>01. About Traverse South &amp; Our Role</h2>

            <h3 style={subHeadingStyle}>1.1 Business Identity</h3>
            <p style={bodyStyle}>
              Traverse South is a New Zealand-based adventure travel coordination and logistics
              service. Business registration number: <strong style={{ color: '#aaaaaa' }}>NZBN 9429053785237</strong>.
              Our registered contact address and principal place of business is in New Zealand.
            </p>

            <h3 style={subHeadingStyle}>1.2 Agency Relationship</h3>
            <p style={bodyStyle}>
              Traverse South acts exclusively as a booking agent and logistics coordinator on your
              behalf. We are not the principal provider of any physical activity, transport, guiding,
              aviation, or marine service. All activities, helicopter flights, vessel charters, and
              guiding services are operated by independent, third-party professional operators
              (&ldquo;Operators&rdquo;).
            </p>
            <p style={bodyStyle}>
              When you make a booking through Traverse South, two separate contractual relationships
              are formed: (a) a service contract between you and Traverse South for our booking,
              coordination, and logistics services; and (b) a separate contract between you and the
              relevant Operator for the physical delivery of the activity. Traverse South is not a
              party to the contract between you and the Operator.
            </p>

            <h3 style={subHeadingStyle}>1.3 Operator Standards</h3>
            <p style={bodyStyle}>
              Traverse South engages only with Operators who hold the relevant New Zealand regulatory
              certifications applicable to their activity type. These may include, but are not limited
              to: Civil Aviation Authority (CAA) Part 135 Air Operator Certificates for helicopter
              operations; Maritime New Zealand survey certificates for vessel operations; and
              registration with WorkSafe New Zealand as required under the Health and Safety at Work
              (Adventure Activities) Regulations 2016. All certifications are the ongoing
              responsibility of the Operator and are independently maintained.
            </p>
            <p style={bodyStyle}>
              Our engagement with an Operator does not constitute a guarantee or warranty as to the
              Operator&rsquo;s safety performance, quality of delivery, or conduct on any specific
              occasion.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 2. Booking Confirmation & Acceptance of Terms   */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>02. Booking Confirmation &amp; Acceptance of Terms</h2>

            <h3 style={subHeadingStyle}>2.1 Formation of a Booking</h3>
            <p style={bodyStyle}>
              A booking is confirmed when Traverse South issues a written booking confirmation to you
              via email. This confirmation constitutes acceptance of your booking request and
              establishes the service agreement between you and Traverse South. No binding booking
              exists until confirmation is issued and full or agreed partial payment has been received.
            </p>

            <h3 style={subHeadingStyle}>2.2 Acceptance of Terms</h3>
            <p style={bodyStyle}>
              By proceeding past the checkout stage of any booking, or by submitting a booking
              enquiry and subsequently confirming your booking, you acknowledge that you have read
              and agree to these Terms in full. You also acknowledge that you will be bound by the
              individual terms and conditions of the relevant Operator(s) applicable to your
              activities, a copy of which will be provided to you or made accessible at the point
              of booking.
            </p>

            <h3 style={subHeadingStyle}>2.3 Accuracy of Information</h3>
            <p style={bodyStyle}>
              You are responsible for ensuring that all personal information, participant details,
              health declarations, and special requirements you provide at the time of booking are
              accurate and complete. Traverse South and the Operator rely on this information to
              safely execute your expedition. Providing inaccurate or incomplete information may
              result in cancellation without refund and may affect safety outcomes.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 3. Pricing, Payments & Fees                    */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>03. Pricing, Payments &amp; Fees</h2>

            <h3 style={subHeadingStyle}>3.1 Pricing and Currency</h3>
            <p style={bodyStyle}>
              All prices displayed on the Traverse South website and in booking confirmations are
              quoted in New Zealand Dollars (NZD) and include Goods and Services Tax (GST) at the
              prevailing rate, unless explicitly stated otherwise. Prices are subject to change at
              any time prior to the issuance of a booking confirmation.
            </p>

            <h3 style={subHeadingStyle}>3.2 Inclusions and Exclusions</h3>
            <p style={bodyStyle}>
              Each booking confirmation will specify the activities, services, and fees included in
              your package price. Items not listed as included — including but not limited to
              international and domestic airfares, accommodation unless specified, meals unless
              specified, personal gear, travel insurance, and personal expenses — are the
              responsibility of the client.
            </p>

            <h3 style={subHeadingStyle}>3.3 Booking and Service Fees</h3>
            <p style={bodyStyle}>
              Traverse South may charge a service fee for the provision of its coordination and
              logistics services. Where applicable, any service fee will be clearly disclosed in
              your booking summary prior to payment being taken. Service fees are generally
              non-refundable unless otherwise stated.
            </p>

            <h3 style={subHeadingStyle}>3.4 Payment Security</h3>
            <p style={bodyStyle}>
              All payment transactions are processed through our secure third-party payment
              infrastructure. Traverse South does not directly collect, store, or process your
              credit card or banking details on its own servers. Your payment data is handled
              in accordance with the security standards of our payment processor.
            </p>

            <h3 style={subHeadingStyle}>3.5 Pricing Errors</h3>
            <p style={bodyStyle}>
              In the event that a product or service is listed at an incorrect price due to a
              typographical error or system error, Traverse South reserves the right to cancel
              the affected booking and refund any amount paid. We will contact you promptly in
              such circumstances.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 4. Weather, Operator Cancellations & Disruptions */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>04. Weather, Operator Cancellations &amp; Disruptions</h2>

            <h3 style={subHeadingStyle}>4.1 Operator-Initiated Cancellations</h3>
            <p style={bodyStyle}>
              Traverse South engages with Operators in environments subject to significant
              and unpredictable weather variability, including alpine, aerial, and marine
              conditions. Operators retain full and sole discretion to cancel or suspend any
              activity at any time on the grounds of weather conditions, safety assessment,
              weight or capacity limits, mechanical requirements, or any other operational
              consideration they deem necessary. This discretion cannot be overridden by
              Traverse South or by the client.
            </p>

            <h3 style={subHeadingStyle}>4.2 Disruption Management</h3>
            <p style={bodyStyle}>
              In the event of an Operator-initiated cancellation or significant disruption,
              Traverse South will make all reasonable efforts to contact you promptly and
              present available alternatives. Alternatives may include rescheduling to a
              confirmed available date, substitution with a comparable activity, or, where
              neither is feasible, a full refund of the affected activity module.
            </p>
            <p style={bodyStyle}>
              Traverse South does not guarantee that any specific alternative will be available
              and is not responsible for consequential losses arising from an Operator cancellation,
              including but not limited to costs of connecting transport, accommodation, or other
              arrangements made independently by the client.
            </p>

            <h3 style={subHeadingStyle}>4.3 Refunds for Operator-Initiated Cancellations</h3>
            <p style={bodyStyle}>
              If an Operator-initiated cancellation occurs and no acceptable alternative is made
              available by Traverse South, or you elect not to proceed with the offered alternative,
              you are entitled to a full refund of the amounts paid for the cancelled activity. This
              refund will be processed to the original payment method within 5–10 business days of
              your election being confirmed in writing.
            </p>
            <p style={bodyStyle}>
              Traverse South&rsquo;s liability in respect of an Operator-initiated cancellation is
              limited to the refund of amounts paid for the specific affected activity module.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 5. Client Cancellations & Refund Policy         */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>05. Client Cancellations &amp; Refund Policy</h2>

            <h3 style={subHeadingStyle}>5.1 How to Cancel</h3>
            <p style={bodyStyle}>
              All client-initiated cancellations must be submitted in writing to Traverse South via
              email at <strong style={{ color: '#aaaaaa' }}>contact@traversesouth.co.nz</strong>.
              The date of cancellation is the date on which written notice is received by Traverse
              South during business hours (Monday–Friday, 9:00am–5:00pm NZST).
            </p>

            <h3 style={subHeadingStyle}>5.2 Operator Cancellation Windows</h3>
            <p style={bodyStyle}>
              Because Traverse South acts as an agent for independent Operators, the refund
              entitlement for a client-initiated cancellation is governed by the cancellation
              policy of the specific Operator(s) involved in your booking. Each Operator&rsquo;s
              applicable cancellation window will be clearly stated in your booking confirmation.
              As a general guide, Operator cancellation windows typically range from 24 to 72 hours
              prior to the scheduled activity departure time; however, the specific window for each
              activity is determinative.
            </p>

            <h3 style={subHeadingStyle}>5.3 Cancellations Outside the Penalty Window</h3>
            <p style={bodyStyle}>
              If you cancel your booking outside the Operator&rsquo;s specified cancellation penalty
              window, Traverse South will process a refund of the Operator component of your payment
              to your original payment method within 10 business days. Any non-refundable Traverse
              South service fee will be retained.
            </p>

            <h3 style={subHeadingStyle}>5.4 Cancellations Inside the Penalty Window</h3>
            <p style={bodyStyle}>
              If you cancel your booking within the Operator&rsquo;s specified cancellation penalty
              window, the Operator&rsquo;s cancellation fee will apply. Traverse South will communicate
              the specific fee applicable to your booking at the time of cancellation and will process
              any refundable balance (if any) once it has been received back from the Operator.
              Traverse South does not refund amounts it has not received from the Operator.
            </p>

            <h3 style={subHeadingStyle}>5.5 No-Show Policy</h3>
            <p style={bodyStyle}>
              Failure to present at the agreed departure point at the agreed time, without prior
              written cancellation notice to Traverse South, will be treated as a no-show. No
              refund will be provided for a no-show. Traverse South is not responsible for a
              client&rsquo;s inability to attend due to personal circumstances, including illness,
              injury, travel disruption, or changes in personal schedule.
            </p>

            <h3 style={subHeadingStyle}>5.6 Statutory Rights</h3>
            <p style={bodyStyle}>
              Nothing in this section limits any rights you may have under the Consumer Guarantees
              Act 1993 or the Fair Trading Act 1986. If Traverse South&rsquo;s own booking or
              coordination services fail to meet the guarantees required under the Consumer Guarantees
              Act 1993, your remedies will be determined by that Act.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 6. Itinerary Modifications                      */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>06. Itinerary Modifications</h2>

            <h3 style={subHeadingStyle}>6.1 Modifications by Traverse South or an Operator</h3>
            <p style={bodyStyle}>
              From time to time, circumstances beyond our control or that of an Operator may require
              a material change to your confirmed itinerary. A material change includes, but is not
              limited to, a change of more than 24 hours in departure time, substitution of a
              significantly different activity type, or a change in the Operator providing the service.
            </p>
            <p style={bodyStyle}>
              If a material change is necessary, Traverse South will notify you as soon as
              practicable, describe the nature of the change, and present you with available options.
              If you do not accept the material change, you are entitled to a full refund of the
              affected activity or module.
            </p>

            <h3 style={subHeadingStyle}>6.2 Minor Modifications</h3>
            <p style={bodyStyle}>
              Minor changes — including adjustments to timing of less than 24 hours, changes to
              transport type within the same category, or substitutions of equivalent equipment or
              accommodation — do not constitute a material change and do not give rise to a refund
              entitlement.
            </p>

            <h3 style={subHeadingStyle}>6.3 Client-Requested Modifications</h3>
            <p style={bodyStyle}>
              Requests to modify a confirmed booking must be submitted in writing. Traverse South
              will make all reasonable efforts to accommodate modifications but cannot guarantee
              availability. Modifications are subject to the Operator&rsquo;s ability and willingness
              to accommodate changes, and may incur additional fees.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 7. Health, Safety & Physical Requirements       */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>07. Health, Safety &amp; Physical Requirements</h2>

            <h3 style={subHeadingStyle}>7.1 Risk Disclosure (HSWA 2015)</h3>
            <p style={bodyStyle}>
              Pursuant to the Health and Safety at Work (Adventure Activities) Regulations 2016 and
              the explicit duty introduced on 1 April 2024 (Regulation 8A), Operators are required
              to take all reasonable steps to inform participants of any serious health and safety
              risks associated with the activity before booking, before the activity begins, and
              during the activity as conditions change. You will receive specific risk information
              from the relevant Operator prior to your participation.
            </p>
            <p style={bodyStyle}>
              Adventure tourism activities involve inherent risk. Risks may include, but are not
              limited to: adverse or rapidly changing weather conditions; difficult or remote terrain;
              altitude; physical exertion; wildlife; equipment failure; and human error. By
              participating, you acknowledge and accept these inherent risks.
            </p>

            <h3 style={subHeadingStyle}>7.2 Health and Fitness Requirements</h3>
            <p style={bodyStyle}>
              Each activity has specific minimum health, fitness, and physical capability
              requirements. These requirements are set by the Operator and are non-negotiable on
              safety grounds. You are responsible for ensuring, prior to booking, that all
              participants meet the stated requirements. Requirements are stated in each activity
              description and in your booking confirmation.
            </p>
            <p style={bodyStyle}>
              If you have any pre-existing medical condition, physical limitation, allergy, or
              concern that may affect your ability to safely participate, you must disclose this at
              the time of booking and consult with your medical practitioner prior to participation.
              Traverse South and the Operator are not liable for any adverse health event arising
              from a failure to disclose a pre-existing condition.
            </p>

            <h3 style={subHeadingStyle}>7.3 Weight and Physical Dimension Requirements</h3>
            <p style={bodyStyle}>
              Certain activities — in particular helicopter and fixed-wing aviation operations —
              impose strict weight and physical dimension limits for safety and operational reasons
              as mandated by the Civil Aviation Authority. These limits are stated in your booking
              confirmation. If a participant exceeds the stated limit at the time of the activity,
              the Operator may decline participation. In such circumstances, no refund will be
              provided unless the Operator has a specific policy to the contrary.
            </p>
            <p style={bodyStyle}>
              You must declare accurate weights for all participants at the time of booking. Providing
              inaccurate weight information is a safety risk and may result in cancellation of your
              booking without refund.
            </p>

            <h3 style={subHeadingStyle}>7.4 Liability Waivers</h3>
            <p style={bodyStyle}>
              Operators may require you to sign a participant risk disclosure form or liability waiver
              prior to undertaking an activity. These documents are a standard part of the safety
              management process. You acknowledge that you will be required to sign these documents
              and that participation may be refused if you decline.
            </p>
            <p style={bodyStyle}>
              Important: In accordance with Section 28 of the Health and Safety at Work Act 2015, no
              liability waiver can exclude, limit, or modify an Operator&rsquo;s obligations under
              that Act. Waivers serve as evidence of informed consent and risk acknowledgement only.
            </p>

            <h3 style={subHeadingStyle}>7.5 Accident Compensation (ACC)</h3>
            <p style={bodyStyle}>
              New Zealand&rsquo;s Accident Compensation Corporation (ACC) provides no-fault personal
              injury cover for physical injuries sustained in New Zealand, including during adventure
              activities. ACC cover may reduce or affect any right you have to sue for personal
              injury under New Zealand law. The existence of ACC cover does not affect your other
              rights under these Terms or under consumer protection legislation.
            </p>

            <h3 style={subHeadingStyle}>7.6 Participant Conduct</h3>
            <p style={bodyStyle}>
              You agree to follow all safety instructions, directions, and briefings issued by the
              Operator, its pilots, guides, and crew at all times. The Operator retains the right
              to remove from an activity any participant who, in the reasonable judgement of the
              Operator, poses a risk to themselves, other participants, staff, or equipment. No
              refund will be provided in such circumstances.
            </p>

            <h3 style={subHeadingStyle}>7.7 Travel Insurance</h3>
            <p style={bodyStyle}>
              Traverse South strongly recommends that all clients obtain comprehensive travel
              insurance prior to travel. Insurance should cover, at minimum: trip cancellation and
              curtailment; emergency medical evacuation and medical expenses; loss or damage to
              personal effects; and personal liability. Traverse South is not responsible for any
              losses that could reasonably have been covered by adequate travel insurance.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 8. Liability                                    */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>08. Liability</h2>

            <h3 style={subHeadingStyle}>8.1 Traverse South Liability</h3>
            <p style={bodyStyle}>
              Traverse South is liable for the quality of its own booking, coordination, and logistics
              services as required under the Consumer Guarantees Act 1993. Where our services fail to
              meet the guarantees required by that Act, your remedies will be governed by it.
            </p>
            <p style={bodyStyle}>
              Traverse South is not liable for the acts, omissions, defaults, or negligence of any
              Operator, transport provider, accommodation provider, or other third-party service
              provider. Traverse South is not responsible for any injury, death, loss, damage, delay,
              inconvenience, or additional expense arising from the physical execution of any
              activity by an Operator.
            </p>

            <h3 style={subHeadingStyle}>8.2 Third-Party Operator Liability</h3>
            <p style={bodyStyle}>
              All physical, operational, and health and safety liability in connection with the
              conduct of any activity rests with the Operator. The Operator is the Person Conducting
              a Business or Undertaking (PCBU) for the purposes of the Health and Safety at Work Act
              2015 in relation to the activity. Any claim arising from the conduct of an activity
              must be directed to the Operator.
            </p>

            <h3 style={subHeadingStyle}>8.3 Limitation of Traverse South&rsquo;s Liability</h3>
            <p style={bodyStyle}>
              To the maximum extent permitted by New Zealand law, Traverse South&rsquo;s total
              liability to you in connection with any booking, regardless of the basis of the claim,
              shall not exceed the total amount paid by you to Traverse South in respect of that
              specific booking.
            </p>

            <h3 style={subHeadingStyle}>8.4 Consequential Loss</h3>
            <p style={bodyStyle}>
              To the maximum extent permitted by law, Traverse South is not liable for any
              consequential, indirect, or special loss or damage of any kind arising out of or in
              connection with a booking or the services provided. This includes but is not limited
              to loss of enjoyment, loss of income, cost of alternative arrangements made
              independently, and cost of onward transport.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 9. Force Majeure                                */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>09. Force Majeure</h2>

            <h3 style={subHeadingStyle}>9.1 Definition</h3>
            <p style={bodyStyle}>
              Neither Traverse South nor any Operator shall be liable for any failure or delay in
              the performance of their obligations arising from circumstances beyond their reasonable
              control. Such circumstances include, but are not limited to: acts of God; earthquake;
              volcanic eruption; tsunami; floods; wildfires; epidemic or pandemic; civil unrest or
              terrorism; government restrictions or directives; border closures; airspace closures;
              or any other event that a reasonable person would consider to be outside the control
              of the party affected.
            </p>

            <h3 style={subHeadingStyle}>9.2 Effect on Bookings</h3>
            <p style={bodyStyle}>
              In the event of a force majeure event that causes cancellation or significant
              alteration of a booking, Traverse South will communicate the situation to you as soon
              as practicable and present available options. Refund entitlements in force majeure
              circumstances will be determined by the specific circumstances and the position taken
              by the relevant Operator(s). Traverse South will act as your advocate in recovering
              any refundable amounts from Operators where possible.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 10. Privacy & Data Handling                     */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>10. Privacy &amp; Data Handling</h2>

            <h3 style={subHeadingStyle}>10.1 Compliance</h3>
            <p style={bodyStyle}>
              Traverse South complies with the New Zealand Privacy Act 2020 and its Information
              Privacy Principles (IPPs). We handle all personal information in accordance with these
              principles. For clients based outside New Zealand, we align our practices with
              applicable international standards including the General Data Protection Regulation
              (GDPR) for European Union residents.
            </p>

            <h3 style={subHeadingStyle}>10.2 Information We Collect</h3>
            <p style={bodyStyle}>
              To deliver our booking and logistics services, we collect personal information
              including but not limited to: your full legal name; contact details (email, phone);
              date of birth; nationality and passport details where required for activities;
              physical information including body weight where required for aviation manifests;
              dietary requirements; medical disclosures relevant to activity safety; and payment
              information (processed through our payment provider).
            </p>

            <h3 style={subHeadingStyle}>10.3 Purpose of Collection</h3>
            <p style={bodyStyle}>
              Your personal information is collected solely for the purposes of: processing your
              booking; coordinating your expedition logistics; fulfilling safety and regulatory
              requirements (including aviation manifests and operator safety briefings); communicating
              with you regarding your booking; and meeting our legal and financial record-keeping
              obligations.
            </p>

            <h3 style={subHeadingStyle}>10.4 Disclosure to Third Parties</h3>
            <p style={bodyStyle}>
              Your personal information will be shared with the Operator(s) involved in your
              booking to the extent required for the safe and lawful delivery of the activity.
              We do not sell your personal information to third-party marketers. We do not share
              your information with any other party except where required by law or where
              necessary to fulfil your booking (such as to payment processors).
            </p>

            <h3 style={subHeadingStyle}>10.5 Security</h3>
            <p style={bodyStyle}>
              We take all reasonable steps to protect personal information from loss, unauthorised
              access, disclosure, alteration, or misuse. Personal information is stored securely.
              Payment data is handled exclusively by our PCI-DSS compliant payment processor.
            </p>

            <h3 style={subHeadingStyle}>10.6 Retention</h3>
            <p style={bodyStyle}>
              We retain your personal information for as long as is reasonably necessary to fulfil
              the purposes described above, or as required by law. Financial transaction records are
              retained for a minimum of 7 years in accordance with the Tax Administration Act 1994.
              Information no longer required for a lawful purpose will be securely destroyed or
              anonymised.
            </p>

            <h3 style={subHeadingStyle}>10.7 Your Rights</h3>
            <p style={bodyStyle}>
              Under the Privacy Act 2020, you have the right to: request access to personal
              information we hold about you; request correction of inaccurate information; request
              deletion of information we are not required by law to retain; and make a complaint
              to the Office of the Privacy Commissioner at{' '}
              <a
                href="https://www.privacy.org.nz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--colors-brand)', textDecoration: 'underline' }}
              >
                www.privacy.org.nz
              </a>{' '}
              if you believe we have breached your privacy rights.
            </p>

            <h3 style={subHeadingStyle}>10.8 Breach Notification</h3>
            <p style={bodyStyle}>
              In the event of a privacy breach that is likely to cause serious harm to any affected
              individual, we will notify the Office of the Privacy Commissioner and the affected
              individual(s) as required under the Privacy Act 2020.
            </p>

            <h3 style={subHeadingStyle}>10.9 Website Cookies</h3>
            <p style={bodyStyle}>
              Our website may use cookies and similar tracking technologies to support website
              functionality, analyse site traffic, and improve user experience. By continuing to
              use our website, you consent to the use of cookies. You may disable cookies in your
              browser settings; however, this may affect some website functionality.
            </p>

            <h3 style={subHeadingStyle}>10.10 Privacy Officer</h3>
            <p style={bodyStyle}>
              Traverse South&rsquo;s appointed Privacy Officer can be contacted at:{' '}
              <a
                href="mailto:contact@traversesouth.co.nz"
                style={{ color: 'var(--colors-brand)', textDecoration: 'underline' }}
              >
                contact@traversesouth.co.nz
              </a>
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 11. Intellectual Property                       */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>11. Intellectual Property</h2>

            <p style={bodyStyle}>
              All content on the Traverse South website — including but not limited to text,
              photographs, video, graphics, itinerary descriptions, and brand identity — is the
              property of Traverse South or its licensors and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, publish, or use any content from
              this website for any commercial purpose without prior written permission from Traverse
              South.
            </p>
          </section>

          {/* ─────────────────────────────────────────────── */}
          {/* 12. Governing Law & Dispute Resolution          */}
          {/* ─────────────────────────────────────────────── */}
          <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>12. Governing Law &amp; Dispute Resolution</h2>

            <h3 style={subHeadingStyle}>12.1 Governing Law</h3>
            <p style={bodyStyle}>
              These Terms are governed by and construed in accordance with the laws of New Zealand.
              Any dispute arising out of or in connection with these Terms shall be subject to the
              exclusive jurisdiction of the courts of New Zealand.
            </p>

            <h3 style={subHeadingStyle}>12.2 Consumer Rights</h3>
            <p style={bodyStyle}>
              Nothing in these Terms limits or excludes any consumer rights provided under the
              Consumer Guarantees Act 1993, the Fair Trading Act 1986, or any other applicable
              New Zealand legislation that cannot lawfully be excluded or limited.
            </p>

            <h3 style={subHeadingStyle}>12.3 Dispute Resolution Process</h3>
            <p style={bodyStyle}>
              In the event of a dispute, we request that you contact us at{' '}
              <a
                href="mailto:contact@traversesouth.co.nz"
                style={{ color: 'var(--colors-brand)', textDecoration: 'underline' }}
              >
                contact@traversesouth.co.nz
              </a>{' '}
              in the first instance to attempt to resolve the matter informally. If informal resolution
              is not achieved within 20 business days, either party may escalate the matter to
              formal dispute resolution. Consumers may also contact Consumer Protection
              (New Zealand Ministry of Business, Innovation and Employment) or the Disputes
              Tribunal for matters within its jurisdiction.
            </p>

            <h3 style={subHeadingStyle}>12.4 Severability</h3>
            <p style={bodyStyle}>
              If any provision of these Terms is found to be unlawful, void, or unenforceable under
              applicable law, that provision shall be severed from these Terms and shall not affect
              the validity and enforceability of the remaining provisions.
            </p>

            <h3 style={subHeadingStyle}>12.5 Amendments</h3>
            <p style={bodyStyle}>
              Traverse South reserves the right to update these Terms at any time. Updated Terms
              will be published on this page with a revised &ldquo;Last updated&rdquo; date. The
              Terms applicable to a specific booking are those in force at the time of booking
              confirmation.
            </p>
          </section>

          {/* Footer Disclaimer */}
          <section
            style={{
              borderTop: '1px solid #1e1e1e',
              paddingTop: '32px',
              marginTop: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '11px',
                lineHeight: '1.7',
                color: '#444444',
                letterSpacing: '0.02em',
              }}
            >
              These Terms do not constitute legal advice. Traverse South recommends that you seek
              independent legal counsel if you have questions about your specific rights or
              obligations. For consumer rights enquiries, contact Consumer Protection NZ at{' '}
              <a
                href="https://www.consumerprotection.govt.nz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#555555', textDecoration: 'underline' }}
              >
                consumerprotection.govt.nz
              </a>
              . For privacy complaints, contact the Office of the Privacy Commissioner at{' '}
              <a
                href="https://www.privacy.org.nz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#555555', textDecoration: 'underline' }}
              >
                privacy.org.nz
              </a>
              .
            </p>
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '11px',
                color: '#444444',
                marginTop: '16px',
                letterSpacing: '0.02em',
              }}
            >
              &copy; {new Date().getFullYear()} Traverse South. All rights reserved. &nbsp;|&nbsp; Last updated: July 2026
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
