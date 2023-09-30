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
const LazyAbout = React.lazy(() => import("./about/About"));
const LazyProducts = React.lazy(() => import("./shop/Shop"));
const LazyContact = React.lazy(() => import("./contact/Contact"));

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#f6f7fb",
    color: "#000000",
  },
}));
const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="" element={<Routes />}>
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />{" "}
      </AuthProvider>
    </QueryClientProvider>
  );
}
function Routes() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(false);
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

export default App;
