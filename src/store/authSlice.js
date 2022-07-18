import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./../services/authService";

export const login = createAsyncThunk(
    "auth/login",
    async function(data, {rejectWithValue}) {
        try {
            const response = await auth.login(data.login, data.password);

            if( response.status === 401 )
                throw new Error("Invalid login or password");
            if( response.status !== 200 )
                throw new Error("Error to auth");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: true,

        status: null,
        error: null,
    },

    extraReducers: {
        [login.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.isAuth = action.payload.hasOwnProperty("access_token");
            localStorage.setItem("token", action.payload.access_token);
        },
        [login.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;