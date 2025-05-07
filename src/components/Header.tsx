"use client"
import { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { LayoutContext } from './context'

export default function Header() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }
  const { language, setLanguage, translations, isRTL } = context

  const { theme, setTheme } = useTheme()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <div className={isRTL ? 'absolute right-4' : 'absolute left-4'}>
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            {translations?.header?.brand || 'My Brand'}
          </Link>
        </div>

        <nav className="flex-grow text-center">
          <div className="hidden md:flex justify-center gap-6 text-gray-700 dark:text-gray-200">
            <Link href="/" className="hover:text-blue-500">{translations?.header?.home || 'Home'}</Link>
            <Link href="/projects" className="hover:text-blue-500">{translations?.header?.projects || 'Projects'}</Link>
            <Link href="/contact" className="hover:text-blue-500">{translations?.header?.contact || 'Contact'}</Link>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setDrawerOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">🌐 {language.toUpperCase()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>বাংলা</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isDrawerOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">{translations?.header?.menu || 'Menu'}</h2>
          <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-col p-4 gap-4 text-gray-700 dark:text-gray-200">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="hover:text-blue-500">
            {translations?.header?.home || 'Home'}
          </Link>
          <Link href="/projects" onClick={() => setDrawerOpen(false)} className="hover:text-blue-500">
            {translations?.header?.projects || 'Projects'}
          </Link>
          <Link href="/contact" onClick={() => setDrawerOpen(false)} className="hover:text-blue-500">
            {translations?.header?.contact || 'Contact'}
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </header>
  )
}
