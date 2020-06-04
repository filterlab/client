import { ADD_KEY } from "../actions/action-types/auth-actions";
import { REMOVE_KEY } from "../actions/action-types/auth-actions";

export const addAuth = (key, accountId, email) => {
  return {
    type: ADD_KEY,
    key,
    accountId,
    email,
  };
};

export const removeKey = (key, accountId, email) => {
  return {
    type: REMOVE_KEY,
    key,
    accountId,
    email,
  };
};
