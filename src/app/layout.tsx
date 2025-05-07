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
// import EducationTimeline from '@/components/Education'

// Default translations to prevent undefined errors
const defaultTranslations = {
  header: {
    brand: 'My Brand',
    home: 'Home',
    projects: 'Projects',
    contact: 'Contact'
  },
  main: {
    title: 'Welcome to My Website',
    description: 'This is the main content area of the website. It supports multiple languages and RTL for Arabic.'
  },
  footer: {
    company: 'Company',
    about: 'About Us',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    resources: 'Resources',
    blog: 'Blog',
    help: 'Help Center',
    faq: 'FAQ',
    follow: 'Follow Us',
    newsletter: 'Subscribe to Our Newsletter',
    newsletterDesc: 'Get the latest updates and offers.',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    subscribeSuccess: 'Thank you for subscribing with email:',
    copyright: `© ${new Date().getFullYear()} My Brand. All rights reserved.`
  }
}

export default function RootLayout({ }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>('en')
  const [translations, setTranslations] = useState<unknown>(defaultTranslations)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        setIsLoading(true)
        // Use explicit import paths for reliability
        const translationModule = await import(`@/app/translations/${language}.json`)
        console.log(`Loaded translations for ${language}:`, translationModule.default)
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