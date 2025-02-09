import { createSlice } from "@reduxjs/toolkit";



export const NofiSlice = createSlice({
    name: 'NofiSlice',
    initialState: {
        isNofi: [],
    },
    reducers: {
        setNofiReducer: (state, { payload }) => {
            state.isNofi = payload;
          },
      
    }
});
export const { setNofiReducer } = NofiSlice.actions;
export const nofiReducer= NofiSlice.reducer; 








