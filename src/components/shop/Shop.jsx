/* eslint-disable react/display-name */
import { fetchAllProducts } from "../react-query/FetchData";
import { useSelector } from "react-redux";
import { createContext, memo, useContext, useEffect, useState } from "react";

import {
  PageLayout,
  ShopCard,
  ShopListProduct,
} from "../fixed-component/FixedComponent";
import { Pagination, Stack } from "@mui/material";
import ClickAwayProvider from "./ClickAway";
import { AnimatePresence, motion } from "framer-motion";
import ProductsOptions from "./filter/Options";
import { ProductsSkeleton } from "../fixed-component/ShopSkeleton";
const FilterContext = createContext(null);

export default function Shop() {
  const filterData = useSelector((e) => e.data);

  const { data, isLoading } = fetchAllProducts(
    filterData.catType,
    filterData.catName,
    filterData.sortType,
    filterData.minPrice,
    filterData.maxPrice
  );
  const [list, setList] = useState(false);
  const [grid, setGrid] = useState(9);
  const [sliceNum, setSliceNum] = useState(0);

  let dataSliced = data?.slice(sliceNum, sliceNum + grid);

  return (
    <FilterContext.Provider value={{ grid, setGrid }}>
      <ClickAwayProvider>
        <section className="shop relative">
          <PageLayout head={"shop"} links={["home"]} />
          <div className="container mx-auto">
            <div className="shop-container flex flex-col gap-10">
              {isLoading ? (
                <ProductsSkeleton />
              ) : (
                <>
                  <ProductsOptions
                    dataSliced={dataSliced}
                    data={data}
                    grid={grid}
                    setList={setList}
                  />
                  <ShopProducts dataSliced={dataSliced} list={list} />
                  <ShopPagination
                    filterData={data}
                    sliceNum={sliceNum}
                    setSliceNum={setSliceNum}
                    grid={grid}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </ClickAwayProvider>
    </FilterContext.Provider>
  );
}
function ShopProducts({ dataSliced, list }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{}}
        animate={list ? { opacity: [0, 1] } : { opacity: [0.5, 1] }}
        transition={{ duration: 1 }}
      >
        {dataSliced.length < 1 ? (
          <div>No products match the filter</div>
        ) : (
          <>
            {list ? (
              <motion.div
                className="shop-products grid  gap-10"
                exit={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1 }}
              >
                {dataSliced.map((e) => {
                  return <ShopListProduct key={e.id} e={e} />;
                })}
              </motion.div>
            ) : (
              <motion.div className="shop-products grid tab:grid-cols-2 lap:grid-cols-3 pc:grid-cols-4 gap-10">
                {dataSliced.map((e) => {
                  return ShopCard(e);
                })}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
const ShopPagination = memo(({ filterData, setSliceNum, grid }) => {
  const [page, setPage] = useState(1);
  const index = Math.ceil(filterData.length / grid);
  useEffect(() => {
    document.querySelectorAll(".pagination  li button")[1].click();
  }, [index, filterData.length]);
  let paginationNum = 0;
  for (let i = 0; i < index; i++) {
    paginationNum++;
  }
  const handleChange = (event, value) => {
    setPage(value);
    setSliceNum((value - 1) * grid, value * grid);
  };
  return (
    <Stack spacing={2} className="pagination">
      <Pagination
        size="large"
        count={paginationNum}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
});
export function useFilterContext() {
  return useContext(FilterContext);
}
