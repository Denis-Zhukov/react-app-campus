import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettlingCampusInfoService, getCampusImagesService, getCampusInfoService } from "./../services/campusService";

export const getSettlingCampusInfo = createAsyncThunk(
    "campus/getSettlingCampusInfo",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getSettlingCampusInfoService();

            if( response.status !== 200 )
                throw new Error("Error getting settling campus info");

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
            console.log(response)
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
        clearList(state) {
            state.items = [];
            state.status = null;
            state.error = null;
        },
    },

    extraReducers: {
        [getSettlingCampusInfo.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getSettlingCampusInfo.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.open = action.payload;
        },
        [getSettlingCampusInfo.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },


        [getCampusImages.pending]: (state) => {
            state.imagesStatus = "pending";
            state.imagesError = null;
        },
        [getCampusImages.fulfilled]: (state, action) => {
            state.imagesStatus = "fulfilled";
            state.imagesError = null;
            state.images = action.payload;
        },
        [getCampusImages.rejected]: (state, action) => {
            state.imagesStatus = "rejected";
            state.imagesError = action.payload;
        },


        [getCampusInfo.pending]: (state) => {
            state.infoStatus = "pending";
            state.infoError = null;
        },
        [getCampusInfo.fulfilled]: (state, action) => {
            state.infoStatus = "fulfilled";
            state.infoError = null;
            state.info = action.payload;
        },
        [getCampusInfo.rejected]: (state, action) => {
            state.infoStatus = "rejected";
            state.infoError = action.payload;
        },
    },
});

export default campusSlice.reducer;
export const {clearList} = campusSlice.actions;