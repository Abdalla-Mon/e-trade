import { motion } from "framer-motion";
export function Input({ e, id, className, pattern, type, register, errors }) {
  return (
    <div className={"custom-input " + className}>
      <label className="relative">
        <input type={type} {...register(id, pattern)} id={id} />
        <span className="absolute">{e}</span>
      </label>
      <motion.p layout className="error">
        {errors[id]?.message}
      </motion.p>
    </div>
  );
}
