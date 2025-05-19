import { GET_ME, EDIT_ME, DELETE_ME, USER_ERROR } from '../types';

export interface UserState {
  user: User | null;
  userError: string | null;
}

export interface UserAction {
  type: string;
  payload?: any;
}

const userReducer = (state: UserState, action: UserAction): UserState => {
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

export default userReducer;
