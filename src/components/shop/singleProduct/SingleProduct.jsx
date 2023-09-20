import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  getRelatedProducts,
} from "../../react-query/FetchData";
import { BsCheck2 } from "react-icons/bs";
import { Divider, Rating } from "@mui/material";
import {
  AddToCart,
  AddToWhishList,
} from "../../fixed-component/FixedComponent";

export default function SingleProductPage() {
  const { productID } = useParams();

  const { data, isLoading, isFetching } = fetchSingleProduct(productID);

  const {
    data: related,
    isLoading: relatedLoading,
    isFetching: relatedFetchin,
  } = getRelatedProducts(data);
  console.log(data);
  if (isLoading) {
    return <p>loading....</p>;
  }

  return (
    <div className="single-product-page">
      <div className="container mx-auto">
        <div className="single-product flex flex-col lap:flex-row gap-8">
          {" "}
          <Gallery img={data.img} />
          <ProductText e={data} />
        </div>
      </div>
    </div>
  );
}
function Gallery({ img }) {
  let fakeArray = [];
  for (let i = 0; i < 8; i++) {
    fakeArray.push(i);
  }
  return (
    <div className="gallery grid grid-cols-2 gap-6 lap:w-3/6">
      {fakeArray.map((e, index) => (
        <Img e={img} index={index} key={index} />
      ))}
    </div>
  );
}

function Img({ e, index }) {
  return (
    <div className="image-holder">
      <div className={"img-container image" + index}>
        <img src={e} alt={"image"} />
      </div>
    </div>
  );
}

function ProductText({ e }) {
  return (
    <div className="product-text lap:w-3/6">
      <h1>{e.name}</h1>
      <h2 className="flex gap-3">
        {e.desc ? (
          <>
            ${e.price - e.desc} <span>${e.price}</span>{" "}
          </>
        ) : (
          <>${e.price}</>
        )}
      </h2>
      <Rating name="read-only" value={4} readOnly className="mt-7 mb-6" />
      <Divider />
      <h6 className="flex gap-3 mt-7 mb-1">
        <BsCheck2 />
        In stock
      </h6>
      <h6 className="flex gap-3 mb-7">
        <BsCheck2 />
        Free delivery available
      </h6>
      <p>
        In ornare lorem ut est dapibus, ut tincidunt nisi pretium. Integer ante
        est, hendrerit in rutrum quis, elementum eget magna. Pellentesque
        sagittis dictum libero, eu dignissim tellus.
      </p>
      <Colors />
      <Sizes />
      <AddingToCart e={e} />
    </div>
  );
}
async function setActiveClass(classN, e) {
  await document.querySelectorAll("." + classN).forEach((e) => {
    e.classList.remove("active");
  });
  e.target.classList.add("active");
}
function Colors() {
  const colors = [
    { color: "#aae6f8", backgroundColor: "#aae6f8" },
    { color: "#5f8af7", backgroundColor: "#5f8af7" },
    { color: "#59c3c0", backgroundColor: "#59c3c0" },
  ];
  return (
    <div className="colors flex gap-10 my-7">
      <h5>Colors :</h5>
      <div className="flex gap-2">
        {colors.map((e, index) => {
          return (
            <div
              onClick={(e) => {
                setActiveClass("color", e);
              }}
              className="color"
              style={{ color: e.color, backgroundColor: e.backgroundColor }}
              key={e.color}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
function Sizes() {
  const sizes = ["s", "m", "l", "xl"];
  return (
    <div className="sizes flex gap-10 mb-7">
      <h5>Sizes :</h5>
      <div className="flex gap-3">
        {sizes.map((e) => (
          <div
            className="size"
            key={e}
            onClick={(e) => {
              setActiveClass("size", e);
            }}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddingToCart({ e }) {
  const [qty, setQty] = useState(1);
  return (
    <>
      <div className="cart-input flex gap-2">
        <Input setQty={setQty} qty={qty} />
        <AddToCart text={true} count={qty} item={e} />
        <AddToWhishList item={e} />
      </div>
    </>
  );
}
function Input({ setQty, qty }) {
  return (
    <>
      <div
        className="counter"
        onClick={() => {
          qty > 1 ? setQty((q) => q - 1) : null;
        }}
      >
        -
      </div>
      <input
        type="number"
        onChange={(e) => {
          setQty(+e.target.value);
        }}
        min={1}
        value={qty < 1 ? 1 : qty}
      />
      <div className="counter" onClick={() => setQty((q) => q + 1)}>
        +
      </div>
    </>
  );
}
