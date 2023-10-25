import { Route, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "./router/Navbar";
import Home from "./home/Home";
import React, { useEffect, useState } from "react";
import ShopSkeleton from "./fixed-component/ShopSkeleton";
import SingleProductPage from "./shop/singleProduct/SingleProduct";
import Cart from "./cart/Cart";
import Whishlist from "./whishlist/Whishlist";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from "notistack";
import styled from "@emotion/styled";
import Footer from "./router/Footer";
import CheckOut from "./checkout/Checkout";
import AuthProvider from "./auth/AuthProvider.jsx";
import Login from "./auth/user/Login";
import SignUp from "./auth/user/SignUp";
import Profile from "./auth/user/Profile";
import AppLoader from "./fixed-component/Apploader";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart, addToWishList } from "../redux/cartSlice";
import ResetPassword from "./auth/user/ResetPassword";
import DashNav from "./dashboard/Dashboard";
import ProductsList from "./dashboard/ProductsList";
import RootBoundary from "./Error";
import AddProduct from "./dashboard/AddProduct";
import CategoryList from "./dashboard/CatsList";
const LazyAbout = React.lazy(() => import("./about/About"));
const LazyProducts = React.lazy(() => import("./shop/Shop"));
const LazyContact = React.lazy(() => import("./contact/Contact"));

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#f6f7fb",
    color: "#000000",
  },
}));
async function getUserCartAnsWishData(dispatch) {
  try {
    if (!auth.currentUser) {
      return;
    }
    const cartRef = doc(db, "cart", auth.currentUser.uid);
    const cartSnap = await getDoc(cartRef);
    const wishListRef = doc(db, "love", auth.currentUser.uid);
    const wishListSnap = await getDoc(wishListRef);
    if (cartSnap.data() === undefined) {
      dispatch(addToCart({ cartItems: [] }));
    } else {
      dispatch(addToCart({ cartItems: cartSnap.data().data }));
    }
    if (wishListSnap.data() === undefined) {
      dispatch(addToWishList([[]]));
    } else {
      dispatch(addToWishList([wishListSnap.data().data]));
    }
    return;
  } catch {
    dispatch(addToWishList([[]]));
    dispatch(addToCart({ cartItems: [] }));
    return;
  }
}
const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route
        path="dashboard/*"
        element={<DashRoutes />}
        errorElement={<RootBoundary />}
      >
        <Route index element={<ProductsList />} />
        <Route path="add_product" element={<AddProduct />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="orders" element={<p>orders</p>} />
      </Route>
      <Route path="login" element={<Login />} errorElement={<RootBoundary />} />
      <Route
        path="signUp"
        element={<SignUp />}
        errorElement={<RootBoundary />}
      />
      <Route
        path="reset_password"
        element={<ResetPassword />}
        errorElement={<RootBoundary />}
      />
      <Route path="" element={<Routes />} errorElement={<RootBoundary />}>
        <Route index element={<Home />} />
        <Route
          path="shop"
          element={
            <React.Suspense fallback={<ShopSkeleton />}>
              <LazyProducts />
            </React.Suspense>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="wishlist" element={<Whishlist />} />

        <Route path="profile" element={<Profile />} />
        <Route
          path="about"
          element={
            <React.Suspense fallback={<AppLoader />}>
              <LazyAbout />
            </React.Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <React.Suspense fallback={<AppLoader />}>
              <LazyContact />
            </React.Suspense>
          }
        />
        <Route path="/shop/:productID" element={<SingleProductPage />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCartAnsWishData(dispatch);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />{" "}
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
function Routes() {
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(false);

    getUserCartAnsWishData(dispatch);
  }, []);
  return (
    <>
      {loader ? (
        <AppLoader />
      ) : (
        <SnackbarProvider
          Components={{
            success: StyledMaterialDesignContent,
          }}
        >
          <Navbar />
          <Outlet />
          <Footer />
        </SnackbarProvider>
      )}
    </>
  );
}
function DashRoutes() {
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(false);

    getUserCartAnsWishData(dispatch);
  }, []);
  return (
    <>
      {loader ? (
        <AppLoader />
      ) : (
        <>
          <DashNav />
        </>
      )}
    </>
  );
}

export default App;
