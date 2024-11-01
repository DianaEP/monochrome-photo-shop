import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import classes from "./CartProduct.module.css";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import CartContext from "../store/CartContext";

export default function CartProduct({ product }) {
  const cartContext = useContext(CartContext);

  return (
    <li className={classes.productList}>
      <img src={product.imageUrl} alt={product.title} />

      <div className={classes.cartActionsDetails}>
        <div className={classes.cartProductDetails}>
          <span>{product.title}</span> -{" "}
          <span>
            {product.quantity} x {currencyFormatter.format(product.price)}
          </span>
        </div>
        <div className={classes.cartActions}>
          <button onClick={() => cartContext.addProduct(product)}><FaPlus /></button>
          <span>{product.quantity}</span>
          <button onClick={() => cartContext.removeProduct(product.id)}><FaMinus /></button>
        </div>
      </div>
    </li>
  );
}
