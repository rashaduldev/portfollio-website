"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { LayoutContext } from "@/components/context"
import { FaChevronDown } from "react-icons/fa"
import { FAQ } from "@/types/translations"

export default function FaqSection() {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context

    const faqs = translations.faq;

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        {faqs.faqTitle || "Frequently Asked Questions"}
      </h2>
      <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
        {faqs.faqDescription || "Here are some common questions and answers to help you understand my services better."}
      </p>
      <div className="space-y-4">
        {faqs.items.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={activeIndex === index}
            onClick={() => toggle(index)}
            isRTL={isRTL}
          />
        ))}
      </div>
    </section>
  )
}

type FAQItemProps = {
  faq: FAQ
  isOpen: boolean
  onClick: () => void
  isRTL: boolean
}

function FAQItem({ faq, isOpen, onClick, isRTL }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setHeight("0px")
    }
  }, [isOpen])

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={onClick}
        className={`w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-medium text-gray-900 dark:text-white text-left">{faq.question}</span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-gray-600 dark:text-gray-300`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
        style={{ height }}
      >
        <div className="p-4">{faq.answer}</div>
      </div>
    </div>
  )
}