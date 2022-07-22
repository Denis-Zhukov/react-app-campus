import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEventsPostsService, getEventsPostByIdService, deleteEventsPostService, editEventsPostService } from "./../services/eventsService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";

export const getEventsPosts = createAsyncThunk(
    "events/getSportPosts",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getEventsPostsService();

            if( response.status !== 200 )
                throw new Error("Error getting Events posts");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getEventsPostById = createAsyncThunk(
    "events/getEventsPostById",
    async function(id, {rejectWithValue}) {
        try {
            const response = await getEventsPostByIdService(id);

            if( response.status !== 200 )
                throw new Error(`Error getting ${id} Events post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteEventsPost = createAsyncThunk(
    "events/deleteEventsPost",
    async function(id, {rejectWithValue}) {
        try {
            const response = await deleteEventsPostService(id);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${id} Events post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const editEventsPost = createAsyncThunk(
    "events/editEventsPost",
    async function(post, {rejectWithValue}) {
        try {
            const response = await editEventsPostService(post);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${post.id} Events post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const eventsSlice = createSlice({
    name: "events",
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
        [getEventsPosts.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getEventsPosts.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.items = action.payload;
        },
        [getEventsPosts.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [getEventsPostById.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getEventsPostById.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.open = action.payload;
        },
        [getEventsPostById.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [deleteEventsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [deleteEventsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [deleteEventsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },


        [editEventsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [editEventsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [editEventsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },
    },
});

export default eventsSlice.reducer;
export const {clearResult, clearOpen} = eventsSlice.actions;