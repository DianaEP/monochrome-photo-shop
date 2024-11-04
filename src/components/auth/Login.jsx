import { useState } from "react";
import Input from "../../UI/Input";
import classes from "./Auth.module.css";
import Button from "../../UI/Button";
import validation from "../../util/validation";
import useFormValidation from "../../hooks/useFormValidation";

const initialLoginData = {
    email: "",
    password: "",
  };

export default function Login() {
  const{formData, setFormData, errors, validateOnSubmit, handleChange}  = useFormValidation(initialLoginData, 'login')
  
  function handleSubmit(e) {
    e.preventDefault();
    if(validateOnSubmit()){
        console.log(formData);
        setFormData(initialLoginData);
    }  
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email"
        id="email"
        onChange={handleChange}
        value={formData.email}
        name="email"
      />
      {errors.email && <span className={classes.error}>{errors.email}</span>}
      <Input
        type="password"
        label="Password"
        id="Password"
        onChange={handleChange}
        value={formData.password}
        name="password"
      />
      {errors.password && (
        <span className={classes.error}>{errors.password}</span>
      )}
      <Button>Login</Button>
    </form>
  );
}
