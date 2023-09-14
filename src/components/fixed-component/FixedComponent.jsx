import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
export function AddToCart({ text }) {
  return (
    <div className="cart-icon">
      {text ? "Add to cart" : <LiaCartPlusSolid />}{" "}
    </div>
  );
}
export function AddToWhishList() {
  return (
    <div className="love-icon">
      <AiOutlineHeart />
    </div>
  );
}
export function SingleProduct({ e }) {
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
