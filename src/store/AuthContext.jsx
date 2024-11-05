import { createContext, useState } from "react";
import { login, register } from "../util/http";
import { useMutation } from "@tanstack/react-query";


const AuthContext = createContext();

export function AuthContextProvider({children}){
    const[isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
    
    const{mutate: mutateLogin, isLoading: isLoadingLogin, isError: isErrorLogin,  error: errorLogin } = useMutation({
        mutationFn: login,
        onSuccess : (data) => { 
          localStorage.setItem('authToken', data.idToken)  
          setIsLoggedIn(true)
        }
      })
      const{mutate: mutateRegister, isLoading: isLoadingRegister, isError: isErrorRegister,  error: errorRegister } = useMutation({
        mutationFn: register,
        onSuccess : (data) => { 
          localStorage.setItem('authToken', data.idToken)  
          setIsLoggedIn(true)
        }
      })

      const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false)
        
      }

      const authContext ={
        mutateLogin,
        isLoadingLogin,
        isErrorLogin,
        errorLogin,
        mutateRegister,
        isLoadingRegister,
        isErrorRegister,
        errorRegister,
        handleLogout,
        isLoggedIn
      }

      return(
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
      )
}

export default AuthContext;