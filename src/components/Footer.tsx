'use client'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutContext } from './context'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { TfiAngleDoubleUp } from 'react-icons/tfi'

export default function Footer() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }

  const { translations, isRTL } = context
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(
        `${translations?.footer?.subscribeSuccess || 'Thank you for subscribing with email:'} ${email}`
      )
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* Combine Company + Resources only on mobile */}
        <div className="block md:hidden">
          <div className="flex flex-row gap-8">
            {/* Company */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{translations?.footer?.company || 'Company'}</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-blue-400">{translations?.footer?.about || 'About Us'}</a></li>
                <li><a href="/contact" className="hover:text-blue-400">{translations?.footer?.contact || 'Contact'}</a></li>
                <li><a href="/privacy-policy" className="hover:text-blue-400">{translations?.footer?.privacy || 'Privacy Policy'}</a></li>
                <li><a href="/terms" className="hover:text-blue-400">{translations?.footer?.terms || 'Terms of Service'}</a></li>
              </ul>
            </div>
            {/* Resources */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{translations?.footer?.resources || 'Resources'}</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="hover:text-blue-400">{translations?.footer?.blog || 'Blog'}</a></li>
                <li><a href="/help" className="hover:text-blue-400">{translations?.footer?.help || 'Help Center'}</a></li>
                <li><a href="/faq" className="hover:text-blue-400">{translations?.footer?.faq || 'FAQ'}</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Company - visible on md+ */}
        <div className="hidden md:block">
          <h3 className="font-semibold text-lg">{translations?.footer?.company || 'Company'}</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-blue-400">{translations?.footer?.about || 'About Us'}</a></li>
            <li><a href="/contact" className="hover:text-blue-400">{translations?.footer?.contact || 'Contact'}</a></li>
            <li><a href="/privacy-policy" className="hover:text-blue-400">{translations?.footer?.privacy || 'Privacy Policy'}</a></li>
            <li><a href="/terms" className="hover:text-blue-400">{translations?.footer?.terms || 'Terms of Service'}</a></li>
          </ul>
        </div>

        {/* Resources - visible on md+ */}
        <div className="hidden md:block">
          <h3 className="font-semibold text-lg">{translations?.footer?.resources || 'Resources'}</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-blue-400">{translations?.footer?.blog || 'Blog'}</a></li>
            <li><a href="/help" className="hover:text-blue-400">{translations?.footer?.help || 'Help Center'}</a></li>
            <li><a href="/faq" className="hover:text-blue-400">{translations?.footer?.faq || 'FAQ'}</a></li>
          </ul>
        </div>

        {/* Follow Us - always visible */}
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.follow || 'Follow Us'}</h3>
          <div className="flex flex-row gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedinIn className="text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.newsletter || 'Subscribe to Our Newsletter'}</h3>
          <p className="text-sm text-gray-400 mb-4">{translations?.footer?.newsletterDesc || 'Get the latest updates and offers.'}</p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder={translations?.footer?.emailPlaceholder || 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-black w-full sm:w-64 border border-black dark:border-white"
              required
            />
            <Button type="submit" className="cursor-pointer">
              <Mail className="w-4 h-4 mr-2" />
              {translations?.footer?.subscribe || 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className={`mt-8 flex justify-end mx-10`}>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm hover:text-blue-500 transition"
        >
          {isRTL ? (
            <>
              {translations?.footer?.scrollTop || 'উপরের দিকে'} <TfiAngleDoubleUp className="text-2xl cursor-pointer" />
            </>
          ) : (
            <>
              <TfiAngleDoubleUp  className="text-2xl cursor-pointer" /> {translations?.footer?.scrollTop || 'Back to Top'}
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-center text-sm">
        {translations?.footer?.copyright ||
          `© ${new Date().getFullYear()} My Brand. All rights reserved.`}
      </p>
    </footer>
  )
}
