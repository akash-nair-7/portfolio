import { Github, Linkedin, Mail } from "lucide-react";

export const personalInfo = {
  name: "Aakash Nair",
  tagline: "Software Developer | Building workflows with no-code/low-code platforms",
  summary: "Software Developer at TCS, specializing in building end-to-end workflows using no-code and low-code platforms.",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Muthoot Institute of Technology and Science",
    duration: "2020 – 2024",
    description: "Focused on software engineering, data structures, and web development. Graduated with a CGPA of 8.61.",
  },
  {
    degree: "Higher Secondary",
    institution: "Chinmaya Vidyalaya",
    duration: "2017 – 2019",
    description: "Specialized in Computer Science, achieving an overall score of 92.2% in Higher Secondary Education.",
  },
  {
    degree: "Secondary School",
    institution: "St.Paul's English Medium School",
    duration: "2016 – 2017",
    description: "Completed Secondary School (Class X) with a CGPA of 10.0.",
  },
  
];

export const projects = [
  {
  title: "IBM Incident Intelligence & Automation",
  description:
    "Developed AI-assisted automation workflows on the IBM Copilot API Platform for deployment risk scoring, incident analysis, root cause identification, troubleshooting automation, runbook intelligence, and log analysis. Built knowledge bases from historical incidents, automated runbook data extraction, integrated log analysis workflows into Slack-based incident automation, and delivered multiple production improvements.",
  techStack: [
    "Python",
    "IBM Copilot API Platform",
    "Generative AI",
    "Prompt Engineering",
    "RAG",
    "REST APIs",
    "Slack API",
    "JSON",
    "SQL"
  ],
},
{
  title: "IBM ICL Cost Efficiency Initiative",
  description:
    "Built Python automation solutions to process operational data from multiple endpoints, generate structured reports, automate daily log analysis across regions, identify applications suitable for lower-tier storage migration, and automate policy uploads to IBM Cloud Object Storage for analytics dashboards.",
  techStack: [
    "Python",
    "IBM Cloud Object Storage",
    "REST APIs",
    "Docker",
    "JSON",
    "CSV",
    "Data Processing",
    "Automation"
  ],
},
  {
    title: "AI Striker",
    description:
      "Built an AI-powered sports and fitness training platform providing real-time coaching for cricket, yoga, and gym exercises using computer vision and pose estimation.",
    techStack: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "YOLO",
      "Django",
      "MongoDB"
    ],
  },
 {
    title: "Yoga Sage",
    description:
      "Developed an AI-powered yoga training web application that analyzes user poses and provides real-time corrective feedback using pose estimation.",
    techStack: [
    "Google Teachable Machine",
    "HTML",
    "CSS",
    "JavaScript"
  ],
  },
   
  {
    title: "IEEE Victoria Chatbot",
  description:
    "Contributed to the development and deployment of an event information chatbot for IEEE Victoria using Google Dialogflow. Designed conversation flows by defining user queries with appropriate responses and maintained upcoming and completed event information for quick access.",
  techStack: [
    "Google Dialogflow",
    "Intent Configuration",
    "Conversation Flow Design",
    "Knowledge Base Management"
  ],
    demo: "https://ieeesbmits.in/",
  },
  {
title: "EnergyIQ - AI-Powered Energy Advisor",
description: "Built an AI-powered energy advisory application that combines retrieval-augmented generation, household analytics, and tariff analysis to deliver personalized energy-saving recommendations through an interactive Streamlit dashboard.",
techStack: ["Python", "Streamlit", "RAG", "Google Gemini API", "Pandas", "NumPy", "Matplotlib"],
github: "https://github.com/akash-nair-7/energy_advisor",
demo: "https://energyadvisor-aakash-nair.streamlit.app/"
},
  {
  title: "Lumina Trace Experience",
  description: "A sleek, high-energy web experience vibe coded with modern UI motion, immersive visuals, and a polished product-first feel that blends creativity with fast iteration.",
  techStack: ["React", "TypeScript", "Vite", "TanStack Start", "Tailwind CSS", "Framer Motion"],
  github: "https://github.com/akash-nair-7/trace",
  demo: "https://trace-nu-five.vercel.app/"
},
  {
  title: "Interactive Luxury Product Showcase",
  description: "Built an AI-assisted luxury watch landing page with scroll-synced canvas animation, cinematic product reveals, and responsive motion storytelling.",
  techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Canvas API"],
  github: "https://github.com/akash-nair-7/animated_watch_website",
  demo: "https://animated-watch-website.vercel.app/",
},
  
];

export const experience = [
  {
    role: "Systems Engineer",
    company: "Tata Consultancy Services (TCS)",
    client: "IBM Cloud",
    duration: "Dec 2024 - Present",
    projects: [
       {
        title: "IBM ICL Cost Efficiency Initiative",
        responsibilities: [
          "Developed Python automation scripts to process operational data from multiple endpoints and transform JSON data into structured CSV reports.",
          "Automated daily multi-region log report generation through VSI job executions for continuous monitoring and analysis.",
          "Identified applications and log streams suitable for lower-tier storage migration, reducing infrastructure and storage costs.",
          "Automated policy and rule-group uploads to IBM Cloud Object Storage (COS) for analytics dashboard integration.",
          "Built Docker images and executed region-specific analytics jobs to streamline data processing workflows.",
          "Owned the Log Analysis module, processing pre-generated Parquet log files across 14 regions by executing analytics jobs, converting them into batched JSON datasets, storing the outputs in IBM Cloud Object Storage (COS), and generating operational reports for infrastructure analysis."
        ],
      },
      {
        title: "IBM Incident Intelligence & Automation",
        responsibilities: [
          "Designed and developed AI-assisted workflows on the IBM Copilot API Platform for deployment risk scoring, incident analysis, troubleshooting automation, runbook intelligence, and log analysis.",
          "Engineered intelligent root cause analysis workflows using historical incidents, problem records, and parent-child incident mapping.",
          "Developed Python automation to extract troubleshooting steps from operational runbooks and generate deduplicated service-level labels.",
          "Built knowledge bases from historical problem data to improve root cause identification and incident troubleshooting efficiency.",
          "Architected an end-to-end log retrieval and analysis solution using REST APIs and optimized workflow execution through ICL node integration.",
          "Integrated AI-powered log analysis workflows into a Slack-based incident automation system using automated cron-triggered executions.",
          "Delivered multiple production enhancements, backend optimizations, and process improvements across enterprise AI solutions.",
        ],
      }
    ],
  },
];

export const socialLinks = [
  { icon: Github, href: "https://github.com/akash-nair-7", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/aakash-nair77", label: "LinkedIn" },
  { icon: Mail, href: "mailto:7akashnair@gmail.com", label: "Email" },
];
