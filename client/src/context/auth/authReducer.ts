import { Reducer } from 'react';

import {
  SIGN_IN,
  SIGN_OUT,
  AUTH_ERROR,
  SIGNED_IN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXP_TIME,
} from '../types';

export interface AuthState {
  authStatus?: string;
  authError?: string;
}

interface AuthAction {
  type: string;
  payload?: any;
}

const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGN_IN: {
      const { token, refreshToken } = action.payload;
      const tokenExpTime = Math.floor(new Date().getTime() / 1000) + 3600;
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(TOKEN_EXP_TIME, tokenExpTime.toString());
      return { ...state, authStatus: SIGNED_IN };
    }
    case SIGN_OUT:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(TOKEN_EXP_TIME);
      return { ...state, authStatus: SIGN_OUT };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    case SIGNED_IN:
      return { ...state, authStatus: SIGNED_IN };
    default:
      return state;
  }
};

export default authReducer;
