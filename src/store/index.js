import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import sportReducer from "./sportSlice";
import campusSlice from "./campusSlice";
import ratingSlice from "./ratingSlice";
import contactsSlice from "./contactsSlice";
import authSlice from "./authSlice";
import applicationSlice from "./applicationSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    sport: sportReducer,
    campus: campusSlice,
    rating: ratingSlice,
    contacts: contactsSlice,
    auth: authSlice,
    application: applicationSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});