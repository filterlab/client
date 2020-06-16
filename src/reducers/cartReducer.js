import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  CLEAR_CART,
} from "../actions/action-types/cart-actions";

const initState = {
  items: [],
  total: 0,
};

const cart = (state = initState, action) => {
  if (action.type === ADD_TO_CART) {
    //check if the action id exists in the cart
    let existedItem = state.items.find((item) => item.id === action.id);

    if (existedItem) {
      return state;
    }

    let addToCartItem = {
      price: action.price,
      id: action.id,
      quantity: 1,
      name: action.name,
    };

    let newTotal = state.total + addToCartItem.price;

    return {
      ...state,
      items: [...state.items, addToCartItem],
      total: Math.round(newTotal * 100) / 100,
    };
    // }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.items.find((item) => action.id === item.id);
    let new_items = state.items.filter((item) => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price;
    return {
      ...state,
      items: new_items,
      total: newTotal,
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      items: [],
      total: 0,
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.items.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        items: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6,
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6,
    };
  } else {
    return state;
  }
};

export default cart;
