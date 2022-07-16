import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
    "contacts/getContacts",
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

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        contacts: null,
        status: null,
        error: null,
    },

    extraReducers: {
        [getContacts.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getContacts.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.contacts = action.payload;
        },
        [getContacts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default contactsSlice.reducer;