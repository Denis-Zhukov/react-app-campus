import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContactsService } from "./../services/contactsService";
import { PENDING, FULFILLED, REJECTED } from "./statuses";

export const getContacts = createAsyncThunk(
    "contacts/getContacts",
    async function(_, {rejectWithValue}) {
        try {
            const response = await getContactsService();

            if( response.status !== 200 )
                throw new Error("Error getting contacts");

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
            state.status = PENDING;
            state.error = null;
        },
        [getContacts.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.contacts = action.payload;
        },
        [getContacts.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },
    },
});

export default contactsSlice.reducer;