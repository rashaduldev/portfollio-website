"use client"
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { LayoutContext } from '@/components/context'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import SkillsSection from '@/components/SkillsSection'
import SkillsMarquee from '@/components/SkillsMarquee'
import Timeline from '@/components/Timeline'
import { PortfolioJSON } from '@/types/translations'

// import EducationTimeline from '@/components/Education'

// Default translations to prevent undefined errors
export const defaultTranslations: PortfolioJSON = {
  header: {
    brand: "Rashadul's Portfolio",
    home: "Home",
    projects: "Projects",
    contact: "Contact"
  },
  cookieConsent: {
    title: "We use cookies",
    message: "This website uses cookies to ensure you get the best experience on our website.",
    accept: "Accept",
    reject: "Decline"
  },
  main: {
    subtitle: "Frontend Developer",
    title: "Hello, I'm Md Rashadul Islam",
    description: "A passionate frontend developer crafting modern and responsive web experiences.",
    leftbutton: "Hire Me",
    resume: "Download Resume"
  },
  skills: {
    designTitle: "Design Tools",
    devTitle: "Development Tools",
    tools: "Tools & Platforms",
    git: "Git",
    firebase: "Firebase",
    cloudinary: "Cloudinary",
    jetBrains: "JetBrains IDEs",
    cpanel: "cPanel",
    vs: "Visual Studio",
    photoshop: "Adobe Photoshop",
    figma: "Figma",
    xd: "Adobe XD",
    illustrator: "Adobe Illustrator",
    html: "HTML",
    css: "CSS",
    js: "JavaScript",
    ts: "TypeScript",
    react: "React",
    next: "Next.js",
    vue: "Vue.js",
    tailwind: "Tailwind CSS",
    bootstrap: "Bootstrap",
    node: "Node.js",
    ex: "Express.js",
    wp: "WordPress"
  },
  experience: {
    "2023": {
      title: "Frontend Developer",
      company: "BDOSC",
      department: "IT Department",
      description: "Developed responsive user interfaces using React.js and Tailwind CSS."
    },
    "2022": {
      title: "Web Developer Intern",
      company: "UY Systems Ltd",
      department: "MyGov A2I Team",
      description: "Assisted in digitizing government forms and building reusable templates."
    }
  },
  footer: {
    company: "Company",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    resources: "Resources",
    blog: "Blog",
    help: "Help Center",
    faq: "FAQ",
    follow: "Follow Us",
    newsletter: "Newsletter",
    newsletterDesc: "Subscribe to stay updated on new projects and content.",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscribeSuccess: "Successfully subscribed with email:",
    copyright: `© ${new Date().getFullYear()} Md Rashadul Islam. All rights reserved.`
  }
}


export default function RootLayout({ }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>('en')
  const [translations, setTranslations] = useState<PortfolioJSON>(defaultTranslations)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        setIsLoading(true)
        // Use explicit import paths for reliability
        const translationModule = await import(`@/app/translations/${language}.json`) as { default: PortfolioJSON }
        setTranslations(translationModule.default)

      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        setTranslations(defaultTranslations) // Fallback to default
      } finally {
        setIsLoading(false)
      }
    }
    loadTranslation()
  }, [language])

  const isRTL = language === 'ar'

  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang={language} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutContext.Provider value={{ language, setLanguage, translations, isRTL }}>
          <CookieConsent />
            <Header />
            <Banner/>
            <SkillsSection/>
            <SkillsMarquee />
            <Timeline/>
            {/* <EducationTimeline/> */}
            {/* <main className="flex-grow">{children}</main> */}
            <Footer />
          </LayoutContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}