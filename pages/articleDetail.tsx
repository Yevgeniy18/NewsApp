import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getArticle } from "@/redux/articles/articles";

const ArticleDetail = () => {
  const router = useRouter();
  const search = router.query.url;
  const dispatch: AppDispatch = useDispatch();
  const articlesInfo = useSelector((state: RootState) => state.articles);

  const { article, loading } = articlesInfo;

  console.log(article);

  useEffect(() => {
    if (search) {
      dispatch(getArticle(search));
    }
  }, [search]);

  return (
    <main className="flex flex-col justify-center items-center bg-neutral-200 m-auto">
      <div className="flex justify-start">{article.headline}</div>
      <div>
        Hey Detail
        <Link href={"/"}>Back</Link>
      </div>
    </main>
  );
};

export default ArticleDetail;
