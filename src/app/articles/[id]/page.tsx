import ArticleDetailsClient from "@/components/Articles/ArticlesDetails";

const ArticleDetailsPage = () => {
  return (
    <div>
      <ArticleDetailsClient />
    </div>
  );
};

export default ArticleDetailsPage;
export const metadata = {
  title: "Article Details",
  description: "Detailed view of the selected article.",
};
