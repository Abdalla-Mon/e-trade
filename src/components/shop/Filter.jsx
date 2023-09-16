import { Divider } from "@mui/material";
import { useState } from "react";
import { BiFilter } from "react-icons/bi";
import { useClickAway } from "./ClickAway";
import { useFilterContext } from "./Shop";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../redux/filterSLice";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
export default function ProductsFIlter({ setFilter, data, setList }) {
  const { grid } = useFilterContext();
  const { handleClickAway } = useClickAway();
  return (
    <div className="products-filter tab:items-center flex gap-3 tab:gap-4 flex-col tab:flex-row">
      <div className="click-listner absolute" onClick={handleClickAway}></div>
      <FilterArea />
      <DividerResponsive />
      <div className="results-number">
        Showing <span>1-{grid}</span> of <span>{data.length}</span> Results
      </div>
      <DividerResponsive />
      <ProductSPerPage />
      <DividerResponsive />
      <SortProduct />
      <DividerResponsive />
      <Display setList={setList} />
    </div>
  );
}
function FilterArea() {
  return (
    <>
      <div className="filter-btn flex gap-1 items-center">
        <BiFilter />
        Filter
      </div>
    </>
  );
}
function ProductSPerPage() {
  const data = [9, 12, 15, 18];
  const clickFnc = useClickAway();
  const { grid, setGrid } = useFilterContext();

  return (
    <>
      <div className="product-per-page flex gap-3 items-center relative">
        <p> Products / Page</p>
        <Select
          data={data}
          clickAwayFnc={clickFnc.handleGridClick}
          showElement={clickFnc.openGrid}
          customFnc={setGrid}
        />
      </div>
    </>
  );
}
function SortProduct() {
  const data = [
    "Default",
    "A-Z Sort",
    "Z-A Sort",
    "Low to high price",
    "High to low price",
  ];
  const clickFnc = useClickAway();
  const dispatch = useDispatch();
  return (
    <>
      <div className="sort-products flex gap-3 items-center relative">
        <p>Sort</p>
        <Select
          data={data}
          clickAwayFnc={clickFnc.handleSortClick}
          showElement={clickFnc.openSort}
          customFnc={(e) => dispatch(sortProducts(e))}
        />
      </div>
    </>
  );
}
function Display({ setList }) {
  const [active, setActive] = useState(true);
  return (
    <div className="display flex itemx-center gap-3">
      <div
        className={active ? "icon-holder active" : "icon-holder "}
        onClick={() => {
          setActive(true);
          setList(false);
        }}
      >
        <BsFillGrid3X3GapFill />
      </div>
      <div
        className={active ? "icon-holder " : "icon-holder active"}
        onClick={() => {
          setActive(false);
          setList(true);
        }}
      >
        <BsList />
      </div>
    </div>
  );
}
function Select({ data, values, clickAwayFnc, showElement, customFnc, sort }) {
  const [current, setCurrent] = useState(data[0]);
  return (
    <div className="select relative">
      <button
        className="select-btn felx gap-3 items-center relative"
        onClick={() => {
          clickAwayFnc();
        }}
      >
        {current}
      </button>
      {showElement ? (
        <div className="options">
          {data.map((e) => {
            return (
              <>
                <div
                  key={e}
                  onClick={() => {
                    setCurrent(e);
                    clickAwayFnc();
                    customFnc(e);
                  }}
                >
                  {e}
                </div>
              </>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
function DividerResponsive() {
  return (
    <>
      <Divider className="hidden tab:block" orientation="vertical" flexItem />
      <Divider className="block tab:hidden" />
    </>
  );
}
