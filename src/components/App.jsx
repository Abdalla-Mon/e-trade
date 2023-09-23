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

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#f6f7fb",
    color: "#000000",
  },
}));
const LazyProducts = React.lazy(() => import("./shop/Shop"));
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
      <footer />
    </SnackbarProvider>
  );
}

export default App;
