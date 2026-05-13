import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <SeoHead
        title="Privacy Policy — ChipotleMacros"
        description="ChipotleMacros privacy policy. How we handle user data, cookies, and analytics."
        canonicalPath="/privacy-policy"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: May 2026</p>

        <p>
          ChipotleMacros ("we", "our", or "the site") is an independent, browser-based nutrition
          calculator. This Privacy Policy explains what information is collected, how it is used,
          and what choices you have. We have written it to be straightforward and jargon-free.
        </p>

        <h2>What Data We Collect</h2>
        <p>
          ChipotleMacros does not collect any personally identifiable information. We do not ask
          for your name, email address, date of birth, or any other personal detail. You do not
          need to create an account to use the calculator, and no registration is required.
        </p>
        <p>
          When you use the calculator, all inputs — including your ingredient selections, meal
          builds, and macro goal settings — are processed entirely within your own browser.
          None of this data is transmitted to any server operated by ChipotleMacros. We have no
          database of user meals or user profiles.
        </p>

        <h2>Browser Local Storage</h2>
        <p>
          To improve your experience, ChipotleMacros saves certain data to your browser's local
          storage. This includes your recent meal builds and any macro goals you set using the
          macro tracker. Local storage is a browser feature that stores data on your own device
          only — it is not a cookie and it is not sent to any server. The data persists between
          browser sessions so you can return to your saved meals without re-entering them.
        </p>
        <p>
          You can clear this data at any time through your browser settings by clearing site
          data or local storage for chipotlemacros.com. Clearing this data will remove your saved
          meals and macro goals from the device.
        </p>

        <h2>Cookies</h2>
        <p>
          ChipotleMacros itself does not set cookies for tracking or identification purposes.
          The core calculator functionality relies on local storage as described above, not
          on cookies.
        </p>
        <p>
          However, ChipotleMacros plans to integrate third-party services that may set their
          own cookies. See the sections below for details. You can find more information in
          our <a href="/cookie-policy" className="text-orange-600">Cookie Policy</a>.
        </p>

        <h2>Google Analytics</h2>
        <p>
          We intend to enable Google Analytics 4 to help us understand how visitors use
          ChipotleMacros. Google Analytics collects anonymized usage data including pages
          visited, time on page, browser type, device type, and general geographic location
          at the country or region level. It does not identify you personally. Google Analytics
          sets cookies to distinguish users and sessions. This data is governed by Google's
          Privacy Policy available at policies.google.com/privacy. When Google Analytics
          is active, a note will be added to this policy. Until then, no analytics tracking
          is in place.
        </p>

        <h2>Google AdSense</h2>
        <p>
          We intend to display advertising through Google AdSense to support the free operation
          of this site. When AdSense is active, Google may use cookies and similar technologies
          to serve ads based on your prior visits to this and other websites. You can opt out
          of personalised advertising by visiting Google's Ads Settings at
          adssettings.google.com. AdSense is governed by Google's Privacy Policy. Until AdSense
          approval is granted and the service is activated, no AdSense cookies are set.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          ChipotleMacros does not knowingly collect personal information from children under the
          age of 13, or from anyone. Because we collect no personal data whatsoever, the site
          is safe for general audiences. If you believe a child has inadvertently submitted
          personal information through any contact form on this site, please contact us at
          contact@chipotlemacros.com and we will promptly delete it.
        </p>

        <h2>Your Rights</h2>
        <p>
          Because ChipotleMacros does not collect or store personal data, there is generally
          nothing for us to provide, correct, or delete on your behalf. Your calculator
          history and preferences exist only on your own device and can be cleared in
          your browser settings at any time.
        </p>
        <p>
          If you have a question about your privacy or believe we have inadvertently
          collected personal information, contact us at{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">
            contact@chipotlemacros.com
          </a>
          {" "}and we will respond within 5 business days.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          ChipotleMacros may contain links to external websites such as chipotle.com or
          google.com for reference purposes. We are not responsible for the privacy practices
          of those sites. This policy applies only to chipotlemacros.com.
        </p>

        <h2>Not Affiliated with Chipotle</h2>
        <p>
          ChipotleMacros is not affiliated with, sponsored by, or endorsed by Chipotle Mexican
          Grill, Inc. "Chipotle" is a registered trademark of Chipotle Mexican Grill, Inc.
          ChipotleMacros is an independent third-party tool.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy when our practices change — for example, when
          Google Analytics or AdSense is activated. Changes will be reflected here with an
          updated "Last updated" date and noted in our{" "}
          <a href="/changelog" className="text-orange-600">changelog</a>.
          Continued use of the site after changes constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">
            contact@chipotlemacros.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
