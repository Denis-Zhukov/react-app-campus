import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRatingInfo = createAsyncThunk(
    "rating/getInfo",
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

export const getListOfStudents = createAsyncThunk(
    "rating/getListOfStudents",
    async function(id, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/users`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const ratingSlice = createSlice({
    name: "rating",
    initialState: {
        info: null,
        statusInfo: null,
        errorInfo: null,

        listOfStudents: [],
        statusList: null,
        errorList: null,
    },

    extraReducers: {
        [getRatingInfo.pending]: (state) => {
            state.statusInfo = "pending";
            state.errorInfo = null;
        },
        [getRatingInfo.fulfilled]: (state, action) => {
            state.statusInfo = "fulfilled";
            state.errorInfo = null;
            state.info = action.payload;
        },
        [getRatingInfo.rejected]: (state, action) => {
            state.statusInfo = "rejected";
            state.errorInfo = action.payload;
        },


        [getListOfStudents.pending]: (state) => {
            state.statusList = "pending";
            state.errorList = null;
        },
        [getListOfStudents.fulfilled]: (state, action) => {
            state.statusList = "fulfilled";
            state.errorList = null;
            state.listOfStudents = action.payload;
        },
        [getListOfStudents.rejected]: (state, action) => {
            state.statusList = "rejected";
            state.errorList = action.payload;
        },
    },
});

export default ratingSlice.reducer;