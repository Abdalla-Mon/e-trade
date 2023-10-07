import { useDeferredValue, useEffect, useState } from "react";
import { fetchSearchProducts } from "../react-query/FetchData";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import { BiEditAlt, BiPlus } from "react-icons/bi";

export default function ProductsList() {
  return <DashProductTable />;
}
function DashProductTable() {
  const [searchKey, setSearchKey] = useState("");
  const [grid, setGrid] = useState(9);
  const [slicedNumber, setSlicedNumber] = useState(1);
  const deferedSearchKey = useDeferredValue(searchKey);
  const { data, isLoading } = fetchSearchProducts(deferedSearchKey);
  if (isLoading) {
    return "loading";
  }
  const slicedData = data?.slice(slicedNumber - 1, grid * slicedNumber);
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
        onChange={(e) => setGrid(e.target.value)}
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
  return (
    <tr className="table-head">
      <td className="edit">
        <BiEditAlt />
      </td>
      <td className="product">
        <div className="flex gap-2 items-center">
          <div className="img">
            <img src={item.img} alt={item.name} width={60} />
          </div>
          <span>{item.name}</span>
        </div>
      </td>
      <td className="category">{item.cat}</td>
      <td className="sub-product">{item.subCat || "no sub category"}</td>
      <td className="stock">{item.stock ? "In Stock" : "Out Of Stock"}</td>
    </tr>
  );
}
