"use client"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import bannerImage from "../../public/assets/bannerImage.png"
import { LayoutContext } from "./context"
import { CiLocationArrow1 } from "react-icons/ci"
import { IoArrowRedoCircleOutline, IoArrowUndoCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"

export default function Banner() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context
  const [rotateDeg, setRotateDeg] = useState(0)

  // Handle scroll to update the rotation degree
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 500
      const threshold = 50 // Minimum scroll before rotation starts
      const effectiveScroll = Math.max(0, scrollY - threshold)
  
      const rotateValue = Math.min((effectiveScroll / (maxScroll - threshold)) * 10, 10)
      setRotateDeg(isRTL ? -rotateValue : rotateValue)
    }
  
    // Trigger once on mount to ensure initial scrollY is considered correctly
    handleScroll()
  
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isRTL])  

  return (
    <section className="w-full  py-10 sm:py-16 px-4 sm:px-6">
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 ${
          isRTL ? "md:flex-row" : ""
        }`}
      >
        {/* Left Content (or Right in RTL) */}
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {translations?.main?.subtitle || "Welcome to My Website"}
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {translations?.main?.title || "Welcome to My Website"}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {translations?.main?.description ||
              "Discover top quality content and services tailored for your needs."}
          </p>
          <div className="flex gap-4 items-center">
            <Button className="cursor-pointer">
              <a
                href="#"
                className={`bg-primary text-white dark:text-black px-4 py-2 rounded cursor-pointer flex items-center ${isRTL ? "flex-row" : "flex-row md:flex-row-reverse"} md:flex-row gap-[14px]`}
              >
                {translations?.main?.leftbutton || "Let's go"}
                <CiLocationArrow1 />
              </a>
            </Button>

            <Button className="cursor-pointer">
              <a
                href="/assets/Resume of Md Rashadul Islam.pdf"
                download="Resume of Md Rashadul Islam.pdf"
                className={`cursor-pointer flex items-center ${isRTL ? "flex-row" : "flex-row md:flex-row-reverse"} md:flex-row gap-[14px]`}
              >
                {translations?.main?.resume || "Download Resume"}
                {isRTL ? <IoArrowRedoCircleOutline /> : <IoArrowUndoCircleOutline />}
              </a>
            </Button>
          </div>
        </div>

        {/* Right Image (or Left in RTL) */}
        <div
          className="flex-1 overflow-hidden rounded-lg"
          style={{
            transform: `rotate(${rotateDeg}deg)`,
            transition: "transform 0.5s ease-out", // Smooth transition for rotation
          }}
        >
          <div
            className={`group relative overflow-hidden rounded-lg shadow-lg animated-border-wrapper ${
              isRTL ? "rtl" : "ltr"
            }`}
          >
            <Image
              src={bannerImage}
              alt="Banner"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
