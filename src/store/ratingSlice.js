import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRatingInfoService, getListOfStudentsService, getPageOfStudentsService, addStudentService, deleteStudentService } from "./../services/ratingService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";
import { ratingConditions } from "../assets/constants";


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

            if( response.status !== 201 )
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

            return {id, data: response.data};
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
        clearInfo(state) {
            state.info = null;
            state.infoStatus = null;
            state.infoError = null;
        },
        clearList(state) {
            state.list = [];
            state.listStatus = null;
            state.listError = null;
        },
        clearResult(state) {
            state.result = null;
            state.resultStatus = null;
            state.resultError = null;
        },
    },

    extraReducers: {
        [getRatingInfo.pending]: (state) => {
            state.infoStatus = PENDING;
            state.infoError = null;
        },
        [getRatingInfo.fulfilled]: (state, action) => {
            state.infoStatus = FULFILLED;
            state.infoError = null;
            state.info = action.payload;
        },
        [getRatingInfo.rejected]: (state, action) => {
            state.infoStatus = REJECTED;
            state.infoError = action.payload;
        },


        [getListOfStudents.pending]: (state) => {
            state.listStatus = PENDING;
            state.listError = null;
        },
        [getListOfStudents.fulfilled]: (state, action) => {
            state.listStatus = FULFILLED;
            state.listError = null;
            state.list = action.payload;
        },
        [getListOfStudents.rejected]: (state, action) => {
            state.listStatus = REJECTED;
            state.listError = action.payload;
        },


        [getPageOfStudents.pending]: (state) => {
            state.listStatus = PENDING;
            state.listError = null;
        },
        [getPageOfStudents.fulfilled]: (state, action) => {
            state.listStatus = FULFILLED;
            state.listError = null;

            state.list = action.payload.data;
            state.studentsNumber = action.payload.count;
        },
        [getPageOfStudents.rejected]: (state, action) => {
            state.listStatus = REJECTED;
            state.listError = action.payload;
        },


        [addStudent.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [addStudent.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;

            state.lastUpdate = new Date().getTime();
        },
        [addStudent.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;

            state.lastUpdate = new Date().getTime();
        },


        [deleteStudent.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [deleteStudent.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;

            const index = state.list.findIndex(s => s.id === action.payload.id);
            if( index !== -1 ) state.list.splice(index, 1);
            state.lastUpdate = new Date().getTime();
        },
        [deleteStudent.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;

            state.lastUpdate = new Date().getTime();
        },
    },
});

export default ratingSlice.reducer;
export const {getRatingList, clearResult, clearInfo, clearList} = ratingSlice.actions;