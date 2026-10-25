# Freelance Portfolio & Client Showcase

A modern, responsive, high-performance portfolio website designed for freelance developers and technical consultants to showcase their expertise and client projects.

## 🚀 Live Demo
- **URL**: [https://sagarsuthar210.github.io/portfolio/](https://sagarsuthar210.github.io/portfolio/)

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism, Ambient Gradients, Dark Aesthetic)
- **Icons**: Lucide React & Custom Brand Vector SVGs (LinkedIn, Notion, GitHub)
- **Deployment**: GitHub Pages (Automated GitHub Actions + `gh-pages`)

---

## 📂 How to Customize Your Info & Projects

All profile and project details are located in a single file:
👉 **`src/data/portfolioData.js`**

### 1. Update Profile Information
Open `src/data/portfolioData.js` and modify the `profileData` object:
- `name`: Your full name
- `role`: Your freelance title / specialization
- `tagline`: Value proposition for clients
- `avatar`: URL to your photo or place an image in `/public/avatar.jpg` and set `avatar: '/avatar.jpg'`
- `email`: Your primary email address (one-click copy & mailto enabled)
- `contact`: Your phone number or WhatsApp (one-click copy enabled)
- `linkedin`: Your LinkedIn profile URL
- `notion`: Your Notion public portfolio or workspace link

### 2. Add or Edit Projects
In the same file, modify the `projectsData` array. Each project item supports:
```javascript
{
  id: "unique-project-slug",
  title: "Project Title",
  category: "Full Stack", // or "AI & Automation", "E-Commerce", "SaaS"
  tagline: "Short 1-2 sentence description shown on the tile.",
  description: "Detailed breakdown of the problem, solution, and architecture.",
  thumbnail: "https://... or /projects/project1.png",
  tags: ["React", "Node.js", "TailwindCSS"],
  features: [
    "Key capability or measurable achievement 1",
    "Key capability or measurable achievement 2"
  ],
  liveUrl: "https://your-live-demo.com",
  githubUrl: "https://github.com/..."
}
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 🚢 Deployment

To update your live website on GitHub Pages:
```bash
npm run deploy
```
This automatically compiles the latest production build and publishes it to GitHub Pages!
