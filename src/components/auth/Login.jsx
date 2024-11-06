import { useContext, useState } from "react";
import Input from "../../UI/Input";
import classes from "./Auth.module.css";
import Button from "../../UI/Button";
import validation from "../../util/validation";
import useFormValidation from "../../hooks/useFormValidation";
import AuthContext from "../../store/AuthContext";
import Loading from "../Loading";
import ErrorBlock from "../ErrorBlock";
import { useNavigate } from "react-router-dom";

const initialLoginData = {
    email: "",
    password: "",
  };

export default function Login() {
  const navigate = useNavigate();
  const{formData, setFormData, errors, validateOnSubmit, handleChange, scope}  = useFormValidation(initialLoginData, 'login')

  const{mutateLogin, isLoadingLogin, isErrorLogin, errorLogin} = useContext(AuthContext);

  if(isLoadingLogin){
    return <Loading message='Loading Login...'/>
  }

  if(isErrorLogin){
    return <ErrorBlock title={errorLogin.info} message={errorLogin.message} status={errorLogin.code} />
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if(validateOnSubmit()){
        console.log(formData);
        mutateLogin(formData);
        setFormData(initialLoginData);
        navigate("/");
    }  
  }
  return (
    <form onSubmit={handleSubmit} className={classes.authLogin} ref={scope}>
      <div className={classes.formAuth}>
        <Input
          type="email"
          label="Email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          name="email"
          className={errors.email ? 'errorInput' : ''}
        />
        {errors.email && <span className={classes.error}>{errors.email}</span>}
        <Input
          type="password"
          label="Password"
          id="Password"
          onChange={handleChange}
          value={formData.password}
          name="password"
          className={errors.password ? 'errorInput' : ''}
        />
        {errors.password && (
          <span className={classes.error}>{errors.password}</span>
        )}
      </div>
      <Button>Login</Button>
    </form>
  );
}
