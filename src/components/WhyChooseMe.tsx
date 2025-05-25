// components/WhyChooseMe.tsx

import { useContext } from "react";
import { motion } from "framer-motion";
import { FeatureItem } from "@/types/translations";
import { LayoutContext } from "./context";
import { Button } from "./ui/button";
import Link from "next/link";

export default function WhyChooseMe() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const section = translations.whyChooseMeSection;
  const sectionTitle = section?.title ?? "Why Choose Me";
  const features: FeatureItem[] = section?.features ?? [];

  return (
    <section className="">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 my-16 ${
          isRTL ? "text-right md:direction-rtl" : "text-left"
        }`}
      >
        {/* Left Label (50%) */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-start items-start space-y-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-600"></span>
            <h2 className="uppercase text-sm font-medium tracking-wide">
              {sectionTitle}
            </h2>
          </div>
          <p className="leading-relaxed max-w-md">
            {/* Optional description text if you want more context */}
            {section.description}
          </p>
        </motion.div>

        {/* Features (50%) */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <div
                className={`flex items-center gap-2 text-sm ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-xs font-mono text-orange-500 dark:text-orange-300">
                  [#]
                </span>
                <h3 className="text-lg font-semibold text-gray-900 ">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-1 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="my-5 text-3xl mx-auto text-orange-400 dark:text-orange-300">
          {section.contactdescription}
        </h2>
        <Button className="cursor-pointer">
          <Link href="/contact">{section.contactbutton}</Link>
        </Button>
      </div>
    </section>
  );
}
