import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getmedia_post, getmedia_postAll } from "../../service/Blog/blog.service";

export const getAllmedia_postThunk = createAsyncThunk("getAllmedia_postThunk", async () => {
  try {
    const resp = await getmedia_postAll();
    return resp.data.media_url;
  } catch (e) {
    console.log(e);
  }
});

export const getmedia_postByIdThunk = createAsyncThunk(
  "getmedia_postByIdThunk",
  async (id:number) => {
    try {
      const resp = await getmedia_post(id);
      return resp.data.media_url;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  listBlog: [],
  BlogOne: null,
};

const img = createSlice({
  name: "img",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllmedia_postThunk.fulfilled, (state, { payload }) => {
      state.listBlog = payload;
    });
    builder.addCase(getmedia_postByIdThunk.fulfilled, (state, { payload }) => {
      state.BlogOne = payload;
    });
  },
});


export const blogReducer = img.reducer;
