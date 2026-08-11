export const homepage = {
  hero: {
    badge: "AI Automation • Web Development • SaaS Solutions",
    heading: "Build Smarter. Automate Faster. Scale Without Limits.",
    subheading:
      "Ayeb Solutions helps businesses grow through premium websites, AI automation, custom software, and intelligent digital solutions that save time and increase revenue.",
    primaryCta: { label: "Book Free Consultation", href: "/contact" },
    secondaryCta: { label: "View Our Work", href: "/portfolio" },
    trustIndicators: [
      "Fast Delivery",
      "AI Powered",
      "Secure Development",
      "Long-Term Support",
    ],
  },
  statistics: [
    { value: "06", label: "Core service disciplines" },
    { value: "08", label: "Structured delivery stages" },
    { value: "12", label: "Modern tools in our core stack" },
    { value: "4K", label: "Responsive design coverage" },
  ],
  process: [
    {
      number: "01",
      title: "Discover",
      description:
        "Clarify the business problem, users, constraints, and the outcome worth building toward.",
    },
    {
      number: "02",
      title: "Shape",
      description:
        "Turn the brief into an architecture, experience direction, milestones, and delivery plan.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Design and engineer in reviewable increments with quality checks built into the workflow.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "Verify accessibility, performance, deployment, and the operational handover before release.",
    },
  ],
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "OpenAI",
    "Cloudinary",
    "Docker",
    "Vercel",
    "GitHub",
    "Tailwind CSS",
  ],
  finalCta: {
    heading: "Ready to Turn Your Ideas Into Powerful Digital Solutions?",
    description:
      "Whether you're launching a startup, modernizing an existing business, or exploring AI automation, we're here to help plan and build the right solution.",
    primaryCta: { label: "Book Free Consultation", href: "/contact" },
    secondaryCta: { label: "View Services", href: "/services" },
  },
} as const;
