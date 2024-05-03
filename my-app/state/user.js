import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = { id: null, name: null, email: null, lastName: null };

const reducerUser = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});

export default reducerUser;
