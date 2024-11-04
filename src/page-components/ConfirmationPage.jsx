import { useLocation, useNavigate } from "react-router-dom";
import classes from "./ConfirmationPage.module.css";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import { FaTruckFast } from "react-icons/fa6";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;
  console.log(orderData);

  return (
    <div className={classes.confirmationPage}>
      <h1>Order Confirmation</h1>
      {orderData ? (
        <div className={classes.details}>
          <h2>Thank you, {orderData.customer.fullName}!</h2>
          <p className={classes.success}>
            Your order has been placed successfully.
          </p>

          <div className={classes.customerDetails}>
            <div className={classes.orderDetails}>
              <h3>Order Details</h3>
              <ul>
                {orderData.product.map((product) => (
                  <li key={product.id}>
                    {product.quantity} x {product.title} -{" "}
                    {currencyFormatter.format(product.priceTotal)}
                  </li>
                ))}
              </ul>
              <p className={classes.totalAmount}>
                Total Amount: {currencyFormatter.format(orderData.totalAmount)}
              </p>
            </div>

            <div className={classes.shipping}>
              <h3>Shipping Address</h3>
              <p>
                {orderData.customer.address.street},{" "}
                {orderData.customer.address.number},{" "}
                {orderData.customer.address.location}
              </p>
              <span><FaTruckFast /></span>
              <p>
                You will receive an email once your order is out for delivery
              </p>
            </div>
          </div>

          <Button onClick={() => navigate("/products")}>
            Go back to products
          </Button>
        </div>
      ) : (
        <div className={classes.noOrder}>
          <p>No order details available.</p>
          <Button onClick={() => navigate("/products")}>
            Go back to products
          </Button>
        </div>
      )}
    </div>
  );
}
