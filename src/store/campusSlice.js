import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSettlingCampusInfo = createAsyncThunk(
    "campus/getSettlingCampusInfo",
    async function(_, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/1`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getCampusImages = createAsyncThunk(
    "campus/getCampusImages",
    async function(_, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/photos?_limit=9`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getCampusInfo = createAsyncThunk(
    "campus/getCampusInfo",
    async function(id, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/comments/${id}`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);


const campusSlice = createSlice({
    name: "campus",
    initialState: {
        items: [],
        open: null,
        status: null,
        error: null,

        images: [],
        statusImages: null,
        errorImages: null,

        campusInfo: null,
        statusInfo: null,
        errorInfo: null,
    },

    extraReducers: {
        [getSettlingCampusInfo.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getSettlingCampusInfo.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.open = action.payload;
        },
        [getSettlingCampusInfo.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [getCampusImages.pending]: (state) => {
            state.statusImages = "pending";
            state.errorImages = null;
        },
        [getCampusImages.fulfilled]: (state, action) => {
            state.statusImages = "fulfilled";
            state.errorImages = null;
            state.images = action.payload;
        },
        [getCampusImages.rejected]: (state, action) => {
            state.statusImages = "rejected";
            state.errorImages = action.payload;
        },


        [getCampusInfo.pending]: (state) => {
            state.statusInfo = "pending";
            state.errorInfo = null;
        },
        [getCampusInfo.fulfilled]: (state, action) => {
            state.statusInfo = "fulfilled";
            state.errorInfo = null;
            state.campusInfo = action.payload;
        },
        [getCampusInfo.rejected]: (state, action) => {
            state.statusInfo = "rejected";
            state.errorInfo = action.payload;
        },
    },
});

export default campusSlice.reducer;