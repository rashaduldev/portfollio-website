"use client";

import { useContext } from "react";
import { LayoutContext } from "./context";
import { motion } from "framer-motion";

export default function WorkExperience() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const experiences = translations?.experience || {};

  const sortedExperiences = Object.entries(experiences).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  return (
    <div className="w-full py-12 overflow-x-hidden">
      <h2 className="text-center mb-10 font-bold text-4xl">
        {translations.experienceHeading}
      </h2>

      <div className="relative overflow-x-hidden">
        {/* Vertical Line */}
        <div
          className={`absolute border rounded-2xl bg-gray-400 dark:bg-gray-600 ${
            isRTL
              ? "md:left-auto md:right-1/2 right-0"
              : "md:right-auto md:left-1/2 left-0"
          } transform md:-translate-x-1/2 h-full w-[2px] z-0`}
        />

        <div className="flex flex-col space-y-16 relative z-10">
          {sortedExperiences.map(([year, exp], index) => {
            const isLeft = index % 2 === 0;
            const alignLeft = (!isRTL && isLeft) || (isRTL && !isLeft);
            const animationDirection = alignLeft ? -40 : 40; // ✅ less offset

            return (
              <div
                key={year}
                className={`flex flex-col items-center md:flex-row md:items-start ${
                  alignLeft ? "md:justify-start" : "md:justify-end"
                } relative`}
              >
                {/* Desktop Circle */}
                <div className="absolute md:block hidden left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full top-2 z-10" />

                {/* Mobile Circle */}
                <div
                  className={`md:hidden block absolute ${
                    isRTL ? "right-[-2px]" : "left-[-2px]"
                  } top-2 w-4 h-4 border-2 border-gray-600 dark:border-gray-200 rounded-full z-10`}
                />

                {/* Animated Timeline Card */}
                <div className="w-full md:w-1/2 px-4 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, x: animationDirection }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className={`relative w-full ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="rounded p-6 border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300 group hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{exp.title}</p>
                        <i className="text-md">{year}</i>
                      </div>
                      {exp.company && <p>{exp.company}</p>}
                      {exp.department && <p>{exp.department}</p>}
                      {exp.description && (
                        <p className="text-sm mt-1">{exp.description}</p>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
