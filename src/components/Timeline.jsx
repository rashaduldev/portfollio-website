import { useContext } from "react";
import { LayoutContext } from "./context"; // Assuming you have a LayoutContext for managing the RTL state.

export default function Timeline() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;

  const experiences = translations?.experience || {};

  return (
    <div className="w-full py-10 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="relative border-t-2 border-black dark:border-white flex justify-between items-start max-w-6xl mx-auto flex-wrap">
        {Object.entries(experiences).map(([year, exp], index) => (
          <div key={year} className={`relative text-center w-full md:w-1/4 px-2 mb-8 ${isRTL ? "text-right" : ""}`}>
            {/* Circle */}
            <div className="w-5 h-5 bg-white dark:bg-gray-800 border-2 border-black dark:border-white rounded-full mx-auto -mt-3 z-10 relative"></div>

            {/* Content */}
            <div className="mt-6">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{year}</h3>
              <p className="font-semibold text-gray-900 dark:text-white">{exp.title}</p>
              {exp.company && <p className="text-gray-900 dark:text-white">{exp.company}</p>}
              {exp.department && <p className="text-gray-900 dark:text-white">{exp.department}</p>}
              {exp.description && (
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{exp.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
