"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartproducts, setcartProducts] = useState([]);
  const addproduct = (product_id) => {
    setcartProducts((prev) => [...prev, product_id]);
  };
  const removeproduct = (product_id) => {
    setcartProducts((prev) => {
      const position = prev.indexOf(product_id);
      console.log("position", position);
      if(cartproducts.length==1){
        ls.removeItem("cart")
      }
      if (position !== -1) {
        return prev.filter((item, index) => index !== position);
        
      }

      return prev;
    });
  };
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (cartproducts.length > 0) {
      if (ls && ls.getItem("cart")) {
        ls.setItem("cart", JSON.stringify(cartproducts));
      } else {
        ls.setItem("cart", JSON.stringify(cartproducts));
      }
    }
  }, [cartproducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setcartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  return (
    <CartContext.Provider
      value={{ cartproducts, ls, addproduct, removeproduct,setcartProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}
