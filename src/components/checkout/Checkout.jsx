import { useForm } from "react-hook-form";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Left from "./LeftCheckout";
import Right from "./RightCheckout";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/firebaseConfig";
import { authFnc } from "../auth/AuthProvider";
export const SubTotal = createContext("");
export default function CheckOut() {
  if (!authFnc().logined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  const cartData = useSelector((e) => e.cart);
  if (cartData.cart.length < 1) {
    return (
      <div className="checkout">
        <h1 className="text-center pt-10">Empty Checkout</h1>
      </div>
    );
  }
  let priceState = cartData.cart
    .map((e) => {
      if (e.desc) {
        return (+e.price - e.desc || 0) * e.qty;
      } else {
        return +e.price * e.qty;
      }
    })
    .reduce((acc, curr) => acc + curr);
  const [price, setPrice] = useState(priceState || 0);

  const form = useForm();
  const [formData, setFormData] = useState([]);
  const [review, setReview] = useState(false);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  function submit(e) {
    setFormData(e);
    setReview(true);
  }

  return (
    <SubTotal.Provider value={{ formData, review, price, setPrice }}>
      <section className="checkout">
        <section className="checkout-content">
          {review ? <Review /> : null}
          {price < 1 && review !== null ? <h1>Empty checkout</h1> : null}
          {price > 0 && review !== null ? (
            <div className="container mx-auto">
              <form
                onSubmit={handleSubmit(submit)}
                className="checkout-flex gap-8 flex flex-col lap:flex-row"
                noValidate
              >
                <div className="left lap:w-2/3">
                  <Left register={register} errors={errors} />
                </div>
                <div className="right lap:w-1-3">
                  <Right />
                </div>
              </form>
            </div>
          ) : null}
        </section>
      </section>
    </SubTotal.Provider>
  );
}
async function getUserPrevOrders() {
  const docRef = doc(db, "orders", auth.currentUser?.uid);
  const cartSnap = await getDoc(docRef);
  if (cartSnap.data() === undefined) {
    return [];
  }
  return cartSnap.data().data;
}
async function getOrderNumberAndSetNewOne() {
  const orderRef = doc(db, "orderNumber", "orderNumber");
  const orderNumber = await getDoc(orderRef);
  const newOrderNumber = orderNumber.data().number + 1;
  const newOrder = await setDoc(orderRef, { number: newOrderNumber });
  return newOrderNumber;
}
async function updatingData(data, formData, price) {
  const docRef = doc(db, "orders", auth.currentUser?.uid);

  let userPrevOrders = await getUserPrevOrders();
  let newOrderNumber = await getOrderNumberAndSetNewOne();
  let object = {
    data: data.cart,
    date: new Date(),
    formDetails: formData,
    status: "Processing",
    totalPrice: price,
    orderNumber: newOrderNumber,
  };
  userPrevOrders.push(object);
  const docData = await setDoc(docRef, { data: userPrevOrders });
  return docData;
}
function clearCartData(dispatch, intervel, navigate) {
  dispatch(clearCart());
  window.clearInterval(intervel);
  navigate("/");
}
function Review() {
  const [timer, setTimer] = useState(3);
  const { formData, price } = useContext(SubTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(3);
  const data = useSelector((e) => e.cart);

  useEffect(() => {
    let intervel = window.setInterval(() => {
      if (ref.current < 1) {
        updatingData(data, formData, price);
        clearCartData(dispatch, intervel, navigate);
      } else {
        setTimer((e) => e - 1);
        ref.current--;
      }
    }, 1000);
    return () => window.clearInterval(intervel);
  }, []);
  return (
    <div className="review">
      <div className="container mx-auto">
        <div className="review-data">
          <h1>Order Done in {timer} seconds </h1>
          <h2>
            Redirecting you to home after <span>{timer}</span>
            seconds
          </h2>
          <div className="flex gap-3 justify-between">
            <h4>Your Name:</h4>
            <p>
              {formData.pafirstName} {formData.pasecondName}
            </p>
          </div>
          <div className="flex gap-3 justify-between">
            <h4>Your card:</h4>
            <p>
              {formData.creditcard.slice(0, formData.creditcard.length - 4)}****
            </p>
          </div>
          <div>
            <h4>Your address:</h4>
            <p>{formData.paaddress}</p>
            <p>
              {formData.pacity},{formData.pacountery}
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
