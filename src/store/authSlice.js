import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PENDING, FULFILLED, REJECTED } from "./statuses";
import auth from "./../services/authService";

export const login = createAsyncThunk(
    "auth/login",
    async function(data, {rejectWithValue}) {
        try {
            const response = await auth.login(data.login, data.password, data?.remember);

            if( response.status === 401 )
                throw new Error("Invalid login or password");
            if( response.status !== 201 )
                throw new Error("Error to auth");

            return response.data;
        } catch(e) {
            return rejectWithValue(e.message);
        }
    },
);

export const logout = createAsyncThunk(
    "auth/logout",
    async function(_, {rejectWithValue}) {
        try {
            const response = await auth.logout();

            if( response.status === 401 )
                throw new Error("Error to logout");

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
        authRole: "admin",
        status: null,
        error: null,
    },

    reducers: {
        clearStatus(state) {
            state.authRole = null;
            state.status = null;
            state.error = null;
        },
    },

    extraReducers: {
        [login.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = FULFILLED;
            state.error = null;
            state.isAuth = action.payload.hasOwnProperty("access_token");
            localStorage.setItem("token", action.payload.access_token);
            state.authRole = action.payload.role;
        },
        [login.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;
        },


        [logout.pending]: (state) => {
            state.status = PENDING;
            state.error = null;
        },
        [logout.fulfilled]: (state) => {
            state.status = FULFILLED;
            state.error = null;

            state.isAuth = false;
            localStorage.removeItem("token");
            state.authRole = null;
        },
        [logout.rejected]: (state, action) => {
            state.status = REJECTED;
            state.error = action.payload;

            state.isAuth = false;
            localStorage.removeItem("token");
            state.authRole = null;
        },
    },
});

export default authSlice.reducer;
export const {clearStatus} = authSlice.actions;