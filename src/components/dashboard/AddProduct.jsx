import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { getCategeroies } from "../react-query/FetchData";
import { Stock } from "./ProductsList";
const AddProductContext = createContext(null);
export default function AddProduct() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [subCatRadio, setRadio] = useState(null);
  const [stock, setStock] = useState(true);
  const submit = (data) => {
    console.log(data);
  };
  return (
    <AddProductContext.Provider
      value={{ register, errors, subCatRadio, setRadio, stock, setStock }}
    >
      <form
        className="add_product_page"
        noValidate
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex justify-between items-center">
          <h3>Add a new Product</h3>
          <button className="save-btn">Puplish Product</button>
        </div>
        <div className="add_products_content flex flex-col pc:flex-row gap-8">
          <ProductInfo />
          <div className="right  pc:w-1/3">
            <PriceInfo />
            <ImgInput />
          </div>
        </div>
      </form>
    </AddProductContext.Provider>
  );
}
function ProductInfo() {
  const [cat, setCat] = useState(null);
  const { setRadio, stock, setStock } = useContext(AddProductContext);
  const nameProps = {
    id: "title",
    holder: "Product Title",
    head: "Name",
    type: "text",
  };
  const idProps = {
    id: "id",
    holder: "Product Id",
    head: "Product Id",
    type: "text",
  };
  const sortProd = {
    id: "sortOrder",
    holder: "Sort Order",
    head: "Sort Order",
    type: "number",
  };
  return (
    <div className="product-info product_container pc:w-2/3">
      <h3>Product information</h3>
      <AddProductInput props={nameProps} />
      <div className="grid grid-cols-2 gap-5">
        <AddProductInput props={idProps} />
        <AddProductInput props={sortProd} />
      </div>
      <div className="stock_filed">
        <Stock stock={stock} setStock={setStock} />
      </div>
      <MainCategory setCat={setCat} />
      <CheckBox
        cat={cat}
        clas="sub_cat"
        setRadio={setRadio}
        text="SubCategory"
      />
    </div>
  );
}
function PriceInfo() {
  const priceProps = {
    id: "price",
    holder: "Product Price",
    head: "Product Price",
    type: "number",
  };
  const descProps = {
    id: "desc",
    holder: "Descount",
    head: "Price Descount",
    type: "number",
  };
  return (
    <>
      <div className="price-info product_container">
        <h3>Product Price information</h3>
        <div className="grid grid-cols-2 gap-6 pc:gap-0 pc:grid-cols-1">
          <AddProductInput props={priceProps} />
          <AddProductInput props={descProps} />
        </div>
      </div>
    </>
  );
}
function AddProductInput({ props }) {
  const { register, errors } = useContext(AddProductContext);
  const id = props.id;
  return (
    <div className="add_product_field">
      <label className="add_prod_input ">
        <div className="filed_head">{props.head}</div>
        <input
          type={props.type || "text"}
          placeholder={props.holder}
          id={id}
          {...register(id, {
            required: {
              value: true,
              message: "this field is required",
            },
            pattern: {
              value: props.type === "number" ? /^[0-9]*[1-9][0-9]*$/ : false,
              message: "Input must be a number greater than 0.",
            },
          })}
          min={props.type === "number" ? 0 : null}
        />
        <div className="error">{errors[id]?.message}</div>
      </label>
    </div>
  );
}
function MainCategory({ setCat }) {
  const { register, errors } = useContext(AddProductContext);
  const { data, isLoading } = getCategeroies();
  const id = "radio_input";
  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="filed_head">Category</div>
      <div className=" radio_input flex gap-3 flex-wrap">
        {data.categories.map((e) => {
          return (
            <label className="flex gap-2" key={e.catName}>
              <input
                type="radio"
                name={"main_cat"}
                id={id}
                {...register(id, {
                  required: {
                    value: true,
                    message: "You have to choose a category",
                  },
                })}
                value={e.catName}
                onClick={() => setCat(e.catName)}
              />
              {e.catName}
            </label>
          );
        })}
      </div>
      <div className="error">{errors[id]?.message}</div>
    </>
  );
}
function CheckBox({ cat, setRadio, text, clas }) {
  const { data, isLoading } = getCategeroies();
  const { register } = useContext(AddProductContext);
  function hnandleClick(e) {
    setRadio(e.catName);
  }
  if (isLoading) {
    return "loading";
  }
  if (!cat)
    return (
      <div>
        <div className="filed_head">Sub Category</div> Please select a category
        first
      </div>
    );
  let subCat = data.categories?.filter((e) => e.catName === cat)[0]
    .subCategories;
  return (
    <>
      <div className="filed_head">Sub Category</div>

      {!subCat ? (
        <div className={clas}>
          {" "}
          No sub categories to this category please add sub category from
          category list ,{" "}
        </div>
      ) : (
        <>
          <div className={"radio_input flex gap-3 flex-wrap " + clas}>
            {subCat.map((e) => {
              return (
                <label className="flex gap-2" key={e.catName}>
                  <input
                    type="radio"
                    name={text}
                    onClick={() => {
                      hnandleClick(e);
                    }}
                    value={e.catName}
                    {...register("subCat")}
                    id="subCat"
                  />
                  {e.catName}
                </label>
              );
            })}
            <label className="flex gap-2">
              <input
                type="radio"
                name={text}
                onClick={() => {
                  hnandleClick({ catName: "none" });
                }}
                value={"none"}
                {...register("subCat")}
                id="subCat"
              />{" "}
              None
            </label>
          </div>
        </>
      )}
    </>
  );
}
function ImgInput() {
  const { register, errors } = useContext(AddProductContext);
  const [imgSrc, setImgSrc] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ0NDQ0PDQ0NDw0NDg8ODRANDQ0NFREWFhURFRUYHSggGBolGxgTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMkA+wMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQUGBAMCB//EADYQAQACAAIFCAkEAwEAAAAAAAABAgMRBAUSITETFUFRUpLB0SIyM1NhcYKRokJyobGBsuFi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP6EigCZKgKioCgAAAgqSAoAAAIoAAAAAigIqKAAAIoCKgCgAioAQoAAAACAAoAIoAAAAAgoAkqkgCoAoAAAIqAoACZKgKioCgACSoIBIKAACAqKgKIoCKgKCSBAQSCiKAAAioCgAIqAqKgKAAACEkkgoPvgaFiYnq0nLtW9GoPgtazM5REzPVEZy2NH1NWN+JabfCvox5tDDwqYUejFaR08I+8gxdH1TiX9bLDj477fZpYGq8KmUzG3PXbfH24PzpGtcOm6ueJP/n1fu8uja1vfFrFoitLTs5Rv3zwnMHy11gbGJFojKLx0dqOPgz3Ra1wOUwbZetX04/xxj7ZudAAASVSQICAFAAAARUBQAEVAVFQFBAUerR9XYuJv2dmOu27+OLT0fU+HXfeZvPdr9gYmHh2vOVazafhGbQ0fU17b72ikdUelbybNa1plWIisdERlD9g8uj6vwsPhXOe1b0pfrSNNw8P1rxn1Rvt9nz0jRMTEzice1YnorWIj78Xl5jj3s92AfPSNczO7Drs/G2+fszsbGviTne02+fD7cGrzJHvZ7sHMce9nuwDHTP79HzbPMce9nuwcxx72e7ANDQ8blcOt+uN/z4S53TMHk8S9OiJzr+2d8N/QdE5Gs125tEznGcZZbnz07V8Y1q22prMRluiJzgHPDY5kj3s92EtqWIiZ5Wd0TPqwDISSFBIJABQAAARUBQAAQFRUBX10XG5PEpfoid/y4S+SA67PdnG/p3dLCx9b4lt1IjDjvW8mjqjH28GvXT0J/wAcP4ZOtcHYxrdV/Tj5zx/kH61ZebaRSbTNp9LfM5z6stjWGkzg4cXiItviuUzlxYuqfb0+r/WWlrz2P118Qebnu3u696fI57v7uvenyZTUwNTWtXO99iZ/TFdrL57wOe7e7r3p8l57t7uvenyeLTNEtg2ytlMTviY4S84NXnu3u696fI57t7uvenyZaA1ee7e7r3p8jnu3u696fJlKDTnXdvd170+TYvOdJnrrP9OTng6ufU+nwBykKkAKhACiQoAACKgBkAECoBIAAqA0NS4+zi7E8MSMvqjh4vdrvB2sPbjjhzn9M7p8GHS01mLRxrMTHzh1FLRi4cT+m9f4mAYOqPb0+r/WWlrz2P118Wfq7DmmlVpPGs3j8Z3tDXnsfrr4gxtFtFcTDtO6IvWZ+EZuqchk9WDp+LSNmt93RFoi2X3Boa/vGxSv6traj4VymJ/uGK/WJebzNrTNrTxmX5AbWqdBjYm+JG/EiaxE9FJ8/J4tV6Jyt87R6FMpnqmeirogcppGFOHe1J/TOWfXHRL5urtg0m23NKzaIyzmImcmJrvC2cXa6Lxn/mN0+AM6eDrJ9T6fBykusn1Pp8AclEKQSAAAEKCAAZAAoACKgKioCgANrUWNnS2HPGk5x+2f+/2xXo1djcni1nPKJ9G3yn/uQNbGwMtKwsSOF4tWf3RWfD+k157H66+LQmsTlnHCc4+E5ZPBrz2Mfvr4gwRM2zqrV+WWLiRv40r1fGfiD8aPqjaw5m8zW876xx2Y6p63ivoOJXEjDmu+05VmPVmOvN0wD5aNgRhUileEdPTM9MvqADO13hZ4W100mJ/xO6fBovxj4e3S1Z/VEx94ByduDq59T6fByl4yzieMZxPzh1c+p9PgDlIJIAAgBRFAAARUBQSAVFQFRUBQQFQAdNq7H5TCpbpy2bfujc+GvPY/XXxePUmkRW1qWmIi0bUTM5RtR/z+mxy1O3XvQDla2ymJjjE574zh6+dMbt/hXyb/AC1O3TvQctTt070AwOdMbt/hXyOdMbt/hXyb/LU7dO9By1O3TvQDA50xu3+FfI50xu3+FfJv8tTt070HLU7dO9AMDnTG7f4V8jnTG7f4V8m/y1O3TvQctTt070A5XEtNptaeM5zO7Le6qfU+nwOWp26d6H5xMamzb068J/VHUDloVI4AEBACiKAAAioCgmYKioCoqAoICiKCGQSBl8DKFQDL4GRmAZQZfBUAyMoADL4GSoCpISAEEgKigAAIAKIAoICiAKIAogCoAKIAogCiAKIAogCiKAIAoigCAKgACoCoqAAACoACggAAAAqAAACoAAACggACooICggAEBABAQABIAAASSSAEgBkKCAQAAAEAAAAAAAAAAEAAA//Z"
  );
  return (
    <div className="product_container">
      <div className="add_product_field file-input ">
        <label className="add_prod_input">
          <div className="filed_head">Product Image</div>
          <div className="flex gap-5">
            <input
              id={"product_img"}
              type="file"
              {...register("product_img", {
                required: {
                  value: true,
                  message: "this field is required",
                },
              })}
              className="file-upload"
            />
            <img src={imgSrc} alt="product image" />
          </div>
        </label>
        <p className="error">{errors["product_img"]?.message}</p>
      </div>{" "}
    </div>
  );
}
