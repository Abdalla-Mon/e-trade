import { useDeferredValue, useEffect, useState } from "react";
import { fetchSearchProducts } from "../react-query/FetchData";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import { Pagination } from "@mui/material";
import { Img } from "../fixed-component/FixedComponent";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";

export default function ProductsList() {
  return <DashProductTable />;
}
function DashProductTable() {
  const [searchKey, setSearchKey] = useState("");
  const [grid, setGrid] = useState(9);
  const [slicedNumber, setSlicedNumber] = useState(0);
  const deferedSearchKey = useDeferredValue(searchKey);
  const { data, isLoading } = fetchSearchProducts(deferedSearchKey);

  if (isLoading) {
    return "loading";
  }

  //   console.log(data?.slice(slicedNumber, grid + slicedNumber));
  const slicedData = data?.slice(slicedNumber, grid + slicedNumber);
  return (
    <>
      <SearchBar setSearchKey={setSearchKey} setGrid={setGrid} />
      <div className="table-container">
        <table>
          <TableHead setSearchKey={setSearchKey} setGrid={setGrid} />
          <tbody>
            {slicedData.map((item) => (
              <TableBody item={item} key={item.name} />
            ))}
          </tbody>
        </table>{" "}
        <PaginationRounded
          dataLength={data.length}
          grid={grid}
          setSlicedNumber={setSlicedNumber}
        />
      </div>
    </>
  );
}
function SearchBar({ setSearchKey, setGrid }) {
  return (
    <div className="dash-search flex gap-8 items-center">
      <input
        type="text"
        className="search-input mr-auto"
        placeholder="Search for a product"
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
      />
      <GridSetter setGrid={setGrid} />
      <Link to="add_product" className="add_product_btn flex gap-2">
        <BiPlus /> Add Product
      </Link>
    </div>
  );
}
function GridSetter({ setGrid }) {
  return (
    <FormControl className="grid-setter">
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Products per page
      </InputLabel>
      <NativeSelect
        defaultValue={9}
        inputProps={{
          name: "products",
          id: "uncontrolled-native",
        }}
        onChange={(e) => setGrid(+e.target.value)}
      >
        <option value={9}>9</option>
        <option value={12}>12</option>
        <option value={15}>15</option>
      </NativeSelect>
    </FormControl>
  );
}
function TableHead() {
  return (
    <thead>
      <tr className="table-head">
        <th className="edit">Edit</th>
        <th className="product">Product</th>
        <th className="category">Category</th>
        <th className="sub-product">Sub products</th>
        <th className="stock">Stock</th>
      </tr>
    </thead>
  );
}
function TableBody({ item }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? <SingleItem item={item} /> : null}
      <tr className="table-body">
        <td className="edit">
          <div className="svg-container" onClick={() => setShow(true)}>
            <BiEditAlt />
          </div>
        </td>
        <td className="product">
          <div className="flex gap-3 items-center">
            <Img img={{ src: item.img, alt: item.name }} />
            <span>{item.name}</span>
          </div>
        </td>
        <td className="category">{item.cat}</td>
        <td className="sub-product">{item.subCat || "no sub category"}</td>
        <td className="stock">{item.stock ? "In Stock" : "Out Of Stock"}</td>
      </tr>
    </>
  );
}
function SingleItem({ item }) {
  return (
    <div className="dash-single-product fixed">
      <div className="remove-div absolute"></div>
      <div className="dash-single-content"></div>
    </div>
  );
}
function PaginationRounded({ setSlicedNumber, grid, dataLength }) {
  const [page, setPage] = useState(1);
  let count = Math.ceil(dataLength / grid);
  useEffect(() => {
    document.querySelectorAll(".pagintaion   li button")[1].click();
  }, [grid]);
  const handleChange = (event, value) => {
    setPage(value);
    setSlicedNumber((value - 1) * grid, value * grid);
  };
  return (
    <div className="pagintaion flex justify-end items-center">
      <Pagination
        count={count}
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
