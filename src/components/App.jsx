import { Route, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "./router/Navbar";
import Home from "./home/Home";
import React from "react";
import ShopSkeleton from "./fixed-component/ShopSkeleton";
import SingleProductPage from "./shop/singleProduct/SingleProduct";
import Cart from "./cart/Cart";
import Whishlist from "./whishlist/Whishlist";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from "notistack";
import styled from "@emotion/styled";
import Footer from "./router/Footer";
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
      <Route path="wishlist" element={<Whishlist />} />
      <Route
        path="about"
        element={
          <React.Suspense fallback={<p>loading</p>}>
            <LazyAbout />
          </React.Suspense>
        }
      />
      <Route
        path="contact"
        element={
          <React.Suspense fallback={<p>loading</p>}>
            <LazyContact />
          </React.Suspense>
        }
      />
      <Route path="/shop/:productID" element={<SingleProductPage />} />
    </Route>
  )
);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
function Routes() {
  return (
    <SnackbarProvider
      Components={{
        success: StyledMaterialDesignContent,
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </SnackbarProvider>
  );
}

export default App;
