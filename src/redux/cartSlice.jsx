import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numOfCartItems: 0,
  cart: [],
  numOfWishlistItems: 0,
  wishList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload[0];
      state.numOfCartItems = state.numOfCartItems + action.payload[1];
    },
    addToWishList: (state, action) => {
      state.wishList = action.payload[0];
      state.numOfWishlistItems += action.payload[1];
    },
    handleCart: (state, action) => {},
    handleWishList: (state, action) => {},
  },
});

export const { addToCart, addToWishList, handleCart, handleWishList } =
  cartSlice.actions;
export default cartSlice.reducer;
