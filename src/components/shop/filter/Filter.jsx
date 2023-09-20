import { BiFilter } from "react-icons/bi";
import { useClickAway } from "../ClickAway";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCat, filterByPrice } from "../../../redux/filterSLice";
import { fetchSearchProducts } from "../../react-query/FetchData";
import { Box, Slider } from "@mui/material";
import { QueryCache, QueryClient, useQueryClient } from "@tanstack/react-query";
/* eslint-disable react/display-name */
export const FilterBtn = memo(() => {
  const clickFnc = useClickAway();
  return (
    <>
      <div
        className="filter-btn flex gap-1 items-center"
        onClick={async () => {
          await clickFnc.handleClickAway();
          clickFnc.handleFilterClick();
        }}
      >
        <BiFilter />
        Filter
      </div>
      {clickFnc.openFilter ? <FilteringSection /> : null}
    </>
  );
});
function FilteringSection() {
  return (
    <motion.div
      className="filter-section flex gap-8 tab:gap-10 flex-col tab:flex-row"
      initial={{ height: 0 }}
      animate={{ height: "fit-content" }}
    >
      <Categroies />
      <FilteringPrice />
    </motion.div>
  );
}
function Categroies() {
  const clickFnc = useClickAway();

  const [subCatState, SetSubCatState] = useState(false);
  const categories = [
    { catType: "mainCat", catName: "all" },
    { catType: "cat", catName: "men" },
    { catType: "cat", catName: "women" },
    { catType: "cat", catName: "electronic" },
    { catType: "cat", catName: "furniture" },
  ];
  const subCategories = [
    { catType: "cat", catName: "women", name: "all" },
    { catType: "subCat", catName: "makeup", name: "fashion" },
    { catType: "subCat", catName: "jewellery", name: "accessories" },
  ];
  const dispatch = useDispatch();
  function handleClick(catName, catType) {
    dispatch(filterByCat([catType, catName]));
    clickFnc.handleFilterClick();
  }

  return (
    <ul className="category-filter">
      {categories.map((e) => {
        return (
          <>
            {e.catName === "women" ? (
              <>
                <li
                  onClick={() => {
                    SetSubCatState((e) => !e);
                  }}
                  key={e.catName}
                >
                  Women{" "}
                </li>

                <motion.ul
                  className="cat-women-ul"
                  initial={{ height: 0 }}
                  animate={
                    subCatState ? { height: "fit-content" } : { height: 0 }
                  }
                >
                  {subCategories.map((el) => {
                    return (
                      <li
                        key={el.catName}
                        className="sub-cat"
                        onClick={() => {
                          handleClick(el.catName, el.catType);
                          SetSubCatState((e) => !e);
                        }}
                      >
                        {el.name || el.catName}
                      </li>
                    );
                  })}
                </motion.ul>
              </>
            ) : (
              <li
                key={e.catName}
                onClick={() => {
                  handleClick(e.catName, e.catType);
                }}
              >
                {e.catName}
              </li>
            )}
          </>
        );
      })}
    </ul>
  );
}
function FilteringPrice() {
  const clickFnc = useClickAway();
  const filterData = useSelector((e) => e.data);
  const { data } = useQueryClient().getQueryData(["AllProducts"]);

  let prices = data.map((e) => e.price);
  let maxValue = Math.max(...prices);
  let minValue = Math.min(...prices);
  function valuetext(value) {
    return `${value}°C`;
  }

  const minDistance = 5;

  const [value1, setValue1] = useState([
    filterData.minPrice || minValue,
    filterData.maxPrice || maxValue,
  ]);
  const dispatch = useDispatch();

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
    // console.log(document.querySelectorAll(".price-slider input span span"));
  };

  return (
    <Box
      sx={{ margin: "auto 0" }}
      className="price-slider flex flex-col tab:flex-row gap-10"
    >
      <h2>Filter price range :</h2>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        disableSwap
        max={maxValue}
        min={minValue}
        onChangeCommitted={() => {
          dispatch(filterByPrice(value1));
        }}
        sx={{ flex: 1 }}
      />
      <button
        className="hidden"
        onClick={() => {
          dispatch(filterByPrice(value1));
          clickFnc.handleFilterClick();
        }}
      >
        Filter Price
      </button>
    </Box>
  );
}
