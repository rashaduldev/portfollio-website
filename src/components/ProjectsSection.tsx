'use client'

import { useContext } from 'react'
import { LayoutContext } from './context'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { FaInfoCircle, FaGithub, FaLink } from 'react-icons/fa'

const ProjectsSection = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }

  const { translations, isRTL } = context
  const projectsSection = translations.projectsSection || {}
  const projects = projectsSection.projects || []

  return (
    <section className="py-16 px-4 sm:px-6 md:px-10 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        {/* Left Circle */}
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
          <span className="text-sm text-orange-500 uppercase tracking-wide font-semibold">
            {projectsSection.projectsHeading || 'Projects'}
          </span>
        </div>

        {/* Center Heading */}
        <div className="text-center flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {projectsSection.trustedProjects || 'Latest Projects'}
          </h2>
        </div>

        {/* Right Button */}
        <div className="text-right">
          <Link
            href="/projects"
            className="text-sm text-orange-400 dark:text-orange-300 underline rounded-md transition"
          >
            {projectsSection.viewallproject || 'View All Projects'}
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
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all hover:scale-105 hover:border-2 hover:border-[#3f4144] hover:shadow-lg min-h-[420px] flex flex-col"
          >
            {/* Diagonal Background Image */}
            <div className="absolute -bottom-10 -left-10 w-[150%] h-[150%] transform rotate-12 opacity-10 z-0">
              <Image
                src={item.desktopimage}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Hover Overlay with Animated Icons */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-50 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-6">
              <Link
                href={`/projects/${item.id}`}
                className="text-white text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"
              >
                <FaInfoCircle />
              </Link>
              <a
                href={item.githubLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-700"
              >
                <FaGithub />
              </a>
              <a
                href={item.liveLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-1000"
              >
                <FaLink />
              </a>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col justify-between h-full relative z-20">
              <div className="text-gray-700 dark:text-gray-300 mb-4">
                {/* Status Badge */}
               {item.status && (
                <span
                  className={clsx(
                    'absolute top-5 transform z-30 px-3 py-1 text-xs font-semibold rounded-full',
                    isRTL ? 'left-2 -rotate-[30deg]' : 'right-2 rotate-[30deg]',
                    item.status === 'Latest'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-white'
                  )}
                >
                  {item.status}
                </span>
              )}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-orange-600 font-semibold">{item.endtrac}</p>
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