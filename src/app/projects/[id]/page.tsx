'use client'

import { useContext } from 'react'
import { useParams, notFound } from 'next/navigation'
import { LayoutContext } from '@/components/context'
import Image from 'next/image'

const ProjectDetailsPage = () => {
  const { id } = useParams()

  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }

  const { translations } = context
  const projects = translations.projectsSection?.projects || []

  const project = projects.find((item) => String(item.id) === id)

  if (!project) return notFound()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <p className="text-sm text-gray-500 mb-4">{project.techStack}</p>

      <div className="flex gap-6">
        <div className="relative w-2/3 h-64">
          <Image 
          height={300}
          width={500}
           src={project.desktopimage} alt={project.title} className="rounded-lg w-full h-full object-cover" />
        </div>
        <div className="relative w-1/3 h-64">
          <img src={project.mobileimage} alt={project.title} className="rounded-lg w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
