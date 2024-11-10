import { createContext, useEffect, useState } from "react";
import { login, register } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export function AuthContextProvider({children}){
    const[isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

    // checking token validity by compare it with the one firebase
   useEffect(() => {
    async function checkTokenValidity(){
      const token = localStorage.getItem("authToken");
      if(token){
        const user = auth.currentUser;
        
        if(user){
          const firebaseToken = await user.getIdToken();
          if(token !== firebaseToken){
            localStorage.removeItem("authToken");
            localStorage.removeItem('uid')
            setIsLoggedIn(false);
          }
        }
      }
    }
    checkTokenValidity();
   },[])
    
    
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
        localStorage.removeItem('uid')
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