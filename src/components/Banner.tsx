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

export default function Banner() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div
        className={`flex flex-col-reverse md:flex-row items-center gap-12 ${
          isRTL ? "md:flex-row" : ""
        }`}
      >
        {/* Left Content */}
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">
            {translations?.main?.subtitle || "Welcome to My Website"}
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            {translations?.main?.title || "Welcome to My Website"}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 text-justify">
            {translations?.main?.description ||
              "Discover top quality content and services tailored for your needs."}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-4 items-center ${
              isRTL ? "justify-start" : ""
            }`}
          >
            <Button
              className="px-6 py-3 text-base font-medium transition rounded-lg"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                {translations?.main?.leftbutton || "Let's go"}
                <CiLocationArrow1 size={20} />
              </Link>
            </Button>

            <Button
              className="px-6 py-3 text-base font-medium transition rounded-lg"
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
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px]">
            {/* Spinning Gradient Border Ring */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-full h-full rounded-full animate-spin-slow border-[6px] border-transparent bg-gradient-to-tr from-[#d3e90c96] via-[#ffffff83] to-[#ffffff70] bg-[length:200%_200%] bg-clip-border" />
            </div>

            {/* Inner Circle Background */}
            <div className="absolute inset-[8px] rounded-full bg-gray-100 dark:bg-gray-800 z-0 shadow-md" />

            {/* Actual Image */}
            <div className="absolute inset-[16px] z-10 rounded-full overflow-hidden">
              <Image
                src="https://res.cloudinary.com/de8yddexc/image/upload/v1747461829/resume/banner.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
