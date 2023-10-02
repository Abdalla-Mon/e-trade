import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Left({ register, errors }) {
  return (
    <>
      <BillingAddres register={register} errors={errors} />
      <Payment register={register} errors={errors} />
    </>
  );
}

function BillingAddres({ register, errors }) {
  return (
    <div className="billing-address">
      <h1 className="form-heading">Billing Address</h1>
      <div className="tab:flex gap-6">
        <Inputs
          e="First Name"
          id="pafirstName"
          className="tab:w-3/6"
          register={register}
          errors={errors}
          type="text"
          pattern={{
            required: {
              value: true,
              message: "Please enter your first name",
            },
          }}
        />
        <Inputs
          e="Second Name"
          id="pasecondName"
          errors={errors}
          className="tab:w-3/6"
          type="text"
          register={register}
          pattern={{
            required: {
              value: true,
              message: "Please enter your second name",
            },
          }}
        />
      </div>
      <div>
        <Inputs
          e="Email"
          id="email"
          errors={errors}
          className="w-6/6"
          register={register}
          type="email"
          pattern={{
            required: {
              value: true,
              message: "Please enter your email",
            },
            pattern: {
              value: /\w+@[a-z]+\.[a-z]{2,}/gi,
              message: "Please enter a valid email",
            },
          }}
        />
      </div>
      <div>
        <Inputs
          e="Address"
          id="paaddress"
          errors={errors}
          className="w-6/6"
          register={register}
          pattern={{
            required: {
              value: true,
              message: "Please enter your address",
            },
          }}
        />
      </div>
      <div>
        <Inputs
          e="Address 2"
          id="paaddress2"
          errors={errors}
          className="w-6/6"
          register={register}
          type="text"
        />
      </div>
      <div className="tab:flex gap-6">
        <Select
          el="Countery"
          className="lap:w-2/6"
          id="pacountery"
          errors={errors}
          register={register}
          options={["Egypt", "Syria"]}
        />
        <Select
          el="City"
          className="lap:w-2/6"
          id="pacity"
          errors={errors}
          register={register}
          options={["Giza", "Cairo"]}
        />
        <Inputs
          e="Zip Code"
          id="pazip"
          errors={errors}
          className="lap:w-6/6"
          register={register}
          type="number"
          pattern={{
            required: {
              value: true,
              message: "Please enter your city zip",
            },
          }}
        />
      </div>
    </div>
  );
}
function Payment({ register, errors }) {
  const [checked, setChecked] = useState(true);

  return (
    <div className="payment">
      <h1 className="form-heading">Payment Details</h1>
      <div className="check-flex flex gap-1 flex-col mb-3 mt-3">
        <label className="check-label" onClick={() => setChecked(true)}>
          <input
            type="radio"
            name="payment"
            id="credit-check"
            checked={checked}
          />
          <span>Credit card</span>
        </label>
        <label className="check-label" onClick={() => setChecked(false)}>
          <input type="radio" name="payment" id="debit-check" />
          <span>Debit card</span>
        </label>
        <label className="check-label" onClick={() => setChecked(false)}>
          <input type="radio" name="payment" id="paypal-check" />
          <span>PayPal </span>
        </label>
      </div>
      <div className="handle-error">
        <div>
          <Inputs
            e="Credit card number"
            id="creditcard"
            errors={errors}
            className="tab:w-3/6"
            type="number"
            register={register}
            pattern={{
              required: {
                value: true,
                message: "Please enter your credit card number",
              },
              pattern: {
                value:
                  /[0-9]{16}/ ||
                  /^(?:4[0-9]{12}(?:[0-9]{3})?)$/ ||
                  /^(?:3[47][0-9]{13})$/,
                message: "Wrong card number (16||13 number)",
              },
            }}
          />
        </div>
        <div className="tab:flex gap-6">
          <Inputs
            e="Card name"
            id="cardName"
            errors={errors}
            className="tab:w-2/6"
            type="text"
            register={register}
            pattern={{
              required: {
                value: true,
                message: "Please enter your  card name",
              },
            }}
          />
          <Inputs
            e="Expiry date"
            id="expDate"
            errors={errors}
            className="tab:w-2/6 expDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            register={register}
            pattern={{
              required: {
                value: true,
                message: "Please enter the expiry date",
              },
            }}
          />
          <Inputs
            e="CVV"
            id="cvv"
            errors={errors}
            className="tab:w-2/6"
            type="number"
            register={register}
            pattern={{
              required: {
                value: true,
                message: "Please enter your CVV",
              },
            }}
          />
        </div>{" "}
      </div>
    </div>
  );
}
export function Select({
  el,
  id,
  className,
  pattern,
  type,
  register,
  errors,
  options,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={"handle-error " + className}>
      <motion.label
        className={"fixed-label w-full"}
        htmlFor={id}
        onBlur={() => setFocus(false)}
        initial={{ border: "1px solid #ffffff" }}
        animate={
          focus
            ? { borderColor: "rgb(236 242 252)" }
            : { borderColor: "#ffffff" }
        }
      >
        <motion.select
          id={id}
          type={type}
          onFocus={() => setFocus(true)}
          {...register(id, {
            pattern,
          })}
        >
          <option disabled>{el}</option>
          {options.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </motion.select>
      </motion.label>
      <p className="error">{errors[id]?.message}</p>
    </div>
  );
}
export function Inputs({ e, id, className, pattern, type, register, errors }) {
  const [focus, setFocus] = useState(false);
  const [zoom, setZoom] = useState(false);
  let x = document.querySelector("#" + id);
  useEffect(() => {
    if (x) {
      if (x.value !== "") {
        setZoom(true);
      }
    }
  }, []);
  return (
    <div className={"handle-error " + className}>
      <motion.label
        className={"fixed-label w-full"}
        htmlFor={id}
        onBlur={() => {
          setFocus(false);
          x.value === "" && className !== "tab:w-2/6 expDate"
            ? setZoom(false)
            : null;
        }}
        initial={{ border: "1px solid #ffffff" }}
        animate={
          focus
            ? { borderColor: "rgb(236 242 252)" }
            : { borderColor: "#ffffff" }
        }
      >
        <motion.h5 initial={{ top: 0, fontSize: "14px" }}>{e}</motion.h5>
        <motion.input
          id={id}
          type={type}
          onFocus={() => {
            setFocus(true);
            setZoom(true);
          }}
          {...register(id, pattern)}
        />
      </motion.label>
      <p className="error">{errors[id]?.message}</p>
    </div>
  );
}
