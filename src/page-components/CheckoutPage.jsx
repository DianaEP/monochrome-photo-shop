import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from './CheckoutPage.module.css'
import CheckoutForm from "../components/CheckoutForm";

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const cartTotal = cartContext.products.reduce((totalPrice, product) => {
    return totalPrice + product.quantity * product.price;
  }, 0);

  return (
    <>
      <div className={classes.checkoutPage}>
        <h2>Checkout</h2>
        <div>
          <ul className={classes.productList}>
            {cartContext.products.map((product) => (
              <li key={product.id}>
                <span>{product.quantity}x</span>
                <img src={product.imageUrl} alt={product.tile} />
              </li>
            ))}
          </ul>
          <div className={classes.priceTotal}>
            <span>Total amount: </span>
            <p>{currencyFormatter.format(cartTotal)}</p>
          </div>
        </div>
        <div className={classes.checkoutForm}>
            <CheckoutForm/>
        </div>
      </div>
    </>
  );
}
