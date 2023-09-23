import { Route, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import Navbar from "./router/Navbar";
import Home from "./home/Home";
import React from "react";
import ShopSkeleton from "./fixed-component/ShopSkeleton";
import SingleProductPage from "./shop/singleProduct/SingleProduct";
import Cart from "./cart/Cart";
import Whishlist from "./whishlist/Whishlist";
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

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
function Routes() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer />
    </>
  );
}

export default App;
