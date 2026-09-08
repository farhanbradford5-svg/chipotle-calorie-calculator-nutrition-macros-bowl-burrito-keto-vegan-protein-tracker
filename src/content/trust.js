import { item, fmt, N } from '../data/builds.js';
import { REVIEW, OFFICIAL, longDate } from '../data/review.js';

const ing = (id) => item(id);

export const TRUST = [
  {
    slug: 'about',
    path: '/about',
    title: 'About ChipotleMacros — Who Builds This and Why',
    description:
      'ChipotleMacros is an independent nutrition reference for Chipotle menu items, built and maintained by one person. No affiliation with the chain itself.',
    h1: 'About this site',
    opening: `ChipotleMacros is an independent nutrition reference for Chipotle Mexican Grill's menu. It exists because the numbers people need are published but awkward to work with: you can look up a scoop of chicken easily enough, and adding six of them together to see what your actual order comes to is another matter.`,
    sections: [
      {
        heading: 'What this site is',
        body: `A calculator and a reference. The <a href="/">meal builder</a> totals eight values for any combination you select. The <a href="/menu/">menu table</a> lists every ingredient at standard serving. Everything else on the site is a specific question answered with the same figures — what a keto order looks like, where the sodium accumulates, which protein returns the most per calorie.`,
      },
      {
        heading: 'Who maintains it',
        body: `One person, working from Chipotle's published nutrition data rather than from lab testing or user submissions. There is no editorial team, and this page would be dishonest if it implied otherwise. Corrections are welcome and get applied quickly — <a href="/contact/">how to reach us</a>.`,
      },
      {
        heading: 'Independence',
        body: `This site is not affiliated with, endorsed by, or sponsored by Chipotle Mexican Grill, Inc. It carries no sponsorship from Chipotle or from any competitor, and no figure on it has been adjusted to make any menu item look better or worse than the published data says it is. <a href="/terms-of-service/">The terms</a> cover trademark use and reuse of these tables.`,
      },
      {
        heading: 'What it is not',
        body: `It is not medical advice, and it is not precise enough to be. Portions are scooped by hand and vary between locations, servers and days — two identical orders can differ by 50 to 100 calories. If you have an allergy or a medical reason to need exact figures, Chipotle's own published information is the authority. <a href="/methodology/">Our method and its limits</a> sets out exactly where the estimates come from.`,
      },
    ],
  },

  {
    slug: 'methodology',
    path: '/methodology',
    keyword: 'how we calculate chipotle nutrition',
    title: 'Methodology: How We Calculate Chipotle Nutrition',
    description:
      'How we calculate Chipotle nutrition — the data source, portion multipliers, rounding rules, update cadence and the limits of every figure on this site.',
    h1: 'How We Calculate Chipotle Nutrition',
    opening: `This page sets out how we calculate Chipotle nutrition figures across the site: where the per-ingredient values come from, how portion sizes scale them, how rounding is handled, and how often the whole set is re-checked. Every number on every page runs through the same arithmetic described here, which is why a chicken bowl reads ${fmt(N.bowl('chicken').cal)} calories on the calculator, on <a href="/menu/">the menu table</a> and on its own item page.`,
    sections: [
      {
        heading: 'The data source',
        body: `Per-ingredient values are transcribed from Chipotle Mexican Grill's published nutrition information for United States locations at standard serving sizes. Nothing here comes from user submissions or third-party aggregators, both of which introduce errors that are difficult to trace back to a source. <a href="/about/">Who maintains this site</a> explains who does the transcribing.`,
      },
      {
        heading: 'How a total is built',
        body: `A total is the sum of the selected ingredients, each multiplied by its portion setting, plus the base for the chosen format. There is no adjustment, rounding-up or safety margin applied on top — the arithmetic is plain addition.`,
        bullets: [
          `Format bases: a bowl adds nothing; a burrito adds the ${ing('flour-tortilla').cal}-calorie flour tortilla; a salad adds the supergreens base; tacos add three crispy corn shells; a quesadilla adds the tortilla-and-cheese base`,
          `A kids meal applies a 0.5 multiplier to every ingredient on top of its own portion setting`,
          `Every one of the eight tracked values scales together — setting rice to "light" halves its sodium and carbohydrate as well as its calories`,
        ],
      },
      {
        heading: 'Portion multipliers, and why they are approximations',
        body: `Light is 0.5, normal is 1.0, extra is 1.5 and double is 2.0. These approximate what a server actually adds rather than any official measure. "Extra" in practice is usually closer to a half-scoop more than a full second scoop, which is why it is 1.5 rather than 2.0. Anyone quoting these as exact is overstating what a hand-scooped portion can be.`,
      },
      {
        heading: 'Rounding',
        body: `Calories and sodium are rounded to whole numbers; grams are rounded to one decimal place. Rounding is applied once, to the final total, rather than per ingredient — rounding each ingredient first would compound the error across a six-item bowl.`,
      },
      {
        heading: 'Update cadence',
        body: `The full ingredient set is re-checked against Chipotle's published data every quarter, and sooner when a menu change is announced. The last full verification was ${longDate(REVIEW.lastVerified)}. Items that leave the menu stay listed for one review cycle, marked as discontinued, before removal.`,
        bullets: [
          `Allergen information specifically is re-checked whenever we notice a Chipotle menu or recipe change, not only on the quarterly cycle, since an ingredient reformulation can affect allergen status faster than it affects calorie counts`,
          `Allergen data last verified ${longDate(REVIEW.allergensLastVerified)} against Chipotle's own <a href="${OFFICIAL.allergens}" rel="nofollow noopener" target="_blank">Allergens &amp; Special Diet statement</a>`,
        ],
      },
      {
        heading: 'Limits, stated plainly',
        body: `The arithmetic is exact and the inputs are averages, which means the output is an estimate. Chipotle serves by hand: two chicken bowls ordered the same way at the same restaurant can differ by 50 to 100 calories, and sodium varies more than anything else. Treat every total on this site as a good estimate, not a measurement.`,
      },
      {
        heading: 'Disclaimer',
        body: `ChipotleMacros is an independent project and is not affiliated with, endorsed by, or sponsored by Chipotle Mexican Grill, Inc. Nothing here is medical or dietary advice. If you have an allergy, a medical condition, or any reason to need exact figures rather than estimates, rely on Chipotle's own published information and speak to a qualified professional.`,
      },
      {
        heading: 'Change log',
        body: `Substantive changes to the data or the method are recorded here rather than on a separate page.`,
        bullets: [
          `Site launch — initial ingredient set transcribed from published data, portion multipliers established at 0.5 / 1.0 / 1.5 / 2.0`,
          `Salsa heat ratings added to the calculator, taken from Chipotle's own mild / medium / hot labels`,
          `Per-ingredient pages added for 26 menu items, all drawing on the same figures as the calculator`,
        ],
      },
    ],
  },

  {
    slug: 'sources',
    path: '/sources',
    title: 'Data Sources & Editorial Policy — ChipotleMacros',
    description:
      'Where every nutrition figure on ChipotleMacros comes from, how often it is verified against published data, and the editorial rules behind what we publish.',
    h1: 'Sources and editorial policy',
    opening: `Every figure on this site traces back to Chipotle Mexican Grill's own published nutrition information for United States locations. This page records what that means in practice, how often it is checked, and the rules that decide what gets published here.`,
    sections: [
      {
        heading: 'Primary source',
        body: `Chipotle's published nutrition and allergen information, at standard serving sizes, for US restaurants. Where a menu item is a combination that Chipotle does not publish a single figure for — chips and guacamole ordered together, for example — the value here is stated as a sum of its published components rather than presented as a measured figure.`,
      },
      {
        heading: 'What is deliberately excluded',
        body: `User-submitted data, third-party nutrition aggregators, and figures copied from other websites covering the same menu. All three propagate errors that cannot be traced back to an origin, and a single wrong value repeated across a site undermines every other number on it. Reuse of these tables is covered in <a href="/terms-of-service/">the terms</a>.`,
      },
      {
        heading: 'Verification cadence',
        body: `The full ingredient set is reviewed quarterly against the published source, and within a week of any announced menu change we become aware of. Regional and international menus differ; figures here should not be assumed accurate outside the United States.`,
      },
      {
        heading: 'Editorial policy',
        body: `A small number of rules govern what appears on this site, and they are worth stating because three of them cost us content we could otherwise have published.`,
        bullets: [
          `No figure is published unless it derives from the source data — nothing is estimated to fill a gap`,
          `Where the data contradicts a claim we intended to make, the claim changes rather than the number`,
          `Comparative claims ("the highest-sodium topping") are computed from the data, not asserted by hand`,
          `No affiliate relationships, sponsored placements or paid links exist anywhere on this site`,
          `Corrections are applied to the underlying data, so a fix propagates to every page that quotes it`,
        ],
      },
      {
        heading: 'Known limitations',
        body: `Hand-scooped portions vary by location and server. Sodium varies most. Values reflect standard servings, and any order that deviates from those — a heavy hand with the rice, a light one with the salsa — will differ from what this site reports. <a href="/methodology/">The methodology page</a> covers the arithmetic and its error bars.`,
      },
    ],
  },

  {
    slug: 'contact',
    path: '/contact',
    title: 'Contact ChipotleMacros — Corrections and Questions',
    description:
      'How to report a wrong nutrition figure, suggest a menu item we have missed, or ask a question about how this site calculates the numbers it publishes.',
    h1: 'Contact',
    opening: `The most useful thing you can send is a correction. If a figure here disagrees with Chipotle's published information, that is a bug in our data and it gets fixed at the source, which updates every page quoting it.`,
    sections: [
      {
        heading: 'Reporting a wrong number',
        body: `Include the page, the figure you saw, and what Chipotle publishes instead. Corrections that cite the published source get applied within three working days; ones that cite another website take longer, because they have to be checked against the primary source first. Every number on this site is derived from one data file, so a single correction propagates to the calculator, <a href="/menu/">the menu table</a> and every page that quotes the item. That is deliberate: it means a fix cannot land in one place and be missed in another, and it means a report about one page is worth sending even if you have seen the same figure elsewhere on the site.`,
      },
      {
        heading: 'When a difference is not an error',
        body: `Two figures can disagree without either being wrong. Portions are served by hand, so a scoop of rice or a spoon of salsa varies from one visit to the next, and the published figures are averages of an intended serving rather than a measurement of the container in front of you. Regional and limited-time items also come and go faster than any reference can track. If your bowl felt heavier than the number here suggests, the likeliest explanation is portion size rather than bad arithmetic, and <a href="/methodology/">the portion assumptions behind every total</a> are set out in full.`,
      },
      {
        heading: 'Suggesting a menu item',
        body: `We add pages for items people actually search for, not for everything on the menu — a page that repeats what <a href="/menu/">the menu table</a> already answers is not worth publishing. If an item you want is missing, say what question you were trying to answer and it helps us judge whether a page is warranted.`,
      },
      {
        heading: 'What we cannot help with',
        body: `We cannot answer questions about a specific restaurant, an order, a refund or an allergic reaction. This is an <a href="/about/">independent reference</a> with no connection to Chipotle Mexican Grill, Inc. — for anything involving an actual visit, contact the restaurant directly.`,
      },
      {
        heading: 'What is outside our coverage',
        body: `This site covers the United States menu. Canadian, UK and European Chipotle menus differ in both items and portions, and we do not publish figures for them, because we cannot verify them against a primary source. We also do not publish comparisons against other chains unless the competitor figure comes from that company's own current nutrition data. If you have written in about a menu item that does not appear anywhere on the site, it is usually one of these, and saying which country you ordered in saves a round trip.`,
      },
      {
        heading: 'Using these figures elsewhere',
        body: `You are welcome to cite the numbers here in a blog post, a coaching plan or a class handout. A link back to the page you took the figure from is appreciated, and it also gives your reader somewhere to check the date it was last verified. Please do not republish the tables wholesale as though they were your own data, and please do not present any figure here as official: it is our reading of published information, not a statement from the company.`,
      },
      {
        heading: 'How to reach us',
        body: `Email <a href="mailto:hello@chipotlemacros.com">hello@chipotlemacros.com</a>. Replies come from one person rather than a support queue, so allow three working days. An email address sent here is used to reply and nothing else, as set out in <a href="/privacy-policy/">the privacy policy</a>.`,
      },
    ],
  },

  {
    slug: 'privacy-policy',
    path: '/privacy-policy',
    title: 'Privacy Policy — ChipotleMacros',
    description:
      'What ChipotleMacros collects, what it does not, and how the calculator handles the meal you build in your browser. Includes our cookie policy as a section.',
    h1: 'Privacy policy',
    opening: `This site collects as little as it can get away with. The calculator runs entirely in your browser: the meal you build is never sent to a server, never stored against an identity, and never leaves your device unless you choose to share a link to it.`,
    sections: [
      {
        heading: 'What we do not collect',
        body: `No accounts, no sign-ups, no email addresses unless you write to us, and no record of what you build in the calculator. There is nothing here to log in to, which removes most of the ways a site of this kind would otherwise accumulate personal data.`,
      },
      {
        heading: 'The calculator and your meal',
        body: `Selections are held in memory in your browser while the page is open. Using "Share this meal" encodes your selections into a URL — that link contains your ingredient choices and nothing else, no identifier of any kind. If you paste it somewhere public, the meal is public; that is the extent of it.`,
      },
      {
        heading: 'Analytics',
        body: `This site uses Google Analytics 4 to count page views, and it only runs if you accept it. Nothing is requested from Google and no analytics cookie is set until you press Accept on the banner: consent starts denied, and declining means the tag is never loaded at all. If you do accept, Google Analytics records which pages you open, how you arrived, your device and browser type, and an approximate location derived from your IP address, which Google anonymises before storing. We read the results in aggregate and make no attempt to identify individual visitors.`,
      },
      {
        heading: 'Cookie policy',
        body: `This site sets no advertising cookies. If you accept analytics, Google sets cookies named _ga and _ga_&lt;stream&gt; which last up to two years and exist to tell a repeat visit from a new one. Declining sets none of them. Your choice is remembered in your browser's local storage, not in a cookie, and the Cookie settings link in the footer reopens the banner if you want to change it. Everything on this site — every page and the calculator itself — works identically either way.`,
      },
      {
        heading: 'Third parties',
        body: `Google Analytics is the only third-party service running on this site. There are no advertising networks, no affiliate tracking and no social media embeds. Outbound links to Chipotle's own site are ordinary links and carry no tracking parameters from us. Nothing you select in the calculator is sent to Google or to us — the meal you build stays in your browser.`,
      },
      {
        heading: 'Changes and contact',
        body: `If this policy changes materially, the change is noted on <a href="/methodology/">the methodology and change log page</a>. Questions go to <a href="/contact/">the contact page</a>.`,
      },
    ],
  },

  {
    slug: 'terms-of-service',
    path: '/terms-of-service',
    title: 'Terms of Service — ChipotleMacros',
    description:
      'Terms governing use of ChipotleMacros, including accuracy limitations, our trademark position, content reuse, and how to file a copyright complaint here.',
    h1: 'Terms of service',
    opening: `Using this site means accepting a short set of terms, most of which amount to one point: the nutrition figures here are estimates compiled from published data, and you should not treat them as medical, dietary or allergen advice.`,
    sections: [
      {
        heading: 'Accuracy and liability',
        body: `We work to keep every figure correct and re-check the full data set quarterly, but portions at Chipotle are scooped by hand and published values change. The site is provided as-is, without warranty of accuracy or fitness for a particular purpose. Decisions you make on the basis of these numbers are your own — particularly any decision involving an allergy or a medical condition, where Chipotle's own information is the authority.`,
      },
      {
        heading: 'Trademarks',
        body: `"Chipotle" and "Chipotle Mexican Grill" are trademarks of Chipotle Mexican Grill, Inc. They are used here descriptively, to identify the restaurant whose published nutrition data this site reports on. ChipotleMacros is independent and is not affiliated with, endorsed by, or sponsored by Chipotle Mexican Grill, Inc.`,
      },
      {
        heading: 'Use of our content',
        body: `Quoting a figure with a link back is fine and welcome. Republishing the tables wholesale is not — they represent real work to compile and verify, and a copy that is never updated becomes wrong within a quarter. What we collect from visitors is covered separately in <a href="/privacy-policy/">the privacy policy</a>.`,
      },
      {
        heading: 'Copyright complaints',
        body: `If you believe material here infringes your copyright, send a notice to <a href="mailto:hello@chipotlemacros.com">hello@chipotlemacros.com</a> including: identification of the work, the URL of the material in question, your contact details, a statement that you believe in good faith the use is unauthorised, and a statement made under penalty of perjury that the information is accurate and you are authorised to act. Valid notices are actioned promptly, and we will tell you what we did.`,
      },
      {
        heading: 'Changes to these terms',
        body: `Material changes are recorded in the change log on <a href="/methodology/">the methodology page</a>.`,
      },
    ],
  },
];
