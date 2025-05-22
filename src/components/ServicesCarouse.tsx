"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { LayoutContext } from "@/components/context"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Service } from "@/types/translations"
import Image from "next/image"

export default function ServicesCarousel() {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context
  const services = translations.services.items as Service[]
  const scrollRef = useRef<HTMLDivElement>(null)

  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const updateScrollButtons = () => {
    const container = scrollRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container

      const maxScroll = scrollWidth - clientWidth
      setIsAtStart(scrollLeft <= 10) // 10px buffer
      setIsAtEnd(scrollLeft >= maxScroll - 10) // 10px buffer
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300
      container.scrollBy({
        left: scrollAmount * (isRTL ? -1 : 1),
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      updateScrollButtons()
      container.addEventListener("scroll", updateScrollButtons)
    }
    return () => {
      if (container) container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [])

  return (
    <section className="w-full px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        {translations.services.title || "Services I Offer"}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {!isAtStart && (
          <button
            onClick={() => scroll("left")}
            className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
              isRTL ? "right-0" : "left-0"
            }`}
          >
            <FaChevronLeft className="text-gray-700 dark:text-gray-300" />
          </button>
        )}

        {/* Cards Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth px-10 transition-all duration-500 ease-in-out"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              className="min-w-[280px] max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg flex-shrink-0 hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out"
            >
              {service.image && (
                <Image
                  height={160}
                  width={160}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <FaChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>
    </section>
  )
}