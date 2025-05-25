// components/LatestArticles.tsx

import { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LayoutContext } from "./context";

export default function LatestArticles() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const { translations, isRTL } = context;

  const section = translations.latestArticlesSection;
  const sectionTitle = section?.title ?? "Latest Articles";
  const sectionleftTitle = section?.lefttitle ?? "Latest Articles";
  const viewAllLabel = section?.viewAllLabel ?? "View All Articles";
  const articles = section?.articles ?? [];

  return (
    <section className={`my-16 ${isRTL ? "text-right" : "text-left"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        {/* Left Circle and Subheading */}
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-orange-400 mr-2"></span>
          <h2 className="uppercase text-sm font-medium tracking-wide">
            {sectionleftTitle}
          </h2>
        </div>

        {/* Center Title */}
        <div className="text-center flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">{sectionTitle}</h2>
        </div>

        {/* Right Link */}
        <div className="text-right">
          <Link
            href="/articles"
            className="text-sm font-medium text-orange-400 underline dark:text-orange-300"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {(articles ?? []).map((article, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="flex flex-col border border-gray-200 dark:border-gray-700 rounded overflow-hidden"
          >
            <Link href={`/articles/${article.id}`}>
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div
                className={`flex justify-between text-xs ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span>{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
              <Link
                href={`/articles/${article.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-orange-400 dark:text-orange-300 hover:underline"
              >
                {section?.readMoreLabel ?? "Read More"}
                <span className="inline-block transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
