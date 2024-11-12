import { createContext, useState} from "react";

const ModalContextActions = createContext({
    isOpen: false,
    isOpenUser: false,
    isOpenDeleteAccount: false,
    showCart: ()=>{},
    hideCart: ()=>{},
    showUser: ()=>{},
    hideUser: ()=>{},
    showDelete: ()=>{},
    hideDelete: ()=>{},
})

export  function ModalContextActionsProvider({children}){
    const[showCartModal,setShowCartModal] = useState(false);
    const[showUserModal,setShowUserModal] = useState(false);
    const[showDeleteModal,setShowDeleteModal] = useState(false);

    // CART
    function showCart(){
        setShowCartModal(true)
    }

    function hideCart(){
        setShowCartModal(false)
    }

    // USER DETAILS
    function showUser(){
        setShowUserModal(true)
    }

    function hideUser(){
        setShowUserModal(false)
    }

    // DELETE ACCOUNT
    function showDelete(){
        setShowDeleteModal(true)
    }

    function hideDelete(){
        setShowDeleteModal(false)
    }

    const modalContext = {
        isOpen: showCartModal,
        isOpenUser : showUserModal,
        isOpenDeleteAccount : showDeleteModal,
        showCart,
        hideCart,
        showUser,
        hideUser,
        showDelete,
        hideDelete
    }
    return(
        <ModalContextActions.Provider value={modalContext}>{children}</ModalContextActions.Provider>
    )
}

export default ModalContextActions;