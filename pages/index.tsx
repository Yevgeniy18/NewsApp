import ArticlesContainer from "@/components/ArticlesContainer";
import { NewsArticle, SearchData } from "@/models/Article";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getArticles } from "@/redux/articles/articles";
import Head from "next/head";
import {BsSearch} from "react-icons/bs"

const SearchNews = () => {
  const articlesInfo = useSelector((state: RootState) => state.articles);
  const { articles, loading, error } = articlesInfo;
  const dispatch: AppDispatch = useDispatch();

  const [changeValue, setChangeValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState<SearchData>({
    query: "",
    items: "10",
    sortBy: "relevance",
  });

  useEffect(() => {
    if (changeValue) {
      dispatch(getArticles(searchQuery));
      setChangeValue(false);
    }

    if (changeValue) {
      dispatch(getArticles(searchQuery));
      setChangeValue(false);
    }
  }, [changeValue]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.query !== "") {
      dispatch(getArticles(searchQuery));
    }
  };

  const onChangeItems = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);

    setSearchQuery({
      query: searchQuery.query,
      items: e.currentTarget.value,
      sortBy: searchQuery.sortBy,
    });

    setChangeValue(true);
  };
  const onChangeOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);

    setSearchQuery({
      query: searchQuery.query,
      items: searchQuery.items,
      sortBy: e.currentTarget.value,
    });

    setChangeValue(true);
  };

  return (
    <>
      <Head>
        <title key="title">News App Technical Assignment</title>
      </Head>

      <main className="w-full flex flex-col justify-center items-center pt-4">
        <form
          className="xs:p-1 sm:p-2 md:p-6 p-10 bg-zinc-600 rounded sticky top-5 z-50"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <label htmlFor="searchQuery"></label>

            <div className="relative flex justify-start items-center">
              <BsSearch className="absolute left-2"/>
            <input
              className="text-black px-8 py-2 w-96 outline-none border-none rounded"
              type="text"
              id="searchQuery"
              name="searchQuery"
              placeholder="Type 'Sport' for instance..."
              value={searchQuery?.query}
              onChange={(e) =>
                setSearchQuery({
                  query: e.target.value,
                  items: searchQuery.items,
                  sortBy: searchQuery.sortBy,
                })
              }
            />


            </div>
    
            <button
              className="ml-4 py-2 px-4 bg-slate-200 rounded hover:bg-sky-400 duration-200 font-medium"
              type="submit"
              disabled={loading}
            >
              Find
            </button>
          </div>
          <div className="flex justify-between w-9/12 items-end mt-2  ">
            <div className="flex mr-16 w-40">
              <select
                className=" flex outline-none rounded w-full"
                onChange={onChangeOrderBy}
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex flex-col  justify-start">
              <h3 className="text-slate-100 mb-1">Items on page</h3>
              <select className="outline-none rounded" onChange={onChangeItems}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
            </div>
          </div>
        </form>

        <div className="d-flex flex-column align-items-center mt-8">
          {loading ? (
            <h1>Loading</h1>
          ) : error ? (
            <p>Something went wrong, try again</p>
          ) : (
            articles && <ArticlesContainer articles={articles} />
          )}
        </div>
      </main>
    </>
  );
};

export default SearchNews;
