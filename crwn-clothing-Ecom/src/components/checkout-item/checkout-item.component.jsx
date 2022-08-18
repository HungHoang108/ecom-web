import { useSelector, useDispatch } from 'react-redux/es/exports';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, decrementItemNumber, removeItemToCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss'

export const CheckOutItem =({cartItem})=> {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    

    const clearItemHandler = ()=> dispatch(removeItemToCart(cartItems,cartItem))
    const addItemHandler = ()=> dispatch(addItemToCart(cartItems,cartItem))
    const decentItemHandler = ()=> dispatch(decrementItemNumber(cartItems,cartItem))

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decentItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}
