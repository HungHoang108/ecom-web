import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) => {
   return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
}

export const addItemToCart = (cartItems, productToAdd)=>{
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
export const removeItemToCart = (cartItems, cartItemToRemove)=>{
    const newCartItems =  clearItemFromCart(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const decrementItemNumber = (cartItems, cartItemToRemove)=>{
    const newCartItems =   decrementCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}


const addCartItem = (cartItems, productToAdd)=>{

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)

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

