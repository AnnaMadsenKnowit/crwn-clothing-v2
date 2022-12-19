import { createContext, useState } from 'react'

import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setCurrentProducts: () => null
});

export const ProductsProvider = ({ children }) => {
    const [products, setCurrentProducts] = useState(PRODUCTS)
    const value = { products, setCurrentProducts };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}