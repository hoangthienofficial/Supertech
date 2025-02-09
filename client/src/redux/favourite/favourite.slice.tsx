import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavouriteProducts } from "../../service/product/favourite.service";

// Async thunk
export const getFavouriteByIdProductThunk = createAsyncThunk(
  "favourite/getFavouriteByIdProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavouriteProducts();
      return response.data.content; // Dữ liệu trả về
    } catch (error) {
      console.error("Error fetching favourite products:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Initial state
const initialState = {
  listFavouriteProduct: [],
  loading: false,
  error: null,
};

// Slice
const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.listFavouriteProduct = action.payload; // Gán danh sách sản phẩm yêu thích
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteByIdProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavouriteByIdProductThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.listFavouriteProduct = payload || [];
      })
      .addCase(getFavouriteByIdProductThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Error fetching favourite products";
      });
  },
});

// Export actions và reducer
export const { setSearch } = favouriteSlice.actions;
export const FavouriteReducer = favouriteSlice.reducer;
