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
export default function Banner() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;

  return (
    <section className="relative w-full py-10 sm:py-16 md:my-20 overflow-hidden z-10">
      {/* Content */}
      <div
        className={`flex flex-col md:flex-row items-center gap-10 ${
          isRTL ? "md:flex-row" : ""
        }`}
      >
        {/* Left Content */}
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            {translations?.main?.subtitle || "Welcome to My Website"}
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translations?.main?.title || "Welcome to My Website"}
          </h1>
          <p className="text-lg my-6">
            {translations?.main?.description ||
              "Discover top quality content and services tailored for your needs."}
          </p>
          <div className="flex gap-4 items-center mt-14">
            <Button className="cursor-pointer">
              <a
                href="#"
                className={`px-4 py-2 rounded flex items-center ${
                  isRTL ? "flex-row" : "flex-row md:flex-row-reverse"
                } gap-[14px]`}
              >
                {translations?.main?.leftbutton || "Let's go"}
                <CiLocationArrow1 />
              </a>
            </Button>

            <Button className="cursor-pointer">
              <a
                href="/assets/Resume of Md Rashadul Islam.pdf"
                download="Resume of Md Rashadul Islam.pdf"
                className={`flex items-center ${
                  isRTL ? "flex-row" : "flex-row md:flex-row"
                } gap-[14px]`}
              >
                {translations?.main?.resume || "Download Resume"}
                {isRTL ? (
                  <IoArrowRedoCircleOutline />
                ) : (
                  <IoArrowUndoCircleOutline />
                )}
              </a>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-end">
          <div
            className={`group relative overflow-hidden animated-border-wrapper ${
              isRTL ? "rtl" : "ltr"
            }`}
          >
            <Image
              height={550}
              width={390}
              src="https://res.cloudinary.com/de8yddexc/image/upload/v1747461829/resume/banner.png"
              alt="Banner"
              className="transition-transform duration-700 group-hover:scale-105 z-50"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
