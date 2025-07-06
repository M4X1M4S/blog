import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../utils/types";
interface UserSliceState {
  user: User | null;
  isAuth: boolean;
}
const initialState: UserSliceState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    isAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
    getUser: (state) => {
      return state;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});
export default userSlice.reducer;
export const { setUser, isAuth, getUser, removeUser } = userSlice.actions;
