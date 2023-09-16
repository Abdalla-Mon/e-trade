import { configureStore } from "@reduxjs/toolkit";
import filterSlicer from "./filterSLice";

const store = configureStore({
  reducer: {
    data: filterSlicer,
  },
});
export default store;
