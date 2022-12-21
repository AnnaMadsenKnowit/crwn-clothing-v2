import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { removeArticleFromCart } = useContext(CartContext);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'> {quantity} </span>
            <span className='price'> {price} </span>
            <div className='remove-button' onClick={removeArticleFromCart(name)}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;