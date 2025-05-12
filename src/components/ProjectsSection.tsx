'use client'

import { useContext } from 'react'
import { LayoutContext } from './context'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'

const ProjectsSection = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }

  const { translations, isRTL } = context
  const projectsSection = translations.projectsSection || {}
  const projects = projectsSection.projects || []

  return (
    <section className="py-16 px-4 md:px-10  transition-colors duration-300">
      <div className="flex items-center justify-between mb-10">
      {/* Left Circle */}
      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
        <span className="text-sm text-orange-500 uppercase tracking-wide font-semibold block">
          {projectsSection.projectsHeading || 'Projects'}
        </span>
      </div>

      {/* Center Heading */}
      <div className="text-center flex-1">
        <h2 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
          {projectsSection.trustedProjects || 'Latest projects'}
        </h2>
      </div>

      {/* Right Button */}
      <div className="text-right">
        <Link
          href="/projects"
          className="text-sm text-orange-400 dark:text-orange-300 underline rounded-md transition"
        >
          {projectsSection.viewallproject || 'View All projects'}
        </Link>
      </div>
    </div>
      <div
        className={clsx(
          'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
          isRTL ? 'direction-rtl text-right' : 'text-left'
        )}
      >
        {projects.slice(0, 6).map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col justify-between h-full transition-all hover:scale-105 hover:border-2 hover:border-[#3f4144] hover:shadow-lg"
          >
            <div className="text-gray-700 dark:text-gray-300 mb-4">
             <div className='flex items-center gap-1'>
               <Image
                src={item.desktopimage}
                alt={item.title}
                width={320}
                height={350}
                className="rounded-lg mb-4"
              />
               <Image
                src={item.mobileimage}
                alt={item.title}
                width={150}
                height={250}
                className="rounded-lg mb-4"
              />
             </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
            <div className="mt-auto flex justify-between items-center">
              <p className="text-orange-600 font-semibold">
                {item.endtrac}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.techStack}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
