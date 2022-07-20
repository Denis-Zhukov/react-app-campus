import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ratingConditions } from "../constants";
import { getRatingInfoService, getListOfStudentsService, getPageOfStudentsService, addStudentService, deleteStudentService } from "./../services/ratingService";

export const getRatingInfo = createAsyncThunk(
    "rating/getRatingInfo",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getRatingInfoService();

            if( response.status !== 200 )
                throw new Error("Error getting rating info");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getListOfStudents = createAsyncThunk(
    "rating/getListOfStudents",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getListOfStudentsService();

            if( response.status !== 200 )
                throw new Error("Error getting student's list");

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
            const response = await getPageOfStudentsService(settings);

            if( response.status !== 200 )
                throw new Error("Error getting student's page");

            return {count: response.headers["x-total-count"], data: response.data};
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const addStudent = createAsyncThunk(
    "rating/addStudent",
    async function(student, {rejectWithValue}) {
        try {
            const response = await addStudentService(student);

            if( response.status !== 200 )
                throw new Error("Error adding student");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteStudent = createAsyncThunk(
    "rating/addStudent",
    async function(id, {rejectWithValue}) {
        try {
            const response = await deleteStudentService(id);

            if( response.status !== 201 )
                throw new Error("Error deleting student");

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
        infoStatus: null,
        infoError: null,

        list: [],
        listStatus: null,
        listError: null,

        studentsNumber: 1,

        lastUpdate: null,
        result: null,
        resultStatus: null,
        resultError: null,
    },

    reducers: {
        getRatingList(state) {
            state.list = ratingConditions;
        },
        clearResult(state) {
            state.result = null;
            state.resultStatus = null;
            state.resultError = null;
        },
    },

    extraReducers: {
        [getRatingInfo.pending]: (state) => {
            state.infoStatus = "pending";
            state.infoError = null;
        },
        [getRatingInfo.fulfilled]: (state, action) => {
            state.infoStatus = "fulfilled";
            state.infoError = null;
            state.info = action.payload;
        },
        [getRatingInfo.rejected]: (state, action) => {
            state.infoStatus = "rejected";
            state.infoError = action.payload;
        },


        [getListOfStudents.pending]: (state) => {
            state.listStatus = "pending";
            state.listError = null;
        },
        [getListOfStudents.fulfilled]: (state, action) => {
            state.listStatus = "fulfilled";
            state.listError = null;
            state.list = action.payload;
        },
        [getListOfStudents.rejected]: (state, action) => {
            state.listStatus = "rejected";
            state.listError = action.payload;
        },


        [getPageOfStudents.pending]: (state) => {
            state.listStatus = "pending";
            state.listError = null;
        },
        [getPageOfStudents.fulfilled]: (state, action) => {
            state.listStatus = "fulfilled";
            state.listError = null;

            state.list = action.payload.data;
            state.studentsNumber = action.payload.count;
        },
        [getPageOfStudents.rejected]: (state, action) => {
            state.listStatus = "rejected";
            state.listError = action.payload;
        },


        [addStudent.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [addStudent.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;

            state.lastUpdate = new Date().getTime();
        },
        [addStudent.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;

            state.lastUpdate = new Date().getTime();
        },


        [deleteStudent.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [deleteStudent.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;

            state.lastUpdate = new Date().getTime();
        },
        [deleteStudent.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;

            state.lastUpdate = new Date().getTime();
        },
    },
});

export default ratingSlice.reducer;
export const {getRatingList, clearResult} = ratingSlice.actions;