import { useDeferredValue, useEffect, useState } from "react";
import {
  fetchSearchProducts,
  uploadNewImgQuery,
} from "../react-query/FetchData";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { Pagination } from "@mui/material";
import { Img } from "../fixed-component/FixedComponent";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { LoaderProgress } from "../fixed-component/Apploader";
export default function ProductsList() {
  return <DashProductTable />;
}
function DashProductTable() {
  const [searchKey, setSearchKey] = useState("");
  const [grid, setGrid] = useState(9);
  const [slicedNumber, setSlicedNumber] = useState(0);
  const deferedSearchKey = useDeferredValue(searchKey);
  const { data, isLoading, refetch } = fetchSearchProducts(deferedSearchKey);
  if (isLoading) {
    return "loading";
  }

  const slicedData = data?.slice(slicedNumber, grid + slicedNumber);
  return (
    <>
      <SearchBar setSearchKey={setSearchKey} setGrid={setGrid} />
      <div className="table-container">
        <table>
          <TableHead setSearchKey={setSearchKey} setGrid={setGrid} />
          <tbody>
            {slicedData.map((item) => (
              <TableBody
                refetch={refetch}
                data={data}
                item={item}
                key={item.name}
              />
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
    <div className="dash-search flex gap-5 items-center">
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
    <FormControl className="grid-setter mr-3">
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
        <th className="price">Price</th>

        <th className="category">Category</th>
        <th className="sub-product">Sub products</th>
        <th className="stock">Stock</th>
      </tr>
    </thead>
  );
}
function TableBody({ item, data, refetch }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <SingleItem
          refetch={refetch}
          item={item}
          oldData={data}
          setShow={setShow}
        />
      ) : null}
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
        <td className="price">$ {item.price}</td>
        <td className="category">{item.cat}</td>
        <td className="sub-product">{item.subCat || "no sub category"}</td>
        <td className="stock">{item.stock ? "In Stock" : "Out Of Stock"}</td>
      </tr>
    </>
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

function SingleItem({ refetch, oldData, item, setShow }) {
  const [loader, setLoader] = useState(false);

  const form = useForm();
  const [stock, setStock] = useState(item.stock);
  const [imgSrc, setImg] = useState(item.img);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutateAsync } = uploadNewImgQuery();
  async function mutateTheData() {
    const inputFile = document.querySelector(".file-upload");
    const file = await inputFile.files[0];
    if (file) {
      const updatingImgData = await mutateAsync({
        imgName: item.id,
        avaterFile: file,
      });
      return updatingImgData;
    }
    return imgSrc;
  }
  async function updatingData(data) {
    const docData = await setDoc(doc(db, "Data", "shop_data"), { data: data });
    return docData;
  }
  async function submit(el) {
    setLoader(true);
    const updatedData = await mutateTheData();
    await setImg(updatedData);
    const newData = oldData.map((e) => {
      if (e.id === item.id) {
        e.id = el.product_id;
        e.name = el.product_name;
        e.desc = +el.product_desc;
        e.price = +el.product_price;
        e.sortOrder = +el.product_sort;
        e.img = updatedData;
        e.stock = stock;
      }
      return e;
    });

    await updatingData(newData);
    await setLoader(false);
    const reftching = await refetch();
    console.log(reftching);
    document.querySelector(".remove-div").click();
  }
  const nameObject = {
    text: "Name :",
    id: "product_name",
    value: item.name,
    message: "Please enter product name",
  };
  const idObject = {
    text: "Product Id :",
    id: "product_id",
    value: item.id,
    message: "Please enter product id",
  };
  const namePrice = {
    text: "Price :",
    id: "product_price",
    value: item.price,
    message: "Please enter product price",
  };
  const descPrice = {
    text: "Descount :",
    id: "product_desc",
    value: item.desc || 0,
    message: "Please enter product descount",
  };
  const sortOrder = {
    text: "Sort Order :",
    id: "product_sort",
    value: item.sortOrder,
    message: "Please enter product sort order",
  };
  return (
    <div className="dash-single-product fixed">
      <LoaderProgress loading={loader} />
      <div className="remove-div absolute" onClick={() => setShow(false)}></div>
      <motion.form
        className="dash-single-content"
        noValidate
        onSubmit={handleSubmit(submit)}
        initial={{ scale: 0, y: "-50%" }}
        animate={{ scale: 1, y: "-50%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="close-btn" onClick={() => setShow(false)}>
          x
        </div>
        <CustonSingleItemInput
          register={register}
          props={nameObject}
          errors={errors}
        />
        <CustonSingleItemInput
          register={register}
          props={idObject}
          errors={errors}
        />
        <div className="single-input file-input flex">
          <label className="flex gap-10">
            Product img :
            <img src={imgSrc} alt={item.name} width={80} />
            {item.text}
            <input
              id={"product_img"}
              type="file"
              {...register("product_img")}
              className="file-upload"
            />
          </label>
          <p className="error">{errors["product_img"]?.message}</p>
        </div>
        <CustonSingleItemInput
          register={register}
          props={namePrice}
          errors={errors}
        />
        <CustonSingleItemInput
          register={register}
          props={descPrice}
          errors={errors}
        />
        <CustonSingleItemInput
          register={register}
          props={sortOrder}
          errors={errors}
        />
        <div className="single-input">
          <label className="flex gap-10">
            Stock:
            <motion.div
              className="stock-swap"
              initial={{ backgroundColor: "#7367f0" }}
              animate={
                stock
                  ? { backgroundColor: "#7367f0", borderColor: "transparent" }
                  : {
                      backgroundColor: "#ffffff",
                      borderColor: "rgb(219,218,222)",
                    }
              }
              onClick={() => setStock((e) => !e)}
            >
              <motion.span
                initial={{ backgroundColor: "#ffffff", right: 5 }}
                animate={
                  stock
                    ? { backgroundColor: "#ffffff", right: 5 }
                    : {
                        backgroundColor: "rgb(219,218,222)",
                        left: 5,
                      }
                }
              ></motion.span>
            </motion.div>
          </label>
        </div>
        <button className="save-btn">save</button>
      </motion.form>
    </div>
  );
}
function CustonSingleItemInput({ props, register, errors }) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="single-input">
      <label className="flex gap-5">
        {props.text}
        <input
          id={props.id}
          {...register(props.id, {
            required: {
              value: true,
              message: props.message,
            },
          })}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <p className="error">{errors[props.id]?.message}</p>
    </div>
  );
}
