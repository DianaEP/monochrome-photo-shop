import { useState } from "react";
import classes from "./CheckoutForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import validation from "../util/validation";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({onOrderSubmit}) {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState({
    fullName: "",
    email: "",
    street: "",
    number: "",
    location: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '', // Reset the error for the current input field
    }));

    if (name === "cardNumber") {
      const cleanedValue = value.replace(/\D/g, ""); // Remove all non-digit characters
      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Format to include spaces every four digits
      setCheckout((prevValue) => ({
        ...prevValue,
        [name]: formattedValue.trim(), // Trim in case there are trailing spaces
      }));
    } else {
      setCheckout((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validation(checkout);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }
    console.log("submitted");
    onOrderSubmit(checkout); //submit function
    setCheckout({
      fullName: "",
      email: "",
      street: "",
      number: "",
      location: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
   
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.form}>
        <div className={classes.userDetails}>
          <p>Your details</p>
          <Input
            label="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            className={errors.fullName ? 'errorInput' : ''}
            value={checkout.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className={classes.error}>{errors.fullName}</span>
          )}

          <Input
            label="E-Mail Address"
            type="email"
            id="email"
            name="email"
            className={errors.email ? 'errorInput' : ''}
            value={checkout.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={classes.error}>{errors.email}</span>
          )}

          <Input
            label="Street"
            type="text"
            id="street"
            name="street"
            className={errors.street ? 'errorInput' : ''}
            value={checkout.street}
            onChange={handleChange}
          />
          {errors.street && (
            <span className={classes.error}>{errors.street}</span>
          )}

          <div className={classes.address}>
            <div>
              <Input
                label="Number"
                type="text"
                id="number"
                name="number"
                // className='width'
                className={`${errors.number ? 'errorInputMultiple' : 'width'}`}
                value={checkout.number}
                onChange={handleChange}
              />
              {errors.number && (
                <span className={classes.error}>{errors.number}</span>
              )}
            </div>

            <div>
              <Input
                label="Location"
                type="text"
                id="location"
                name="location"
                className={errors.location ? 'errorInput' : ''}
                value={checkout.location}
                onChange={handleChange}
              />
              {errors.location && (
                <span className={classes.error}>{errors.location}</span>
              )}
            </div>
          </div>
        </div>

        <div className={classes.card}>
          <p>Card details</p>
          <Input
            label="Cardholder Name:"
            type="text"
            id="cardholderName"
            name="cardholderName"
            className={errors.cardholderName ? 'errorInput' : ''}
            value={checkout.cardholderName}
            onChange={handleChange}
          />
          {errors.cardholderName && (
            <span className={classes.error}>{errors.cardholderName}</span>
          )}  
          <Input
            label="Card Number (enter 1234 5678 1234 5678):"
            type="text"
            id="cardNumber"
            name="cardNumber"
            className={errors.cardNumber ? 'errorInput' : ''}
            value={checkout.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && (
            <span className={classes.error}>{errors.cardNumber}</span>
          )}

          <div className={classes.cardDetails}>
            <div>
              <Input
                label="Expiry Date (MM/YY):"
                type="text"
                id="expiryDate"
                name="expiryDate"
                // className="width"
                className={`${errors.expiryDate ? 'errorInputMultiple' : 'width'}`}
                value={checkout.expiryDate}
                onChange={handleChange}
              />
              {errors.expiryDate && (
                <span className={classes.error}>{errors.expiryDate}</span>
              )}
            </div>
            <div>
              <Input
                label="CVV (enter 123):"
                type="password"
                id="cvv"
                name="cvv"
                // className="width"
                className={`${errors.cvv ? 'errorInputMultiple' : 'width'}`}
                value={checkout.cvv}
                onChange={handleChange}
              />
              {errors.cvv && (
                <span className={classes.error}>{errors.cvv}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.buttonsCheckout}>
        <Button textOnly type="button" onClick={() => navigate("/products")}>
          Cancel
        </Button>
        <Button type="submit">Submit Order</Button>
      </div>
    </form>
  );
}
