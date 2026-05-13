import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function DmcaPage() {
  return (
    <Layout>
      <SeoHead
        title="DMCA Policy — ChipotleMacros"
        description="DMCA copyright policy for ChipotleMacros. How to submit a takedown notice or counter-notification."
        canonicalPath="/dmca"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>DMCA Policy</h1>
        <p className="text-sm text-gray-500">Effective: May 2026</p>

        <p>
          ChipotleMacros respects the intellectual property rights of others and complies with
          the Digital Millennium Copyright Act (DMCA). If you believe any content on this
          Site infringes your copyright, you may submit a DMCA takedown notice as described
          below. We take all legitimate notices seriously and will respond promptly.
        </p>

        <h2>How to Submit a Takedown Notice</h2>
        <p>
          Send your DMCA notice to:{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">
            contact@chipotlemacros.com
          </a>
        </p>
        <p>
          To be valid under the DMCA (17 U.S.C. § 512), your notice must include all of
          the following:
        </p>
        <ol>
          <li>
            <strong>Identification of the copyrighted work:</strong> A description of the
            copyrighted work you claim has been infringed, or, if multiple works are covered
            by a single notification, a representative list of such works.
          </li>
          <li>
            <strong>Identification of the infringing material:</strong> A description of the
            material on ChipotleMacros that you claim is infringing, with sufficient detail
            for us to locate it — for example, the URL of the specific page.
          </li>
          <li>
            <strong>Your contact information:</strong> Your full legal name, mailing address,
            telephone number, and email address.
          </li>
          <li>
            <strong>Good faith statement:</strong> A statement that you have a good faith
            belief that the use of the material in the manner complained of is not authorised
            by the copyright owner, its agent, or the law.
          </li>
          <li>
            <strong>Accuracy statement:</strong> A statement that the information in your
            notice is accurate, made under penalty of perjury.
          </li>
          <li>
            <strong>Signature:</strong> Your physical or electronic signature.
          </li>
        </ol>
        <p>
          Notices that do not include all required elements may not be acted upon.
        </p>

        <h2>Counter-Notification Process</h2>
        <p>
          If you believe that content you posted was removed or disabled in error or
          misidentification, you may file a counter-notification. Your counter-notification
          must include:
        </p>
        <ol>
          <li>Your physical or electronic signature.</li>
          <li>Identification of the material that was removed or disabled and its location before removal.</li>
          <li>A statement under penalty of perjury that you have a good faith belief the material was removed as a result of mistake or misidentification.</li>
          <li>Your name, address, telephone number, and a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located.</li>
        </ol>
        <p>
          Send counter-notifications to the same address: contact@chipotlemacros.com. Upon
          receipt of a valid counter-notification, we will transmit it to the original
          complainant and may restore the removed content within 10–14 business days unless
          the complainant files a court action.
        </p>

        <h2>Note on Nutrition Data</h2>
        <p>
          Nutrition data displayed on ChipotleMacros is reproduced from publicly available
          information published by Chipotle Mexican Grill, Inc. We do not claim ownership
          of that data. If you represent Chipotle Mexican Grill and have concerns about
          data usage, please contact us directly.
        </p>

        <h2>Repeat Infringer Policy</h2>
        <p>
          ChipotleMacros will terminate access for users who are repeat infringers of
          intellectual property rights in appropriate circumstances.
        </p>

        <h2>Contact</h2>
        <p>
          DMCA notices and questions:{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">
            contact@chipotlemacros.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
