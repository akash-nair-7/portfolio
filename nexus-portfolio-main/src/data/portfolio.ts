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
    description: "Focused on software engineering, data structures, and web development. Graduated with distinction.",
  },
  {
    degree: "Higher Secondary",
    institution: "Chinmaya Vidyalaya",
    duration: "2017 – 2019",
    description: "Science stream with Computer Science. Achieved top grades in mathematics and programming.",
  },
  {
    degree: "Secondary School",
    institution: "St.Paul's English Medium School",
    duration: "2016 – 2017",
    description: "Built a strong foundation in science and mathematics.",
  },
  
];

export const projects = [
  {
    title: "Workflow Automation Engine",
    description: "Built an end-to-end workflow automation system using low-code tools, reducing manual processes by 60%.",
    techStack: ["Power Automate", "SharePoint", "REST APIs", "JavaScript"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "Employee Portal Dashboard",
    description: "A responsive internal dashboard for employee management with real-time data visualization and reporting.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "Document Management System",
    description: "Automated document approval workflows with version control and audit trails for enterprise clients.",
    techStack: ["Node.js", "MongoDB", "Express", "Power Apps"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "Chatbot Integration Platform",
    description: "Developed a chatbot that integrates with multiple enterprise tools to streamline customer support workflows.",
    techStack: ["Python", "Dialogflow", "REST APIs", "Azure"],
    github: "https://github.com",
    demo: "",
  },
  {
    title: "Inventory Tracker",
    description: "Real-time inventory tracking system with automated alerts and reporting for supply chain management.",
    techStack: ["React", "Firebase", "Material UI", "Node.js"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "CI/CD Pipeline Dashboard",
    description: "Visual dashboard for monitoring CI/CD pipeline status across multiple projects and environments.",
    techStack: ["Vue.js", "Docker", "Jenkins", "PostgreSQL"],
    github: "https://github.com",
    demo: "",
  },
  
];

export const experience = [
  {
    role: "Software Developer",
    company: "Tata Consultancy Services (TCS)",
    duration: "2022 – Present",
    responsibilities: [
      "Designed and developed end-to-end workflows using no-code/low-code platforms including Power Automate and Power Apps",
      "Collaborated with cross-functional teams to automate business processes, improving efficiency by 40%",
      "Built RESTful APIs and integrated third-party services for seamless data flow across applications",
      "Developed responsive front-end interfaces using React and TypeScript",
      "Participated in Agile sprints, code reviews, and continuous improvement initiatives",
    ],
  },
];

export const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aakash@example.com", label: "Email" },
];
