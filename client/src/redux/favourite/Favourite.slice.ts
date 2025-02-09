import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  createFavouriteProduct, getFavouriteProducts } from "../../service/product/favourite.service";


export const getFavouriteProductThunk = createAsyncThunk(
  "getFavouriteProductThunk",
  async () => {      
    try {
      const resp = await getFavouriteProducts();
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);
export const createFavouriteProductThunk = createAsyncThunk(
  "createFavouriteProductThunk",
  async (data, { dispatch }) => {
    try {
      await createFavouriteProduct(data);
      dispatch(getFavouriteProductThunk()); // Không cần await
      return "success";
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
);

const initialState = {
  listFavourite: [],
};

const favouriteSlice = createSlice({
  name: "favouriteSlice",
  initialState,
  reducers: {
    setFavourite: (state, { payload }) => {
      state.listFavourite = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteProductThunk.fulfilled, (state, { payload }) => {
        state.listFavourite = payload;
      });
   
  },




});

export const { setFavourite } = favouriteSlice.actions;

export const FavouriteReducer = favouriteSlice.reducer;