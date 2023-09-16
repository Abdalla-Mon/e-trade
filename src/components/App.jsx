import { Route, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import { fetchAllProducts } from "./react-query/FetchData";
import Navbar from "./router/Navbar";
import Home from "./home/Home";
import Shop from "./shop/Shop";
const router = createHashRouter(
  createRoutesFromElements(
    <Route path="" element={<Routes />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
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
  console.log(fetchAllProducts());
  return (
    <>
      <Navbar />
      <Outlet />
      <footer />
    </>
  );
}

export default App;
