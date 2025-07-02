import { configureStore } from "@reduxjs/toolkit";
const blogStore = configureStore({
  reducer: {
    // Add your reducers here
  },
  // Optional: Add middleware, devTools, etc.
});
export default blogStore;
