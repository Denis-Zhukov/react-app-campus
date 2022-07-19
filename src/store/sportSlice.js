import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSportPosts = createAsyncThunk(
    "sport/getNewsById",
    async function(id, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts?_limit=5`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getSportById = createAsyncThunk(
    "sport/getSportById",
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

export const deleteSportNews = createAsyncThunk(
    "sport/deleteSportNews",
    async function(id, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/`;
            const response = await axios.post(url, id);

            if( response.status !== 201 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const sportSlice = createSlice({
    name: "sport",
    initialState: {
        items: [],
        open: null,
        status: null,
        error: null,

        result: null,
        resultStatus: null,
        resultError: null,
    },

    reducers: {
        clearResult(state) {
            state.result = null;
            state.resultError = null;
            state.resultStatus = null;
        },
    },

    extraReducers: {
        [getSportPosts.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getSportPosts.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.items = action.payload;
        },
        [getSportPosts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [getSportById.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getSportById.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.open = action.payload;
        },
        [getSportById.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [deleteSportNews.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [deleteSportNews.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;
        },
        [deleteSportNews.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;
        },
    },
});

export default sportSlice.reducer;
export const {clearResult} = sportSlice.actions;