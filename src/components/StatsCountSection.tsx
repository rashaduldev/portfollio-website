'use client'

import { useContext } from 'react'
import { LayoutContext } from './context'
import CountUp from 'react-countup'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'

const StatsSection = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('LayoutContext must be used within a LayoutContext.Provider')
  }

  const { translations, isRTL } = context
  const statsSection = translations.statsSection || {}
  const stats = statsSection.stats || [
    { value: 1037, label: 'Project Completed' },
    { value: 20, label: 'Award Winner' },
    { value: 90, label: 'Client Satisfaction' },
    { value: 15, label: 'Year of Experience' },
  ]

  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section
      ref={ref}
      className="py-16 px-4 md:px-10  transition-colors duration-300"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
          {statsSection.title || 'Achievements'}
        </h2>
      </div>

      <div
        className={clsx(
          'grid gap-6 sm:grid-cols-2 lg:grid-cols-4',
          isRTL ? 'direction-rtl text-right' : 'text-left'
        )}
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105 transition-colors duration-300"
          >
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {inView ? (
                <>
                  <CountUp end={item.value} duration={2} separator="," />
                  {idx !== 2 && '+'} {/* Only exclude + for satisfaction (%) */}
                  {idx === 2 && '%'}
                </>
              ) : (
                '0'
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
