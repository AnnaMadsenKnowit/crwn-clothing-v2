import { useEffect } from 'react';
import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
    
};

// const getTotalQuantity = (cartItems) => {
//     return cartItems.reduce((accumulatedValue, currentItem) => {
//         return accumulatedValue += currentItem.quantity
//     }, 0)
// }

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalItemQuantity: 0,
    setTotalItemQuantity: () => {},
});



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItemQuantity, setTotalItemQuantity] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 
            0
        );
        setTotalItemQuantity(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        //setTotalItemQuantity(getTotalQuantity(cartItems));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen,  
        cartItems, 
        addItemToCart, 
        totalItemQuantity};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}