import { motion } from "framer-motion";
import { useState } from "react";
export function Input({ e, id, className, pattern, type, register, errors }) {
  const [inputType, setInputType] = useState(type);
  return (
    <div className={"custom-input " + className}>
      <label className="relative">
        <input type={inputType} {...register(id, pattern)} id={id} />
        {type === "password" ? (
          <>
            <p
              onClick={() => {
                setInputType(inputType === "password" ? "text" : "password");
              }}
            >
              {inputType === "password" ? "show" : "hide"}
            </p>
          </>
        ) : null}
        <span className="absolute">{e}</span>
      </label>
      <motion.p layout className="error">
        {errors[id]?.message}
      </motion.p>
    </div>
  );
}
export function CustonSingleItemInput({ props, register, errors }) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="single-input">
      <label className="flex gap-5">
        {props.text}
        <input
          id={props.id}
          {...register(props.id, {
            required: {
              value: true,
              message: props.message,
            },
          })}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <p className="error">{errors[props.id]?.message}</p>
    </div>
  );
}
