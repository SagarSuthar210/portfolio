/**
 * PORTFOLIO DATA CONFIGURATION
 * Real projects & profile information for Sagar Suthar
 */

export const profileData = {
  // 1. Profile Information
  name: "Sagar Suthar",
  role: "AI Engineer & Full-Stack Developer • Founder @ BuilderHut",
  tagline: "Building data-backed AI systems that scale, geospatial intelligence platforms, and high-performance interactive software with end-to-end architecture.",
  
  // Status badge shown over profile
  availabilityBadge: "Available for freelance & consulting",
  
  // Profile Image (from myPic/me.png)
  avatar: "./profile.png",
  
  // Direct Contact Details
  email: "sagarsuthar.work@gmail.com",
  contact: "Available on LinkedIn / Email",
  location: "India • Available Worldwide (Remote)",
  
  // Social & Portfolio Redirect Links
  linkedin: "https://www.linkedin.com/in/sagar-suthar-9847a6377/?isSelfProfile=true",
  notion: "https://standing-neighbor-7b2.notion.site/Sagar-Suthar-Projects-2cf612181d618067b91adea0af06850d?pvs=74",
  
  // Extended Bio from Notion
  bio: "AI Engineer focused on building data-backed AI systems that scale — currently Founder of BuilderHut, an AI-powered land feasibility platform. Background spans applied data science (deep learning for real estate forecasting, IoT-driven ML devices) and 4+ years of game development, founding Hurrica Studio and shipping published Unity/C# titles. Comfortable owning a product end-to-end, from architecture to deployment."
};

export const projectCategories = [
  "All",
  "AI & Data Science",
  "Backend & SaaS",
  "Game Dev & 3D",
  "IoT & Embedded"
];

export const projectsData = [
  {
    id: "builderhut",
    title: "BuilderHut",
    category: "Backend & SaaS",
    tagline: "AI-powered land feasibility platform that evaluates parcels, bringing up economic & context-aware paths in seconds.",
    description: "BuilderHut fuses geospatial infrastructure data, high-resolution satellite imagery, nearby commercial points of interest, and grounded economic & municipal regulatory data into a single stream of AI reasoning. It delivers rich, data-backed feasibility reports, assists users in listing and discovering parcels under specific contextual constraints, and creates complex AI real estate portfolios with simplified decision-making.",
    thumbnail: "./projects/builderhut.png",
    tags: ["AI Intelligence", "Geospatial Data", "Satellite Imagery", "Full-Stack SaaS", "FastAPI", "React"],
    features: [
      "Multi-modal fusion of geospatial, zoning, infrastructure, and satellite imagery",
      "Instant economic and context-aware land feasibility generation",
      "Portfolio decision engine evaluating listed parcels against custom feasibility constraints",
      "End-to-end scalable backend architecture with grounded regulatory data streams"
    ],
    liveUrl: "https://builderhut.co",
    linkLabel: "Visit Live Platform",
    githubUrl: null, // Codebase private
  },
  {
    id: "neoeternal",
    title: "NeoEternal",
    category: "Game Dev & 3D",
    tagline: "3D endless tunnel escape game built with Unity, blending responsive mechanics with stunning visual design.",
    description: "A fast-paced 3D endless runner and tunnel escape game developed in Unity/C#. Features custom procedural tunnel generation, dynamic obstacle spawning, high-speed physics handling, and a modular architecture. Accompanied by a comprehensive Game Design Document (GDD) and technical design specification.",
    thumbnail: "./projects/neoeternal.png",
    tags: ["Unity", "C#", "3D Graphics", "Procedural Generation", "Game Design", "Shader Graph"],
    features: [
      "Custom 3D tunnel navigation and high-speed momentum physics",
      "Dynamic procedural obstacle generation with adaptive pacing",
      "Optimized rendering pipeline for consistent high-framerate gameplay",
      "Full technical Game Design Document (GDD) & obstacle hierarchy"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Game-projects-2cf612181d6180eb86facaa7c7af7e7e?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  },
  {
    id: "geoslick-ai",
    title: "GeoSlick AI",
    category: "AI & Data Science",
    tagline: "Web-based decision-support system for offshore oil spill detection using Sentinel-1 SAR imagery and U-Net.",
    description: "A comprehensive oil spill monitoring system. An analyst defines an Area of Interest (AOI) on a Sentinel-1 SAR scene, and a custom four-level U-Net deep learning model segments oil-slick pixels. Slicks are traced backward in time using Copernicus Marine ocean currents and ECMWF ERA5 wind vectors to estimate origin points, matching nearby AIS vessel positions to rank attribution leads.",
    thumbnail: "./projects/geoslick.png",
    tags: ["PyTorch", "U-Net", "Sentinel-1 SAR", "Copernicus Marine", "AIS Tracking", "Flask", "Gemini API"],
    features: [
      "Four-level U-Net segmentation trained with BCE + Dice loss on SAR image-mask pairs",
      "Backward drift tracing converting surface current and ERA5 wind vectors into pixel displacements",
      "AIS vessel trajectory attribution scoring and top-15 lead candidate ranking",
      "Interactive Flask & Canvas frontend with integrated Gemini intelligence summaries"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Data-Science-ML-projects-2cf612181d6180559945e760a5b711e3?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  },
  {
    id: "curlbands",
    title: "CurlBands",
    category: "IoT & Embedded",
    tagline: "AI wrist-based exercise form analyzer using dual-band IMU sensors and Dynamic Time Warping (DTW).",
    description: "A dual-band IoT wearable system for real-time exercise form feedback during bicep curls. Worn on both wrists, it captures angular kinematics using MPU6050 IMU sensors and transmits pitch & roll via Bluetooth Low Energy (BLE) to an Android companion app. Uses Dynamic Time Warping (DTW) to compare user repetitions against trained form templates, outputting instant GOOD or BAD rep grading.",
    thumbnail: "./projects/curlbands.png",
    tags: ["IoT Wearable", "MPU6050 IMU", "Bluetooth Low Energy", "Dynamic Time Warping", "Android", "Embedded C++"],
    features: [
      "Real-time dual-wrist inertial motion capture streaming over BLE",
      "Dynamic Time Warping (DTW) algorithm for temporal template matching",
      "Immediate visual feedback on mobile interface (Green for GOOD / Red for BAD)",
      "Helps prevent workout injuries with solo personal trainer guidance"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Data-Science-ML-projects-2cf612181d6180559945e760a5b711e3?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  },
  {
    id: "ai-cops-escape",
    title: "AI Infinite Cops Escape",
    category: "Game Dev & 3D",
    tagline: "3D procedural vehicular escape game featuring adaptive pursuit AI and infinite generative environments.",
    description: "An adrenaline-fueled 3D car chase escape game developed in Unity/C#. Features adversarial pursuit vehicle AI that dynamically navigates around hurdles to intercept the player, coupled with an infinite generative road map and unpredictable obstacles.",
    thumbnail: "./projects/cops.png",
    tags: ["Unity", "C#", "Pursuit AI", "Procedural World Gen", "Vehicle Physics"],
    features: [
      "Adversarial cop car pathfinding and intercept tactics",
      "Infinite dynamic map chunk generation with progressive difficulty",
      "Realistic arcade vehicle drifting physics and collision response",
      "Optimized object pooling for smooth mobile and desktop performance"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Game-projects-2cf612181d6180eb86facaa7c7af7e7e?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  },
  {
    id: "land-price-predictor",
    title: "Land Price Predictor",
    category: "AI & Data Science",
    tagline: "Deep learning predictive engine for real estate land valuation using spatial features and historical sales.",
    description: "An applied data science model engineered to forecast land and parcel valuations. Leverages multi-variable feature extraction from historical land transaction records, geographic amenity density, infrastructure proximity, and market velocity to yield data-backed appraisal estimates.",
    thumbnail: "./projects/landprice.png",
    tags: ["Deep Learning", "Data Science", "Python", "Spatial Analysis", "Scikit-Learn"],
    features: [
      "Multi-factor valuation pipeline synthesizing municipal land data",
      "High accuracy regression modeling benchmarked against actual market transactions",
      "Interactive data visualizations demonstrating price distribution and feature importance",
      "Foundation model research directly empowering commercial feasibility platforms"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Data-Science-ML-projects-2cf612181d6180559945e760a5b711e3?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  },
  {
    id: "spider-ball",
    title: "Spider Ball",
    category: "Game Dev & 3D",
    tagline: "2D physics navigation game where players control a dynamic sphere endowed with spider climbing abilities.",
    description: "A physics-driven 2D puzzle-platformer created in Unity. Players navigate complex geometric obstacle courses controlling a sphere with spider-like adhesion, wall climbing, and grappling mechanics, requiring precision timing and momentum management.",
    thumbnail: "./projects/spiderball.png",
    tags: ["Unity", "2D Physics", "Kinematics", "C#", "Level Design"],
    features: [
      "Dynamic surface adhesion and omni-directional wall climbing",
      "Momentum-based pendulum swing and grapple mechanics",
      "Custom obstacle hazards and moving environmental traps",
      "Fluid particle feedback and responsive touch/keyboard controls"
    ],
    liveUrl: "https://standing-neighbor-7b2.notion.site/Game-projects-2cf612181d6180eb86facaa7c7af7e7e?pvs=74",
    linkLabel: "View Notion Case Study",
    githubUrl: null,
  }
];
