import React, { createContext, useState, useEffect, ReactNode } from "react";

const shoppingCardDB = {
  addProducts: (boughtProducts: BoughtProduct[], product: Product) => {
    const existingItem = boughtProducts.find((item) => item.id === product.id);

    if (existingItem) {
      const storedLSProducts = getBoughtProducts().map((item: BoughtProduct) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      window.localStorage.setItem(
        "boughtProducts",
        JSON.stringify(storedLSProducts)
      );

      return storedLSProducts;
    } else {
      const storedLSProducts = getBoughtProducts();

      storedLSProducts.push({ ...product, quantity: 1 });

      window.localStorage.setItem(
        "boughtProducts",
        JSON.stringify(storedLSProducts)
      );

      return storedLSProducts;
    }
  },
  removeProducts: () => {
    return;
  },
  deleteCart: () => {

  }
}

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
  clearBoughtProducts: () => {},
});

interface CartContextProviderProps {
  children: ReactNode;
}

const getBoughtProducts = () => {
  const storedProducts = localStorage.getItem("boughtProducts") ?? "";
  const storedLSProducts =
    storedProducts && Array.isArray(JSON.parse(storedProducts))
      ? JSON.parse(storedProducts)
      : [];
  return storedLSProducts;
};

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);

  useEffect(() => {
    setBoughtProducts(getBoughtProducts())
  }, [])

  const addToCart = (product: Product) => {
      const newList = shoppingCardDB.addProducts(boughtProducts, product);

      setBoughtProducts(newList);

  };

  const removeFromCart = (productId: number) => {
    setBoughtProducts((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearBoughtProducts = () => {
    setBoughtProducts([]);
    window.localStorage.removeItem('boughtProducts');
  };

  const removeFromBoughtProducts = (productId: number) => {
    const existingProduct = boughtProducts.find(
      (product) => product.id === productId
    );
    const storedLSProducts = getBoughtProducts();

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        setBoughtProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === existingProduct.id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );

        const filteredLSProducts =   boughtProducts.map((product) =>
          product.id === existingProduct.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )

        window.localStorage.setItem('boughtProducts', JSON.stringify(filteredLSProducts));

      } else {
        setBoughtProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        const filteredLSProducts = storedLSProducts.filter(
          (product: Product) => product.id !== productId
        );
        setBoughtProducts(filteredLSProducts);
        window.localStorage.setItem(
          "boughtProducts",
          JSON.stringify(filteredLSProducts)
        );
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: [],
        boughtProducts,
        addToCart,
        removeFromCart,
        removeFromBoughtProducts,
        clearBoughtProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
