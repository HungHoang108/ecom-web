import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss'

export const CheckOutItem =({cartItem})=> {
    const {name, imageUrl, price, quantity} = cartItem;
    const {removeItemToCart, addItemToCart, decrementItemNumber} = useContext(CartContext)
    

    const clearItemHandler = ()=> removeItemToCart(cartItem)
    const addItemHandler = ()=> addItemToCart(cartItem)
    const decentItemHandler = ()=> decrementItemNumber(cartItem)

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
