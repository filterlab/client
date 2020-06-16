import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ITEM,
} from "../actions/action-types/cart-actions";

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

export const removeItem = (id, price, name) => {
  return {
    type: REMOVE_ITEM,
    id,
    price,
    name,
  };
};
