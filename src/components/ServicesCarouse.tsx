"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "@/components/context";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Service } from "@/types/translations";
import Image from "next/image";

export default function ServicesCarousel() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const services = (translations?.services?.items as Service[]) || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      const maxScroll = scrollWidth - clientWidth;
      setIsAtStart(scrollLeft <= 10); // 10px buffer
      setIsAtEnd(scrollLeft >= maxScroll - 10); // 10px buffer
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({
        left: scrollAmount * (isRTL ? -1 : 1),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <section className="w-full py-12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        {translations.services?.title || "Services I Offer"}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {!isAtStart && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 border border-gray-300 dark:border-gray-700 rounded-full bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
              isRTL ? "right-0" : "left-0"
            }`}
          >
            <FaChevronLeft />
          </button>
        )}
        {/* Cards Scroll Container */}
        {services.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No services available at the moment.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth transition-all duration-500 ease-in-out"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="min-w-[280px] max-w-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex-shrink-0 transition-transform transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                {service.image && (
                  <Image
                    height={160}
                    width={160}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-t mb-4"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800  mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Right Arrow */}
        {!isAtEnd && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <FaChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>
    </section>
  );
}
