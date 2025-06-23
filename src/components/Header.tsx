"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { LayoutContext } from "./context";
import { usePathname } from "next/navigation";

export default function Header() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }
  const { language, setLanguage, translations, isRTL } = context;

  const { theme, setTheme } = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Scroll progress effect
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* 🔵 Scroll Progress Bar (Top) */}
      <div className="fixed top-0 left-0 w-full z-[9999] h-[5px] bg-transparent">
        <div
          className="h-full transition-all duration-100 ease-linear bg-[#3f4144] dark:bg-orange-400"
          style={{
            width: `${scrollProgress}%`,
            opacity: scrollProgress > 0 ? 1 : 0,
          }}
        />
      </div>

      {/* 🔵 Main Header */}
      <header
        className={`w-full fixed top-0 z-50 text-gray-900 dark:text-gray-100 shadow transition-colors duration-300 ${
          scrolled
            ? "bg-white dark:bg-gray-950"
            : "bg-white/10 dark:bg-black/10"
        }`}
      >
        <div className="max-w-7xl md:mx-auto mx-5 py-4 flex items-center justify-between relative">
          <div className={isRTL ? "absolute" : "absolute"}>
            <Link href="/" className="text-xl font-bold">
              {translations?.header?.brand || "My Brand"}
            </Link>
          </div>

          <nav className="flex-grow text-center">
            <div className="hidden md:flex justify-center gap-6">
              <Link
                href="/"
                className={`hover:text-blue-500 ${
                  pathname === "/" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {translations?.header?.home || "Home"}
              </Link>
              <Link
                href="/projects"
                className={`hover:text-blue-500 ${
                  pathname === "/projects" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {translations?.header?.projects || "Projects"}
              </Link>
              <Link
                href="/contact"
                className={`hover:text-blue-500 ${
                  pathname === "/contact" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {translations?.header?.contact || "Contact"}
              </Link>
              <Link
                href="/github"
                className={`hover:text-blue-500 ${
                  pathname === "/github" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {translations?.header?.github || "Github"}
              </Link>
              <Link
                href="/articles"
                className={`hover:text-blue-500 ${
                  pathname === "/articles" ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {translations?.header?.articles || "Articles"}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  🖥 Device Default
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  ☀️ Light Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  🌙 Dark Mode
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Select language"
                >
                  🌐 {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bn")}>
                  বাংলা
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 🔵 Mobile Drawer */}
        <div
          className={`fixed top-0 ${
            isRTL ? "right-0" : "left-0"
          } h-full w-64 bg-gray-200 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isDrawerOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end p-4 border-b border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              className={`hover:text-blue-500 ${
                pathname === "/" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {translations?.header?.home || "Home"}
            </Link>
            <Link
              href="/projects"
              className={`hover:text-blue-500 ${
                pathname === "/projects" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {translations?.header?.projects || "Projects"}
            </Link>
            <Link
              href="/contact"
              className={`hover:text-blue-500 ${
                pathname === "/contact" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {translations?.header?.contact || "Contact"}
            </Link>
          </div>
        </div>

        {/* 🔵 Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </header>
    </>
  );
}
