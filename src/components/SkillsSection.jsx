"use client";
import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        tools: toolskills.map((s) => s.value),
        design: designSkills.map((s) => s.value),
        development: devSkills.map((s) => s.value),
      });
    }, 300);
    return () => clearTimeout(timer);
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
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Design Skills */}
        <div>
        <div>
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
        <div>
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
        <div>
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
