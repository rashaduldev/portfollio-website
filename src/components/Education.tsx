"use client";

import { useContext } from "react";
import { LayoutContext } from "./context";
import { CiSaveDown1 } from "react-icons/ci";
import { motion } from "framer-motion";

export default function Timeline() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const educations = translations?.education || {};

  const sortedEducations = Object.entries(educations).sort((a, b) => {
    return Number(b[0]) - Number(a[0]);
  });

  return (
    <section className="w-full py-12">
      <h2 className="text-start mb-12 font-bold text-4xl">
        {translations.Educationheading}
      </h2>

      <motion.div
        className="relative border-t-2 border-black dark:border-white flex flex-wrap justify-between items-start gap-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {sortedEducations.map(([year, edu], index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className={`relative text-center w-full md:w-1/4 px-4 transition duration-300 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {/* Icon */}
            <div className="flex justify-center">
              <CiSaveDown1 className="text-4xl hover:scale-110 transition duration-300" />
            </div>

            {/* Card */}
            <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded p-4 text-left min-h-[220px] bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-bold text-sm text-gray-500">{year}</h3>
              <p className="font-semibold text-lg text-black dark:text-white mt-1">
                {edu.title}
              </p>
              {edu.company && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {edu.company}
                </p>
              )}
              {edu.department && (
                <p className="italic text-sm text-orange-600 dark:text-orange-400">
                  {edu.department}
                </p>
              )}
              {edu.description && (
                <p className="text-sm mt-2 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
