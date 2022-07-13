import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadLastNews = createAsyncThunk(
    "news/loadLastNews",
    async function(_, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getNewsById = createAsyncThunk(
    "news/getNewsById",
    async function(id, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const newsSlice = createSlice({
    name: "news",
    initialState: {
        items: [],
        openNews: null,
        status: null,
        error: null,
    },

    reducers: {
        setNews(state, action) {
            state.length = 0;
            state.push(...action.payload);
        },
    },

    extraReducers: {
        [loadLastNews.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [loadLastNews.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.length = 0;
            state.items = action.payload;
        },
        [loadLastNews.rejected]: (state, action) => {
            console.log("error");
            state.status = "rejected";
            state.error = action.payload;
        },



        [getNewsById.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getNewsById.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.openNews = action.payload;
        },
        [getNewsById.rejected]: (state, action) => {
            console.log("error");
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default newsSlice.reducer;
export const {setNews} = newsSlice.actions;