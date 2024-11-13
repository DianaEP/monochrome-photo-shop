import { useState } from "react"
import Login from "../../components/auth/Login"
import Register from "../../components/auth/Register"
import Button from "../../UI/button/Button"
import classes from './AuthPage.module.css'

export default function AuthPage(){
    const[isLogin, setIsLogin] = useState(true)

    const toggleForm = () => setIsLogin(!isLogin)
    return(
        <>
            <div className={classes.authPage}>
                <h1>{isLogin ? 'LOGIN' : 'REGISTER'}</h1>
                {isLogin ? (
                    <Login/>
                ) : (
                    <Register/>
                )}
                <div className={classes.haveAccount}>
                    <span>{isLogin ? "You don't have an account?" : "Do you have an account?"}</span>
                    <Button onClick={toggleForm} textOnly>{isLogin ? 'Go to Register' : 'Go to Login'}</Button>
                </div>
            </div>
        </>
    )
}