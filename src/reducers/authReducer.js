import {
  ADD_KEY,
  REMOVE_KEY,
  SET_FILTERS,
} from "../actions/action-types/auth-actions";

const initState = {
  key: undefined,
  filters: [],
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case ADD_KEY: {
      return {
        ...state,
        key: action.key,
        accountId: action.accountId,
        email: action.email,
      };
    }
    case REMOVE_KEY: {
      /*eslint-disable no-unused-vars */
      let { key, ...res } = state;
      return {
        ...res,
      };
    }
    case SET_FILTERS: {
      /*eslint-disable no-unused-vars */

      return {
        ...state,
        filters: action.filters,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
