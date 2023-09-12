import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AddToCart() {
  return (
    <div className="cart-icon">
      <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
    </div>
  );
}
export function AddToWhishList() {
  return (
    <div className="love-icon">
      <FontAwesomeIcon icon="fa-solid fa-heart" />{" "}
    </div>
  );
}
