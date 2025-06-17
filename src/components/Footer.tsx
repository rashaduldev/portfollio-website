"use client";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { LayoutContext } from "./context";
import { FaDev, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations } = context;
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(
        `${
          translations?.footer?.subscribeSuccess ||
          "Thank you for subscribing with email:"
        } ${email}`
      );
      setEmail("");
    }
  };
  return (
    <footer className="w-full py-12 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 border-t-2">
      <div className="max-w-7xl md:mx-auto mx-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Combine Company + Resources only on mobile */}
        <div className="block md:hidden">
          <div className="flex flex-row gap-8">
            {/* Company */}
            <div className="flex-1">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 text-lg">
                {translations?.footer?.company || "Rashadul"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-blue-400">
                    {translations?.footer?.about || "About Me"}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400">
                    {translations?.footer?.contact || "Contact"}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-blue-400">
                    {translations?.footer?.privacy || "Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-400">
                    {translations?.footer?.terms || "Terms of Service"}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Resources */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {translations?.footer?.resources || "Resources"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/articles" className="hover:text-blue-400">
                    {translations?.footer?.articles || "Articles"}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400">
                    {translations?.footer?.help || "Help Center"}
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-blue-400">
                    {translations?.footer?.faq || "FAQ"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Company - visible on md+ */}
        <div className="hidden md:block">
          <h3 className="font-semibold text-lg">
            {translations?.footer?.company || "Company"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-blue-400">
                {translations?.footer?.about || "About Us"}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                {translations?.footer?.contact || "Contact"}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-blue-400">
                {translations?.footer?.privacy || "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400">
                {translations?.footer?.terms || "Terms of Service"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources - visible on md+ */}
        <div className="hidden md:block">
          <h3 className="font-semibold text-lg">
            {translations?.footer?.resources || "Resources"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/articles" className="hover:text-blue-400">
                {translations?.footer?.articles || "Articles"}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                {translations?.footer?.help || "Help Center"}
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-blue-400">
                {translations?.footer?.faq || "FAQ"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us - always visible */}
        <div>
          <h3 className="font-semibold text-lg">
            {translations?.footer?.follow || "Follow Us"}
          </h3>
          <div className="flex flex-row gap-4 mt-2">
            <Link
              href="https://www.facebook.com/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF className="text-xl" />
            </Link>
            <Link
              href="https://github.com/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaGithub className="text-xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedinIn className="text-xl" />
            </Link>
            <Link
              href="https://app.daily.dev/rashaduldev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaDev className="text-xl" />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg">
            {translations?.footer?.newsletter || "Subscribe to My Newsletter"}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {translations?.footer?.newsletterDesc ||
              "Get the latest updates and offers."}
          </p>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="email"
              placeholder={
                translations?.footer?.emailPlaceholder || "Enter your email"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-black w-full sm:w-64 border border-black dark:border-white"
              required
            />
            <Button type="submit" className="cursor-pointer">
              <Mail className="w-4 h-4 mr-2" />
              {translations?.footer?.subscribe || "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
      <p className="mt-4 text-center text-sm">
        {translations?.footer?.copyright ||
          `© ${new Date().getFullYear()} My Brand. All rights reserved.`}
      </p>
    </footer>
  );
}
