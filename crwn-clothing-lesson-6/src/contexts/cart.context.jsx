import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=> {},
    removeItemFromCart: ()=>{},
    cartCount: 0,
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartitem)=>total + cartitem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemToCart = (cartItemToRemove)=>{
        setCartItems(decrementCartItem(cartItems, cartItemToRemove))
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart}
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}