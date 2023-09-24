import { Rating } from "@mui/material";
import React, { useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import { BiSolidChevronRight } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishList } from "../../redux/cartSlice";
import { motion } from "framer-motion";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export class CartItem {
  constructor(item) {
    this.item = item;
  }
  increasQty(qty) {
    this.item.qty += qty;
  }
  decrease() {
    this.item.qty -= 1;
  }
  result() {
    return this.item;
  }
}
const message = "Added to cart";
const action = (snackbarId) => (
  <>
    <button
      className="dismiss"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Dismiss
    </button>
    <Link to={"/cart"} className="snack-bar-cart">
      View cart
    </Link>
  </>
);
function addToCartPopup() {
  enqueueSnackbar(message, {
    variant: "success",
    autoHideDuration: 2000,
    action,
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  });
}
export function handleCart(cartItems, cartItem, quantityToAdd) {
  let isItemAlreadyInCart = cartItems
    .map((item) => item.id)
    .includes(cartItem.item.id);

  if (!isItemAlreadyInCart) {
    cartItem.increasQty(quantityToAdd);
    cartItems.push(cartItem.result());
  } else {
    cartItems = cartItems.map((item) => {
      if (item.id === cartItem.item.id) {
        item = { ...item, qty: item.qty + quantityToAdd };
      }
      return item;
    });
  }

  return cartItems;
}

export function AddToCart({ text, item, quantity = 1 }) {
  const cartSlice = useSelector((state) => state.cart);
  const cartItems = cartSlice.cart.slice();
  const cartItem = new CartItem({ ...item });
  const dispatch = useDispatch();
  return (
    <div
      className="cart-icon flex item-center gap-2"
      onClick={() => {
        const updatedCartItems = handleCart(cartItems, cartItem, quantity);
        dispatch(addToCart({ cartItems: updatedCartItems, quantity }));
        addToCartPopup(item.id);
      }}
    >
      {text ? (
        <>
          <FaCartPlus /> Add to cart
        </>
      ) : (
        <LiaCartPlusSolid />
      )}{" "}
    </div>
  );
}

export function handleWishList(arrayOfItems, item, remove) {
  if (remove) {
    arrayOfItems = arrayOfItems.filter((e) => e.id !== item.id);
    return [arrayOfItems, -1];
  }
  let currentId = arrayOfItems.map((e) => e.id).includes(item.id);
  if (currentId) return [arrayOfItems, 0];
  arrayOfItems.push(item);
  return [arrayOfItems, 1];
}
export function AddToWhishList({ item }) {
  const cartSlice = useSelector((e) => e.cart);
  const [added, setAdded] = useState(
    cartSlice.wishList.some((e) => e.id === item.id)
  );
  const wishListItems = cartSlice.wishList.slice();
  const dispatch = useDispatch();
  return (
    <div
      className="love-icon"
      onClick={() => {
        dispatch(addToWishList(handleWishList(wishListItems, item, added)));
        setAdded(!added);
      }}
    >
      {added ? (
        <motion.div
          animate={{ rotate: 360, opacity: 1 }}
          initial={{ opacity: 0, overflow: "hidden" }}
          transition={{ duration: 0.3 }}
        >
          <AiOutlineCheck />{" "}
        </motion.div>
      ) : (
        <motion.div
          animate={{ rotate: -360, opacity: 1 }}
          initial={{ opacity: 0, overflow: "hidden" }}
          transition={{ duration: 0.3 }}
        >
          <AiOutlineHeart />{" "}
        </motion.div>
      )}
    </div>
  );
}
export function CardPrice({ e, additionalClass }) {
  return (
    <h3 className={"card-price flex gap-3  mb-1 " + additionalClass}>
      <span>${e.price - (e.desc || 0)}</span>
      {e.desc ? <span className="old-price">${e.price}</span> : null}
    </h3>
  );
}
export function ShopCard(e) {
  return (
    <div className="shop-card new-arrival-card flex flex-col justify-center text-center relative">
      <div className="img-container relative">
        <img src={e.img} alt={e.id} loading="lazy" />
        <div className="show-btns flex gap-1">
          <AddToWhishList item={e} />
          <AddToCart text={true} item={e} />
          <Link
            className="inspect-icon"
            to={"/shop/" + e.id}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FiEye />
          </Link>
        </div>
      </div>
      <Link
        to={"/shop/" + e.id}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {e.name}
      </Link>

      <CardPrice e={e} additionalClass={" justify-center"} />
      <Rating name="read-only" value={4} readOnly />
    </div>
  );
}

export function ShopListProduct({ e }) {
  return (
    <div className="searched-prod items-center flex gap-8">
      <div className="left">
        <Link to={"/shop/" + e.id}>
          <img src={e.img} loading="lazy" alt={e.name} />
        </Link>
      </div>

      <div className="right  flex gap-4  flex-col">
        <div className="">
          <h4>
            <Link to={"/shop/" + e.id}>{e.name}</Link>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            quisquam hic quod quis exercitationem ipsum. Accusamus tenetur neque
            recusandae rem necessitatibus quasi repudiandae quos, in dolorem
            est, perspiciatis sapiente sint.
          </p>
          <Rating name="read-only" value={4} readOnly />
          <CardPrice e={e} />
        </div>
        <div className="icons flex gap-4 ">
          <AddToCart item={e} />
          <AddToWhishList item={e} />
        </div>
      </div>
    </div>
  );
}
export function SingleProduct({ e }) {
  return (
    <div className="searched-prod items-center flex justify-between gap-8">
      <div className="left">
        <img src={e.img} loading="lazy" alt={e.name} width={"200px"} />
      </div>
      <div className="right tab:items-center flex gap-4 tab:justify-between tab:flex-row flex-col">
        <div className="">
          <Rating name="read-only" value={4} readOnly />
          <h4>
            <Link
              to={"/shop/" + e.id}
              onClick={() => {
                document
                  .querySelector(".searchbar-container .close-btn ")
                  .click();
              }}
            >
              {e.name}
            </Link>
          </h4>
          <CardPrice e={e} />
        </div>
        <div className="icons flex gap-4 tab:flex-col ">
          <AddToCart item={e} />
          <AddToWhishList item={e} />
        </div>
      </div>
    </div>
  );
}
export function PageLayout({ head, links }) {
  return (
    <div className="layout">
      <div className="flex flex-col justify-center items-center">
        <h1>{head}</h1>
        <div className="flex gap-2 items-center flex-wrap">
          {links.map((el) => {
            return (
              <React.Fragment key={el}>
                <Link to={el === "home" ? "/" : "/" + el}>{el}</Link>
                <BiSolidChevronRight />
              </React.Fragment>
            );
          })}
          <a>{head}</a>
        </div>
      </div>
    </div>
  );
}
export function CustomHeader({ icon, text, head }) {
  return (
    <div className="custom-header">
      <div className="flex gap-2 items-center">
        <div className="icon">{icon}</div>
        {text}
      </div>
      <h1> {head}</h1>
    </div>
  );
}
