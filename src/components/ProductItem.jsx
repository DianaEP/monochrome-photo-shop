import { NavLink } from "react-router-dom";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import classes from './ProductItem.module.css'

export default function ProductItem({ product }) {
  return (
    <li  className={classes.card}>
      <div className={classes.image}>
        <img src={product.imageId} alt="" />
      </div>
      <div className={classes.details}>
        <h3>{product.title}</h3>
        <div className={classes.buy}>
            <p>{currencyFormatter.format(product.price)}</p>
            <button><NavLink to={`/products/${product.id}`}>Order Now</NavLink></button>
        </div>
      </div>
    </li>
  );
}
