import { useState } from "react"
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
import Button from "../UI/Button"

export default function AuthPage(){
    const[isLogin, setIsLogin] = useState(true)

    const toggleForm = () => setIsLogin(!isLogin)
    return(
        <>
            <div>
                <h1>{isLogin ? 'LOGIN' : 'REGISTER'}</h1>
                {isLogin ? (
                    <Login/>
                ) : (
                    <Register/>
                )}
                <span>You don't have an account?</span>
                <Button onClick={toggleForm} textOnly>{isLogin ? 'Go to Register' : 'Go to Login'}</Button>
            </div>
        </>
    )
}