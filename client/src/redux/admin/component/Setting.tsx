import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getsetting, getsettingId, updatesettingId } from "../../../service/setting/setting.service";

export const getsettingThunk = createAsyncThunk(
    "getsettingThunk",
    async () => {
        try {
            const resp = await getsetting();
            return resp.data.content;
        } catch (e) {
            console.error(e);
        }
    },
);

export const getsettingIdThunk = createAsyncThunk(
    "getsettingIdThunk",
    async (id: number) => {
        try {
            const resp = await getsettingId(id);
            return resp.data.content;
        } catch (e) {
            console.error(e);
        }
    },
);

export const updatesettingIdThunk = createAsyncThunk(
    "updatesettingIdThunk",
    async ({ id, value }: { id: number; value: any }) => {
        try {
            const resp = await updatesettingId(id, value);
            return { id, value: resp.data };
        } catch (e) {
            console.error("Error updating setting:", e);
            throw e;
        }
    }
);

const initialState = {
    settings: {},
};

const SettingSlice = createSlice({
    name: "SettingSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getsettingThunk.fulfilled, (state, { payload }) => {
                state.settings = payload;
            })
            .addCase(getsettingIdThunk.fulfilled, (state, { payload }) => {
                state.settings[payload.id] = payload.value;
            })
            .addCase(updatesettingIdThunk.fulfilled, (state, { payload }) => {
                state.settings[payload.id] = payload.value;
            });
    },
});

export const settingReducer = SettingSlice.reducer;