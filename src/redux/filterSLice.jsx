import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catType: "mainCat",
  catName: "all",
  sort: false,
  sortType: "Default",
  minPrice: null,
  maxPrice: null,
  initialData: [],
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
    filterByPrice: (state, action) => {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
    },
  },
});

export const { filterByCat, sortProducts, filterByPrice } =
  filterSlicer.actions;
export default filterSlicer.reducer;
