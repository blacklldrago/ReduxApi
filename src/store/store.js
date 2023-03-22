import { configureStore } from "@reduxjs/toolkit";
import todos from "../reducers/todos";
import album from "../reducers/album";
export const store = configureStore({
  reducer: {
      todos,
      album,
  },
});
