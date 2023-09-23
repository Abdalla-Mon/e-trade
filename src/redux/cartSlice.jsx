import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numOfCartItems:
    JSON.parse(window.localStorage.getItem("cartItemsQuantity")) || 0,
  cart: JSON.parse(window.localStorage.getItem("cartItems")) || [],
  numOfWishlistItems:
    JSON.parse(window.localStorage.getItem("numOfWishlistItems")) || 0,
  wishList: JSON.parse(window.localStorage.getItem("wishList")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload.cartItems;
      state.numOfCartItems = state.numOfCartItems + action.payload.quantity;
      addToLocal("cartItems", state.cart);
      addToLocal("cartItemsQuantity", state.numOfCartItems);
    },
    addToWishList: (state, action) => {
      state.wishList = action.payload[0];
      state.numOfWishlistItems += action.payload[1];
      addToLocal("wishList", state.wishList);
      addToLocal("numOfWishlistItems", state.numOfWishlistItems);
    },
  },
});

function addToLocal(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export const {
  addToCart,
  addToWishList,

  handleCart,
  handleWishList,
} = cartSlice.actions;
export default cartSlice.reducer;
