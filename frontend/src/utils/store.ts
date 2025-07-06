import { configureStore } from "@reduxjs/toolkit";
import user from "@/utils/userSlice";
const blogStore = configureStore({
  reducer: {
    // Add your reducers here
    user: user,
  },
  // Optional: Add middleware, devTools, etc.
});
export default blogStore;
