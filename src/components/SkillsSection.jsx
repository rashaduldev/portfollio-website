"use client";
import { useContext, useEffect, useState, useRef } from "react";
import { LayoutContext } from "./context";

const designSkills = [
  { key: "photoshop", value: 100 },
  { key: "figma", value: 95 },
  { key: "xd", value: 60 },
  { key: "illustrator", value: 70 },
];
const toolskills = [
  { key: "git", value: 100 },
  { key: "firebase", value: 95 },
  { key: "cloudinary", value: 60 },
  { key: "cpanel", value: 70 },
  { key: "vs", value: 70 },
  { key: "jetBrains", value: 70 },
];

const devSkills = [
  { key: "html", value: 100 },
  { key: "css", value: 95 },
  { key: "js", value: 80 },
  { key: "ts", value: 75 },
  { key: "react", value: 90 },
  { key: "next", value: 80 },
  { key: "vue", value: 40 },
  { key: "tailwind", value: 90 },
  { key: "bootstrap", value: 70 },
  { key: "node", value: 70 },
  { key: "ex", value: 70 },
  { key: "wp", value: 65 },
];

export default function SkillsSection() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;
  const [progress, setProgress] = useState({ design: [], development: [] });

  const designRef = useRef(null);
  const toolsRef = useRef(null);
  const devRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        tools: toolskills.map((s) => s.value),
        design: designSkills.map((s) => s.value),
        development: devSkills.map((s) => s.value),
      });
    }, 300);

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe the sections only if they exist
    if (designRef.current) observer.observe(designRef.current);
    if (toolsRef.current) observer.observe(toolsRef.current);
    if (devRef.current) observer.observe(devRef.current);

    // Cleanup function to unobserve on component unmount
    return () => {
      clearTimeout(timer);
      if (designRef.current) observer.unobserve(designRef.current);
      if (toolsRef.current) observer.unobserve(toolsRef.current);
      if (devRef.current) observer.unobserve(devRef.current);
    };
  }, []);

  const t = translations?.skills || {};

  const renderBar = (value) => {
    const barColor =
      value === 100 ? "bg-green-500 dark:bg-green-400" : "bg-[#3f4144] dark:bg-white";

    return (
      <div className="w-full h-2 bg-white dark:bg-gray-700 rounded overflow-hidden">
        <div
          className={`h-2 transition-all duration-1000 ${barColor}`}
          style={{
            width: `${value}%`,
            float: isRTL ? "right" : "left",
          }}
        />
      </div>
    );
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full py-12 px-4 md:px-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <h3 className="text-4xl font-bold text-end max-w-6xl mx-auto my-2 md:my-10">{t.about || "About me"}</h3>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Design Skills */}
        <div>
        <div ref={designRef} className="skill-section opacity-0 transform translate-y-12 transition-all duration-1000 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.tools || "Tools"}
          </h2>
          {toolskills.map((skill, idx) => (
            <div key={skill.key} className="mb-5">
              <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-200">
                <span>{t[skill.key] || skill.key}</span>
                <span>{progress.design[idx] || 0}%</span>
              </div>
              {renderBar(progress.design[idx] || 0)}
            </div>
          ))}
        </div>

        <div ref={toolsRef} className="skill-section opacity-0 transform translate-y-12 transition-all duration-1000 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.designTitle || "Design Skill"}
          </h2>
          {designSkills.map((skill, idx) => (
            <div key={skill.key} className="mb-5">
              <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-200">
                <span>{t[skill.key] || skill.key}</span>
                <span>{progress.design[idx] || 0}%</span>
              </div>
              {renderBar(progress.design[idx] || 0)}
            </div>
          ))}
        </div>
        </div>

        {/* Development Skills */}
        <div ref={devRef} className="skill-section opacity-0 transform translate-y-12 transition-all duration-1000 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.devTitle || "Development Skill"}
          </h2>
          {devSkills.map((skill, idx) => (
            <div key={skill.key} className="mb-5">
              <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-200">
                <span>{t[skill.key] || skill.key}</span>
                <span>{progress.development[idx] || 0}%</span>
              </div>
              {renderBar(progress.development[idx] || 0)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
