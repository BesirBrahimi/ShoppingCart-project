import React, { createContext, useState, useEffect, ReactNode } from "react";


const getBoughtProducts = () => {
  const storedProducts = localStorage.getItem("boughtProducts") ?? "";
  const storedLSProducts =
    storedProducts && Array.isArray(JSON.parse(storedProducts))
      ? JSON.parse(storedProducts)
      : [];
  return storedLSProducts;
};

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
  removeProduct: (boughtProducts: BoughtProduct[], productId: number) => {
    const existingProduct = boughtProducts.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        const updatedProducts = boughtProducts.map((product) =>
          product.id === existingProduct.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );

        window.localStorage.setItem(
          "boughtProducts",
          JSON.stringify(updatedProducts)
        );

        return updatedProducts;
      } else {
        const filteredProducts = boughtProducts.filter(
          (product) => product.id !== productId
        );

        window.localStorage.setItem(
          "boughtProducts",
          JSON.stringify(filteredProducts)
        );  

        return filteredProducts;
      }
    }

    return boughtProducts;
  },
  clearAllBoughtProducts: () => {
    window.localStorage.setItem("boughtProducts", JSON.stringify([]));
    return []
  },
};

interface Product {
  id: number;
  title: string;
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
  removeFromBoughtProducts: (productId: number) => void;
  clearBoughtProducts: () => void;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  boughtProducts: [],
  addToCart: () => {},
  removeFromBoughtProducts: () => {},
  clearBoughtProducts: () => {},
});

interface CartContextProviderProps {
  children: ReactNode;
}


const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);

  useEffect(() => {
    setBoughtProducts(getBoughtProducts());
  }, []);

  const addToCart = (product: Product) => {
    const newList = shoppingCardDB.addProducts(boughtProducts, product);

    setBoughtProducts(newList);
  };

  const removeFromBoughtProducts = (productId: number) => {
    const removedItems = shoppingCardDB.removeProduct(
      boughtProducts,
      productId
    );
    setBoughtProducts(removedItems);
  };

  const clearBoughtProducts = () => {
    const newState = shoppingCardDB.clearAllBoughtProducts();
    setBoughtProducts(newState)
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: [],
        boughtProducts,
        addToCart,
        removeFromBoughtProducts,
        clearBoughtProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
