import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name: "news",
    initialState: [{id: 1, title: "Title"}],
    reducers: {
        setNews(state, action) {
            console.log(action.payload)
            state.length = 0;
            state.push(...action.payload);
        },
    },
});

export default newsSlice.reducer;
export const {setNews} = newsSlice.actions;