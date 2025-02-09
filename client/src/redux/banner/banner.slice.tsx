import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBanner } from "../../service/banner/banner.service";

export const getAllBannerThunk = createAsyncThunk(
    "getAllBannerThunk",
    async () => {
        try {
            const resp = await getAllBanner();
            return resp.data.content;
        } catch (e) {
            console.log(e);
        }
    }
);

const initialState = {
    BannerAll: []
};

const BannerSlice = createSlice({
    name: "BannerSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllBannerThunk.fulfilled, (state, { payload }) => {
                state.BannerAll = payload;
            })

    },
});

export const { } = BannerSlice.actions;

export const bannerReducer = BannerSlice.reducer;
