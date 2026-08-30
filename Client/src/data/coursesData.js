import {
  Code,
  BookOpen,
  LineChart,
  Smartphone,
  Palette,
  Server,
  ShieldCheck,
  Bot,
  BrainCircuit,
} from "lucide-react";

import programmingImg from "@/assets/imgs/courses/programming.jpg";
import webDevImg from "@/assets/imgs/courses/web-dev.jpg";
import dataScienceImg from "@/assets/imgs/courses/data-science.jpg";
import mobileDevImg from "@/assets/imgs/courses/mobile-dev.jpg";
import uiUxImg from "@/assets/imgs/courses/ui-ux.jpg";
import cloudImg from "@/assets/imgs/courses/cloud-computing.jpg";
import cybersecurityImg from "@/assets/imgs/courses/cybersecurity.jpg";
import aiImg from "@/assets/imgs/courses/ai.jpg";
import machineLearningImg from "@/assets/imgs/courses/machine-learning.jpg";

export const COURSES = [
  {
    id: "web-development-fundamentals",
    slug: "web-development-fundamentals",
    title: "Web Development Bootcamp: HTML, CSS, JS & React",
    subtitle: "Become a full-stack ready developer by building responsive, modern websites and interactive React applications from scratch.",
    description: "Learn modern web development from industry veterans. This comprehensive bootcamp takes you through responsive HTML5 semantic markup, modern CSS3 Flexbox and Grid styling, ES6+ JavaScript, DOM manipulation, asynchronous programming, APIs, and building full-scale component-based frontends with React.",
    image: webDevImg,
    category: "Web Development",
    icon: BookOpen,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 4280,
    studentsEnrolled: 28450,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "French", "German"],
    price: 19.99,
    originalPrice: 89.99,
    discountPercent: 78,
    totalHours: "32.5 total hours",
    lecturesCount: 64,
    articlesCount: 18,
    downloadableResourcesCount: 26,
    certificate: true,
    author: {
      name: "Jane Smith",
      title: "Senior Lead Frontend Architect & Tech Speaker",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 94000,
      coursesCount: 6,
      bio: "Jane is a senior engineer with over 10 years of experience crafting enterprise web applications for Fortune 500 companies. She has mentored over 90,000 developers worldwide and specializes in React, TypeScript, and modern web performance.",
    },
    whatYouWillLearn: [
      "Build real-world, responsive, mobile-first websites from scratch",
      "Master modern JavaScript (ES6+), async/await, closures, and DOM events",
      "Develop rich Single Page Applications (SPAs) using React 18 & Hooks",
      "Implement client-side routing, state management, and REST API integration",
      "Deploy live websites using Vercel, Netlify, and modern CI/CD pipelines",
      "Write clean, accessible, SEO-optimized, and maintainable frontend code",
      "Master CSS Flexbox, CSS Grid, Tailwind CSS, and responsive typography",
      "Work confidently with Git, GitHub, npm, and modern developer tooling"
    ],
    requirements: [
      "No prior programming experience required. We start from absolute basics.",
      "A computer (Windows, macOS, or Linux) with internet access.",
      "A modern browser (Chrome, Firefox, or Edge) and code editor (VS Code recommended)."
    ],
    targetAudience: [
      "Complete beginners with zero coding experience seeking a career transition.",
      "Designers wanting to bring their interactive designs to life with code.",
      "Backend developers wishing to build complete, polished frontend applications."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Introduction to Web Architecture & HTML5 Essentials",
        duration: "3h 40m",
        lectures: [
          { id: "l1", title: "Course Introduction & Setup Your Coding Workspace", duration: "12:30", type: "video", isPreviewable: true },
          { id: "l2", title: "How the Web Works: Browsers, Servers & HTTP/HTTPS", duration: "18:45", type: "video", isPreviewable: true },
          { id: "l3", title: "Semantic HTML5 Elements & Document Hierarchy", duration: "24:10", type: "video", isPreviewable: false },
          { id: "l4", title: "Forms, Inputs, Accessibility & Validation", duration: "28:15", type: "video", isPreviewable: false },
          { id: "l5", title: "HTML5 Cheat Sheet & Best Practices Guide", duration: "10:00", type: "article", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Modern CSS3, Flexbox, Grid & Responsive Design",
        duration: "5h 15m",
        lectures: [
          { id: "l6", title: "CSS Fundamentals: Selectors, Specificity & Box Model", duration: "25:40", type: "video", isPreviewable: true },
          { id: "l7", title: "Mastering CSS Flexbox with Real-World Layouts", duration: "38:20", type: "video", isPreviewable: false },
          { id: "l8", title: "CSS Grid: Building Complex Multi-Column Layouts", duration: "42:10", type: "video", isPreviewable: false },
          { id: "l9", title: "Media Queries, Mobile-First Design & Breakpoints", duration: "32:15", type: "video", isPreviewable: false },
          { id: "l10", title: "Project: Building a Pixel-Perfect Responsive Landing Page", duration: "55:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m3",
        title: "Module 3: JavaScript Programming Core & DOM Manipulation",
        duration: "8h 30m",
        lectures: [
          { id: "l11", title: "JavaScript Variables, Data Types & Operators", duration: "22:15", type: "video", isPreviewable: true },
          { id: "l12", title: "Control Flow, Loops, and Functions Deep-Dive", duration: "34:50", type: "video", isPreviewable: false },
          { id: "l13", title: "Arrays, Objects, Destructuring & Spread Operator", duration: "40:10", type: "video", isPreviewable: false },
          { id: "l14", title: "Selecting & Manipulating DOM Elements Dynamically", duration: "45:00", type: "video", isPreviewable: false },
          { id: "l15", title: "Handling User Events, Forms & Interactive UI", duration: "38:40", type: "video", isPreviewable: false },
          { id: "l16", title: "Project: Interactive Task Tracker Application", duration: "60:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m4",
        title: "Module 4: Asynchronous JavaScript & REST API Integration",
        duration: "6h 10m",
        lectures: [
          { id: "l17", title: "The Event Loop, Callbacks & Promises Explained", duration: "30:20", type: "video", isPreviewable: true },
          { id: "l18", title: "Async / Await & Error Handling with Try/Catch", duration: "35:10", type: "video", isPreviewable: false },
          { id: "l19", title: "Fetching Data from Third-Party REST APIs", duration: "48:30", type: "video", isPreviewable: false },
          { id: "l20", title: "Project: Live Weather & News Dashboard", duration: "58:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m5",
        title: "Module 5: React 18: Components, State, Hooks & Production Deployment",
        duration: "9h 00m",
        lectures: [
          { id: "l21", title: "Introduction to React, JSX & Component Thinking", duration: "32:00", type: "video", isPreviewable: true },
          { id: "l22", title: "Props, State & useState Hook in Action", duration: "45:15", type: "video", isPreviewable: false },
          { id: "l23", title: "useEffect Hook & API Data Fetching in React", duration: "50:20", type: "video", isPreviewable: false },
          { id: "l24", title: "React Router DOM v6 for Multi-Page SPAs", duration: "48:00", type: "video", isPreviewable: false },
          { id: "l25", title: "Capstone Project: Full E-Commerce Web App", duration: "90:00", type: "video", isPreviewable: false },
          { id: "l26", title: "Production Build & Deploying to Vercel/Netlify", duration: "25:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Alex Morgan",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Outstanding course! The explanations are so clear and the projects you build are actually portfolio-worthy. Landed my first junior frontend role within two months of finishing!"
      },
      {
        id: "r2",
        author: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "The React module alone is worth ten times the price. Everything is up to date with the latest React 18 features and modern JS syntax."
      },
      {
        id: "r3",
        author: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        rating: 4.8,
        date: "2 months ago",
        comment: "Extremely thorough. The instructor teaches good habits like semantic HTML and clean styling before jumping straight into frameworks."
      }
    ]
  },
  {
    id: "intro-to-programming",
    slug: "intro-to-programming",
    title: "Introduction to Programming & Computational Thinking",
    subtitle: "Master the fundamentals of computer science, algorithms, and logic building with hands-on exercises in Python and JavaScript.",
    description: "Start your programming journey the right way. This course demystifies programming concepts from ground zero, covering variables, loops, control flow, functions, object-oriented concepts, and basic data structures to give you unbreakable algorithmic confidence.",
    image: programmingImg,
    category: "Programming",
    icon: Code,
    badge: "Hot & New",
    rating: 4.8,
    reviewCount: 3120,
    studentsEnrolled: 19800,
    lastUpdated: "July 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "Hindi"],
    price: 14.99,
    originalPrice: 69.99,
    discountPercent: 79,
    totalHours: "20 total hours",
    lecturesCount: 45,
    articlesCount: 12,
    downloadableResourcesCount: 19,
    certificate: true,
    author: {
      name: "John Doe",
      title: "Computer Science Educator & Software Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      studentsCount: 62000,
      coursesCount: 4,
      bio: "John has taught introductory programming at universities and bootcamps for over 8 years. He is passionate about making abstract computing concepts intuitive and accessible.",
    },
    whatYouWillLearn: [
      "Understand core programming paradigms and algorithmic logic",
      "Master control structures, nested loops, conditional statements, and functions",
      "Learn essential data structures: arrays, lists, hash maps, and stacks",
      "Solve classic computational problem-solving challenges step by step",
      "Apply Object-Oriented Programming (OOP) principles: classes, objects, and methods",
      "Debug code systematically using break points and stack traces"
    ],
    requirements: [
      "No coding experience needed. A curious mind is all you need!",
      "Any laptop or desktop computer with standard web access."
    ],
    targetAudience: [
      "Beginners wanting a strong, enduring foundation in computer science.",
      "High school or college students preparing for technical degrees.",
      "Self-taught learners who want structured guidance on algorithmic thinking."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: What is Code? Computational Thinking",
        duration: "2h 30m",
        lectures: [
          { id: "l1", title: "Welcome: How Computers Think & Execute Code", duration: "15:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Variables, Memory Allocation & Data Types", duration: "20:30", type: "video", isPreviewable: true },
          { id: "l3", title: "Conditional Statements & Boolean Logic", duration: "28:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Iteration, Loops & Structured Logic",
        duration: "4h 10m",
        lectures: [
          { id: "l4", title: "For Loops, While Loops and Sentinel Values", duration: "32:00", type: "video", isPreviewable: true },
          { id: "l5", title: "Nested Loops & Pattern Generation", duration: "40:00", type: "video", isPreviewable: false },
          { id: "l6", title: "Logic Building Exercises & Common Pitfalls", duration: "35:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m3",
        title: "Module 3: Functions, Modularity & Data Structures",
        duration: "6h 00m",
        lectures: [
          { id: "l7", title: "Writing Reusable Functions & Parameter Passing", duration: "28:00", type: "video", isPreviewable: false },
          { id: "l8", title: "Arrays, Lists, Dictionaries & Key-Value Lookup", duration: "45:00", type: "video", isPreviewable: false },
          { id: "l9", title: "Algorithms: Searching and Sorting Essentials", duration: "50:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Marcus Brown",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "This course removed all the intimidation I had about coding. John breaks down complex logic into relatable real-world analogies."
      }
    ]
  },
  {
    id: "data-science-essentials",
    slug: "data-science-essentials",
    title: "Data Science Essentials: Python, Pandas & Visual Analytics",
    subtitle: "Turn raw data into actionable insights with Python, NumPy, Pandas, Matplotlib, Seaborn, and statistical modeling.",
    description: "Master data science workflows from data wrangling to predictive analytics. Learn how to clean messy datasets, perform exploratory data analysis (EDA), engineer meaningful features, and create compelling data visualizations for stakeholders.",
    image: dataScienceImg,
    category: "Data Science",
    icon: LineChart,
    badge: "Highest Rated",
    rating: 4.9,
    reviewCount: 2950,
    studentsEnrolled: 16400,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "Portuguese"],
    price: 24.99,
    originalPrice: 94.99,
    discountPercent: 74,
    totalHours: "28 total hours",
    lecturesCount: 52,
    articlesCount: 14,
    downloadableResourcesCount: 30,
    certificate: true,
    author: {
      name: "Alan Walker",
      title: "Principal Data Scientist & Analytics Consultant",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 78000,
      coursesCount: 5,
      bio: "Alan has led data science teams in fintech and healthcare, delivering machine learning models and business intelligence solutions worldwide.",
    },
    whatYouWillLearn: [
      "Master Python for scientific computing using NumPy and Pandas",
      "Perform exploratory data analysis on real messy datasets",
      "Build stunning statistical visualizations using Matplotlib and Seaborn",
      "Work with real-world CSV, Excel, SQL databases, and JSON data sources",
      "Understand hypothesis testing, distributions, and probability metrics",
      "Produce production-ready Jupyter notebooks and analytics dashboards"
    ],
    requirements: [
      "Basic understanding of math/arithmetic.",
      "No advanced coding needed; basic Python is introduced in module 1."
    ],
    targetAudience: [
      "Aspiring data scientists, business analysts, and quantitative researchers.",
      "Engineers looking to add data wrangling and analytics to their skillset."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Scientific Python & Numerical Computation with NumPy",
        duration: "4h 20m",
        lectures: [
          { id: "l1", title: "Jupyter Notebooks Setup & Python Environment", duration: "16:00", type: "video", isPreviewable: true },
          { id: "l2", title: "NumPy Multi-Dimensional Arrays & Vectorization", duration: "35:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Broadcasting, Indexing & Matrix Operations", duration: "40:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Data Wrangling with Pandas",
        duration: "7h 10m",
        lectures: [
          { id: "l4", title: "Series, DataFrames & Importing Data", duration: "30:00", type: "video", isPreviewable: true },
          { id: "l5", title: "Handling Missing Values, Duplicates & Outliers", duration: "45:00", type: "video", isPreviewable: false },
          { id: "l6", title: "Grouping, Aggregations & Pivot Tables", duration: "50:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m3",
        title: "Module 3: Data Visualization & Exploratory Analysis (EDA)",
        duration: "8h 00m",
        lectures: [
          { id: "l7", title: "Storytelling with Matplotlib & Custom Subplots", duration: "42:00", type: "video", isPreviewable: false },
          { id: "l8", title: "Advanced Seaborn Distributions & Heatmaps", duration: "48:00", type: "video", isPreviewable: false },
          { id: "l9", title: "Capstone Project: Financial Market Data Insights", duration: "75:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Samantha Reed",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "The datasets used in this course are actual real-world sets, not sanitized toys. It taught me how to tackle dirty data like a pro."
      }
    ]
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development: Cross-Platform iOS & Android",
    subtitle: "Build high-performance, native-feeling mobile apps for iOS and Android using modern React Native and Flutter frameworks.",
    description: "Launch your mobile developer career by constructing fluid, cross-platform mobile apps. You will learn navigation patterns, native device hardware APIs (Camera, GPS, Notifications), offline persistence, and deployment to the App Store and Google Play.",
    image: mobileDevImg,
    category: "Mobile Apps",
    icon: Smartphone,
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 1840,
    studentsEnrolled: 12100,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish"],
    price: 18.99,
    originalPrice: 79.99,
    discountPercent: 76,
    totalHours: "26 total hours",
    lecturesCount: 50,
    articlesCount: 15,
    downloadableResourcesCount: 20,
    certificate: true,
    author: {
      name: "Sara Lee",
      title: "Staff Mobile Engineer & App Creator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      studentsCount: 45000,
      coursesCount: 3,
      bio: "Sara is a mobile architect who has shipped top-charting apps with millions of downloads across Apple App Store and Google Play.",
    },
    whatYouWillLearn: [
      "Build cross-platform mobile apps for iOS & Android with a single codebase",
      "Integrate native features: Camera, Geolocation, Push Notifications & Storage",
      "Manage smooth gestures, 60fps animations, and fluid transitions",
      "Connect mobile apps to REST and GraphQL backend services",
      "Step-by-step guide to publishing apps on Google Play Store and Apple App Store"
    ],
    requirements: [
      "Basic knowledge of JavaScript or React is helpful.",
      "A PC or Mac for development (Mac needed for iOS simulator, but Expo works on any device)."
    ],
    targetAudience: [
      "Web developers wanting to expand into mobile application development.",
      "Entrepreneurs wanting to build and launch their own mobile app MVP."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Mobile Environment Setup & Architecture",
        duration: "3h 10m",
        lectures: [
          { id: "l1", title: "React Native & Expo Ecosystem Overview", duration: "18:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Native Components vs Web Elements", duration: "25:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Styling Mobile Screens with StyleSheet & Flexbox", duration: "32:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Navigation & Native Device Integrations",
        duration: "6h 40m",
        lectures: [
          { id: "l4", title: "React Navigation: Stacks, Tabs & Drawers", duration: "40:00", type: "video", isPreviewable: false },
          { id: "l5", title: "Camera, Image Picker & Media Uploads", duration: "45:00", type: "video", isPreviewable: false },
          { id: "l6", title: "Offline Storage & Async Persistence", duration: "35:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Kevin Patel",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Super practical! Built a working mobile prototype for my startup in less than two weeks thanks to Sara's tutorials."
      }
    ]
  },
  {
    id: "ui-ux-design-masterclass",
    slug: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass: Figma to Interactive Prototypes",
    subtitle: "Design stunning digital user interfaces, conduct user research, master Figma auto-layout, and build scalable design systems.",
    description: "Elevate your design career with this end-to-end UX/UI Masterclass. Learn the full design lifecycle: from user interviews, empathy maps, and wireframing, to advanced Figma components, variables, micro-interactions, responsive design systems, and developer handoff.",
    image: uiUxImg,
    category: "UI/UX Design",
    icon: Palette,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 3680,
    studentsEnrolled: 24300,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "German"],
    price: 19.99,
    originalPrice: 84.99,
    discountPercent: 76,
    totalHours: "22 total hours",
    lecturesCount: 48,
    articlesCount: 16,
    downloadableResourcesCount: 40,
    certificate: true,
    author: {
      name: "Emily Zhang",
      title: "Lead Product Designer & Design System Consultant",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 88000,
      coursesCount: 4,
      bio: "Emily has designed experiences for top tech products used by millions. She is renowned for teaching scalable Figma systems and modern design psychology.",
    },
    whatYouWillLearn: [
      "Master Figma from fundamentals to advanced auto-layout and components",
      "Construct comprehensive design systems with tokens, styles, and variants",
      "Execute user research, persona creation, user journeys, and information architecture",
      "Craft interactive, high-fidelity prototypes with realistic animations",
      "Prepare clean, developer-ready design specs and handoff documentation"
    ],
    requirements: [
      "Free Figma account (browser or desktop app).",
      "No prior design or artistic background required."
    ],
    targetAudience: [
      "Anyone aspiring to become a professional UI/UX or Product Designer.",
      "Developers who want to enhance the visual aesthetic and usability of their apps."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: UX Fundamentals & User-Centric Research",
        duration: "3h 30m",
        lectures: [
          { id: "l1", title: "UX vs UI: The Complete Product Design Cycle", duration: "16:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Conducting User Interviews & Journey Mapping", duration: "28:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Low-Fidelity Wireframing & Information Architecture", duration: "35:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Figma Mastery: Auto-Layout, Components & Variants",
        duration: "6h 50m",
        lectures: [
          { id: "l4", title: "Figma Auto-Layout 5.0 Deep Dive", duration: "45:00", type: "video", isPreviewable: true },
          { id: "l5", title: "Creating Reusable Component Libraries & Variants", duration: "52:00", type: "video", isPreviewable: false },
          { id: "l6", title: "Color Theory, Typography & Spacing Systems", duration: "38:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Lucas Thorne",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "The Figma auto-layout and component chapters alone changed how I design forever. Beautifully paced and structured!"
      }
    ]
  },
  {
    id: "cloud-devops-architecture",
    slug: "cloud-devops-architecture",
    title: "Cloud & DevOps Architecture: AWS, Docker, Kubernetes & CI/CD",
    subtitle: "Architect scalable, resilient cloud infrastructure with AWS, Docker containers, Kubernetes orchestration, and automated CI/CD pipelines.",
    description: "Learn how modern software teams deploy and operate reliable cloud systems. This course covers AWS core infrastructure (EC2, S3, RDS, Lambda), containerization with Docker, Kubernetes cluster management, Infrastructure as Code (Terraform), and GitHub Actions pipelines.",
    image: cloudImg,
    category: "Cloud & DevOps",
    icon: Server,
    badge: "Highest Rated",
    rating: 4.9,
    reviewCount: 2210,
    studentsEnrolled: 15300,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "Japanese"],
    price: 24.99,
    originalPrice: 99.99,
    discountPercent: 75,
    totalHours: "30 total hours",
    lecturesCount: 58,
    articlesCount: 20,
    downloadableResourcesCount: 25,
    certificate: true,
    author: {
      name: "David Miller",
      title: "Cloud Solutions Architect & DevOps Lead",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 52000,
      coursesCount: 4,
      bio: "David is an AWS Certified Solutions Architect with 12+ years designing high-availability cloud infrastructure for streaming and enterprise apps.",
    },
    whatYouWillLearn: [
      "Design scalable, fault-tolerant infrastructure on Amazon Web Services (AWS)",
      "Containerize microservice applications using Docker and Docker Compose",
      "Deploy, scale, and manage production containers with Kubernetes",
      "Automate testing and deployments using GitHub Actions CI/CD pipelines",
      "Implement Infrastructure as Code (IaC) with Terraform"
    ],
    requirements: [
      "Basic Linux terminal / command-line familiarity.",
      "Basic understanding of web servers and web applications."
    ],
    targetAudience: [
      "Software engineers moving towards Cloud and DevOps specializations.",
      "System administrators modernizing infrastructure with containers and IaC."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: AWS Cloud Architecture Fundamentals",
        duration: "5h 15m",
        lectures: [
          { id: "l1", title: "AWS Core Services Overview (VPC, EC2, S3, IAM)", duration: "25:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Configuring VPCs, Security Groups & Routing", duration: "38:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Managed Databases with RDS and DynamoDB", duration: "34:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Docker Containers & Microservices",
        duration: "6h 30m",
        lectures: [
          { id: "l4", title: "Docker Images, Dockerfile Optimization & Layers", duration: "36:00", type: "video", isPreviewable: true },
          { id: "l5", title: "Multi-Container Orchestration with Docker Compose", duration: "42:00", type: "video", isPreviewable: false },
          { id: "l6", title: "CI/CD Pipeline with Automated Container Builds", duration: "50:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Brian O'Connor",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Hands down the best DevOps course online. The Kubernetes and Terraform walkthroughs saved me weeks on my job migration."
      }
    ]
  },
  {
    id: "cybersecurity-network-defense",
    slug: "cybersecurity-network-defense",
    title: "Cybersecurity & Network Defense: Ethical Hacking",
    subtitle: "Understand network security protocols, vulnerability scanning, penetration testing, cryptography, and defensive threat mitigation.",
    description: "Learn offensive and defensive security principles from seasoned cybersecurity practitioners. Explore network scanning (Nmap, Wireshark), web vulnerability hunting (OWASP Top 10), cryptographic protocols, incident response, and security auditing.",
    image: cybersecurityImg,
    category: "Cybersecurity",
    icon: ShieldCheck,
    badge: "Hot & New",
    rating: 4.8,
    reviewCount: 1980,
    studentsEnrolled: 13800,
    lastUpdated: "July 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish"],
    price: 21.99,
    originalPrice: 89.99,
    discountPercent: 75,
    totalHours: "25 total hours",
    lecturesCount: 46,
    articlesCount: 14,
    downloadableResourcesCount: 22,
    certificate: true,
    author: {
      name: "Alex Rivera",
      title: "Certified Ethical Hacker (CEH) & Cyber Defense Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      studentsCount: 39000,
      coursesCount: 3,
      bio: "Alex is a cybersecurity analyst and penetration tester with deep experience advising corporate IT teams on threat mitigation and compliance.",
    },
    whatYouWillLearn: [
      "Master network scanning, packet analysis, and reconnaissance techniques",
      "Identify and defend against OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF)",
      "Understand asymmetric/symmetric cryptography, SSL/TLS certificates, and hashing",
      "Configure firewalls, IDS/IPS systems, and zero-trust network policies",
      "Perform practical security audits and write professional vulnerability reports"
    ],
    requirements: [
      "Basic understanding of computer networks (IP addresses, TCP/UDP, DNS).",
      "A computer capable of running VirtualBox or VMware."
    ],
    targetAudience: [
      "Aspiring ethical hackers, security analysts, and IT administrators.",
      "Software developers looking to write secure, hardened applications."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Cybersecurity Fundamentals & Network Analysis",
        duration: "4h 45m",
        lectures: [
          { id: "l1", title: "Security Fundamentals: CIA Triad & Threat Modeling", duration: "20:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Network Sniffing & Packet Inspection with Wireshark", duration: "38:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Port Scanning & Network Reconnaissance with Nmap", duration: "35:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Web Application Security & OWASP Defense",
        duration: "6h 20m",
        lectures: [
          { id: "l4", title: "SQL Injection Attacks & Parameterized Defenses", duration: "42:00", type: "video", isPreviewable: false },
          { id: "l5", title: "Cross-Site Scripting (XSS) & Content Security Policies", duration: "39:00", type: "video", isPreviewable: false },
          { id: "l6", title: "Authentication, JWT Security & Session Fixation", duration: "45:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Dmitri Volkov",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Clear, ethical, and loaded with hands-on lab environments. Highly recommended for aspiring cybersecurity professionals."
      }
    ]
  },
  {
    id: "ai-robotics",
    slug: "ai-robotics",
    title: "Artificial Intelligence & Autonomous Robotics Systems",
    subtitle: "Explore neural networks, computer vision, reinforcement learning, and ROS2 autonomous agent programming.",
    description: "Dive into the future of physical and digital intelligence. This advanced course covers perception algorithms, OpenCV image processing, deep reinforcement learning, robot kinematics, SLAM (Simultaneous Localization and Mapping), and ROS2 robot simulation.",
    image: aiImg,
    category: "AI & Robotics",
    icon: Bot,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 2640,
    studentsEnrolled: 17200,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Japanese", "German"],
    price: 29.99,
    originalPrice: 119.99,
    discountPercent: 75,
    totalHours: "34 total hours",
    lecturesCount: 60,
    articlesCount: 22,
    downloadableResourcesCount: 35,
    certificate: true,
    author: {
      name: "Sophia Chen",
      title: "Robotics Research Scientist & AI Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 68000,
      coursesCount: 4,
      bio: "Sophia holds a PhD in Robotics & Computer Vision. She leads cutting-edge autonomous systems development and AI research.",
    },
    whatYouWillLearn: [
      "Master computer vision with OpenCV: feature extraction and object detection",
      "Implement deep reinforcement learning algorithms for autonomous decision making",
      "Simulate autonomous robots using ROS2 (Robot Operating System) and Gazebo",
      "Understand sensor fusion, LiDAR point clouds, and SLAM navigation",
      "Deploy PyTorch neural models on edge compute hardware"
    ],
    requirements: [
      "Intermediate Python programming proficiency.",
      "Basic understanding of linear algebra and calculus."
    ],
    targetAudience: [
      "AI researchers, software engineers, and robotics hobbyists.",
      "Students looking to break into autonomous vehicles and advanced robotics."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Computer Vision & Sensor Perception",
        duration: "5h 40m",
        lectures: [
          { id: "l1", title: "Introduction to Autonomous Agents & Sensors", duration: "22:00", type: "video", isPreviewable: true },
          { id: "l2", title: "OpenCV Image Pipelines & Color Filtering", duration: "35:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Object Detection with YOLO & Neural Vision", duration: "48:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: ROS2 Framework & Simulation in Gazebo",
        duration: "7h 20m",
        lectures: [
          { id: "l4", title: "ROS2 Nodes, Topics, Services & Actions", duration: "42:00", type: "video", isPreviewable: false },
          { id: "l5", title: "Robot URDF Modeling & Physics Simulation", duration: "50:00", type: "video", isPreviewable: false },
          { id: "l6", title: "SLAM: Mapping Environments with 2D LiDAR", duration: "55:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Takeshi Sato",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "Exceptional depth! The combination of theoretical robotics math and practical ROS2 simulation is unmatched."
      }
    ]
  },
  {
    id: "machine-learning-specialization",
    slug: "machine-learning-specialization",
    title: "Machine Learning & Deep Neural Networks Specialization",
    subtitle: "Build, train, and fine-tune supervised, unsupervised, and deep learning neural models with PyTorch and Scikit-Learn.",
    description: "A complete masterclass in modern machine learning. Master regression, classification, decision trees, random forests, gradient boosting (XGBoost), convolutional neural networks (CNNs), transformer architectures, and model evaluation metrics.",
    image: machineLearningImg,
    category: "AI & Robotics",
    icon: BrainCircuit,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 3890,
    studentsEnrolled: 25900,
    lastUpdated: "August 2026",
    language: "English",
    subtitles: ["English [Auto]", "Spanish", "French", "Korean"],
    price: 27.99,
    originalPrice: 109.99,
    discountPercent: 74,
    totalHours: "31 total hours",
    lecturesCount: 56,
    articlesCount: 18,
    downloadableResourcesCount: 28,
    certificate: true,
    author: {
      name: "Dr. Marcus Vance",
      title: "AI Researcher & Deep Learning Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      studentsCount: 91000,
      coursesCount: 5,
      bio: "Dr. Vance is a recognized machine learning educator with publications in top AI conferences. He specializes in PyTorch and transformer models.",
    },
    whatYouWillLearn: [
      "Master core ML algorithms: Linear/Logistic Regression, SVMs, Trees & Ensembles",
      "Build and train Deep Neural Networks from scratch with PyTorch",
      "Implement Convolutional Neural Networks (CNNs) for image classification",
      "Fine-tune pre-trained Transformer models for Natural Language Processing (NLP)",
      "Deploy machine learning models as production REST API endpoints"
    ],
    requirements: [
      "Python programming knowledge (loops, functions, classes).",
      "High school mathematics (basic algebra and matrix operations)."
    ],
    targetAudience: [
      "Software developers seeking to transition into AI and Machine Learning engineering.",
      "Data analysts wishing to level up to predictive modeling and deep learning."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Classical Machine Learning & Scikit-Learn",
        duration: "5h 30m",
        lectures: [
          { id: "l1", title: "Machine Learning Landscape: Supervised vs Unsupervised", duration: "20:00", type: "video", isPreviewable: true },
          { id: "l2", title: "Linear & Polynomial Regression with Gradient Descent", duration: "36:00", type: "video", isPreviewable: true },
          { id: "l3", title: "Decision Trees, Random Forests & XGBoost Tuning", duration: "48:00", type: "video", isPreviewable: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Deep Learning with PyTorch",
        duration: "8h 15m",
        lectures: [
          { id: "l4", title: "PyTorch Tensors, Autograd & Building Neural Layers", duration: "40:00", type: "video", isPreviewable: true },
          { id: "l5", title: "Loss Functions, Backpropagation & Optimizers (Adam, SGD)", duration: "45:00", type: "video", isPreviewable: false },
          { id: "l6", title: "CNN Architectures: ResNet & Transfer Learning", duration: "55:00", type: "video", isPreviewable: false },
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Rachel Green",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Dr. Vance is a genius instructor. He makes the math behind gradient descent and neural networks feel completely natural."
      }
    ]
  }
];

export const getCourseById = (idOrSlug) => {
  if (!idOrSlug) return null;
  return COURSES.find(
    (c) => c.id === idOrSlug || c.slug === idOrSlug
  ) || null;
};

export const getAllCourses = () => {
  return COURSES;
};
