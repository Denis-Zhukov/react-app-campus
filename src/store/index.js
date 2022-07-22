import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import sportReducer from "./sportsSlice";
import campusSlice from "./campusSlice";
import ratingSlice from "./ratingSlice";
import contactsSlice from "./contactsSlice";
import authSlice from "./authSlice";
import applicationSlice from "./applicationSlice";
import eventsSlice from "./eventsSlice";
import executionsSlice from "./executionsSlice";

const rootReducer = combineReducers({
    news: newsReducer,
    sport: sportReducer,
    campus: campusSlice,
    rating: ratingSlice,
    contacts: contactsSlice,
    application: applicationSlice,
    event: eventsSlice,
    execution: executionsSlice,
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});