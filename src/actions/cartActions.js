import { ADD_TO_CART, CLEAR_CART } from "../actions/action-types/cart-actions";

export const addToCart = (id, price, name) => {
  return {
    type: ADD_TO_CART,
    id,
    price,
    name,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
