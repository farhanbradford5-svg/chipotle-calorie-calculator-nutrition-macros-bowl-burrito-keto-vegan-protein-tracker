import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import Calculator from "@/components/Calculator";

const GUIDE_META: Record<string, { title: string; description: string; h1: string }> = {
  "chipotle-macros-guide": {
    title: "Chipotle Macros Guide — Complete Nutrition Breakdown | ChipotleMacros",
    description: "Everything you need to know about Chipotle macros. Protein, carbs, fat, and fiber for every ingredient.",
    h1: "Chipotle Macros Guide",
  },
  "chipotle-weight-loss-guide": {
    title: "Chipotle Weight Loss Guide — How to Order in a Calorie Deficit | ChipotleMacros",
    description: "How to order at Chipotle for weight loss. Best low-calorie builds and what to avoid.",
    h1: "Chipotle Weight Loss Guide",
  },
  "chipotle-muscle-gain-guide": {
    title: "Chipotle Muscle Gain Guide — Max Protein Builds | ChipotleMacros",
    description: "How to order Chipotle for muscle gain. High protein builds and post-workout meal options.",
    h1: "Chipotle Muscle Gain Guide",
  },
  "chipotle-allergens-guide": {
    title: "Chipotle Allergen Guide — What Contains What | ChipotleMacros",
    description: "Complete Chipotle allergen guide. Which items contain gluten, dairy, nuts, soy, and other common allergens.",
    h1: "Chipotle Allergen Guide",
  },
  "chipotle-sodium-guide": {
    title: "Chipotle Sodium Guide — High and Low Sodium Options | ChipotleMacros",
    description: "Full Chipotle sodium guide. How much sodium is in each ingredient and how to keep your total low.",
    h1: "Chipotle Sodium Guide",
  },
  "chipotle-secret-menu": {
    title: "Chipotle Secret Menu — What You Can Actually Order | ChipotleMacros",
    description: "Chipotle secret menu items and hacks. Quesarito, double protein, free extras, and more.",
    h1: "Chipotle Secret Menu",
  },
  "chipotle-vs-other-fast-food": {
    title: "Chipotle vs Other Fast Food — Nutrition Comparison | ChipotleMacros",
    description: "How does Chipotle compare nutritionally to McDonald's, Taco Bell, Subway, and Panera?",
    h1: "Chipotle vs Other Fast Food",
  },
  "chipotle-cheap-meals": {
    title: "Cheapest Chipotle Orders — Most Value for Your Money | ChipotleMacros",
    description: "How to order Chipotle on a budget. The cheapest builds and how to maximize value without compromising nutrition.",
    h1: "Cheapest Chipotle Orders",
  },
  "chipotle-fiber-guide": {
    title: "Chipotle Fiber Guide — Highest Fiber Builds | ChipotleMacros",
    description: "How to maximize fiber in your Chipotle order. Which ingredients have the most fiber.",
    h1: "Chipotle Fiber Guide",
  },
  "chipotle-meal-prep": {
    title: "Chipotle Meal Prep — Tracking and Planning | ChipotleMacros",
    description: "How to use Chipotle for meal prep and consistent macro tracking.",
    h1: "Chipotle Meal Prep Guide",
  },
};

const GUIDE_CONTENT: Record<string, { sections: { heading: string; body: string }[]; tips: string[] }> = {
  "chipotle-macros-guide": {
    sections: [
      {
        heading: "Understanding Chipotle Macros",
        body: "Chipotle's macro profile varies more than most fast casual restaurants because the menu is fully customisable. A chicken burrito bowl can range from 400 calories with 40g protein and 30g carbs, to 1,200 calories with 50g protein and 120g carbs — depending entirely on what you add. The base ingredients that move your macros most are the protein choice, rice, beans, and guacamole. Cheese and sour cream add fat without much protein. Salsas are the lowest-calorie addition you can make."
      },
      {
        heading: "Protein Macros at Chipotle",
        body: "Chicken leads the protein-to-calorie ratio at 32g protein for 180 calories. Steak delivers 30g protein at 150 calories — slightly better ratio than chicken. Barbacoa offers 34g protein at 170 calories, making it the highest absolute protein option. Sofritas (tofu) provides 8g protein at 150 calories — useful for vegetarians but not efficient for protein targets. Double protein on any meat roughly doubles the numbers."
      },
      {
        heading: "Carb Macros at Chipotle",
        body: "Rice is the biggest carb source at 44-50g carbs per serving. Black beans add 22g carbs, pinto beans add 23g. A standard bowl with white rice and black beans starts at 66g carbs before adding protein, toppings, or a tortilla wrapper. For low-carb builds, skip both rice and beans and use a salad base — dropping carbs to under 20g before protein selection. The tortilla adds 49g carbs for a burrito, 35g for a flour taco shell."
      },
      {
        heading: "Fat Macros at Chipotle",
        body: "Guacamole is the biggest fat source at 22g fat per serving (mostly monounsaturated — the healthy kind). Cheese adds 9g fat. Sour cream adds 9g fat. The proteins are moderate in fat: chicken 7g, steak 6g, carnitas 12g, barbacoa 7g. A standard bowl without guac or sour cream gets you 15-20g total fat. With guacamole and cheese, expect 45-50g fat."
      }
    ],
    tips: [
      "Use double protein and skip rice to maximise protein-to-calorie ratio",
      "Guacamole adds 22g fat — worth it nutritionally but impacts your fat macro significantly",
      "Black beans add more protein than pinto beans for roughly the same calories",
      "Fresh tomato salsa is the lowest calorie topping at 25 calories"
    ]
  },
  "chipotle-weight-loss-guide": {
    sections: [
      {
        heading: "Ordering Chipotle in a Calorie Deficit",
        body: "Chipotle works well for weight loss because every ingredient is listed with its calorie count and you control exactly what goes in. The key decisions are: skip guacamole (saves 230 calories), use salad base instead of rice (saves 210 calories), and limit cheese and sour cream (saves 80-110 calories each). A salad bowl with chicken, black beans, fresh salsa, and lettuce is approximately 380-420 calories — a filling, high-protein meal that fits most calorie deficit targets."
      },
      {
        heading: "The Best Low-Calorie Chipotle Builds",
        body: "Under 400 calories: salad base + chicken + fresh tomato salsa + lettuce = approximately 215 calories. Under 500 calories: salad base + chicken + black beans + fresh tomato salsa = approximately 395 calories. Under 600 calories: salad base + chicken + black beans + cheese + fresh tomato salsa = approximately 490 calories. These builds prioritise protein and fibre for satiety while keeping calories controlled."
      },
      {
        heading: "What to Avoid When Dieting at Chipotle",
        body: "Guacamole is the single biggest calorie addition at 230 calories. Queso adds 120 calories. White rice adds 210 calories. Sour cream adds 110 calories. A bowl with rice, beans, chicken, cheese, sour cream, and guacamole lands at approximately 1,030 calories — over half a 2,000 calorie daily target in one meal. You can build a filling, protein-rich bowl at a third of that calorie count with the right choices."
      }
    ],
    tips: [
      "Choose salad base over rice to save 210 calories instantly",
      "Skip guacamole if you are strict on calories — it is the biggest single addition",
      "Black beans add 8g protein for 120 calories, worth including for satiety",
      "Order double protein and no rice for maximum protein-per-calorie efficiency"
    ]
  },
  "chipotle-muscle-gain-guide": {
    sections: [
      {
        heading: "Why Chipotle Works for Muscle Building",
        body: "Chipotle is one of the best fast casual options for anyone trying to build muscle. The protein options are high quality (grilled chicken and steak are lean, whole proteins), the calorie density is controllable, and you can hit 65-75g protein in a single meal. A post-workout double chicken bowl with rice and beans delivers approximately 70g protein, 850 calories, and 90g carbohydrates — matching the macros of a deliberate muscle-building meal."
      },
      {
        heading: "The Best High Protein Chipotle Build",
        body: "Maximum protein build: white rice (4g protein) + black beans (8g protein) + double chicken (54-60g protein) + cheese (6g protein) + sour cream (1g protein) = approximately 73-79g protein at 850-900 calories. For those in a calorie surplus, add guacamole for additional healthy fats and calorie density: brings the total to approximately 1,080 calories and 73g protein."
      },
      {
        heading: "Timing and Frequency",
        body: "Chipotle makes a strong post-workout meal because of the combination of fast-acting carbohydrates from rice and slow-releasing carbohydrates from beans, alongside the high-quality complete protein from chicken or steak. If you are tracking a calorie surplus, a Chipotle double chicken bowl fits cleanly into most muscle-building programmes without requiring any cooking or meal prep."
      }
    ],
    tips: [
      "Double chicken is the single best protein per-dollar value on the menu",
      "White rice is preferred post-workout for faster carbohydrate absorption",
      "Black beans add 8g protein and 15g fibre — include them in every muscle-building build",
      "Avoid the salad base post-workout — you need the carbohydrates from rice for glycogen replenishment"
    ]
  },
  "chipotle-allergens-guide": {
    sections: [
      {
        heading: "Gluten at Chipotle",
        body: "The only gluten-containing ingredient at Chipotle is the flour tortilla. All other core ingredients — rice, beans, proteins, salsas, cheese, sour cream, guacamole, and lettuce — are naturally gluten-free. However, Chipotle prepares food on shared surfaces, which means cross-contact is possible. People with severe gluten intolerance or coeliac disease should be aware of this risk and communicate directly with staff."
      },
      {
        heading: "Dairy at Chipotle",
        body: "Dairy-containing ingredients at Chipotle are: cheese (queso fresco), sour cream, and queso blanco. All proteins, rice, beans, salsas, guacamole, lettuce, and fajita veggies are dairy-free. A dairy-free order: choose any protein, rice, beans, any salsa, guacamole, and lettuce. Skip cheese, sour cream, and queso."
      },
      {
        heading: "Soy at Chipotle",
        body: "Sofritas (tofu) contains soy. The soybean oil used in cooking is highly refined and does not typically trigger soy allergies in most people, but those with severe soy allergies should verify with the restaurant. All meat proteins (chicken, steak, carnitas, barbacoa) do not contain intentional soy ingredients."
      },
      {
        heading: "Nuts at Chipotle",
        body: "Chipotle does not use tree nuts or peanuts as ingredients. However, their facilities and supply chains are not certified nut-free. For those with severe nut allergies, cross-contamination risk exists. Check Chipotle's current allergen PDF for the most up-to-date information."
      }
    ],
    tips: [
      "Flour tortilla is the only gluten source — a bowl eliminates it entirely",
      "Skip cheese and sour cream for dairy-free",
      "Skip sofritas for soy-free",
      "Always check Chipotle's official allergen PDF as ingredients can change"
    ]
  },
  "chipotle-sodium-guide": {
    sections: [
      {
        heading: "How Much Sodium Is in a Chipotle Bowl?",
        body: "Sodium ranges dramatically based on what you order. A simple bowl with chicken, rice, and fresh tomato salsa has approximately 780-900mg sodium. A fully-loaded bowl with barbacoa, cheese, sour cream, and hot salsa can exceed 2,200mg — over 95% of the daily recommended limit in a single meal. The main sodium sources are the proteins (barbacoa has 640mg per serving), hot salsa (500mg), and rice (390mg white, 380mg brown)."
      },
      {
        heading: "Lowest Sodium Chipotle Ingredients",
        body: "Lettuce is the lowest sodium ingredient at 5mg. Guacamole has 230mg — moderate. Fresh tomato salsa has 230mg. Chicken has 310mg per serving. Avoiding high-sodium items: hot salsa (500mg), barbacoa (640mg), sour cream (95mg), queso (470mg). A low-sodium build: salad base, chicken, black beans, fresh tomato salsa, guacamole — approximately 800mg total sodium."
      },
      {
        heading: "Who Should Watch Sodium at Chipotle",
        body: "People with hypertension, kidney disease, or heart conditions are often advised to limit sodium to 1,500-2,000mg per day. A single fully-loaded Chipotle bowl can exceed that limit. The sodium guide built into ChipotleMacros's calculator shows your total sodium as you build — use it to keep your build within your daily target. A carefully ordered bowl can stay under 1,000mg sodium with the right choices."
      }
    ],
    tips: [
      "Fresh tomato salsa is the lowest sodium salsa option",
      "Barbacoa has the highest sodium of all proteins — choose chicken or steak for lower sodium",
      "Both rice options have high sodium — skip rice for a lower sodium build",
      "Use the sodium indicator in the calculator to monitor your total as you build"
    ]
  },
  "chipotle-secret-menu": {
    sections: [
      {
        heading: "The Quesarito",
        body: "The most famous Chipotle secret menu item. A burrito wrapped in a quesadilla instead of a plain tortilla — so the exterior is a cheesy, grilled shell. Ask staff to make a quesadilla, then wrap your burrito ingredients inside it. Not all locations will do this, and it typically costs extra (you pay for the second tortilla and cheese). Nutritionally, it adds approximately 300-350 calories and 15g fat from the extra tortilla and cheese."
      },
      {
        heading: "Double-Wrapped Burrito",
        body: "Ask for your burrito to be wrapped in two tortillas instead of one. This adds structural integrity for large builds and is generally done on request at no extra charge. Adds approximately 49g carbs and 300 calories for the second tortilla."
      },
      {
        heading: "Free Extras That Count as Toppings",
        body: "Lemon and lime wedges are available on request and free. Extra napkins, chips bags (at some locations for dining in), and water cups are complimentary. The superchicken — asking for half chicken and half steak in a single protein portion — gets you two proteins at one protein price at some locations (though many now charge for it explicitly)."
      },
      {
        heading: "The Burritodilla",
        body: "A flat quesadilla filled with burrito ingredients — effectively a large griddled wrap with all your usual toppings inside. Ask staff to grill your ingredients inside a folded tortilla. A lower-calorie alternative to the quesarito since there is no separate burrito inside, just the quesadilla format with your protein, salsa, and other fillings."
      }
    ],
    tips: [
      "Not all secret menu items are available at every location",
      "Ask politely — staff are more likely to accommodate unusual requests during off-peak hours",
      "Secret menu items often cost extra as they require additional ingredients",
      "Use the calculator to estimate the calories before you order"
    ]
  },
  "chipotle-vs-other-fast-food": {
    sections: [
      {
        heading: "Chipotle vs McDonald's",
        body: "A standard Chipotle chicken bowl at 735 calories delivers approximately 47g protein, 75g carbs, and 18g fat. A McDonald's Big Mac meal (burger + medium fries + drink) delivers approximately 1,100 calories with 37g protein. Chipotle wins on protein-to-calorie ratio and ingredient quality. McDonald's wins on price and convenience. For someone tracking macros, Chipotle is significantly more nutritionally efficient."
      },
      {
        heading: "Chipotle vs Taco Bell",
        body: "Taco Bell is the value option — significantly cheaper per meal. Nutritionally, Taco Bell's menu is higher in sodium and processed ingredients. Chipotle uses whole, minimally processed ingredients. A Chipotle chicken bowl has roughly double the protein of a comparable Taco Bell meal at similar calories. For nutrition quality, Chipotle is substantially better."
      },
      {
        heading: "Chipotle vs Subway",
        body: "Subway and Chipotle are more directly comparable — both customisable, both using somewhat fresher ingredients than traditional fast food. A 6-inch Subway turkey sandwich has approximately 280 calories and 18g protein. A Chipotle chicken salad bowl has approximately 300-350 calories and 35g protein. Chipotle delivers significantly more protein per calorie than Subway for comparable meal sizes."
      },
      {
        heading: "Chipotle vs Panera Bread",
        body: "Panera Bread is positioned as a premium fast casual option. A Panera Fuji Apple Chicken Salad has approximately 570 calories and 36g protein. A comparable Chipotle chicken salad bowl has approximately 400-450 calories and 35-40g protein. Chipotle delivers similar or better protein at lower calories and typically lower price."
      }
    ],
    tips: [
      "Chipotle has the best protein-to-calorie ratio among major fast casual chains",
      "McDonald's and Taco Bell cost less but deliver less protein per dollar",
      "Chipotle's sodium can be comparable to or higher than McDonald's for fully-loaded builds",
      "For clean eating and macro tracking, Chipotle is the best fast casual option"
    ]
  },
  "chipotle-cheap-meals": {
    sections: [
      {
        heading: "The Cheapest Full Chipotle Meal",
        body: "A bean and rice burrito bowl with fresh salsa is the cheapest full meal at approximately $8-9 depending on location. Black beans or pinto beans + white rice + fresh tomato salsa delivers 450-500 calories, 15g protein, and 85g carbs. Add a water cup (free) and you have a filling, complete meal under $10. The main cost drivers at Chipotle are the protein (adds $3-4) and premium toppings like guacamole (adds $2.65-$3)."
      },
      {
        heading: "Best Value Per Dollar",
        body: "Chicken is the best value protein — high protein content relative to the added cost. Double chicken adds approximately $4-5 and nearly doubles your protein from 32g to 54-60g. Guacamole adds $2.65-3 for 230 calories and 22g fat — poor value if you are on a calorie budget, but the healthy fats and taste may be worth it to you. Skip queso ($1.65-2) — it adds 120 calories and 9g fat with minimal protein."
      },
      {
        heading: "Free Extras",
        body: "Water cups are free. Lemon and lime wedges are free on request. Chips can occasionally be requested at no charge when dining in during quiet periods (not a guaranteed policy). Asking for a side of salsa costs less than adding it as a bowl ingredient at some locations. Bringing your own napkins from home is a zero-cost option if you are very strict on costs."
      }
    ],
    tips: [
      "Bean and rice bowl is the cheapest filling option at under $9",
      "Skip guacamole to save $2.65-3 and 230 calories simultaneously",
      "Water is free — skip the fountain drink",
      "A single protein bowl with black beans and rice is more filling per dollar than tacos"
    ]
  },
  "chipotle-fiber-guide": {
    sections: [
      {
        heading: "Highest Fiber Ingredients at Chipotle",
        body: "Black beans are the highest fibre ingredient at 15g per serving. Pinto beans provide 11g. Brown rice adds 4g fibre versus white rice at 1g. Fajita veggies add 3g. Fresh tomato salsa adds 1g. A maximum fibre build (brown rice + black beans + any protein + fajita veggies + roasted corn salsa) can reach 25-30g of dietary fibre in a single meal — meeting or exceeding the entire daily recommended intake."
      },
      {
        heading: "Why Fibre Matters at Chipotle",
        body: "Fibre slows digestion, stabilises blood sugar, and increases satiety. A high-fibre Chipotle order will keep you fuller for longer compared to a low-fibre build at the same calorie count. The difference between a bowl with black beans (15g fibre) and one with no beans (1-2g fibre) is significant for post-meal hunger."
      }
    ],
    tips: [
      "Black beans have the highest fibre content on the menu at 15g per serving",
      "Brown rice adds 3g more fibre than white rice",
      "Fajita veggies add fibre and vitamins for minimal calories",
      "A high-fibre bowl keeps you fuller for longer at the same calorie count"
    ]
  },
  "chipotle-meal-prep": {
    sections: [
      {
        heading: "Using Chipotle for Weekly Meal Planning",
        body: "Chipotle works well for consistent meal prep because the nutrition values are published and reliable. If you order the same build each visit, you are getting predictable macros within a small margin of variation. Many fitness-focused people use Chipotle as their consistent weekly restaurant meal — building the same high-protein bowl each time and knowing exactly how it fits their weekly calorie and macro targets."
      },
      {
        heading: "How to Track Chipotle in MyFitnessPal",
        body: "The most accurate way to track Chipotle in MyFitnessPal is to add each ingredient individually rather than using pre-built Chipotle menu entries (which often reflect inaccurate or outdated values). Use the values from ChipotleMacros — they match Chipotle's official published data. Build your bowl in ChipotleMacros first, note the totals, then log each ingredient separately in MyFitnessPal for the most accurate tracking."
      },
      {
        heading: "Chipotle for Meal Prep Days",
        body: "If you order a large Chipotle bowl and split it across two meals, you are effectively getting two high-protein meals for one restaurant visit. A double chicken bowl with rice and beans at approximately 900 calories and 70g protein, split in two, gives you two 450-calorie meals with 35g protein each — useful for meal prep days when you need quick, trackable meals without cooking."
      }
    ],
    tips: [
      "Order the same build each visit for consistent, predictable macros",
      "Use ChipotleMacros to get accurate values before logging in MyFitnessPal",
      "A large double protein bowl split in two becomes two well-balanced meals",
      "Save your favourite build in ChipotleMacros for quick reference on future visits"
    ]
  },
};

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = GUIDE_META[slug ?? ""] ?? {
    title: `${slug} | ChipotleMacros`,
    description: `Chipotle guide: ${slug}`,
    h1: slug ?? "Guide",
  };
  const content = GUIDE_CONTENT[slug ?? ""];

  return (
    <Layout>
      <SeoHead
        title={meta.title}
        description={meta.description}
        canonicalPath={`/guides/${slug}`}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/">Home</Link> / Guides / {meta.h1}
        </nav>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{meta.h1}</h1>
        <p className="mb-8 text-gray-600">
          Use the calculator to build a meal that fits the strategy described in this guide.
        </p>
        {content && (
          <>
            {content.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
            {content.tips.length > 0 && (
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Quick Tips</h3>
                <ul className="space-y-2">
                  {content.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-orange-500 mt-0.5">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Build Your Meal</h2>
        <p className="text-gray-600 mb-6">Use the calculator below to see exact calories and macros for your specific order.</p>
        <Calculator />
      </div>
    </Layout>
  );
}
