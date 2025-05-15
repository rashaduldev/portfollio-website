"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { LayoutContext } from "@/components/context"

export default function NotFound() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 text-center"
    >
      <Image
        src="https://res.cloudinary.com/de8yddexc/image/upload/v1747288109/resume/nw1t97hoccwxtzxrbp2i.svg"
        alt="404 Not Found"
        width={400}
        height={400}
        className="mx-auto"
      />

      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mt-4">
        404 - {translations?.notFound?.title || "Page Not Found"}
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-lg">
        {translations?.notFound?.description || "Sorry, the page you are looking for doesn’t exist or has been moved."}
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
      >
        {translations?.notFound?.backToHome || "Go Back Home"}
      </Link>
    </main>
  )
}
