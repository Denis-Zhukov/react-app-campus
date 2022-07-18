import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ratingConditions } from "../constants";

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

export const getPageOfStudents = createAsyncThunk(
    "rating/getPageOfStudents",
    async function(settings, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/users?_limit=${settings.limit}&_start=${(settings.page - 1) * settings.limit}`;
            const response = await axios.get(url);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return {count: response.headers["x-total-count"], data: response.data};
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

        list: [],
        statusList: null,
        errorList: null,

        countStudents: 1,
    },

    reducers: {
        getRatingList(state) {
            state.list = ratingConditions;
        },
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
            state.list = action.payload;
        },
        [getListOfStudents.rejected]: (state, action) => {
            state.statusList = "rejected";
            state.errorList = action.payload;
        },


        [getPageOfStudents.pending]: (state) => {
            state.statusList = "pending";
            state.errorList = null;
        },
        [getPageOfStudents.fulfilled]: (state, action) => {
            state.statusList = "fulfilled";
            state.errorList = null;
            state.list = action.payload.data;
            state.countStudents = action.payload.count;
        },
        [getPageOfStudents.rejected]: (state, action) => {
            state.statusList = "rejected";
            state.errorList = action.payload;
        },
    },
});

export default ratingSlice.reducer;
export const {getRatingList} = ratingSlice.actions;