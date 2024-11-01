import { currencyFormatter } from "../util/formatting";
import classes from "./CartProduct.module.css";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

export default function CartProduct({ product }) {
  return (
    <li className={classes.productList}>
      <img src={product.imageUrl} alt={product.title} />

      <div>
        <div className={classes.cartProductDetails}>
          <span>{product.title}</span> -{" "}
          <span>
            {product.quantity} x {currencyFormatter.format(product.price)}
          </span>
        </div>
        <div className={classes.cartActions}>
          <button><FaPlus /></button>
          <span>{product.quantity}</span>
          <button><FaMinus /></button>
        </div>
      </div>
    </li>
  );
}
