import classes from "./Button.module.css";
import { motion } from "framer-motion";

export default function Button({ children, onClick, textOnly, ...props }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1, 
        transition: {
          type: 'spring', 
          stiffness: 500
        }}}
      onClick={onClick}
      className={textOnly ? classes.buttonText : classes.button}
      {...props}
    >
      {children}
    </motion.button>
  );
}
