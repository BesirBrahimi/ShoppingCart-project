import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface BoughtProduct extends Product {
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  boughtProducts: BoughtProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeFromBoughtProducts: (productId: number) => void;
  clearBoughtProducts: () => void; 
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  boughtProducts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeFromBoughtProducts: () => {},
  clearBoughtProducts: () => {}
});

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
  
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, quantity: 1 }
      ]);
    }
  
    const existingBoughtProduct = boughtProducts.find((item) => item.id === product.id);
  
    if (existingBoughtProduct) {
      setBoughtProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === existingBoughtProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setBoughtProducts((prevProducts) => [
        ...prevProducts,
        { ...product, quantity: 1 }
      ]);
    }
  };
  

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };


  const clearBoughtProducts = () => {
    setBoughtProducts([]);
  };

  const removeFromBoughtProducts = (productId: number) => {
    const existingProduct = boughtProducts.find((product) => product.id === productId);
  
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        setBoughtProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === existingProduct.id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
      } else {
        setBoughtProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      }
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        boughtProducts,
        addToCart,
        removeFromCart,
        removeFromBoughtProducts,
        clearBoughtProducts 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
