"use client"
import { useContext } from "react"
import { LayoutContext } from "./context"

export default function WorkExperience() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context
  const experiences = translations?.experience || {}

  // Sort years in descending order
  const sortedExperiences = Object.entries(experiences).sort((a, b) => {
    return Number(b[0]) - Number(a[0]) // descending by year
  })

  return (
    <div className="w-full py-12 px-4 ">
      <h2 className="mx-auto text-center mb-10 font-bold text-4xl">{translations.experienceHeading}</h2>
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className={`absolute ${isRTL ? 'md:left-auto md:right-1/2 right-0' : 'md:right-auto md:left-1/2 left-0'} transform md:-translate-x-1/2 h-full w-1 bg-black dark:bg-white z-0`} />

        <div className="flex flex-col space-y-16 relative z-10">
          {sortedExperiences.map(([year, exp], index) => {
            const isLeft = index % 2 === 0
            const alignLeft = (!isRTL && isLeft) || (isRTL && !isLeft)

            return (
              <div
                key={year}
                className={`flex flex-col items-center md:flex-row md:items-start ${
                  alignLeft ? "md:justify-start" : "md:justify-end"
                } relative`}
              >
                {/* Desktop Circle (on center line) */}
                <div className="absolute md:block hidden left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-full top-2 z-10" />

                {/* Mobile Circle (always same side as line) */}
                <div className={`md:hidden block absolute ${isRTL ? "right-[-10px]" : "left-[-10px]"} top-2 w-5 h-5 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-full z-10`} />

                {/* Timeline Card */}
                <div className={`relative w-full md:w-1/2 px-4 ${isRTL ? "text-right" : "text-left"}`}>
                  <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent hover:border-black dark:hover:border-white transition-all duration-300 group hover:shadow-lg">
                    <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{exp.title}</p>
                    </div>
                    <i className="text-md text-gray-900 dark:text-white">{year}</i>
                    </div>
                    {exp.company && <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>}
                    {exp.department && <p className="text-gray-700 dark:text-gray-300">{exp.department}</p>}
                    {exp.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
