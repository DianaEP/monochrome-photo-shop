import { createContext, useState} from "react";

const ModalContextActions = createContext({
    isOpen: false,
    showCart: ()=>{},
    hideCart: ()=>{},
})

export  function ModalContextActionsProvider({children}){
    const[showModal,setShowModal] = useState(false);

    function showCart(){
        setShowModal(true)
    }

    function hideCart(){
        setShowModal(false)
    }

    const modalContext = {
        isOpen: showModal,
        showCart,
        hideCart,
    }
    return(
        <ModalContextActions.Provider value={modalContext}>{children}</ModalContextActions.Provider>
    )
}

export default ModalContextActions;