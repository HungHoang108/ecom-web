import { useSelector, useDispatch } from "react-redux/es/exports";
import {useNavigate} from 'react-router-dom'

import { Button } from "../button/button.component";
import { CartItem } from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

import './cart-dropdown.styles.scss'


export const CartDropdown = ()=>{
    
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const isCartOpen = useSelector(selectIsCartOpen)
    const navigate = useNavigate()

    const goToCheckOutHandler = ()=>{
        navigate('/checkout')
        dispatch(setIsCartOpen(!isCartOpen))
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            </div>
            <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}