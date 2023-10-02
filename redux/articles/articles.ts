import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SearchData,
  NewResponse,
  NewsArticle,
  ArticleDetail,
  ArticleProps,
} from "@/models/Article";

// Actions

export const getArticles = createAsyncThunk(
  "/getArticles",
  async (searchParams: SearchData) => {
    const response = await fetch(
      `https://content.guardianapis.com/search?q=${searchParams.query.trim()}&order-by=${
        searchParams.sortBy
      }&page-size=${searchParams.items}&show-fields=all&api-key=${
        process.env.API_KEY
      }`
    );
    const res = await response.json();
    return res.response.results;
  }
);

export const getArticle = createAsyncThunk("/getArticle", (query: any) => {
  return query.response.content.fields;
});

interface StateProps {
  articles: NewsArticle[];
  article: ArticleProps;
  loading: boolean;
  error: string | null;
  searchRes: boolean;
}

const initialState: StateProps = {
  articles: [],
  article: {
    headline: "",
    webPublicationDate: "",
    body: "",
    thumbnail: "",
  },
  loading: false,
  error: null,
  searchRes: false,
};

// Reducers

const articleSlice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // Get Artciles List
    [getArticles.pending.toString()]: (state) => {
      state.loading = true;
      state.searchRes = false;
    },

    [getArticles.fulfilled.toString()]: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.articles = action.payload;
      state.searchRes = true;
    },

    [getArticles.rejected.toString()]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Get Single article

    [getArticle.pending.toString()]: (state) => {},
    [getArticle.fulfilled.toString()]: (
      state,
      action: PayloadAction<{
        headline: string;
        webPublicationDate: string;
        body: string;
        thumbnail: string;
      }>
    ) => {
      state.loading = false;
      state.article = action.payload;
    },
  },
});

export default articleSlice.reducer;
