import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettlingCampusInfoService, getCampusImagesService, getCampusInfoService } from "./../services/campusService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";

export const getCampusSettlingInfo = createAsyncThunk(
    "campus/getCampusSettlingInfo",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getSettlingCampusInfoService();

            if( response.status !== 200 )
                throw new Error("Error getting campus images");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getCampusImages = createAsyncThunk(
    "campus/getCampusImages",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getCampusImagesService();

            if( response.status !== 200 )
                throw new Error("Error getting campus images");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getCampusInfo = createAsyncThunk(
    "campus/getCampusInfo",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getCampusInfoService();

            if( response.status !== 200 )
                throw new Error("Error getting campus info");

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

        images: [],
        imagesStatus: null,
        imagesError: null,

        info: null,
        infoStatus: null,
        infoError: null,
    },

    reducers: {
        clearOpen(state) {
            state.open = null;
            state.status = null;
            state.error = null;
        },

        clearImages(state) {
            state.images = [];
            state.imagesStatus = null;
            state.imagesError = null;
        },

        clearInfo(state) {
            state.info = null;
            state.infoStatus = null;
            state.infoError = null;
        },
    },

    extraReducers: {
        [getCampusSettlingInfo.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [getCampusSettlingInfo.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.open = action.payload;
        },
        [getCampusSettlingInfo.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [getCampusImages.pending]: (state) => {
            state.imagesStatus = PENDING;
            state.imagesError = null;
        },
        [getCampusImages.fulfilled]: (state, action) => {
            state.imagesStatus = FULFILLED;
            state.imagesError = null;
            state.images = action.payload;
        },
        [getCampusImages.rejected]: (state, action) => {
            state.imagesStatus = REJECTED;
            state.imagesError = action.payload;
        },


        [getCampusInfo.pending]: (state) => {
            state.infoStatus = PENDING;
            state.infoError = null;
        },
        [getCampusInfo.fulfilled]: (state, action) => {
            state.infoStatus = FULFILLED;
            state.infoError = null;
            state.info = action.payload;
        },
        [getCampusInfo.rejected]: (state, action) => {
            state.infoStatus = REJECTED;
            state.infoError = action.payload;
        },
    },
});

export default campusSlice.reducer;
export const {clearOpen, clearInfo, clearImages} = campusSlice.actions;