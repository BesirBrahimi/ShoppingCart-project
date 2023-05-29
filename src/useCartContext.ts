import { useContext } from 'react';
import { CartContext } from './CartContext';

const useCartContext = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }

  return cartContext;
};

export default useCartContext;
