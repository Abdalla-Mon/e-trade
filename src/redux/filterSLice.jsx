import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catType: "mainCat",
  catName: "all",
  sort: false,
  sortType: "Default",
};

const filterSlicer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterByCat: (state, action) => {
      state.catType = action.payload[0];
      state.catName = action.payload[1];
    },
    sortProducts: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { filterByCat, sortProducts } = filterSlicer.actions;
export default filterSlicer.reducer;
