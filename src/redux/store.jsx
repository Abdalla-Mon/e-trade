import { configureStore } from "@reduxjs/toolkit";
import filterSlicer from "./filterSLice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    data: filterSlicer,
    cart: cartSlice,
  },
});
export default store;
