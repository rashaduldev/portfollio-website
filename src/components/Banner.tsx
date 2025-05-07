"use client"
import { useContext } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import bannerImage from "../../public/assets/bannerImage.png"
import { LayoutContext } from "./context"
import { Button } from "./ui/button"
import { CiLocationArrow1 } from "react-icons/ci"
import { IoArrowRedoCircleOutline, IoArrowUndoCircleOutline } from "react-icons/io5"

export default function Banner() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider")
  }

  const { translations, isRTL } = context

  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 ${
          isRTL ? "md:flex-row" : ""
        }`}
      >
        {/* Left Content (or Right in RTL) */}
        <motion.div
          className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer flex items-center ${ isRTL ?"flex-row" : "flex-row-reverse" } md:flex-row gap-[14px]`}
          >
            {translations?.main?.leftbutton || "Let's go"}
            <CiLocationArrow1 />
          </motion.button>
          </Button>
          <Button className="cursor-pointer">
            <motion.a
                href="/assets/Resume of Md Rashadul Islam.pdf"
                download="Resume of Md Rashadul Islam.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer flex items-center ${isRTL ? "flex-row" : "flex-row-reverse"} md:flex-row gap-[14px]`}
            >
                {translations?.main?.resume || "Download Resume"}
                {isRTL ? <IoArrowRedoCircleOutline /> : <IoArrowUndoCircleOutline />}
            </motion.a>
            </Button>
          </div>
        </motion.div>

        {/* Right Image (or Left in RTL) */}
        <motion.div
          className="flex-1 overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
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
        </motion.div>
      </div>
    </section>
  )
}
