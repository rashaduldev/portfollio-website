"use client";
import React, { JSX, useContext } from "react";
import {
  FaGitAlt, FaFigma, FaHtml5, FaCss3Alt,
  FaReact, FaNodeJs, FaBootstrap, FaVuejs, FaWordpress
} from "react-icons/fa";
import {
  SiFirebase, SiJavascript, SiTypescript, SiNextdotjs,
  SiExpress, SiTailwindcss, SiCloudinary, SiCpanel,
  SiJetbrains, SiAdobephotoshop, SiAdobeillustrator, SiAdobexd
} from "react-icons/si";
import Marquee from "react-fast-marquee";
import { LayoutContext } from "./context";

const SkillsMarquee = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;
  const skills = translations.skills;

  const tools = [
    { name: skills.git, icon: <FaGitAlt /> },
    { name: skills.firebase, icon: <SiFirebase /> },
    { name: skills.cloudinary, icon: <SiCloudinary /> },
    { name: skills.jetBrains, icon: <SiJetbrains /> },
    { name: skills.cpanel, icon: <SiCpanel /> },
    { name: skills.vs, icon: <SiCpanel /> }, // Consider changing icon if different from cPanel
  ];

  const design = [
    { name: skills.photoshop, icon: <SiAdobephotoshop /> },
    { name: skills.figma, icon: <FaFigma /> },
    { name: skills.xd, icon: <SiAdobexd /> },
    { name: skills.illustrator, icon: <SiAdobeillustrator /> },
  ];

  const development = [
    { name: skills.html, icon: <FaHtml5 /> },
    { name: skills.css, icon: <FaCss3Alt /> },
    { name: skills.js, icon: <SiJavascript /> },
    { name: skills.ts, icon: <SiTypescript /> },
    { name: skills.react, icon: <FaReact /> },
    { name: skills.next, icon: <SiNextdotjs /> },
    { name: skills.vue, icon: <FaVuejs /> },
    { name: skills.tailwind, icon: <SiTailwindcss /> },
    { name: skills.bootstrap, icon: <FaBootstrap /> },
    { name: skills.node, icon: <FaNodeJs /> },
    { name: skills.ex, icon: <SiExpress /> },
    { name: skills.wp, icon: <FaWordpress /> },
  ];

  const renderLine = (
    title: string,
    items: { name: string; icon: JSX.Element }[],
    scrollDirection: "left" | "right"
  ) => (
    <div className="my-6 overflow-hidden">
      <Marquee direction={scrollDirection} gradient={false} speed={40}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 sm:px-6 text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap"
          >
            <span className="text-lg sm:text-xl md:text-2xl">{item.icon}</span>
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );

  const dir = isRTL ? "right" : "left";
  const oppositeDir = isRTL ? "left" : "right";

  return (
    <div className="w-full py-8  text-gray-800 dark:text-white">
      {renderLine(skills.tools, tools, dir)}           {/* 1st line */}
      {renderLine(skills.designTitle, design, oppositeDir)}  {/* 2nd line */}
      {renderLine(skills.devTitle, development, dir)}  {/* 3rd line */}
    </div>
  );
};

export default SkillsMarquee;
