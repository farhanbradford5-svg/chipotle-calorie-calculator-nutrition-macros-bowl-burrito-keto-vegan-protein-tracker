import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function CookiePolicyPage() {
  return (
    <Layout>
      <SeoHead
        title="Cookie Policy — ChipotleMacros"
        description="Cookie policy for ChipotleMacros. What cookies and local storage are used and how to control them."
        canonicalPath="/cookie-policy"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Cookie Policy</h1>
        <p className="text-sm text-gray-500">Effective: May 2026</p>

        <p>
          This Cookie Policy explains how ChipotleMacros uses cookies and similar browser storage
          technologies. We have written it plainly so you know exactly what is stored on your
          device and why.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that a website places on your browser or device when you
          visit. They allow the site to remember information between page loads or visits.
          Cookies are different from browser local storage (explained below), but both are
          storage mechanisms we address in this policy.
        </p>

        <h2>Cookies We Set</h2>
        <p>
          ChipotleMacros does not currently set any first-party cookies for tracking,
          identification, or personalisation purposes. The calculator's core functionality
          does not require cookies.
        </p>

        <h2>Browser Local Storage (Not a Cookie)</h2>
        <p>
          ChipotleMacros uses browser <strong>local storage</strong> to improve your experience.
          Local storage is a browser-native feature that saves data on your device only —
          it is never transmitted to any server, and it does not expire automatically the way
          session cookies do.
        </p>
        <p>
          We use local storage for the following purposes:
        </p>
        <ul>
          <li>
            <strong>Saved meals:</strong> Meal builds you save using the Save button are
            stored locally so they persist between visits without requiring an account.
          </li>
          <li>
            <strong>Macro goals:</strong> Calorie and macronutrient targets you set in the
            macro tracker are stored locally so your goals are remembered on return visits.
          </li>
        </ul>
        <p>
          This data exists only on your device and can be removed at any time by clearing
          site data for chipotlemacros.com in your browser settings.
        </p>

        <h2>Third-Party Cookies — Google Analytics (Planned)</h2>
        <p>
          ChipotleMacros intends to enable Google Analytics 4 to understand how visitors
          navigate the site. When enabled, Google Analytics will set cookies such as
          <code>_ga</code> and <code>_ga_*</code> to distinguish users and sessions and
          measure anonymous usage patterns. These cookies contain no personally identifiable
          information. They are governed by Google's Privacy Policy at
          policies.google.com/privacy. This policy will be updated when Google Analytics
          is activated.
        </p>

        <h2>Third-Party Cookies — Google AdSense (Planned)</h2>
        <p>
          ChipotleMacros plans to display advertising through Google AdSense. When AdSense
          is active, Google may set advertising cookies to deliver relevant ads based on
          your interests and prior browsing activity. You can manage your ad personalization
          preferences at adssettings.google.com. AdSense cookies are governed by Google's
          Privacy Policy. This policy will be updated when AdSense is enabled.
        </p>

        <h2>How to Clear Local Storage and Cookies</h2>
        <p>
          You can clear all data stored by ChipotleMacros through your browser settings:
        </p>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and security → Clear browsing data → Cookies and site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
        </ul>
        <p>
          Clearing cookies and local storage for ChipotleMacros will remove your saved meals
          and macro goals from the device but will not affect the core calculator functionality.
        </p>

        <h2>Not Affiliated with Chipotle</h2>
        <p>
          ChipotleMacros is not affiliated with, sponsored by, or endorsed by Chipotle Mexican
          Grill, Inc. "Chipotle" is a registered trademark of Chipotle Mexican Grill, Inc.
        </p>

        <h2>Contact</h2>
        <p>
          Cookie questions:{" "}
          <a href="mailto:contact@chipotlemacros.com" className="text-orange-600">
            contact@chipotlemacros.com
          </a>
        </p>
      </article>
    </Layout>
  );
}
