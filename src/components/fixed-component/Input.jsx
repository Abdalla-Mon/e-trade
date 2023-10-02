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
