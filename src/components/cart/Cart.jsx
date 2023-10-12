import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { AiOutlineClose } from "react-icons/ai";
import { CartItem, handleCart } from "../fixed-component/CardBtns";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authFnc } from "../auth/AuthProvider";
export default function Cart() {
  const cartData = useSelector((e) => e.cart);
  const dispatch = useDispatch();
  if (!authFnc().logined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (cartData.cart.length === 0) {
    return (
      <div className="cart text-center">
        <h1>Empty Cart</h1>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="container mx-auto">
        <div className="flex cart-header justify-between">
          <h4>Your Cart</h4>
          <h6
            onClick={() => {
              dispatch(
                addToCart({ cartItems: [], quantity: -cartData.numOfCartItems })
              );
            }}
          >
            Clear your cart
          </h6>
        </div>
        <div className="cart-table">
          <CartTable />
        </div>
        <div className="cart-total">
          <CartTotal />
        </div>
      </div>
    </div>
  );
}
const tableClasses = [
  "product-remove",
  "product-img",
  "product-name",
  "product-price",
  "product-quantity",
  "product-subtotal",
];
function CartTable() {
  return (
    <table>
      <thead>
        <TableThead />
      </thead>
      <tbody>
        <TableBody />
      </tbody>
    </table>
  );
}
const tableHead = ["", "Product", "", "Price", "Quantity", "Subtotal"];
function TableThead() {
  return (
    <tr>
      {tableClasses.map((e, index) => {
        return (
          <th className={e} key={e}>
            {tableHead[index]}
          </th>
        );
      })}
    </tr>
  );
}
function TableBody() {
  const cartData = useSelector((e) => e.cart);
  return (
    <>
      {cartData.cart.map((e) => (
        <TableTd e={e} key={e.name} />
      ))}
    </>
  );
}
function TableTd({ e }) {
  const cartData = useSelector((e) => e.cart);
  const dispatch = useDispatch();

  return (
    <tr>
      <td
        className="product-remove"
        onClick={() => {
          const removeItem = cartData.cart.filter((el) => el.id !== e.id);
          dispatch(addToCart({ cartItems: removeItem, quantity: -e.qty }));
        }}
      >
        <div className="button">
          <AiOutlineClose />
        </div>
      </td>
      <td className="product-img">
        <img src={e.img} alt={e.name} />
      </td>
      <td className="product-name">{e.name}</td>
      <td className="product-price">${e.price - (e.desc || 0)}</td>
      <td className="product-quantity ">
        <div className="flex gap-3 items-center justify-center">
          <Input e={e} />
        </div>
      </td>
      <td className="product-subtotal">${(e.price - (e.desc || 0)) * e.qty}</td>
    </tr>
  );
}
function Input({ e }) {
  const cartSlice = useSelector((state) => state.cart);
  const cartItems = cartSlice.cart.slice();
  const cartItem = new CartItem(e);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="button"
        onClick={() => {
          if (e.qty < 2) {
            null;
          } else {
            const updatedCartItems = handleCart(cartItems, cartItem, -1);
            dispatch(addToCart({ cartItems: updatedCartItems, quantity: -1 }));
          }
        }}
      >
        -
      </div>
      <span>{e.qty}</span>
      <div
        className="button"
        onClick={() => {
          const updatedCartItems = handleCart(cartItems, cartItem, 1);
          dispatch(addToCart({ cartItems: updatedCartItems, quantity: 1 }));
        }}
      >
        +
      </div>
    </>
  );
}
function CartTotal() {
  const cartData = useSelector((e) => e.cart);
  const [shipping, setShipping] = useState(0);
  let price = cartData.cart
    .map((e) => {
      if (e.desc) {
        return (+e.price - e.desc || 0) * e.qty;
      } else {
        return +e.price * e.qty;
      }
    })
    .reduce((acc, curr) => acc + curr);
  let totalPrice = price + shipping;
  return (
    <div className="order-summery">
      <h3>Order Summary</h3>
      <div className="subTotal flex justify-between">
        <div className="left">Subtotal</div>
        <div className="right">${price}</div>
      </div>
      <div className="shipping-options flex justify-between">
        <div className="left">Shipping</div>
        <Shipping setShipping={setShipping} />
      </div>
      <div className="total flex justify-between">
        <div className="left">Total</div>
        <div className="right">${totalPrice}</div>
      </div>
      <button>
        <Link
          to="/checkout"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          Process to checkout
        </Link>
      </button>
    </div>
  );
}
function Shipping({ setShipping }) {
  function handleClick(num, current) {
    setShipping(num);
    document
      .querySelectorAll(".shipping-method")
      .forEach((e) => e.classList.remove("active"));
    current.target.classList.add("active");
  }
  return (
    <div className="right flex flex-col gap-2">
      <div
        className="shipping-method active"
        onClick={(e) => handleClick(0, e)}
      >
        Free Shipping
      </div>
      <div className="shipping-method" onClick={(e) => handleClick(35, e)}>
        Local: $35.00
      </div>
      <div className="shipping-method" onClick={(e) => handleClick(12, e)}>
        Flat rate: $12.00
      </div>
    </div>
  );
}
