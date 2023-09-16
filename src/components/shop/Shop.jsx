import { fetchAllProducts } from "../react-query/FetchData";
import { filterByCat } from "../../redux/filterSLice";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";

import {
  PageLayout,
  SingleProduct,
  ShopCard,
  ShopListProduct,
} from "../fixed-component/FixedComponent";
import { Pagination, Stack } from "@mui/material";
import ProductsFIlter from "./Filter";
import ClickAwayProvider from "./ClickAway";
const FilterContext = createContext(null);

export default function Shop() {
  const filterData = useSelector((e) => e.data);
  const [[catType, catName], setFilter] = useState([
    filterData.catType,
    filterData.catName,
  ]);
  const { data, isLoading } = fetchAllProducts(
    catType,
    catName,
    filterData.sortType
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
                "loading..."
              ) : (
                <>
                  <ProductsFIlter
                    setFilter={setFilter}
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
    <>
      {list ? (
        <div className="shop-products grid  gap-10">
          {dataSliced.map((e) => {
            return <ShopListProduct key={e.id} e={e} />;
          })}
        </div>
      ) : (
        <div className="shop-products grid tab:grid-cols-2 lap:grid-cols-3 pc:grid-cols-4 gap-10">
          {dataSliced.map((e) => {
            return ShopCard(e);
          })}
        </div>
      )}
    </>
  );
}
function ShopPagination({ filterData, setSliceNum, grid }) {
  const [page, setPage] = useState(1);
  const index = Math.ceil(filterData.length / grid);
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
}
export function useFilterContext() {
  return useContext(FilterContext);
}
