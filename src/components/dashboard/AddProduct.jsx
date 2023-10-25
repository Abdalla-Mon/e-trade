import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchSearchProducts, getCategeroies } from "../react-query/FetchData";
import {
  Stock,
  updatingData,
  uplaoadingImgAndGettingItsUrl,
} from "./ProductsList";
import { LoaderProgress } from "../fixed-component/Apploader";
const AddProductContext = createContext(null);
export default function AddProduct() {
  const { register, handleSubmit, formState } = useForm();
  let { errors } = formState;
  const [subCatRadio, setRadio] = useState(null);
  const [stock, setStock] = useState(true);
  const [loader, setLoader] = useState(false);
  const { data, refetch } = fetchSearchProducts("");
  const [customErrors, setCustomErrors] = useState({ id: false, title: false });
  async function submit(el) {
    if (+el.price < +el.desc) {
      return null;
    }
    if (customErrors.id || customErrors.title) {
      return null;
    }
    setLoader(true);
    const updatedData = await uplaoadingImgAndGettingItsUrl(
      ".file-upload",
      el.id,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTSn8aVTV4owUI1cTh9yZDnUoxOZCFtppO4A&usqp=CAU"
    );
    const newItem = {
      id: el.id,
      name: el.title,
      desc: +el.desc,
      price: +el.price,
      img: updatedData,
      stock: stock,
      sortOrder: +el.sortOrder,
      mainCat: "all",
      cat: el.radio_input,
      subCat: el.subCat || null,
      qty: 0,
    };
    const newData = await [...data, newItem];
    await updatingData(newData);

    await setLoader(false);
    document.querySelectorAll("input").forEach((e) => {
      e.value = "";
      e.checked = false;
    });
    await refetch();
  }
  return (
    <AddProductContext.Provider
      value={{
        register,
        errors,
        subCatRadio,
        setRadio,
        stock,
        setStock,
        setCustomErrors,
        customErrors,
      }}
    >
      <form
        className="add_product_page"
        noValidate
        onSubmit={handleSubmit(submit)}
      >
        <LoaderProgress loading={loader} />

        <div className="flex justify-between items-center">
          <h3>Add a new Product</h3>
          <button className="save-btn">Puplish Product</button>
        </div>
        <div className="add_products_content flex flex-col  gap-8">
          <ProductInfo data={data} />
          <div className="right">
            <PriceInfo />
            <ImgInput />
          </div>
        </div>
      </form>
    </AddProductContext.Provider>
  );
}
function ProductInfo({ data }) {
  const [cat, setCat] = useState(null);
  const { setRadio, stock, setStock, errors, setCustomErrors, customErrors } =
    useContext(AddProductContext);
  const nameProps = {
    id: "title",
    holder: "Product Title",
    head: "Name",
    type: "text",
  };
  function customNameValidation(id, item, message) {
    const inputValue = document.querySelector("#" + id)?.value;
    const dataNames = data?.map((e) => e[item].toLowerCase());
    const pattern = dataNames.includes(inputValue?.toLowerCase());
    let object = customErrors;
    if (pattern) {
      object[id] = true;
      errors[id] = {
        message: message,
      };
    } else object[id] = false;

    setCustomErrors(object);
    return pattern;
  }
  const nameErrorMessage = "There is a product with the same name";
  const namePattern = {
    pattern: customNameValidation(nameProps.id, "name", nameErrorMessage),
  };

  const idProps = {
    id: "id",
    holder: "Product Id",
    head: "Product Id",
    type: "text",
  };
  const idErrorMessage = "There is a product with the same id";

  const idPattern = {
    pattern: customNameValidation(idProps.id, "id", idErrorMessage),
  };

  const sortProd = {
    id: "sortOrder",
    holder: "Sort Order",
    head: "Sort Order",
    type: "number",
  };
  return (
    <div className="product-info product_container ">
      <h3>Product information</h3>
      <AddProductInput props={nameProps} pattern={namePattern} />
      <div className="grid grid-cols-2 gap-5">
        <AddProductInput props={idProps} pattern={idPattern} />
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
      <div className="price-info product_container pc:w-3/5">
        <h3>Product Price information</h3>
        <div className="grid grid-cols-2 gap-6  ">
          <AddProductInput props={priceProps} />
          <AddProductInput props={descProps} />
        </div>
      </div>
    </>
  );
}
const customValidation = (id, errors) => {
  const otherInputValue = document.querySelector("#desc")?.value;
  const value = document.querySelector("#price")?.value;

  if (+value < +otherInputValue) {
    errors.price = {
      message: "Price value must be bigger than descount value",
    };
  }
  return +value > +otherInputValue;
};
function AddProductInput({ props, pattern }) {
  const id = props.id;
  const { register, errors } = useContext(AddProductContext);
  if (!pattern) {
    pattern = {
      value: props.type === "number" ? /^[0-9]*[1-9][0-9]*$/ : false,
      message: "Input must be a number greater than 0.",
      validate: id === "price" ? customValidation(id, errors) : null,
    };
  }
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
            pattern: pattern,
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
      <div className=" radio_input flex gap-3 flex-wrap ">
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

  return (
    <div className="product_container img_upload  pc:w-2/5">
      <div className="add_product_field file-input ">
        <label className="add_prod_input">
          <div className="filed_head">Product Image</div>
          <div className="flex flex-col items-center justify-around">
            <div className="filed_head"> Upload Image :</div>
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
            {/* <img src={imgSrc} alt="product image" /> */}
          </div>
        </label>
        <p className="error">{errors["product_img"]?.message}</p>
      </div>{" "}
    </div>
  );
}
