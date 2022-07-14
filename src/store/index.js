import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import sportReducer from "./sportSlice";
import campusSlice from "./campusSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    sport: sportReducer,
    campus: campusSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});