import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import sportReducer from "./sportSlice";
import campusSlice from "./campusSlice";
import ratingSlice from "./ratingSlice";
import contactsSlice from "./contactsSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    sport: sportReducer,
    campus: campusSlice,
    rating: ratingSlice,
    contacts: contactsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});