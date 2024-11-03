import { createContext, useReducer } from "react"

const CartContext = createContext({
    products:[],
    addProduct : (product)=>{},
    removeProduct: (id)=>{}
})

function cartReducer(state,action){
    if(action.type === 'ADD_PRODUCT'){
        const existingCartProductIndex = state.products.findIndex( //return -1 if it didn't find an item
            (product) => product.id === action.product.id
        );

        const updatedProducts = [...state.products]

        if(existingCartProductIndex > -1){
            const existingProduct = state.products[existingCartProductIndex]
            const updatedProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity + 1
            }
            updatedProducts[existingCartProductIndex] = updatedProduct;
        }else{
            updatedProducts.push({...action.product, quantity: 1})
        }
        return {
            ...state,
            products : updatedProducts
        }
    }

    if(action.type === 'REMOVE_PRODUCT'){
        const existingCartProductIndex = state.products.findIndex( //return -1 if it didn't find an item
            (product) => product.id === action.id
        );

        const existingProduct = state.products[existingCartProductIndex]
        const updatedProducts = [...state.products];

        if(existingProduct.quantity === 1){
            updatedProducts.splice(existingCartProductIndex, 1);
        }else{
            const updatedProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity - 1,
            }
            updatedProducts[existingCartProductIndex] = updatedProduct
        }
        return {
            ...state,
            products : updatedProducts
        }
    }

    if(action.type === 'CLEAR_CART'){
        return{
            ...state,
            products: []
        }
    }

    return state;
}

export function CartContextProvider({children}){
    const[cartState, dispatchCartAction] = useReducer(cartReducer, { products: [] })
    
    function addProduct(product){
        dispatchCartAction({
            type: 'ADD_PRODUCT',
            product : product, 
        })
    }
    
    function removeProduct(id){
        dispatchCartAction({
            type: 'REMOVE_PRODUCT',
            id, 
        })
    }

    function clearCart(){
        dispatchCartAction({
            type: 'CLEAR_CART',
        })
    }

    const cartContext = {
        products: cartState.products,
        addProduct,
        removeProduct,
        clearCart

    }

    console.log(cartContext);
    
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}



export default CartContext;