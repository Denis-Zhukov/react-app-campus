import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCampusInfo = createAsyncThunk(
    "campus/getCampusInfo",
    async function(id, {rejectWithValue}) {
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

const campusSlice = createSlice({
    name: "campus",
    initialState: {
        items: [],
        open: null,
        status: null,
        error: null,
    },

    extraReducers: {
        [getCampusInfo.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getCampusInfo.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.open = action.payload;
        },
        [getCampusInfo.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default campusSlice.reducer;