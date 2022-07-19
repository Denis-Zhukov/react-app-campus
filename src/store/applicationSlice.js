import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
        name: "application",
        initialState: {
            showAddingWindow: false,
        },

        reducers: {
            showAddingWindow(state) {
                state.showAddingWindow = true;
            },
            hideAddingWindow(state) {
                state.showAddingWindow = false;
            },
        },
    },
);

export default applicationSlice.reducer;
export const {showAddingWindow, hideAddingWindow} = applicationSlice.actions;