
# Aakash Nair — Futuristic Portfolio Website

## Overview
A dark-themed, futuristic personal portfolio for **Aakash Nair**, Software Developer at TCS. Built with React + Vite, Tailwind CSS, and Framer Motion. All content lives in a single config file for easy editing.

---

## Design System
- **Background**: Deep black/charcoal (`#0a0a0f`)
- **Accent**: Electric blue (`#00b4ff`) for highlights, borders, buttons, and glows
- **Fonts**: Orbitron (Google Font) for headings, Inter for body text
- **Effects**: Glassmorphism navbar, blue glow borders on hover, smooth scroll

---

## Content Architecture
- A single `src/data/portfolio.ts` config file containing all personal info, education, projects, work experience, and social links — easy to update without touching components

---

## Section 1: Hero (Full Viewport)
- Large "Aakash Nair" in Orbitron font
- Tagline: "Software Developer | Building workflows with no-code/low-code platforms"
- Animated background with subtle floating geometric shapes and a grid overlay
- Mouse-tracking parallax depth effect on background elements
- Two CTA buttons: **View Projects** and **Contact Me**
- Smooth scroll-down indicator arrow at the bottom

## Section 2: Education
- Vertical animated timeline with cards
- Each card shows: Degree, Institution, Duration, Description
- Cards fade in on scroll using Framer Motion
- Placeholder content included, easily editable from config

## Section 3: Projects
- Responsive grid of project cards (3 columns desktop, 1 mobile)
- Each card: Title, description, tech stack badges, GitHub & live demo links
- Hover effect: card lifts up with an electric blue glow border
- Scroll-triggered reveal animations
- Placeholder projects included

## Section 4: Work Experience
- Vertical timeline layout
- Shows: Role (Software Developer), Company (TCS), Duration, bullet-point responsibilities
- Slide-in animation on scroll
- Pre-filled with TCS role, editable from config

## Section 5: Contact
- Centered minimal form: Name, Email, Message fields
- Electric blue glowing focus effect on inputs
- Social icons row: GitHub, LinkedIn, Email
- UI only (no backend wiring)

---

## Navigation
- Sticky top navbar with glassmorphism (blur + translucent background)
- Links: Home, Education, Projects, Experience, Contact
- Active section highlighted with electric blue indicator
- Smooth scroll to each section on click

## Animations (Framer Motion)
- Hero elements: staggered fade-in on load
- Parallax: mouse-position-based movement on hero background shapes
- Sections: scroll-triggered fade/slide-in using Framer Motion's `whileInView`
- Cards: hover lift + glow transitions
- Navbar: background opacity transition on scroll

## Responsive Design
- Desktop-first layout, fully responsive down to mobile
- Hamburger menu on mobile for navbar
- Single-column layouts on smaller screens
