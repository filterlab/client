import { ADD_KEY, REMOVE_KEY } from "../actions/action-types/auth-actions";

const initState = {
  key: undefined,
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
    default: {
      return state;
    }
  }
};

export default auth;
