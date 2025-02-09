import { createSlice } from "@reduxjs/toolkit";



export const ToggleSidebar = createSlice({
    name: 'toggleSidebar',
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },
        setTrue: (state) => {
            state.isOpen = true; 
        },
        setFalse: (state) => {
            state.isOpen = false;
        },
    }
});
export const { toggle, setTrue, setFalse } = ToggleSidebar.actions;
export default ToggleSidebar.reducer; 








