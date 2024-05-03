import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./reducerUser";

const store = configureStore({
  reducer: {
    user: reducerUser,
    // Add other reducers here if necessary
  },
});

export default store;
