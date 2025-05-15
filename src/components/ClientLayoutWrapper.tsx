// components/ClientLayoutWrapper.tsx

'use client'
import { useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"
import { PortfolioJSON } from "@/types/translations"
import defaultTranslations from "@/app/translations/defaultTranslations"
import { LayoutContext } from "./context"
import { usePathname } from 'next/navigation'
import NormalRoute from "./NormalRoute/NormalRoute"
import Header from "./Header"
import Footer from "./Footer"
import ScrollToTopWithProgress from "./ScrollToTopWithProgress"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [language, setLanguage] = useState<string>('en')
  const [translations, setTranslations] = useState<PortfolioJSON>(defaultTranslations)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const isRTL = language === 'ar'

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        setIsLoading(true)
        const translationModule = await import(`@/app/translations/${language}.json`) as { default: PortfolioJSON }
        setTranslations(translationModule.default)
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        setTranslations(defaultTranslations)
      } finally {
        setIsLoading(false)
      }
    }
    loadTranslation()
  }, [language])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    }
  }, [isRTL])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LayoutContext.Provider value={{ language, setLanguage, translations, isRTL }}>
        <Header/>
        {/* {isHome ? <div>{children}</div> : <div>{children}</div>} */}
        {/* If you want to show full layout only in home: */}
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {isHome ? <NormalRoute /> : <>{children}</>}
        </main>
        <Footer/>
        <ScrollToTopWithProgress />
      </LayoutContext.Provider>
    </ThemeProvider>
  )
}
