import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from './CheckoutPage.module.css'
import CheckoutForm from "../components/CheckoutForm";
import { useMutation } from "@tanstack/react-query";
import { postOrders } from "../util/http";
import Loading from "../components/Loading";
import ErrorBlock from "../components/ErrorBlock";

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
            <CheckoutForm onOrderSubmit={handleOrderSubmit} />
        </div>
      </div>
    </>
  );
}
