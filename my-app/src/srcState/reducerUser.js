import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = { id: null, name: null, email: null, lastName: null };

const reducerUser = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    // Update state based on action payload
    return action.payload;
  });
  // Add other action types and corresponding reducer logic using builder.addCase
});

export default reducerUser;
// import { createAction, createReducer } from "@reduxjs/toolkit";

// export const setUser = createAction("SET_USER");

// const initialState = { id: null, name: null, email: null, lastName: null };

// const reducerUser = createReducer(initialState, builder => {
//   builder
//     .addCase(setUser, (state, action) => {
//       return {
//         ...state,
//         ...action.payload
//       };
//     });
// });

// export default reducerUser;
