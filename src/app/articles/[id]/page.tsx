"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { LayoutContext } from "@/components/context";

type ArticleItem = {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
};

export default function ArticleDetailsClient() {
  const params = useParams();
  const id = params?.id;

  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "LayoutContext must be used within a LayoutContext.Provider"
    );
  }

  const articles: ArticleItem[] =
    context.translations.latestArticlesSection?.articles || [];

  const [article, setArticle] = useState<ArticleItem | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;

    // Find article by id (convert both to string for safety)
    const found = articles.find((a) => String(a.id) === String(id));
    setArticle(found || null);

    // Load likes from localStorage
    const storedLikes = localStorage.getItem(`likes-${id}`);
    if (storedLikes) setLikes(Number(storedLikes));

    // Load comments from localStorage
    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${id}`) || "[]"
    );
    setComments(storedComments);
  }, [id, articles]);

  const handleLike = () => {
    if (!id) return;
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`likes-${id}`, updatedLikes.toString());
  };

  const handleComment = () => {
    if (!id || newComment.trim() === "") return;
    const updatedComments = [...comments, newComment.trim()];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!article) {
    return (
      <div className="p-4 text-center text-gray-600 dark:text-gray-300">
        Loading article or article not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="text-sm text-gray-500">
        <span>{article.category}</span> • <span>{article.date}</span>
      </div>

      <Image
        src={article.imageUrl}
        alt={article.title}
        width={800}
        height={500}
        className="w-full h-96 object-cover rounded"
      />

      {/* Placeholder content */}
      <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
        This is the article content placeholder.
      </p>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          ❤️ Like ({likes})
        </button>

        {typeof navigator !== "undefined" && navigator.share && (
          <button
            onClick={() =>
              navigator.share({
                title: article.title,
                url: window.location.href,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔗 Share
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">
          Comments ({comments.length})
        </h3>
        <div className="space-y-3">
          {comments.map((cmt, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm"
            >
              {cmt}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
