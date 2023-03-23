import { configureStore } from "@reduxjs/toolkit";
import todos from "../reducers/todos";
import album from "../reducers/album";
import users from "../reducers/users";
export const store = configureStore({
  reducer: {
      todos,
      album,
      users,
  },
});
