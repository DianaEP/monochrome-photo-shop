import { createContext, useState} from "react";

const ModalContextActions = createContext({
    isOpen: false,
    isOpenUser: false,
    showCart: ()=>{},
    hideCart: ()=>{},
    showUserDetails: ()=>{},
    hideUserDetails: ()=>{},
})

export  function ModalContextActionsProvider({children}){
    const[showCartModal,setShowCartModal] = useState(false);
    const[showUserModal,setShowUserModal] = useState(false);

    function showCart(){
        setShowCartModal(true)
    }

    function hideCart(){
        setShowCartModal(false)
    }

    function showUser(){
        setShowUserModal(true)
    }

    function hideUser(){
        setShowUserModal(false)
    }

    const modalContext = {
        isOpen: showCartModal,
        isOpenUser : showUserModal,
        showCart,
        hideCart,
        showUser,
        hideUser
    }
    return(
        <ModalContextActions.Provider value={modalContext}>{children}</ModalContextActions.Provider>
    )
}

export default ModalContextActions;