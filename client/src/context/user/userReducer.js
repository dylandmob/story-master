import { GET_ME, EDIT_ME, DELETE_ME, USER_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ME:
      return { ...state, user: action.payload };
    case EDIT_ME:
      return { ...state, userError: null };
    case DELETE_ME:
      return { ...state, user: null };
    case USER_ERROR:
      return { ...state, userError: action.payload };
    default:
      return state;
  }
};
