import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SubTotal } from "./Checkout";

export default function Right() {
  const [shipping, setShipping] = useState(0);
  return (
    <>
      <OrderSummary />
      <Shipping setShipping={setShipping} />
      <TotalPrice shipping={shipping} />
    </>
  );
}
function OrderSummary() {
  const cartData = useSelector((e) => e.cart);

  return (
    <>
      {cartData.cart.length > 0 ? (
        <>
          <div className="line-items">
            <h1>Order Summary</h1>
            {cartData.cart.map((e) => {
              return (
                <div className="line-item flex gap-6 lap:gap-5" key={e.id}>
                  <div className="img-container">
                    <img src={e.img} alt={e.name} />
                  </div>
                  <div className="product-title">
                    <span>{e.qty}</span>
                    {e.name}
                  </div>
                  <div className="product-price">$ {e.price}.00</div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
}
function Shipping({ setShipping }) {
  const [checked, setChecked] = useState(true);
  return (
    <div className="check-flex flex gap-1 flex-col mb-3 mt-3 shipping">
      <label
        className="check-label gap-4"
        onClick={() => {
          setShipping(0);
          setChecked(true);
        }}
      >
        <input
          type="radio"
          name="setshipping"
          id="free-standred-check"
          checked={checked}
        />
        <div>
          <span className="block">Free Standred delivery</span>
          <p>Shipment may take 5-6 business days</p>
        </div>
      </label>
      <label
        className="check-label gap-4"
        onClick={() => {
          setShipping(35);
          setChecked(false);
        }}
      >
        <input type="radio" name="setshipping" id="express-check" />
        <div>
          <span className="block"> Local: $35.00</span>
          <p>Shipment may take 2-3 business days</p>
        </div>
      </label>
      <label
        className="check-label gap-4"
        onClick={() => {
          setShipping(12);
          setChecked(false);
        }}
      >
        <input type="radio" name="setshipping" id="express-check" />
        <div>
          <span className="block"> Flat rate: $12.00</span>
          <p>Shipment may take 2-3 business days</p>
        </div>
      </label>
    </div>
  );
}
function TotalPrice({ shipping }) {
  let { price, setPrice } = useContext(SubTotal);
  const subTotal = price;
  return (
    <>
      {subTotal ? (
        <div className="sub-total ">
          <div className="flex justify-between items-center">
            <h5>Subtotal</h5>
            <h6 className="">
              $ <span className="subTotal-h">{subTotal}</span>.00{" "}
            </h6>
          </div>
          <div className="flex justify-between items-center">
            <h5>Shibbing</h5>
            <h6>{shipping}</h6>
          </div>
          <div className="flex justify-between items-center">
            <h5>Total</h5>
            <h6>
              $ <span className="subTotal-h2">{subTotal + shipping}.00</span>
            </h6>
          </div>
          <div
            className="checkout-btn"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
          >
            <button
              type="submit"
              onClick={() => {
                setPrice(+price + +shipping);
              }}
            >
              {" "}
              Place Order
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
