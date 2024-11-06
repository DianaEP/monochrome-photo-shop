import { useState } from "react";
import classes from "./CheckoutForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import validation from "../util/validation";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import { useAnimate } from "framer-motion";

const initialCheckoutData = {
  fullName: "",
  email: "",
  street: "",
  number: "",
  location: "",
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
}

export default function CheckoutForm({onOrderSubmit}) {
  const{formData, setFormData, errors, validateOnSubmit, handleChange, scope}  = useFormValidation(initialCheckoutData, 'checkout', customHandleChange)
  const navigate = useNavigate();

  function customHandleChange(name, value, setFormData){
    if (name === "cardNumber") {
      const cleanedValue = value.replace(/\D/g, ""); // Remove all non-digit characters
      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Format to include spaces every four digits
      setFormData((prevValue) => ({
        ...prevValue,
        [name]: formattedValue.trim(), // Trim in case there are trailing spaces
      }));
    }else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if(validateOnSubmit()){
      console.log("submitted");
      onOrderSubmit(formData); //submit function
      setFormData(initialCheckoutData);
    } 
  }

  return (
    <form onSubmit={handleSubmit} ref={scope}>
      <div className={classes.form}>
        <div className={classes.userDetails}>
          <p>Your details</p>
          <Input
            label="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            className={errors.fullName ? 'errorInput' : ''}
            value={formData.fullName}
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
            value={formData.email}
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
            value={formData.street}
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
                value={formData.number}
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
                value={formData.location}
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
            value={formData.cardholderName}
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
            value={formData.cardNumber}
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
                value={formData.expiryDate}
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
                value={formData.cvv}
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
