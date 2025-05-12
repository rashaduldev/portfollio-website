import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LayoutContext } from "./context";

interface Skill {
  key: string;
  value: number;
}

interface ProgressState {
  design: number[];
  tools: number[];
  development: number[];
}
interface SkillTranslations {
  [key: string]: string;
}

interface SkillSectionProps {
  skills: Skill[];
  title: string;
  progress: number[];
  isRTL: boolean;
  renderBar: (value: number) => React.ReactNode;
  translations: SkillTranslations;
}

const designSkills: Skill[] = [
  { key: "photoshop", value: 100 },
  { key: "figma", value: 95 },
  { key: "xd", value: 60 },
  { key: "illustrator", value: 70 },
];

const toolskills: Skill[] = [
  { key: "git", value: 100 },
  { key: "firebase", value: 95 },
  { key: "cloudinary", value: 60 },
  { key: "cpanel", value: 70 },
  { key: "vs", value: 70 },
  { key: "jetBrains", value: 70 },
];

const devSkills: Skill[] = [
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

const SkillSection = ({
  skills,
  title,
  progress,
  renderBar,
  translations,
}: SkillSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
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

  const currentRef = sectionRef.current;
  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
}, []);

  return (
    <div
      ref={sectionRef}
      className="skill-section opacity-0 transform translate-y-12 transition-all duration-1000 ease-in-out"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {title}
      </h2>
      {skills.map((skill, idx) => (
        <div key={skill.key} className="mb-5">
          <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-200">
            <span>{translations[skill.key] || skill.key}</span>
            <span>{progress[idx]}%</span>
          </div>
          {renderBar(progress[idx])}
        </div>
      ))}
    </div>
  );
};

export default function SkillsSection() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;

  const [progress, setProgress] = useState<ProgressState>({
    design: [],
    tools: [],
    development: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        tools: toolskills.map((s) => s.value),
        design: designSkills.map((s) => s.value),
        development: devSkills.map((s) => s.value),
      });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const renderBar = (value: number): React.ReactNode => {
    const barColor =
      value === 100 ? "bg-orange-400 dark:bg-orange-300" : "bg-[#3f4144] dark:bg-white";

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

  // Framer Motion scroll + RTL support
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const movementDistance = 1850;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isRTL ? ["0px", `${movementDistance}px`] : ["0px", `-${movementDistance}px`]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  const xSpring = useSpring(x, { stiffness: 300, damping: 50 });

  useEffect(() => {
    const unsubscriber = xSpring.onChange((latestX) => {
      const numericX = parseInt(latestX, 10);
      if (
        (!isRTL && numericX <= -movementDistance) ||
        (isRTL && numericX >= movementDistance)
      ) {
        xSpring.set(isRTL ? `${movementDistance}px` : `-${movementDistance}px`);
      }
    });

    return () => {
      unsubscriber();
    };
  }, [xSpring, isRTL]);

  return (
    <section
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full py-2 px-4 md:px-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
    >
      <motion.h3
        style={{ x: xSpring, opacity }}
        className="text-4xl font-bold text-end max-w-6xl mx-auto my-2 md:my-10"
      >
        {translations.skills.about}
      </motion.h3>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Column: Tools + Design */}
        <div className="space-y-12">
          <SkillSection
            skills={toolskills}
            title={translations.skills.tools}
            progress={progress.tools}
            isRTL={isRTL}
            renderBar={renderBar}
            translations={translations.skills}
          />
          <SkillSection
            skills={designSkills}
            title={translations.skills.designTitle}
            progress={progress.design}
            isRTL={isRTL}
            renderBar={renderBar}
            translations={translations.skills}
          />
        </div>

        {/* Right Column: Development */}
        <div>
          <SkillSection
            skills={devSkills}
            title={translations.skills.devTitle}
            progress={progress.development}
            isRTL={isRTL}
            renderBar={renderBar}
            translations={translations.skills}
          />
        </div>
      </div>
    </section>
  );
}
