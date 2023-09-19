/* eslint-disable react/display-name */
import { Divider } from "@mui/material";

import { useClickAway } from "../ClickAway";
import { useFilterContext } from "../Shop";

import { FilterBtn } from "./Filter";
import { Display, ProductSPerPage, SortProduct } from "./OtherOptions";
export default function ProductsOptions({ data, setList, dataSliced }) {
  const { grid } = useFilterContext();
  const { handleClickAway } = useClickAway();
  return (
    <div className="products-filter relative tab:items-center flex gap-3 tab:gap-4 flex-col tab:flex-row">
      <div className="click-listner fixed" onClick={handleClickAway}></div>
      <FilterBtn />
      <DividerResponsive />
      <div className="results-number">
        Showing{" "}
        <span>
          {dataSliced.length === 0 ? 0 : 1}-
          {dataSliced.length === 0 ? (
            0
          ) : (
            <>{grid < dataSliced.length ? grid : dataSliced.length}</>
          )}
        </span>{" "}
        of <span>{data.length}</span> Results
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

export function DividerResponsive() {
  return (
    <>
      <Divider className="hidden tab:block" orientation="vertical" flexItem />
      <Divider className="block tab:hidden" />
    </>
  );
}
