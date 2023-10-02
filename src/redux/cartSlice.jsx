import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
const initialState = {
  cart: [],
  numOfCartItems: 0,
  wishList: [],
  numOfWishlistItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload.cartItems;
      state.numOfCartItems = state.cart.length;

      addToFireBase("cartItems", state.cart);
    },
    addToWishList: (state, action) => {
      state.wishList = action.payload[0];
      state.numOfWishlistItems = state.wishList.length;
      addToFireBase("wishList", state.wishList);
    },
    clearCart: (state) => {
      (state.cart = []), (state.numOfCartItems = 0);
      addToFireBase("cartItems", state.cart);
    },
  },
});

async function addToFireBase(name, value) {
  try {
    let docRef = doc(db, "cart", auth.currentUser.uid);
    if (name === "wishList") docRef = doc(db, "love", auth.currentUser.uid);
    const docData = await setDoc(docRef, { data: value });
    return docData;
  } catch (e) {
    console.log(e);
  }
}

export const {
  addToCart,
  addToWishList,

  handleCart,
  handleWishList,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
