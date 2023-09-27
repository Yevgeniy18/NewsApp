import { NewsArticle } from "@/models/Article";
import Link from "next/link";

interface ArtcileEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { webTitle, fields, apiUrl },
}: ArtcileEntryProps) => {
  return (
    <div className="flex flex-col h-80 rounded bg-gray-200">
      <div className="flex flex-col align-center h-44 bg-orange-600 w-full">
        <img
          className="object-cover h-full"
          src={fields?.thumbnail}
          alt={webTitle}
        />
      </div>

      <h2>{webTitle}</h2>
      <Link href={{ pathname: "/articleDetail", query: { url: apiUrl } }}>
        Details
      </Link>
    </div>
  );
};

export default NewsArticleEntry;
