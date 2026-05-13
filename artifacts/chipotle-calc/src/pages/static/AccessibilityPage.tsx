import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";

export default function AccessibilityPage() {
  return (
    <Layout>
      <SeoHead
        title="Accessibility Statement — ChipotleCalc"
        description="ChipotleCalc accessibility commitment. WCAG 2.1 AA compliance, keyboard navigation, screen reader support, and how to report issues."
        canonicalPath="/accessibility"
      />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-gray">
        <h1>Accessibility Statement</h1>
        <p className="text-sm text-gray-500">Effective: May 2026</p>

        <p>
          ChipotleCalc is committed to making its nutrition calculator and all associated
          content accessible to everyone, including people who use assistive technologies
          such as screen readers, switch access, or keyboard-only navigation. We believe
          that nutritional information should be usable by all.
        </p>

        <h2>Our Standard</h2>
        <p>
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at
          Level AA. These guidelines explain how to make web content more accessible to
          people with disabilities, covering a wide range of impairments including
          visual, auditory, physical, speech, cognitive, and neurological disabilities.
        </p>

        <h2>Implemented Accessibility Features</h2>
        <p>The following accessibility features are implemented in ChipotleCalc:</p>
        <ul>
          <li>
            <strong>Semantic HTML:</strong> Pages use proper heading hierarchy (h1, h2, h3),
            landmark regions (main, nav, footer), and list elements to convey structure to
            assistive technologies.
          </li>
          <li>
            <strong>ARIA labels:</strong> Interactive controls — including ingredient
            quantity buttons, dietary filter toggles, and meal save actions — have
            descriptive ARIA labels so screen reader users understand their purpose.
          </li>
          <li>
            <strong>Keyboard navigation:</strong> All interactive elements are reachable
            and operable using a keyboard alone. Tab order follows a logical sequence
            through the page.
          </li>
          <li>
            <strong>Colour contrast:</strong> Text and interactive elements are designed
            to meet or exceed the WCAG 2.1 AA minimum contrast ratio of 4.5:1 for normal
            text and 3:1 for large text.
          </li>
          <li>
            <strong>Screen reader live regions:</strong> The nutrition summary panel uses
            ARIA live region attributes so screen readers announce total calorie and macro
            updates as you add ingredients without requiring focus to be moved.
          </li>
          <li>
            <strong>Responsive and mobile-friendly design:</strong> The layout adapts to
            all screen sizes. Content is readable at up to 400% zoom without horizontal
            scrolling.
          </li>
          <li>
            <strong>FAQ accordion:</strong> The FAQ section uses proper ARIA
            expanded/controls attributes so the open/closed state is communicated
            correctly to screen readers.
          </li>
          <li>
            <strong>Descriptive badge labels:</strong> Dietary badges (Keto, Vegan,
            High Protein, etc.) use visible text labels rather than icon-only glyphs,
            so their meaning is available without visual context.
          </li>
          <li>
            <strong>Skip to main content:</strong> A skip navigation link is available
            at the top of the page for keyboard and screen reader users to bypass the
            navigation and jump directly to the calculator.
          </li>
        </ul>

        <h2>Known Limitations</h2>
        <p>
          We are aware of the following areas where accessibility could be further improved:
        </p>
        <ul>
          <li>
            The ingredient quantity stepper buttons currently rely on repeated activation
            to increase or decrease quantities. We are exploring a direct numeric input
            field as an alternative for users who find repeated activation difficult.
          </li>
        </ul>
        <p>
          We actively work to remediate accessibility issues as they are identified.
        </p>

        <h2>How to Report an Issue</h2>
        <p>
          If you encounter an accessibility barrier on ChipotleCalc, or if you need
          content in an alternative format, please contact us:
        </p>
        <p>
          <a href="mailto:contact@chipotlecalc.com" className="text-orange-600">
            contact@chipotlecalc.com
          </a>
        </p>
        <p>
          Please include a description of the barrier you encountered and the URL of
          the page where you experienced it. We will respond within 5 business days.
        </p>

        <h2>Not Affiliated with Chipotle</h2>
        <p>
          ChipotleCalc is not affiliated with, sponsored by, or endorsed by Chipotle Mexican
          Grill, Inc. "Chipotle" is a registered trademark of Chipotle Mexican Grill, Inc.
        </p>
      </article>
    </Layout>
  );
}
