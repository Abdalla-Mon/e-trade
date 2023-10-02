import { useForm } from "react-hook-form";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Left from "./LeftCheckout";
import Right from "./RightCheckout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/firebaseConfig";
export const SubTotal = createContext("");
export default function CheckOut() {
  const cartData = useSelector((e) => e.cart);
  if (cartData.cart.length < 1) {
    return (
      <div className="checkout">
        <h1 className="text-center pt-10">Empty Checkout</h1>
      </div>
    );
  }
  let price = cartData.cart
    .map((e) => {
      if (e.desc) {
        return (+e.price - e.desc || 0) * e.qty;
      } else {
        return +e.price * e.qty;
      }
    })
    .reduce((acc, curr) => acc + curr);
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
    <SubTotal.Provider value={{ formData, review }}>
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
function Review() {
  const [timer, setTimer] = useState(5);
  const { formData } = useContext(SubTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(5);
  const data = useSelector((e) => e.cart);

  useEffect(() => {
    const docRef = doc(db, "orders", auth.currentUser.uid);
    async function getData() {
      const cartSnap = await getDoc(docRef);
      if (cartSnap.data() === undefined) {
        return [];
      }
      return cartSnap.data().data;
    }
    async function updatingData() {
      let da = await getData();
      let object = { data: data.cart, date: new Date() };
      da.push(object);
      const docData = await setDoc(docRef, { data: da });
      return docData;
    }
    updatingData();
    let intervel = window.setInterval(() => {
      if (ref.current < 1) {
        window.clearInterval(intervel);
        dispatch(clearCart());
        navigate("/");
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
          <h1>Order Done </h1>
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
