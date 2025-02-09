import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../../service/search/Search.service";


export const getSearchProductThunk = createAsyncThunk(
  "getSearchProductThunk",
  async (key:string) => {      
    try {
      const resp = await getSearch(key);
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);

const initialState = {
  listSearch: [],
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.listSearch = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProductThunk.fulfilled, (state, { payload }) => {
        state.listSearch = payload;
      });
  },




});

export const { setSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;