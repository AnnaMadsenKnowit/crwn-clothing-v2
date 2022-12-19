import { createContext, useState } from 'react';

export const CartContext = createContext({
    //products: [],
    isCartOpen: false,
    //setCurrentProducts: () => null,
    setIsCartOpen: () => {},

});

export const CartProvider = ({ children }) => {
    //const [products, setCurrentProducts] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const value = { isCartOpen, setIsCartOpen };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}