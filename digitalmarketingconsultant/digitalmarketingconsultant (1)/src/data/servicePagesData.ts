import { builderItems } from "./builderData";

export const servicePagesData = {
  "google-ads-management": {
    builderId: "srv-google-ads",
    title: "Get High-Quality Leads with Google Ads",
    subtitle: "We help you get customers who are already searching for your service on Google.",
    whatWeDo: [
      "Keyword research (high buying intent)",
      "Campaign setup (Search, Display if needed)",
      "Ad copywriting (click-focused)",
      "Daily monitoring & optimization",
      "Conversion tracking setup"
    ],
    results: [
      "More leads from people ready to buy",
      "Lower cost per lead",
      "Consistent daily inquiries"
    ],
    pricingDetailed: {
      price: "₹12,000 / month",
      note: "👉 Ad budget is separate (paid directly to Google)",
      breakdown: [
        { item: "Strategy & setup", value: "₹3,000" },
        { item: "Daily optimization", value: "₹5,000" },
        { item: "Reporting & tracking", value: "₹2,000" },
        { item: "Ongoing improvements", value: "₹2,000" }
      ]
    },
    faqs: [
      { q: "How much ad budget should I start with?", a: "₹300–₹1,000/day depending on your industry." },
      { q: "When will I start getting leads?", a: "Usually within 3–7 days after launch." }
    ]
  },
  "facebook-instagram-ads": {
    builderId: "srv-meta-ads",
    title: "Reach the Right People & Grow Your Business",
    subtitle: "We create ads that target your ideal customers on social media.",
    whatWeDo: [
      "Audience research",
      "Campaign setup",
      "Creative direction (AI-assisted)",
      "Retargeting setup",
      "Scaling winning ads"
    ],
    results: [
      "More brand visibility",
      "Higher engagement",
      "Increased sales/leads"
    ],
    pricingDetailed: {
      price: "₹10,000 / month",
      note: "👉 Ad budget not included",
      breakdown: [
        { item: "Campaign setup", value: "₹2,500" },
        { item: "Audience targeting", value: "₹2,500" },
        { item: "Optimization", value: "₹3,000" },
        { item: "Reporting", value: "₹2,000" }
      ]
    },
    faqs: [
      { q: "Do you create ad creatives?", a: "Yes, we guide and create AI-assisted creatives." },
      { q: "Which is better Google or Meta Ads?", a: "Depends on your business — we guide you." }
    ]
  },
  "search-engine-optimization": {
    builderId: "srv-seo",
    title: "Rank Higher on Google & Get Free Traffic",
    subtitle: "We help your website appear on Google when people search for your services.",
    whatWeDo: [
      "Keyword research",
      "On-page SEO optimization",
      "Technical SEO fixes",
      "Content strategy",
      "Monthly improvements"
    ],
    results: [
      "Long-term traffic growth",
      "Free leads from Google",
      "Strong online presence"
    ],
    pricingDetailed: {
      price: "₹15,000 / month",
      breakdown: [
        { item: "Research & planning", value: "₹4,000" },
        { item: "On-page SEO", value: "₹5,000" },
        { item: "Content strategy", value: "₹3,000" },
        { item: "Optimization & reporting", value: "₹3,000" }
      ]
    },
    faqs: [
      { q: "How long does SEO take?", a: "2–3 months to see results." },
      { q: "Is SEO better than ads?", a: "SEO is long-term, ads are immediate." }
    ]
  },
  "website-conversion-optimization": {
    builderId: "srv-cro",
    title: "Turn Visitors into Customers",
    subtitle: "We improve your website so more people take action (call, buy, or message).",
    whatWeDo: [
      "Analyze user behavior",
      "Improve layout & design",
      "Optimize CTA (call-to-action)",
      "Fix user journey issues"
    ],
    results: [
      "Higher conversion rate",
      "More leads without extra ad spend"
    ],
    pricingDetailed: {
      price: "₹8,000 / month",
      breakdown: [
        { item: "Website audit", value: "₹2,000" },
        { item: "Design improvements", value: "₹3,000" },
        { item: "Testing", value: "₹2,000" },
        { item: "Optimization", value: "₹1,000" }
      ]
    },
    faqs: [
      { q: "Do you redesign the full website?", a: "Only if needed — focus is on improving results." }
    ]
  },
  "sales-funnel-setup": {
    builderId: "srv-funnel",
    title: "Convert Leads Automatically",
    subtitle: "We create a system that turns visitors into customers step-by-step.",
    whatWeDo: [
      "Landing page setup",
      "Lead capture system",
      "WhatsApp/email integration",
      "Funnel flow creation"
    ],
    results: [
      "Automated lead generation",
      "Better conversion"
    ],
    pricingDetailed: {
      price: "₹15,000 (one-time)",
      breakdown: [
        { item: "Funnel planning", value: "₹4,000" },
        { item: "Setup", value: "₹6,000" },
        { item: "Integration", value: "₹3,000" },
        { item: "Testing", value: "₹2,000" }
      ]
    },
    faqs: [
      { q: "Is this needed for small businesses?", a: "Yes, if you want better conversion." }
    ]
  },
  "e-commerce-marketing": {
    builderId: "srv-ecom",
    title: "Scale Your Online Store Sales",
    subtitle: "We help you increase revenue using performance marketing.",
    whatWeDo: [
      "Product research",
      "Ad campaigns",
      "Retargeting",
      "Scaling winning products"
    ],
    results: [
      "Higher ROAS",
      "Increased sales"
    ],
    pricingDetailed: {
      price: "₹18,000 / month",
      note: "👉 Ad spend not included",
      breakdown: [
        { item: "Strategy", value: "₹5,000" },
        { item: "Campaign management", value: "₹7,000" },
        { item: "Scaling", value: "₹4,000" },
        { item: "Reporting", value: "₹2,000" }
      ]
    },
    faqs: [
      { q: "Do you work with Shopify?", a: "Yes." }
    ]
  },
  "whatsapp-marketing-setup": {
    builderId: "srv-whatsapp",
    title: "Convert Leads Faster with WhatsApp",
    subtitle: "We set up automation to instantly reply and follow up with leads.",
    whatWeDo: [
      "Auto-reply setup",
      "Lead flow design",
      "Integration with ads",
      "Follow-up automation"
    ],
    results: [
      "Faster response",
      "Higher conversion"
    ],
    pricingDetailed: {
      price: "₹7,000 (one-time)",
      breakdown: []
    },
    faqs: [
      { q: "Will this work for my business?", a: "Yes, especially for service businesses." }
    ]
  },
  "digital-marketing-strategy": {
    builderId: "srv-strategy",
    title: "Get a Clear Growth Plan",
    subtitle: "We tell you exactly what to do to grow your business online.",
    whatWeDo: [
      "Business analysis",
      "Competitor research",
      "Channel selection",
      "Step-by-step plan"
    ],
    results: [
      "Clear direction",
      "Better ROI"
    ],
    pricingDetailed: {
      price: "₹7,000 (one-time)",
      breakdown: []
    },
    faqs: [
      { q: "Is this useful without ads?", a: "Yes, it gives clarity before investing." }
    ]
  }
};
