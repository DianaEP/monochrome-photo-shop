import { useLocation } from "react-router-dom";
import classes from "./Button.module.css";

export default function Button({ children, onClick, textOnly, ...props }) {
  return (
    <button
      onClick={onClick}
      className={textOnly ? classes.buttonText : classes.button}
      {...props}
    >
      {children}
    </button>
  );
}
