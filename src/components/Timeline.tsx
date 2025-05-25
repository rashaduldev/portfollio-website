import { useContext } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { LayoutContext } from "./context";

export default function Timeline() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const educations = translations?.education || {};

  // Sort years in descending order
  const sortedEducations = Object.entries(educations).sort((a, b) => {
    return Number(b[0]) - Number(a[0]);
  });

  return (
    <div className="w-full py-10">
      <h2 className="text-start mb-10 font-bold text-4xl">
        {translations.Educationheading}
      </h2>
      <div className="relative border-t-2 border-black dark:border-white flex justify-between items-start flex-wrap">
        {sortedEducations.map(([year, edu]) => (
          <div
            key={year}
            className={`relative text-center w-full md:w-1/4 px-2 mb-10 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {/* Icon in center */}
            <div className="flex justify-center">
              <CiSaveDown1 className="text-3xl" />
            </div>

            {/* Content */}
            <div className="mt-6">
              <h3 className="font-bold text-sm">{year}</h3>
              <p className="font-semibold">{edu.title}</p>
              {edu.company && <p>{edu.company}</p>}
              {edu.department && <p>{edu.department}</p>}
              {edu.description && (
                <p className="text-sm mt-1">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
