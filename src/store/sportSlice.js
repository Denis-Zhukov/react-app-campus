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

const sportSlice = createSlice({
    name: "sport",
    initialState: {
        items: [],
        openSport: null,
        status: null,
        error: null,
    },

    reducers: {},

    extraReducers: {
        [getSportPosts.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getSportPosts.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.length = 0;
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
            state.length = 0;
            state.openSport = action.payload;
        },
        [getSportById.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default sportSlice.reducer;