import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import classes from './CheckoutPage.module.css'
import CheckoutForm from "../../components/checkout-form/CheckoutForm";
import { useMutation } from "@tanstack/react-query";
import { postOrders } from "../../util/http";
import Loading from "../../components/loading-block/Loading";
import ErrorBlock from "../../components/error-block/ErrorBlock";
import { animate, AnimatePresence, motion } from "framer-motion";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const cartTotal = cartContext.products.reduce((totalPrice, product) => {
    return totalPrice + product.quantity * product.price;
  }, 0);

  const{mutate, isLoading, isError,  error } = useMutation({
    mutationFn: postOrders,
    onSuccess : (data, variables) => { // variables is tha data send on mutate function(orderData)
      cartContext.clearCart();
      navigate("/confirmation", {state: variables});
    }
  })

  function handleOrderSubmit(checkoutData){
    const orderData = {
        customer: {
            fullName : checkoutData.fullName,
            email: checkoutData.email,
            address: {
                street: checkoutData.street,
                number: checkoutData.number,
                location: checkoutData.location,
            },
        },
        product: cartContext.products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,  
            priceTotal: product.quantity * product.price,
        })),
        totalAmount: cartTotal,
        timestamp: new Date().toISOString(),
    }
    mutate(orderData);
  }

  if(isLoading){
    return (
      <Loading message='Submitting...'/>
    )
  }

  if(isError){
    return(
      <ErrorBlock title={error.info} message={error.message} status={error.code}/>
    )
  }

  

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const checkoutProducts = {
    hidden: { opacity: 0, scale: 0.5},
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, duration: 0.5 } }
  }

  return (
    <>
      <div className={classes.checkoutPage}>
        <h2>Checkout</h2>
        <div>

          <motion.ul 
            className={classes.productList}
            variants={container}
            initial="hidden"
            animate="show"  
          >
            {cartContext.products.map((product) => (
              <li 
                key={product.id}
              >
                <span>{product.quantity}x</span>
                <motion.img 
                  src={product.imageUrl} 
                  alt={product.title}
                  variants={checkoutProducts}
                   />
              </li>
            ))}
          </motion.ul>
          <div className={classes.priceTotal}>
            <span>Total amount: </span>
            <p>{currencyFormatter.format(cartTotal)}</p>
          </div>
        </div>
        <div className={classes.checkoutForm}>
            <CheckoutForm onOrderSubmit={handleOrderSubmit} />
        </div>
      </div>
    </>
  );
}
