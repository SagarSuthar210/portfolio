/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * You can easily customize your personal details, links, and projects here.
 * Once you provide your exact details, simply replace the placeholders below.
 */

export const profileData = {
  // 1. Profile Information
  name: "Sagar Suthar",
  role: "Freelance Full-Stack Developer & AI Engineer",
  tagline: "Building high-performance web applications, modern UI/UX, and intelligent automation systems for forward-thinking clients worldwide.",
  
  // Status badge shown over profile
  availabilityBadge: "Available for new projects",
  
  // Profile Image (Replace with your own photo path or image URL)
  // You can put an image in 'public/profile.jpg' and set avatar: '/profile.jpg'
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  
  // Direct Contact Details
  email: "sagar.suthar.freelance@gmail.com",
  contact: "+91 98765 43210", // Phone number / WhatsApp
  location: "India • Available Worldwide (Remote)",
  
  // Social & Portfolio Redirect Links
  linkedin: "https://www.linkedin.com/in/sagar-suthar",
  notion: "https://sagar-portfolio.notion.site",
  github: "https://github.com/SagarSuthar210", // Optional bonus link
  
  // Quick Stats
  stats: [
    { label: "Completed Projects", value: "24+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Years Experience", value: "3+" },
    { label: "Avg Delivery Time", value: "2 Weeks" },
  ]
};

export const projectCategories = [
  "All",
  "Full Stack",
  "AI & Automation",
  "E-Commerce",
  "SaaS"
];

export const projectsData = [
  {
    id: "omni-ai",
    title: "OmniAI - Workflow Automation Platform",
    category: "AI & Automation",
    tagline: "Enterprise workflow automation platform integrating custom LLM pipelines, autonomous agents, and analytics.",
    description: "OmniAI empowers operations teams to automate repetitive tasks across databases, CRM systems, and customer messaging. Built with a responsive React frontend, Node.js microservices, and integrated vector search for instant semantic document querying.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Node.js", "OpenAI API", "PostgreSQL", "TailwindCSS"],
    features: [
      "Real-time visual node-based workflow builder",
      "Sub-200ms semantic search with vector embeddings",
      "Stripe billing and tiered team subscription management",
      "End-to-end audit logging & role-based access control"
    ],
    liveUrl: "https://example.com/omniai",
    githubUrl: "https://github.com/SagarSuthar210",
  },
  {
    id: "novaflow",
    title: "NovaFlow - Realtime Collaboration Hub",
    category: "Full Stack",
    tagline: "Interactive team whiteboard and document co-authoring engine with low-latency WebSocket synchronization.",
    description: "A fast, collaborative workspace that allows distributed product teams to brainstorm, map architectures, and draft specifications together. Utilizes CRDTs (Conflict-free Replicated Data Types) for seamless multi-cursor live editing with offline support.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    tags: ["TypeScript", "Next.js", "WebSockets", "Redis", "Framer Motion"],
    features: [
      "Ultra low-latency multi-user cursor tracking (<30ms)",
      "Infinite canvas with vector shape rendering and markdown docs",
      "Export directly to PDF, PNG, and Notion workspace",
      "Encrypted team rooms with single-sign-on (SSO)"
    ],
    liveUrl: "https://example.com/novaflow",
    githubUrl: "https://github.com/SagarSuthar210",
  },
  {
    id: "auracommerce",
    title: "AuraStore - Headless Luxury Commerce",
    category: "E-Commerce",
    tagline: "Ultra-fast headless e-commerce storefront with 3D product previews, instant search, and one-click checkout.",
    description: "Built for a premium lifestyle brand aiming for lightning-fast page speeds and exceptional brand appeal. Achieved 99+ Google Lighthouse performance scores, dynamic currency localization, and seamless Shopify Storefront API synchronization.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    tags: ["React 19", "Tailwind CSS", "Shopify API", "Stripe", "Three.js"],
    features: [
      "Interactive 3D product viewer using WebGL/Three.js",
      "Instant algorithmic product search and category filtering",
      "Optimized checkout pipeline with 28% higher conversion rate",
      "International multi-currency and geo-localized shipping rates"
    ],
    liveUrl: "https://example.com/aurastore",
    githubUrl: "https://github.com/SagarSuthar210",
  },
  {
    id: "pulsemetrics",
    title: "PulseMetrics - Cloud Telemetry SaaS",
    category: "SaaS",
    tagline: "Developer telemetry and microservice observability platform with real-time alerting and intuitive charts.",
    description: "Designed and built an observability portal for engineering leads to monitor API endpoints, cloud costs, and error rates. Features customizable KPI dashboards, dark-mode first visualization, and Discord/Slack webhook notifications.",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "TailwindCSS", "Recharts", "FastAPI", "Docker"],
    features: [
      "Customizable drag-and-drop metric widget layout",
      "Configurable threshold alerts sent to Slack and Email",
      "Historical data aggregation handling 1M+ daily data points",
      "Exportable executive reports in Excel and PDF formats"
    ],
    liveUrl: "https://example.com/pulsemetrics",
    githubUrl: "https://github.com/SagarSuthar210",
  },
  {
    id: "zenith-agent",
    title: "Zenith - Customer Support AI Agent",
    category: "AI & Automation",
    tagline: "Autonomous customer resolution agent trained on custom company documentation and ticketing history.",
    description: "An AI-powered concierge that handles 65% of customer support queries autonomously without human intervention. Features sentiment analysis, automated ticket escalation, and bilingual communication capabilities.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "LangChain", "React", "Tailwind", "Supabase"],
    features: [
      "Autonomous resolution of tier-1 support tickets",
      "Smart sentiment escalation to human agents via Zendesk",
      "Real-time analytics on customer satisfaction & query trends",
      "Embedded chat widget with customizable brand styling"
    ],
    liveUrl: "https://example.com/zenith-ai",
    githubUrl: "https://github.com/SagarSuthar210",
  },
  {
    id: "cryptosphere",
    title: "ApexPay - Fintech Settlement Gateway",
    category: "Full Stack",
    tagline: "Cross-border payment invoicing and multi-currency wallet dashboard designed for global contractors.",
    description: "A financial dashboard designed specifically for international freelancers and digital agencies. Simplifies multi-currency invoicing, automatic tax estimation, and fast local bank transfers.",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Express", "PostgreSQL", "TailwindCSS", "Chart.js"],
    features: [
      "One-click professional PDF invoice generation",
      "Multi-currency conversion with real-time exchange rates",
      "Automated recurring client billing and payment reminders",
      "Bank-grade SSL encryption and 2-Factor Authentication"
    ],
    liveUrl: "https://example.com/apexpay",
    githubUrl: "https://github.com/SagarSuthar210",
  }
];
