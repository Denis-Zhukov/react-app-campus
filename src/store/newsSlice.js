import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ratingConditions } from "../constants";

export const getLastNews = createAsyncThunk(
    "news/loadLastNews",
    async function(_, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8`;
            // const url = `http://26.197.127.3:8000/add/`;
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

export const addNews = createAsyncThunk(
    "news/getNewsById",
    async function(news, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/`;
            const response = await axios.post(url, news);

            if( response.status !== 201 )
                throw new Error("Error to add latest news");

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
        open: null,
        status: null,
        error: null,

        resultStatus: null,
        resultError: null,
        result: null,
    },

    reducers: {
        clearResult(state) {
            console.log('here')
            state.result = null;
            state.resultError = null;
            state.resultStatus = null;
        },
    },

    extraReducers: {
        [getLastNews.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getLastNews.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.items = action.payload;
        },
        [getLastNews.rejected]: (state, action) => {
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
            state.open = action.payload;
        },
        [getNewsById.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },

        [addNews.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [addNews.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;
        },
        [addNews.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;
        },
    },
});

export default newsSlice.reducer;
export const {clearResult} = newsSlice.actions;