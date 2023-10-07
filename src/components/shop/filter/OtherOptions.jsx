/* eslint-disable react/display-name */
import { useDispatch } from "react-redux";
import { useClickAway } from "../ClickAway";
import { useFilterContext } from "../Shop";
import { sortProducts } from "../../../redux/filterSLice";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { BiSolidChevronRight } from "react-icons/bi";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
export function ProductSPerPage() {
  const data = [9, 12, 15, 18];
  const clickFnc = useClickAway();
  const { setGrid } = useFilterContext();

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
export function SortProduct() {
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
function Select({ data, clickAwayFnc, showElement, customFnc, sort }) {
  const [current, setCurrent] = useState(data[0]);
  return (
    <motion.div className="select relative" layout>
      <button
        className="select-btn felx gap-4 items-center relative"
        onClick={() => {
          clickAwayFnc();
        }}
      >
        {current}
        <motion.div animate={showElement ? { rotate: 90 } : { rotate: 0 }}>
          <BiSolidChevronRight />
        </motion.div>
      </button>
      {showElement ? (
        <motion.div
          className="options"
          initial={{ height: 0 }}
          animate={{ height: "fit-content" }}
        >
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
        </motion.div>
      ) : null}
    </motion.div>
  );
}
export const Display = memo(({ setList }) => {
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
});
