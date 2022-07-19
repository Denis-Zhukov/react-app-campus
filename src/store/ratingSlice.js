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

export const addStudent = createAsyncThunk(
    "rating/addStudent",
    async function(data, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/users`;
            const response = await axios.post(url, data);

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteStudent = createAsyncThunk(
    "rating/addStudent",
    async function({id}, {rejectWithValue}) {
        try {
            const url = `https://jsonplaceholder.typicode.com/users`;
            const response = await axios.post(url, id);

            if( response.status !== 201 )
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

        list: [],
        statusList: null,
        errorList: null,

        countStudents: 1,

        lastUpdate: null,
        statusResult: null,
        errorResult: null,
        result: null,
    },

    reducers: {
        getRatingList(state) {
            state.list = ratingConditions;
        },
        clearResult(state) {
            state.result = null;
            state.errorResult = null;
            state.statusResult = null;
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


        [addStudent.pending]: (state) => {
            state.statusResult = "pending";
            state.errorResult = null;
        },
        [addStudent.fulfilled]: (state, action) => {
            state.statusResult = "fulfilled";
            state.errorResult = null;
            state.result = action.payload;

            state.lastUpdate = new Date().getTime();
        },
        [addStudent.rejected]: (state, action) => {
            state.errorResult = "rejected";
            state.errorList = action.payload;

            state.lastUpdate = new Date().getTime();
        },


        [deleteStudent.pending]: (state) => {
            state.statusResult = "pending";
            state.errorResult = null;
        },
        [deleteStudent.fulfilled]: (state, action) => {
            state.statusResult = "fulfilled";
            state.errorResult = null;

            const indx = state.list.findIndex(s => s.id === action.meta.arg.id);
            state.list.splice(indx, 1);
            state.result = action.payload;

            state.lastUpdate = new Date().getTime();
        },
        [deleteStudent.rejected]: (state, action) => {
            state.errorResult = "rejected";
            state.errorList = action.payload;

            state.lastUpdate = new Date().getTime();
        },
    },
});

export default ratingSlice.reducer;
export const {getRatingList, clearResult} = ratingSlice.actions;