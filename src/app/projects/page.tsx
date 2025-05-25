"use client";

import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { LayoutContext } from "@/components/context";
import { FaGithub, FaInfoCircle, FaLink } from "react-icons/fa";
import Link from "next/link";
import { Project } from "@/types/translations";

type SortOption = "title-asc" | "title-desc" | "endtrac-asc" | "endtrac-desc";

const ProjectsPage = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;
  const projectsSection = translations.projectsSection || {};

  const projects: Project[] = useMemo(() => {
    return (projectsSection.projects || []) as Project[];
  }, [projectsSection.projects]);

  const techStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.techStack) {
        p.techStack.split(",").forEach((t) => set.add(t.trim()));
      }
    });
    return Array.from(set).sort();
  }, [projects]);

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("endtrac-desc");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (selectedTechs.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTechs.every((tech) =>
          p.techStack.toLowerCase().includes(tech.toLowerCase())
        )
      );
    }

    filtered.sort((a, b) => {
      if (sortBy.startsWith("title")) {
        const cmp = a.title.localeCompare(b.title);
        return sortBy === "title-asc" ? cmp : -cmp;
      } else if (sortBy.startsWith("endtrac")) {
        const dateA = new Date(a.endtrac);
        const dateB = new Date(b.endtrac);
        return sortBy === "endtrac-asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    return filtered;
  }, [projects, selectedTechs, sortBy]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-16 px-4 sm:px-6 md:px-10 transition-colors duration-300 bg-gray-50  text-gray-900  min-h-screen"
    >
      {/* Header */}
      <div
        className={clsx(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4",
          isRTL ? "text-right" : "text-left"
        )}
      >
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
          <span className="text-sm text-orange-500 uppercase tracking-wide font-semibold">
            {projectsSection.projectsHeading || "Projects"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold flex-1">
          {projectsSection.trustedProjects || "All Projects"}
        </h1>
      </div>

      {/* Filters and Sorting */}
      <div
        className={clsx(
          "flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4",
          isRTL ? "text-right" : "text-left"
        )}
      >
        <div className="flex flex-wrap gap-2 md:min-w-2xl sm:max-w-xs">
          {techStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={clsx(
                "px-3 py-1 rounded-full border transition-colors",
                selectedTechs.includes(tech)
                  ? "bg-orange-500 text-gray-100 border-orange-500"
                  : "bg-transparent text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-gray-100"
              )}
            >
              {tech}
            </button>
          ))}
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mr-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900  px-3 py-1"
          >
            <option value="endtrac-desc">End Date (Newest)</option>
            <option value="endtrac-asc">End Date (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className={clsx(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          isRTL ? "direction-rtl text-right" : "text-left"
        )}
      >
        {filteredProjects.map((item, idx) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col justify-between h-full overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-6">
              <Link
                href={`/projects/${item.id}`}
                className="text-gray-100 text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"
              >
                <FaInfoCircle />
              </Link>
              <a
                href={item.githubLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-700"
              >
                <FaGithub />
              </a>
              <a
                href={item.liveLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 text-2xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-1000"
              >
                <FaLink />
              </a>
            </div>

            {/* Content */}
            <div className="relative z-0 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-2/3 h-64 overflow-hidden rounded-lg">
                  <Image
                    src={item.desktopimage}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    priority={idx < 3}
                  />
                </div>
                <div className="relative w-full sm:w-1/3 h-56 overflow-hidden rounded-lg">
                  <Image
                    src={item.mobileimage}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900  mt-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {item.description}
              </p>

              <div className="mt-auto flex justify-between items-center text-sm sm:text-base">
                <p className="text-orange-600 font-semibold">{item.endtrac}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {item.techStack}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No projects found for selected filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
