import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishList } from "../../redux/cartSlice";
import { motion } from "framer-motion";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { auth } from "../../firebaseConfig/firebaseConfig";
export function AlertDialog({ children, className }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You have to login first"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can&apos;t add to cart or wishlist unless you singed in
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Link to="/login">Sing in?</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
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
    <>
      {!auth.currentUser ? (
        <>
          <AlertDialog className={"add-to-container"}>
            {" "}
            <div
              className={
                item.stock
                  ? "cart-icon flex item-center gap-2"
                  : "cart-icon out-of-stock flex item-center gap-2"
              }
            >
              {item.stock ? (
                <>
                  {" "}
                  {text ? (
                    <>
                      <FaCartPlus /> Add to cart
                    </>
                  ) : (
                    <LiaCartPlusSolid />
                  )}{" "}
                </>
              ) : (
                "Out of stock"
              )}
            </div>
          </AlertDialog>
        </>
      ) : (
        <div
          className="cart-icon flex item-center gap-2"
          onClick={() => {
            if (item.stock === true) {
              const updatedCartItems = handleCart(
                cartItems,
                cartItem,
                quantity
              );

              dispatch(addToCart({ cartItems: updatedCartItems, quantity }));
              addToCartPopup(item.id);
            }
          }}
        >
          {item.stock === true ? (
            <>
              {" "}
              {text ? (
                <>
                  <FaCartPlus /> Add to cart
                </>
              ) : (
                <LiaCartPlusSolid />
              )}{" "}
            </>
          ) : (
            "Out of stock"
          )}
        </div>
      )}
    </>
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
    <>
      {!auth.currentUser ? (
        <AlertDialog>
          <WisthListBtnContent
            added={added}
            setAdded={setAdded}
            dispatch={dispatch}
            wishListItems={wishListItems}
            item={item}
            signIn={auth.currentUser}
          />
        </AlertDialog>
      ) : (
        <WisthListBtnContent
          added={added}
          setAdded={setAdded}
          dispatch={dispatch}
          wishListItems={wishListItems}
          item={item}
        />
      )}
    </>
  );
}
function WisthListBtnContent({
  added,
  setAdded,
  dispatch,
  wishListItems,
  item,
  signIn = true,
}) {
  return (
    <div
      className="love-icon"
      onClick={() => {
        if (signIn) {
          dispatch(addToWishList(handleWishList(wishListItems, item, added)));
          setAdded(!added);
        }
      }}
    >
      {added && signIn ? (
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
