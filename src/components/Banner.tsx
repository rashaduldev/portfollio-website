"use client";
import { useContext } from "react";
import Image from "next/image";
import { LayoutContext } from "./context";
import { CiLocationArrow1 } from "react-icons/ci";
import {
  IoArrowRedoCircleOutline,
  IoArrowUndoCircleOutline,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
export default function Banner() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?semt=ais_hybrid&w=740')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-sm z-0" />

      <div
        className={`relative z-10 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 px-4 md:px-0 py-16 md:py-24 max-w-7xl mx-auto min-h-[100vh] ${
          isRTL ? "md:flex-row" : ""
        }`}
      >
        {/* Left Content */}
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            {translations?.main?.subtitle || "Hi there, I'm"}
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white mb-4">
            <TypeAnimation
              sequence={[
                translations?.main?.title || "Rashadul Islam",
                1000, // Wait 1 second before switching
                translations?.main?.stack || "Frontend Developer",
                1000, // Wait 1 second before repeating
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 max-w-prose md:min-w-2xl text-justify">
            {translations?.main?.description ||
              "I build interactive and responsive web applications using modern web technologies. Let's turn your ideas into reality."}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <a
              href="https://linkedin.com/in/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition dark:bg-gray-700 dark:text-white dark:hover:bg-blue-500"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://github.com/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-900 text-gray-900 hover:text-white flex items-center justify-center transition dark:bg-gray-700 dark:text-white"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="mailto:rashadul.dev@gmail.com"
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition dark:bg-gray-700 dark:text-white"
            >
              <FaEnvelope size={16} />
            </a>
            <a
              href="https://facebook.com/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center transition dark:bg-gray-700 dark:text-white"
            >
              <FaFacebookF size={16} />
            </a>
          </div>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-4 items-center ${
              isRTL ? "justify-start" : ""
            }`}
          >
            <Button
              className="px-6 py-2.5 text-base font-semibold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition rounded-lg"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                {translations?.main?.leftbutton || "Let's go"}
                <CiLocationArrow1 size={20} />
              </Link>
            </Button>

            <Button
              className="px-6 py-2.5 text-base font-medium border border-gray-400 dark:border-gray-600 hover:bg-gray-800 dark:hover:bg-gray-800 transition rounded-lg"
              asChild
            >
              <Link
                href="/assets/Rashadul.pdf"
                download="Resume of Md Rashadul Islam.pdf"
                className="flex items-center gap-2"
              >
                {translations?.main?.resume || "Download Resume"}
                {isRTL ? (
                  <IoArrowRedoCircleOutline size={20} />
                ) : (
                  <IoArrowUndoCircleOutline size={20} />
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end relative mt-10 md:mt-0 md:me-[90px]">
          {/* Extra Circle 1 */}
          <div
            className={`hidden md:block absolute w-[240px] h-[240px] border-4 border-dotted border-[#14AE89] pointer-events-none animate-circleFloat`}
            style={
              isRTL
                ? { top: "-90px", right: "68px", zIndex: 0 }
                : { top: "-90px", left: "68px", zIndex: 0 }
            }
          />

          {/* Extra Circle 2 */}
          <div
            className={`hidden md:block absolute w-[240px] h-[240px] border-4 border-dotted border-[#CBE333] pointer-events-none animate-circleFloatReverse`}
            style={
              isRTL
                ? { bottom: "-90px", left: "-90px", zIndex: 0 }
                : { bottom: "-90px", right: "-90px", zIndex: 0 }
            }
          />

          <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] z-10">
            {/* Top Half Dotted Border */}
            <div className="absolute top-0 left-0 w-full h-1/2 border-[3px] border-dotted border-[#14AE89] border-b-0 z-0" />

            {/* Bottom Half Dotted Border */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 border-[3px] border-dotted border-orange-300 border-t-0 z-0" />

            {/* Actual Image */}
            <div className="absolute inset-[20px] z-30 overflow-hidden animate-imageFloat">
              <Image
                src="https://res.cloudinary.com/de8yddexc/image/upload/c_crop,ar_1:1/v1750745977/rashadul-removebg-preview_svemu4.png"
                alt="Profile"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
