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
      <Route path="checkout" element={<CheckOut />} />
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
function AppLoader() {
  return (
    <div className="socket">
      <div className="gel center-gel">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c1 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c2 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c3 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c4 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c5 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c6 r1">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>

      <div className="gel c7 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>

      <div className="gel c8 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c9 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c10 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c11 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c12 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c13 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c14 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c15 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c16 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c17 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c18 r2">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c19 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c20 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c21 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c22 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c23 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c24 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c25 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c26 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c28 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c29 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c30 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c31 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c32 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c33 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c34 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c35 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c36 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
      <div className="gel c37 r3">
        <div className="hex-brick h1"></div>
        <div className="hex-brick h2"></div>
        <div className="hex-brick h3"></div>
      </div>
    </div>
  );
}
export default App;
