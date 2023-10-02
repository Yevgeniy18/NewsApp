import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getArticle } from "@/redux/articles/articles";
import Head from "next/head";
import { IoArrowUndoSharp } from "react-icons/io5";
import { parse } from "node-html-parser";
import { GetServerSideProps, GetStaticProps } from "next";
import { ArticleDetail, ArticleProps } from "@/models/Article";

interface ArticleDetailProps {
  articleInfo: ArticleDetail;
}

export const getServerSideProps: GetServerSideProps<
  ArticleDetailProps
> = async (context) => {
  const requestId = context.query.apiUrl;

  const res = await fetch(
    requestId + `?api-key=${process.env.API_KEY}` + "&show-fields=all"
  );
  const response: ArticleDetail = await res.json();

  return {
    props: {
      articleInfo: response,
    },
  };
};

const ArticleDetail = ({ articleInfo }: ArticleDetailProps) => {
  const dispatch: AppDispatch = useDispatch();
  const articlesInfo = useSelector((state: RootState) => state.articles);
  const { article } = articlesInfo;

  console.log(article);

  useEffect(() => {
    dispatch(getArticle(articleInfo));
  }, []);

  return (
    <>
      <Head>
        <title key="title">News App Technical Assignment</title>
      </Head>
      <main className="flex flex-col justify-center items-center m-auto  min-h-screen p-8">
        <div className="bg-neutral-200 p-10 rounded w-3/4 relative">
          <Link className="absolute top-2 left-5 text-2xl" href={"/"}>
            <button>
              <IoArrowUndoSharp />
            </button>
          </Link>
          <h1 className="flex justify-start font-medium text-xl">
            {article.headline}
          </h1>
          <div className=" flex-col my-8 ">
            <div className="rounded overflow-hidden shadow-md w-1/2 float-left mr-4 mb-0">
              <img className="w-full" src={article.thumbnail} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
          </div>

          <Link className="absolute bottom-5 left-5 text-2xl" href={"/"}>
            <button>
              <IoArrowUndoSharp />
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default ArticleDetail;

// export const getServerSideProps:GetServerSideProps = async () => {

//   const router = useRouter();
//   const search = router.query.url;

//   const res = await fetch(search + `?api-key=${process.env.API_KEY}` + "&show-fields=all")
//   const response:ArticleDetail = await res.json()

//   return {
//     props:{articleInfo : response
//     }
//   }

//   // return {
//   //   props : {
//   //     newsInfo : response.content.fields
//   //   }
//   // }

// }
