import { useContext, useState } from "react";
import classes from "./Auth.module.css";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import validation from "../../util/validation";
import useFormValidation from "../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import Loading from "../loading-block/Loading";
import ErrorBlock from "../error-block/ErrorBlock";

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
  const navigate = useNavigate();
  const{formData, setFormData, errors, handleChange, validateOnSubmit, scope} = useFormValidation(initialRegisterData, 'register');

  const{mutateRegister, isLoadingRegister, isErrorRegister, errorRegister} = useContext(AuthContext);

  if(isLoadingRegister){
    return <Loading message='Loading Login...'/>
  }

  if(isErrorRegister){
    return <ErrorBlock title={errorRegister.info} message={errorRegister.message} status={errorRegister.code} />
  }
  
  
  function handleSubmit(e) {
    e.preventDefault();
    if(validateOnSubmit()){
        const{confirmPassword, ...registerData} = formData;

        console.log(registerData);
        mutateRegister(registerData);
        setFormData(initialRegisterData);
        navigate("/");

    }
    
  }
  return (
    <form onSubmit={handleSubmit} className={classes.authRegister} ref={scope}>
      {registerInput.map((input) => (
        <div key={input.id} className={classes.formAuth}>
          <Input
            type={input.type}
            label={input.label}
            id={input.id}
            name={input.name}
            onChange={handleChange}
            value={formData[input.name]}
            className={errors[input.name] ? 'errorInput' : ''}
          />
          {errors[input.name] && (
            <span className={classes.error}>{errors[input.name]}</span>
          )}
        </div>
      ))}

      <div className={classes.registerButton}>
        <Button>Register</Button>
      </div>

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
