import { NewsArticle } from "@/models/Article";
import Link from "next/link";

interface ArtcileEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { webTitle, fields, apiUrl, webPublicationDate },
}: ArtcileEntryProps) => {

  return (
    <div className="flex flex-col h-80 rounded bg-gray-200 relative overflow-hidden">
      {fields?.thumbnail && (
        <div className="flex flex-col align-center h-44 w-full">
          <img
            className="object-cover h-full"
            src={fields?.thumbnail}
            alt={webTitle}
          />
        </div>
      )}

      <div className="p-3 font-medium text-sm">
        <span className="mb-6">{webPublicationDate}</span>

        <h2 className="mt-4">{webTitle}</h2>
      </div>

      <Link
        className="absolute bottom-2 right-3"
        href={{ pathname: "/articleDetail", query: {apiUrl} }}
      >
        <button className="px-6 py-2 bg-stone-200 rounded hover:bg-orange-300 duration-200 font-medium">
          Details
        </button>
      </Link>
    </div>
  );
};

export default NewsArticleEntry;
