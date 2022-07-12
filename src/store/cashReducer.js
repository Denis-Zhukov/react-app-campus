import { createAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

const _state = {
    cash: 0,
};

const addCash = createAction("ADD_CASH");
const getCash = createAction("GET_CASH");

export const cashReducer = createReducer(_state, {
    [addCash]: function(state, action) {
        state.cash += action.payload;
    },
    [getCash]: function(state, action) {
        state.cash -= action.payload;
    },
});