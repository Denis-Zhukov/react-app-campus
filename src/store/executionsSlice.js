import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExecutionsPostsService, getExecutionsPostByIdService, deleteExecutionsPostService, editExecutionsPostService } from "./../services/executionsService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";

export const getExecutionsPosts = createAsyncThunk(
    "executions/getSportPosts",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getExecutionsPostsService();

            if( response.status !== 200 )
                throw new Error("Error getting Executions posts");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getExecutionsPostById = createAsyncThunk(
    "executions/getExecutionsPostById",
    async function(id, {rejectWithValue}) {
        try {
            const response = await getExecutionsPostByIdService(id);

            if( response.status !== 200 )
                throw new Error(`Error getting ${id} Executions post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteExecutionsPost = createAsyncThunk(
    "executions/deleteExecutionsPost",
    async function(id, {rejectWithValue}) {
        try {
            const response = await deleteExecutionsPostService(id);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${id} Executions post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const editExecutionsPost = createAsyncThunk(
    "executions/editExecutionsPost",
    async function(post, {rejectWithValue}) {
        try {
            const response = await editExecutionsPostService(post);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${post.id} Executions post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const executionsSlice = createSlice({
    name: "executions",
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

        clearOpen(state) {
            state.open = null;
            state.status = null;
            state.error = null;
        },
    },

    extraReducers: {
        [getExecutionsPosts.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getExecutionsPosts.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.items = action.payload;
        },
        [getExecutionsPosts.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [getExecutionsPostById.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getExecutionsPostById.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.open = action.payload;
        },
        [getExecutionsPostById.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [deleteExecutionsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [deleteExecutionsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [deleteExecutionsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },


        [editExecutionsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [editExecutionsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [editExecutionsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },
    },
});

export default executionsSlice.reducer;
export const {clearResult, clearOpen} = executionsSlice.actions;