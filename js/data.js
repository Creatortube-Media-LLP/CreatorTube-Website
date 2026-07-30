const IMG_BASE = "https://framerusercontent.com/images";

const CREATORS = [
  { name: "Pathshala by Nova", subs: "603K Subscribers", image: `${IMG_BASE}/TrcDfVf35dVT3fdUX1r23HgnU.jpg` },
  { name: "Polaris School of Technology", subs: "7.24K Subscribers", image: `${IMG_BASE}/AVy2JAP9AuwBHyMT7F126GlY5y4.jpg` },
  { name: "Science and Fun Education", subs: "1.82M Subscribers", image: `${IMG_BASE}/gXlgWwkoDfdg5ldK9kFC9A6lG4k.jpg` },
  { name: "Oswaal Books", subs: "40K Subscribers", image: `${IMG_BASE}/xFuyNiE80mDy8MkvdT9yFBKdNw.jpg` },
  { name: "Nishant Jindal", subs: "698K Subscribers", image: `${IMG_BASE}/M3nCdDSGlGey5s5KBWBKn47M.jpg` },
  { name: "ExpHub - Prashant Kirad", subs: "10M Subscribers", image: `${IMG_BASE}/lVdkvfdbZJekiK5ZDIo7ew3JiE.jpg` },
  { name: "Ashu Ghai", subs: "286K Subscribers", image: `${IMG_BASE}/jyZqyfKJsV273a5P7IXG0Ex3hd0.jpg` },
  { name: "Aditya Patel WiNNERS", subs: "544K Subscribers", image: `${IMG_BASE}/k5zN24e3FLx34vhIVddqO0WXGEw.jpg` },
  { name: "The Social Brains", subs: "506K Subscribers", image: `${IMG_BASE}/yWW02wsesZjYNBp2L7DFuHBfhE.jpg` },
  { name: "Dr. Parth Goyal", subs: "965K Subscribers", image: `${IMG_BASE}/by0AUMDG8QPxx3pNgRylm0cvdwQ.jpg` },
  { name: "ATP STAR", subs: "1.47M Subscribers", image: `${IMG_BASE}/pmrhJzGxQhkBjfs3sNK0wWoxJU.jpg` },
  { name: "Nishant Chahar", subs: "546K Subscribers", image: `${IMG_BASE}/gtb4rwvT38vaw61IubGDX7fLCw.jpg` },
  { name: "RANKERS GURUKUL", subs: "4.94M Subscribers", image: `${IMG_BASE}/BlVE9z54BqA1TLZj7tZrypWm4.jpg` },
  { name: "CAT Preparation", subs: "120K Subscribers", image: `${IMG_BASE}/byekVZTJgF51gWCcYz9ivr36Q.jpg` },
  { name: "SolarBalls Hindi", subs: "847K Subscribers", image: `${IMG_BASE}/mynZ6kzNugYPuRwUS8gGO0JeJw.jpg` },
  { name: "Vineet Khatri", subs: "239K Subscribers", image: `${IMG_BASE}/tK5eUfgelyvhLAcMNNEvOqrA8Ss.jpg` },
  { name: "Yash Garg", subs: "227K Subscribers", image: `${IMG_BASE}/zqUxb4ysHfbXh164Wq5HpD6M.jpg` },
  { name: "Prince Singh", subs: "507K Subscribers", image: `${IMG_BASE}/0v3ORZZSYpFR8BbGhruQDeoIo.jpg` },
  { name: "Yash Mishra", subs: "21K Subscribers", image: `${IMG_BASE}/wiy8fq8GX1CLV6GItFhz0OUjHe0.jpg` },
];

const STATS = [
  {
    value: 20,
    suffix: "",
    label: "Creators",
    colors: ["#7C3AED", "#952bff", "#ba81ee"],
  },
  {
    value: 300,
    suffix: "M+",
    label: "Monthly views",
    colors: ["#70b5ff", "#79d45e", "#93C5FD"],
  },
  {
    value: 93,
    suffix: "%",
    label: "Client retention",
    colors: ["#952bff", "#f4889a", "#ba81ee"],
  },
];

const SERVICES = [
  { labelTop: "Strategic", labelMain: "Domain Research", icon: "🔍", color: "purple" },
  { labelTop: "Engaging", labelMain: "Scripts", icon: "✍️", color: "green" },
  { labelTop: "Video", labelMain: "Editing", icon: "🎬", color: "blue" },
  { labelTop: "Click-Worthy", labelMain: "Thumbnails", icon: "🖼️", color: "pink" },
  { labelTop: "YT Channel", labelMain: "Management", icon: "📺", color: "orange" },
];

const PORTFOLIO_VIDEOS = [
  "qZFVpURcW34",
  "Iq7WeTj_Drc",
  "nbIZ4vwDULk",
  "GFWNPLUwwX0",
  "wBx7I2OU0mE",
];

const IMPACT_STATS = [
  {
    value: "93%",
    label: "Brand Retention",
    description:
      "We build strong partnerships and support our creators, leading to a 93% brand retention rate.",
    bgClass: "purple-bg",
  },
  {
    value: "94%",
    label: "Success Rate",
    description:
      "Our data-driven campaigns hit a 94% success rate, exceeding client goals and delivering exceptional results.",
    bgClass: "green-bg",
  },
];

const TEAM_SECTION = {
  title: "Meet the creators behind The Creators",
};

const TEAM = [
  {
    name: "Yash Ranjan Mishra",
    role: "Co-Founder",
    image: `${IMG_BASE}/3UVAQ3NZPY2NSJORpxpjbgh74AE.png`,
    linkedin: "https://www.linkedin.com/in/yash-ranjan-mishra/",
  },
  {
    name: "Sheetal Singh",
    role: "Co-Founder",
    image: `${IMG_BASE}/4wzqsiT7hdFVb5Wi0E6kSglhO6c.png`,
    linkedin: "https://www.linkedin.com/in/sheetal-singh-creatortube/",
  },
  {
    name: "Ismail Malekji",
    role: "Co-Founder",
    image: `${IMG_BASE}/LxNJJGUTvWh9gmO7q22U9uhvo.png`,
    linkedin: "https://www.linkedin.com/in/ismailmalekji/",
  },
  {
    name: "Mayank Choubey",
    role: "Core Team",
    image: `${IMG_BASE}/G6jLbxi616iUfZfyQtbfjme0s.png`,
    linkedin: "",
  },
  {
    name: "Shivam Kumar",
    role: "Core Team",
    image: `${IMG_BASE}/XT10XKo8OzwrOxOSFJY6SExXXM.png`,
    linkedin: "",
  },
];

const FAQ_SECTION = {
  mainTitle: "Got questions? We've got answers",
  rows: [
    { id: "row1", speed: 60, direction: "left", startIndex: 0, count: 3 },
    { id: "row2", speed: 45, direction: "right", startIndex: 3, count: 3 },
  ],
};

const FAQ_ITEMS = [
  {
    question: "What kind of services do you provide?",
    answer:
      "We offer end-to-end YouTube content creation — from strategic domain research and scriptwriting to video editing, thumbnail design, and full channel management.",
  },
  {
    question: "What types of YouTube channels do you typically work with?",
    answer:
      "We work with educational, entertainment, and business-focused YouTube channels across niches — from exam prep and science to lifestyle and brand content.",
  },
  {
    question: "Can you help grow an already established channel?",
    answer:
      "Absolutely. We partner with both emerging and established creators to optimize their content pipeline, improve consistency, and scale viewership.",
  },
  {
    question: "What kind of results can we expect from working with you?",
    answer:
      "Our clients see improved content consistency, higher engagement, and significant view growth. We maintain a 93% client retention rate and 94% campaign success rate.",
  },
  {
    question: "What are your pricing options or service packages?",
    answer:
      "Pricing depends on your channel size, content volume, and service scope. Reach out via our contact form and we'll tailor a package to your needs.",
  },
  {
    question: "What's the process to get started with you?",
    answer:
      "Fill out the contact form with your channel details. Our team will review your needs, schedule a call, and propose a custom content plan.",
  },
];

const SITE = {
  logo: `${IMG_BASE}/9wk0ECGVHAhgyKz5ATAXpu0dRs.png`,
  email: "sales@creatortube.co",
  phone: "+918218665839",
  phoneDisplay: "+91 8218665839",
  address: "B2, Coworkzen, 6th Floor, Bhutani Alphathum, Sector 90, Noida - 201301",
  linkedin: "https://www.linkedin.com/company/creatortube-media/",
};

const CONTACT_SECTION = {
  title: "Love to hear from you, Get in touch",
  description: "Let us help you grow your channel and streamline content creation.",
  phone: "+91 8218665839",
  email: "sales@creatortube.co",
  formEmail: "sales@creatortube.co",
  web: { label: "creatortube.in", url: "https://www.creatortube.in/" },
  submitLabel: "Send message",
  services: [
    "YT Channel Management",
    "Strategic Domain Research",
    "Video Editing",
  ],
};

const FOOTER = {
  links: [
    { title: "Services", href: "#influencer-marketing" },
    { title: "Team", href: "#team" },
    { title: "FAQ", href: "#faq" },
    { title: "Contact", href: "#contact-us" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/creatortube-media/", icon: "share2" },
    { label: "Email", href: "mailto:sales@creatortube.co", icon: "message-circle" },
    { label: "Phone", href: "tel:+918218665839", icon: "link" },
    { label: "Website", href: "#home", icon: "globe" },
    { label: "Contact", href: "#contact-us", icon: "send" },
    { label: "About", href: "#influencer-marketing", icon: "feather" },
  ],
  copyright: "Creatortube Media. All rights reserved",
};

const BRANDS = [
  {
    id: "google",
    name: "Google",
    icon: `<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-8.667 0-.786-.067-1.467-.173-2.053H12.48z"/>`,
  },
  {
    id: "amazon",
    name: "Amazon",
    icon: `<path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 8.044 3.244 12.66 3.244 2.66 0 5.276-.412 7.852-1.236.174-.066.29-.004.348.116.058.12.034.214-.072.282-1.896 1.266-4.028 1.864-6.438 1.864-4.61 0-8.894-1.864-12.378-5.248-.058-.066-.058-.174 0-.24zm.377-2.876c.08-.092.2-.092.348 0 2.876 2.634 6.364 4.028 10.084 4.028 1.896 0 3.728-.348 5.422-1.044.174-.08.29-.022.348.058.058.08.034.174-.058.232-1.946 1.014-4.144 1.538-6.524 1.538-3.728 0-7.216-1.538-9.978-4.318-.08-.092-.08-.2 0-.232zM3.678 8.116c.08-.116.2-.116.348 0 3.364 3.072 7.448 4.724 11.766 4.724 2.168 0 4.26-.406 6.204-1.218.174-.066.29-.004.348.116.058.12.034.214-.072.282-2.168 1.218-4.608 1.864-7.274 1.864-4.318 0-8.378-1.738-11.594-4.898-.058-.092-.058-.2 0-.292z"/>`,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
  },
  {
    id: "apple",
    name: "Apple",
    icon: `<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>`,
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: `<path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24.002zm11.139 0L9.168 24.003h3.456l1.996-5.606c1.082-3.043 2.004-5.606 2.004-5.606s.924 2.563 2.004 5.606l1.996 5.606h3.456L12.537 0z"/>`,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    icon: `<path d="M12.001 18.275c-1.472-1.778-2.444-3.352-2.916-4.725-.472-1.372-.708-2.644-.708-3.825 0-1.18.236-2.453.708-3.825.472-1.372 1.444-2.947 2.916-4.725.296-.356.592-.712.888-1.068.296.356.592.712.888 1.068 1.472 1.778 2.444 3.353 2.916 4.725.472 1.372.708 2.644.708 3.825 0 1.181-.236 2.453-.708 3.825-.472 1.373-1.444 2.947-2.916 4.725-.296.356-.592.712-.888 1.068-.296-.356-.592-.712-.888-1.068zm0-18.275C5.373 0 0 5.373 0 12s5.373 12 12.001 12C18.628 24 24 18.627 24 12S18.628 0 12.001 0z"/>`,
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: `<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>`,
  },
];

// ── Aspect 2: Influencer Marketing (edit lists & stats here) ──
const INFLUENCER_PITCH_CARDS = [
  {
    label: "For Brands",
    desc: "Campaigns matched to creators whose audience actually buys.",
  },
  {
    label: "For Creators",
    desc: "Brand deals that fit your content, negotiated and managed for you.",
  },
];

const INFLUENCER_STEPS = [
  {
    title: "Brand Brief",
    desc: "We understand your product, audience, and what success actually looks like.",
  },
  {
    title: "Creator Matching",
    desc: "We shortlist from our own roster — creators whose audience genuinely fits, backed by real performance data.",
  },
  {
    title: "Campaign Execution",
    desc: "Scripts, briefs, approvals, delivery. We manage every creator end to end.",
  },
  {
    title: "Reporting",
    desc: "Reach, engagement, conversions. You see exactly what your money did.",
  },
];

const INFLUENCER_NETWORK = [
  { name: "Iqlipse Nova", niche: "Education" },
  { name: "Iitian Guidance", niche: "JEE / Education" },
  { name: "Prayush Rai", niche: "Education" },
  { name: "Lucky Jethani", niche: "Education" },
  { name: "Prem Kr Sharma", niche: "Education" },
  { name: "Love Babbar", niche: "Tech / DSA" },
  { name: "Prashant IITB", niche: "JEE / Education" },
  { name: "Nishant Chahar", niche: "Tech / Dev Tools" },
  { name: "Arvind Kalia", niche: "Documentary / Education" },
];

// Individual partner logos — no strip image (avoids CreatorTube logo showing in marquee)
const INFLUENCER_BRANDS = [
  { name: "Physics Wallah", src: `${IMG_BASE}/L2ZT6cDGyZAOaLYXioUOyMJRE48.png?width=400` },
  { name: "Upgrad", src: "https://www.google.com/s2/favicons?domain=upgrad.com&sz=128" },
  { name: "Scaler", src: "https://www.google.com/s2/favicons?domain=scaler.com&sz=128" },
  { name: "Narayana Group", src: "https://www.google.com/s2/favicons?domain=narayanagroup.com&sz=128" },
  { name: "LPU", src: "https://www.google.com/s2/favicons?domain=lpu.in&sz=128" },
  { name: "Motion", src: "https://www.google.com/s2/favicons?domain=motion.academy&sz=128" },
  { name: "NST", src: "https://www.google.com/s2/favicons?domain=nst.org.in&sz=128" },
  { name: "Rishihood", src: "https://www.google.com/s2/favicons?domain=rishihood.edu.in&sz=128" },
  { name: "Codex", src: "https://www.google.com/s2/favicons?domain=codex.io&sz=128" },
  { name: "Replit", src: "https://cdn.simpleicons.org/replit/F26207" },
  { name: "Ditto", src: "https://www.google.com/s2/favicons?domain=joinditto.in&sz=128" },
  { name: "Polaris", src: "https://www.google.com/s2/favicons?domain=polaris.edu.in&sz=128" },
  { name: "Vedam", src: "https://www.google.com/s2/favicons?domain=vedam.org&sz=128" },
  { name: "KRMU", src: "https://www.google.com/s2/favicons?domain=krmangalam.edu.in&sz=128" },
];

const INFLUENCER_CAMPAIGN_STATS = [
  { value: "120M+", label: "Campaign reach delivered" },
  { value: "93%", label: "Client retention" },
];

const INFLUENCER_CAMPAIGN_COPY =
  "We match brands to creators whose audiences actually convert — then run campaigns end to end, from brief to reporting.";

const PIPELINE_STAGES = [
  {
    title: "Domain Research",
    desc: "We find the topics your audience is actually searching for — backed by data, not guesswork.",
    isResult: false,
  },
  {
    title: "Scriptwriting",
    desc: "Retention-first scripts written to hook viewers in the first 10 seconds and hold them to the end.",
    isResult: false,
  },
  {
    title: "Video Editing",
    desc: "Cuts, sound design and pacing engineered to keep people watching.",
    isResult: false,
  },
  {
    title: "Thumbnail Design",
    desc: "Click-worthy thumbnails built to win the impression and drive the click.",
    isResult: false,
  },
  {
    title: "Channel Management",
    desc: "Publishing, SEO, and growth — we manage the channel end to end.",
    isResult: false,
  },
  {
    title: "Published & Growing",
    desc: "A finished video, live on your channel — and an audience that keeps coming back.",
    isResult: true,
  },
];

// ── Creator network gallery — detail modal content (edit per creator) ──
const NETWORK_CREATOR_DETAILS = {
  "Prayush Rai": {
    niche: "Education",
    summary: "End-to-end channel ops — from topic research to published videos that rank.",
    stats: [
      { value: "2.4M+", label: "Views delivered" },
      { value: "180+", label: "Videos produced" },
      { value: "3.2×", label: "Watch time lift" },
    ],
    services: ["Domain research & scripting", "Retention-first editing", "Thumbnail design", "SEO & publishing"],
    videos: ["qZFVpURcW34", "Iq7WeTj_Drc", "nbIZ4vwDULk"],
  },
  "Iitian Guidance": {
    niche: "JEE / Education",
    summary: "Scaled a JEE guidance channel with consistent weekly uploads and stronger retention.",
    stats: [
      { value: "1.8M+", label: "Views delivered" },
      { value: "120+", label: "Videos produced" },
      { value: "2.8×", label: "Subscriber growth" },
    ],
    services: ["Scriptwriting & structuring", "Motion graphics editing", "CTR thumbnail tests", "Channel management"],
    videos: ["GFWNPLUwwX0", "wBx7I2OU0mE", "qZFVpURcW34"],
  },
  "Prashant IITB": {
    niche: "JEE / Education",
    summary: "Built a high-trust education brand with polished long-form and shorts pipeline.",
    stats: [
      { value: "4.1M+", label: "Views delivered" },
      { value: "95+", label: "Videos produced" },
      { value: "41%", label: "Avg. CTR uplift" },
    ],
    services: ["Content strategy", "Full post-production", "Thumbnail A/B testing", "Publishing workflow"],
    videos: ["Iq7WeTj_Drc", "nbIZ4vwDULk", "GFWNPLUwwX0"],
  },
  "Arvind Kalia": {
    niche: "Documentary / Education",
    summary: "Documentary-style storytelling with cinematic edits and narrative scripting.",
    stats: [
      { value: "3.2M+", label: "Views delivered" },
      { value: "60+", label: "Long-form pieces" },
      { value: "5.1 min", label: "Avg. watch time" },
    ],
    services: ["Story research & scripting", "Cinematic editing", "Sound design", "Distribution strategy"],
    videos: ["wBx7I2OU0mE", "qZFVpURcW34", "Iq7WeTj_Drc"],
  },
  "Iqlipse Nova": {
    niche: "Education",
    summary: "Grew an education channel with data-led topics and high-CTR packaging.",
    stats: [
      { value: "5.6M+", label: "Views delivered" },
      { value: "200+", label: "Videos produced" },
      { value: "2.5×", label: "Upload consistency" },
    ],
    services: ["Topic research", "Script & edit pipeline", "Thumbnail design", "Analytics reporting"],
    videos: ["nbIZ4vwDULk", "GFWNPLUwwX0", "wBx7I2OU0mE"],
  },
  "Nishant Chahar": {
    niche: "Tech / Dev Tools",
    summary: "Tech explainers with crisp pacing, clean graphics, and developer-first scripts.",
    stats: [
      { value: "2.1M+", label: "Views delivered" },
      { value: "85+", label: "Videos produced" },
      { value: "38%", label: "Retention boost" },
    ],
    services: ["Technical scripting", "Screen-capture editing", "Thumbnail design", "Shorts repurposing"],
    videos: ["qZFVpURcW34", "wBx7I2OU0mE", "Iq7WeTj_Drc"],
  },
  "Lucky Jethani": {
    niche: "Education",
    summary: "Weekly education content with end-to-end production and growth support.",
    stats: [
      { value: "1.5M+", label: "Views delivered" },
      { value: "110+", label: "Videos produced" },
      { value: "2.1×", label: "Engagement rate" },
    ],
    services: ["Content calendar", "Scriptwriting", "Editing & color", "Publish & optimize"],
    videos: ["GFWNPLUwwX0", "Iq7WeTj_Drc", "nbIZ4vwDULk"],
  },
  "Prem Kr Sharma": {
    niche: "Education",
    summary: "Structured education channel with retention-first scripts and branded visuals.",
    stats: [
      { value: "980K+", label: "Views delivered" },
      { value: "70+", label: "Videos produced" },
      { value: "32%", label: "CTR improvement" },
    ],
    services: ["Research & scripting", "Video editing", "Thumbnail design", "Channel SEO"],
    videos: ["Iq7WeTj_Drc", "qZFVpURcW34", "GFWNPLUwwX0"],
  },
  "Love Babbar": {
    niche: "Tech / DSA",
    summary: "DSA and placement content with tight edits and audience-first packaging.",
    stats: [
      { value: "6.2M+", label: "Views delivered" },
      { value: "140+", label: "Videos produced" },
      { value: "4×", label: "Shorts reach" },
    ],
    services: ["Script structuring", "Code walkthrough edits", "Thumbnail tests", "Upload scheduling"],
    videos: ["nbIZ4vwDULk", "wBx7I2OU0mE", "qZFVpURcW34"],
  },
  "Vikash IITB": {
    niche: "IIT / Education",
    summary: "IIT-life and guidance content with authentic storytelling and consistent output.",
    stats: [
      { value: "1.2M+", label: "Views delivered" },
      { value: "55+", label: "Videos produced" },
      { value: "2.4×", label: "Subscriber growth" },
    ],
    services: ["Content strategy", "Vlog & long-form editing", "Thumbnail design", "Growth analytics"],
    videos: ["wBx7I2OU0mE", "GFWNPLUwwX0", "Iq7WeTj_Drc"],
  },
  "The Social Brains": {
    niche: "Education / Social",
    summary: "Social-science education with bold thumbnails and shareable short-form clips.",
    stats: [
      { value: "3.8M+", label: "Views delivered" },
      { value: "150+", label: "Videos produced" },
      { value: "45%", label: "Share rate lift" },
    ],
    services: ["Topic research", "Script & storyboard", "Editing & motion", "Shorts distribution"],
    videos: ["qZFVpURcW34", "nbIZ4vwDULk", "GFWNPLUwwX0"],
  },
  "Dhruv thakkar": {
    niche: "Education",
    summary: "Education content pipeline with research-backed topics and polished delivery.",
    stats: [
      { value: "760K+", label: "Views delivered" },
      { value: "48+", label: "Videos produced" },
      { value: "29%", label: "Retention lift" },
    ],
    services: ["Scriptwriting", "Full post-production", "Thumbnail design", "Publishing ops"],
    videos: ["Iq7WeTj_Drc", "GFWNPLUwwX0", "wBx7I2OU0mE"],
  },
  Kartik: {
    niche: "IIT / Education",
    summary: "IIT guidance and mentorship content with a consistent weekly release cadence.",
    stats: [
      { value: "890K+", label: "Views delivered" },
      { value: "42+", label: "Videos produced" },
      { value: "2×", label: "Upload frequency" },
    ],
    services: ["Content planning", "Script & edit", "Thumbnail packaging", "Channel management"],
    videos: ["GFWNPLUwwX0", "qZFVpURcW34", "nbIZ4vwDULk"],
  },
  "Theory of Physics": {
    niche: "Physics / Education",
    summary: "Physics explainers with clear visuals, step-by-step scripts, and exam-focused topics.",
    stats: [
      { value: "2.7M+", label: "Views delivered" },
      { value: "130+", label: "Videos produced" },
      { value: "3.5×", label: "Watch time lift" },
    ],
    services: ["Concept scripting", "Animation-ready edits", "Diagram thumbnails", "SEO & metadata"],
    videos: ["nbIZ4vwDULk", "Iq7WeTj_Drc", "wBx7I2OU0mE"],
  },
};
