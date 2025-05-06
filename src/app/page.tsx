"use client"
import { LayoutContext } from '@/components/context'
import { useContext } from 'react'

export default function Main() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }
  const { translations, isRTL } = context

  console.log('Main translations:', translations) // Debug log

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{translations?.main?.title || 'Welcome to My Website'}</h1>
      <p className="text-gray-700 dark:text-gray-200">
        {translations?.main?.description || 'This is the main content area of the website. It supports multiple languages and RTL for Arabic.'}
      </p>
    </main>
  )
}