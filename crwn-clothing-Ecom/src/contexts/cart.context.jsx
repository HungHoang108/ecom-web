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

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartitem)=> total + cartitem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartitem)=> total + cartitem.quantity*cartitem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemToCart = (cartItemToRemove)=>{
        setCartItems(clearItemFromCart(cartItems, cartItemToRemove))
    }

    const decrementItemNumber = (cartItemToRemove)=>{
        setCartItems(decrementCartItem(cartItems, cartItemToRemove))
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