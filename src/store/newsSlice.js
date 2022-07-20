import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLastNewsService, getNewsByIdService, addNewsService, deleteNewsService } from "./../services/newsService";

export const getLastNews = createAsyncThunk(
    "news/getLastNews",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getLastNewsService();

            if( response.status !== 200 )
                throw new Error("Error getting latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getNewsById = createAsyncThunk(
    "news/getNewsById",
    async function(id, {rejectWithValue}) {
        try {
            const response = await getNewsByIdService(id);

            if( response.status !== 200 )
                throw new Error(`Error getting ${id} news`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const addNews = createAsyncThunk(
    "news/addNews",
    async function(news, {rejectWithValue}) {
        try {
            if( !news?.title || !news?.body )
                throw new Error("заполните новую статью");

            const response = await addNewsService(news);

            if( response.status !== 201 )
                throw new Error("Error to add latest news");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const deleteNews = createAsyncThunk(
    "news/deleteNews",
    async function(id, {rejectWithValue}) {
        try {
            const response = await deleteNewsService(id);

            if( response.status !== 200 )
                throw new Error(`error to delete ${id} news`);

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

const newsSlice = createSlice({
    name: "news",
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
    },

    extraReducers: {
        [getLastNews.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getLastNews.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.items = action.payload;
        },
        [getLastNews.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [getNewsById.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getNewsById.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.open = action.payload;
        },
        [getNewsById.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [addNews.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [addNews.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;
        },
        [addNews.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;
        },


        [deleteNews.pending]: (state) => {
            state.resultStatus = "pending";
            state.resultError = null;
        },
        [deleteNews.fulfilled]: (state, action) => {
            state.resultStatus = "fulfilled";
            state.resultError = null;
            state.result = action.payload;
        },
        [deleteNews.rejected]: (state, action) => {
            state.resultStatus = "rejected";
            state.resultError = action.payload;
        },
    },
});

export default newsSlice.reducer;
export const {clearResult} = newsSlice.actions;