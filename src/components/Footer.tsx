"use client"
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutContext } from './context'

export default function Footer() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }
  const { translations, isRTL } = context

  console.log('Footer translations:', translations) // Debug log

  const [email, setEmail] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`${translations?.footer?.subscribeSuccess || 'Thank you for subscribing with email:'} ${email}`)
      setEmail('')
    }
  }

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.company || 'Company'}</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-blue-400">{translations?.footer?.about || 'About Us'}</a></li>
            <li><a href="/contact" className="hover:text-blue-400">{translations?.footer?.contact || 'Contact'}</a></li>
            <li><a href="/privacy-policy" className="hover:text-blue-400">{translations?.footer?.privacy || 'Privacy Policy'}</a></li>
            <li><a href="/terms" className="hover:text-blue-400">{translations?.footer?.terms || 'Terms of Service'}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.resources || 'Resources'}</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-blue-400">{translations?.footer?.blog || 'Blog'}</a></li>
            <li><a href="/help" className="hover:text-blue-400">{translations?.footer?.help || 'Help Center'}</a></li>
            <li><a href="/faq" className="hover:text-blue-400">{translations?.footer?.faq || 'FAQ'}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.follow || 'Follow Us'}</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{translations?.footer?.newsletter || 'Subscribe to Our Newsletter'}</h3>
          <p className="text-sm text-gray-400 mb-4">{translations?.footer?.newsletterDesc || 'Get the latest updates and offers.'}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder={translations?.footer?.emailPlaceholder || 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-black w-full sm:w-64"
              required
            />
            <Button className="cursor-pointer" onClick={handleEmailSubmit}>
              <Mail className="w-4 h-4 mr-2" />
              {translations?.footer?.subscribe || 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm">{translations?.footer?.copyright || `© ${new Date().getFullYear()} My Brand. All rights reserved.`}</p>
    </footer>
  )
}