import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishList } from "../../redux/cartSlice";
import { AiOutlineClose } from "react-icons/ai";
import { AddToCart, handleWishList } from "../fixed-component/FixedComponent";

export default function Whishlist() {
  const cartData = useSelector((e) => e.cart);
  const dispatch = useDispatch();
  if (cartData.wishList.length === 0) {
    return (
      <div className="cart text-center">
        <h1>Empty Whish List</h1>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="container mx-auto">
        <div className="flex cart-header justify-between">
          <h4>Your Whish List</h4>
          <h6
            onClick={() => {
              dispatch(addToWishList([[], 0]));
            }}
          >
            Clear your Wish List
          </h6>
        </div>
        <div className="cart-table">
          <CartTable />
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
const tableHead = ["", "Product", "", "Price", "Stock Status", ""];
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
      {cartData.wishList.map((e) => (
        <TableTd e={e} key={e.name} />
      ))}
    </>
  );
}
function TableTd({ e }) {
  const cartData = useSelector((e) => e.cart);
  const dispatch = useDispatch();
  console.log(e);

  return (
    <tr>
      <td
        className="product-remove"
        onClick={() => {
          dispatch(addToWishList(handleWishList(cartData.wishList, e, true)));
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
      <td className="product-quantity ">In Stock</td>
      <td className="product-subtotal">
        <AddToCart item={e} text={true} />
      </td>
    </tr>
  );
}