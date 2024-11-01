import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import ModalContextActions from "../store/ModalContextActions";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";


export default function Cart() {
  
  const cartContext = useContext(CartContext);
  const modalContext = useContext(ModalContextActions);

  const cartTotal = cartContext.products.reduce((totalPrice, product) => {
    return totalPrice + product.quantity * product.price;
  }, 0);



  return (
    <Modal open={modalContext.isOpen} onClose={modalContext.hideCart}>
      <div className={classes.cart}>
        <h2>Your Cart</h2>
        <div className={classes.cartContent}>
          <ul>
            {cartContext.products.map((product) => (
              <CartProduct key={product.id} product={product}/>
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total: </span>
            <p className={classes.total}>{currencyFormatter.format(cartTotal)}</p>
          </div>
        </div>
        <div className={classes.buttons}>
          <Button onClick={modalContext.hideCart} textOnly>Close</Button>
          {cartContext.products.length > 0 && (
              <Button>Go to Checkout</Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
