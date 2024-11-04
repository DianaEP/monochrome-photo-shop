import { useState } from "react";
import classes from "./Auth.module.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import validation from "../../util/validation";
import useFormValidation from "../../hooks/useFormValidation";

const registerInput = [
  { type: "text", label: "First Name", id: "firstName", name: "firstName" },
  { type: "text", label: "Last Name", id: "lastName", name: "lastName" },
  { type: "email", label: "Email", id: "email", name: "email" },
  { type: "password", label: "Password", id: "password", name: "password" },
  { type: "password", label: "Confirm Password", id: "confirmPassword", name: "confirmPassword"},
];

const initialRegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

export default function Register() {
  const{formData, setFormData, errors, handleChange, validateOnSubmit} = useFormValidation(initialRegisterData, 'register')
  
  function handleSubmit(e) {
    e.preventDefault();
    if(validateOnSubmit()){
        console.log(formData);
        setFormData(initialRegisterData);

    }
    
  }
  return (
    <form onSubmit={handleSubmit}>
      {registerInput.map((input) => (
        <div key={input.id}>
          <Input
            type={input.type}
            label={input.label}
            id={input.id}
            name={input.name}
            onChange={handleChange}
            value={formData[input.name]}
          />
          {errors[input.name] && (
            <span className={classes.error}>{errors[input.name]}</span>
          )}
        </div>
      ))}

      <Button>Register</Button>
    </form>
  );
}

{
  /* <Input
        type="text"
        label="First Name"
        id="firstName"
        onChange={handleChange}
        value={formData.firstName}
        name="firstName"
      />
      {errors.password && (
        <span className={classes.error}>{errors.password}</span>
      )}
      <Input
        type="text"
        label="Last Name"
        id="lastName"
        onChange={handleChange}
        value={formData.lastName}
        name="lastName"
      />
      <Input
        type="email"
        label="Email"
        id="email"
        onChange={handleChange}
        value={formData.email}
        name="email"
      />
      <Input
        type="password"
        label="Password"
        id="Password"
        onChange={handleChange}
        value={formData.password}
        name="password"
      />
      <Input
        type="password"
        label="Confirm Password"
        id="confirmPassword"
        onChange={handleChange}
        value={formData.confirmPassword}
        name="confirmPassword"
      /> */
}
