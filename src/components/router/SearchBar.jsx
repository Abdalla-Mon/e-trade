import { useDeferredValue, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSearchProducts } from "../react-query/FetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SingleProduct } from "../fixed-component/FixedComponent";
import { Divider, IconButton, InputBase } from "@mui/material";

export default function SearchBar({ setSearchBarPopup }) {
  const [textInput, setTextInput] = useState("");
  const [numOfProduct, setNumOfProduct] = useState(2);
  const deferrdTextInput = useDeferredValue(textInput.toLowerCase());

  const { data, isLoading } = fetchSearchProducts(deferrdTextInput);
  let slicedData = data?.slice(0, numOfProduct);

  return (
    <motion.div
      className="searchbar"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 0.5, 1] }}
    >
      <div className="remove" onClick={() => setSearchBarPopup(false)}></div>
      <div className="searchbar-container relative ">
        <div className="close-btn" onClick={() => setSearchBarPopup(false)}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-5">
            <SearchBarLabel setTextInput={setTextInput} />
            <div className="searchbar-content flex flex-col gap-6">
              {data.length < 1 ? (
                <p>No products match the searched text</p>
              ) : (
                <>
                  {slicedData.map((e) => (
                    <SingleProduct e={e} key={e.name} />
                  ))}
                </>
              )}
            </div>
            <LoadMoreData
              slicedData={slicedData}
              data={data}
              setNumOfProduct={setNumOfProduct}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SearchBarLabel({ setTextInput }) {
  return (
    <label className="searchbar-label w-6/6 flex justify-between">
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />{" "}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Search for specific product"
        inputProps={{ "aria-label": "search for specific product" }}
      />
    </label>
  );
}
function LoadMoreData({ slicedData, data, setNumOfProduct }) {
  return (
    <>
      {data.length === 0 ? null : (
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
      )}
    </>
  );
}
