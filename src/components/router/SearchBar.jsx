import { useDeferredValue, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSearchProducts } from "../react-query/FetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToCart, AddToWhishList } from "../fixed-component/FixedComponent";
import { Divider, IconButton, InputBase, Rating } from "@mui/material";

export default function SearchBar({ setSearchBar }) {
  const [text, setText] = useState("");
  const [numOfProduct, setNumOfProduct] = useState(2);
  const deferredQuery = useDeferredValue(text);

  const { data, isLoading, isFetching, isPreviousData, isRefetching } =
    fetchSearchProducts(deferredQuery);
  console.log(data);
  console.log(isLoading);
  let slicedData = data.slice(0, numOfProduct);

  if (isLoading) {
    return "loading";
  }
  return (
    <motion.div
      className="searchbar"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 0.5, 1] }}
    >
      <div className="searchbar-container relative ">
        <div className="close-btn" onClick={() => setSearchBar(false)}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-5">
            <label className="searchbar-label w-6/6 flex justify-between">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />{" "}
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search for specific product"
                inputProps={{ "aria-label": "search for specific product" }}
              />
            </label>
            <div className="searchbar-content flex flex-col gap-6">
              {slicedData.map((e) => (
                <SingleProduct e={e} key={e.name} />
              ))}
            </div>
            <button
              disabled={slicedData.length === data.length}
              onClick={() => {
                data.length > slicedData.length
                  ? setNumOfProduct((e) => e + 2)
                  : null;
              }}
              style={
                slicedData.length === data.length
                  ? { cursor: "no-drop", opacity: 0.4 }
                  : { opacity: 1 }
              }
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
function SingleProduct({ e }) {
  return (
    <div className="searched-prod items-center flex justify-between gap-8">
      <div className="left">
        <img src={e.img} alt={e.name} style={{ width: "200px" }} />
      </div>
      <div className="right tab:items-center flex gap-4 tab:justify-between tab:flex-row flex-col">
        <div className="">
          <Rating name="read-only" value={4} readOnly />
          <h4>{e.name}</h4>
          <h3>$ {e.price}</h3>
        </div>
        <div className="icons flex gap-4 tab:flex-col ">
          <AddToCart />
          <AddToWhishList />
        </div>
      </div>
    </div>
  );
}
