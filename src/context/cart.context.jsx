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

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id 
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
    } else {
        return cartItems.filter(item => item.id !== productToRemove.id)
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(item => item.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    totalItemQuantity: 0,
    totalPrice: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItemQuantity, setTotalItemQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 
            0
        );
        setTotalItemQuantity(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartPrice = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 
            0
        );
        setTotalPrice(newCartPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen,  
        cartItems, 
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        totalItemQuantity,
        totalPrice};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}