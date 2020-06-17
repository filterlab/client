import {
  ADD_KEY,
  REMOVE_KEY,
  SET_FILTERS,
} from "../actions/action-types/auth-actions";

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

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters,
  };
};
