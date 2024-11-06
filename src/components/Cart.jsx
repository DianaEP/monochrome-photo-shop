import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import ModalContextActions from "../store/ModalContextActions";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";


export default function Cart() {
  const navigate = useNavigate()
  const cartContext = useContext(CartContext);
  const modalContext = useContext(ModalContextActions);

  const cartTotal = cartContext.products.reduce((totalPrice, product) => {
    return totalPrice + product.quantity * product.price;
  }, 0);

  function handleNavigate(){
    modalContext.hideCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {modalContext.isOpen && 
        <Modal open={modalContext.isOpen} onClose={modalContext.hideCart}>
          <div className={classes.cart}>
            <h2>Your Cart</h2>
            <div className={classes.cartContent}>
              <motion.ul variants={{ visible: {transition: {staggerChildren: 0.1}}}}>
                {cartContext.products.map((product) => (
                  <CartProduct key={product.id} product={product}/>
                ))}
              </motion.ul>
              <div className={classes.total}>
                <span>Total: </span>
                <p className={classes.total}>{currencyFormatter.format(cartTotal)}</p>
              </div>
            </div>
            <div className={classes.buttons}>
              <Button onClick={modalContext.hideCart} textOnly>Close</Button>
              {cartContext.products.length > 0 && (
                  <Button onClick={handleNavigate}>Go to Checkout</Button>
              )}
            </div>
          </div>
        </Modal>
      }
    </AnimatePresence>
  );
}
