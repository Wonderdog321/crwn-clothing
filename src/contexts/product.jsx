import { createContext, useState } from "react";
import PRODUCTS from "../shopdata.json";
export const ProductContext = createContext({
  products: [],
  setProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
