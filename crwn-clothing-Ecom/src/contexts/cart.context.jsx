import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd)=>{
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)

    //if found, increase quantity by 1
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id?
            {...cartItem, quantity: cartItem.quantity + 1} :
            cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const decrementCartItem = (cartItems, cartItemToRemove)=>{

    if(cartItemToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    } else {
        return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem)
    }
}

const clearItemFromCart = (cartItems, cartItemToRemove)=>{

            return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        
    }

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=> {},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=> {},
    cartCount: 0,
    removeItemToCart: ()=>{},
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
              ...state,
              isCartOpen: payload
                }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children})=>{

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartitem)=> total + cartitem.quantity, 0)    

        const newCartTotal = newCartItems.reduce((total, cartitem)=> total + cartitem.quantity*cartitem.price, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems,
            cartTotal: newCartTotal, cartCount: newCartCount}))

    }

    const addItemToCart = (productToAdd)=>{
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    const removeItemToCart = (cartItemToRemove)=>{
        const newCartItems =  clearItemFromCart(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const decrementItemNumber = (cartItemToRemove)=>{
        const newCartItems =   decrementCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart,
        clearItemFromCart,
        decrementItemNumber,
        cartTotal
    }
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}