import { NewsArticle } from "@/models/Article";
import NewsArticleEntry from "./NewsArticleEntry";

interface ArticlesProps {
  articles: NewsArticle[];
}

const ArticlesContainer = ({ articles }: ArticlesProps) => {
  return (
    <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2 grid-rows-3 p-8">
      {articles.map((article) => {
        return <NewsArticleEntry key={article.id} article={article} />;
      })}
    </div>
  );
};

export default ArticlesContainer;
