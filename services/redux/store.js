import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../redux/userSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

export default store;
