import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSportsPostsService, getSportsPostByIdService, deleteSportsPostService, editSportsPostService } from "./../services/sportsService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";

export const getSportsPosts = createAsyncThunk(
    "sport/getSportPosts",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getSportsPostsService();

            if( response.status !== 200 )
                throw new Error("Error getting sports posts");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getSportsPostById = createAsyncThunk(
    "sport/getSportsPostById",
    async function(id, {rejectWithValue}) {
        try {
            const response = await getSportsPostByIdService(id);

            if( response.status !== 200 )
                throw new Error(`Error getting ${id} sports post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteSportsPost = createAsyncThunk(
    "sport/deleteSportsPost",
    async function(id, {rejectWithValue}) {
        try {
            const response = await deleteSportsPostService(id);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${id} sports post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const editSportsPost = createAsyncThunk(
    "sport/editSportsPost",
    async function(post, {rejectWithValue}) {
        try {
            const response = await editSportsPostService(post);

            if( response.status !== 201 )
                throw new Error(`Error to delete ${post.id} sports post`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const sportsSlice = createSlice({
    name: "sport",
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
        [getSportsPosts.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getSportsPosts.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.items = action.payload;
        },
        [getSportsPosts.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [getSportsPostById.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getSportsPostById.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.open = action.payload;
        },
        [getSportsPostById.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [deleteSportsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [deleteSportsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [deleteSportsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },


        [editSportsPost.pending]: (state) => {
            state.resultStatus = PENDING;
            state.resultError = null;
        },
        [editSportsPost.fulfilled]: (state, action) => {
            state.resultStatus = FULFILLED;
            state.resultError = null;
            state.result = action.payload;
        },
        [editSportsPost.rejected]: (state, action) => {
            state.resultStatus = REJECTED;
            state.resultError = action.payload;
        },
    },
});

export default sportsSlice.reducer;
export const {clearResult, clearOpen} = sportsSlice.actions;