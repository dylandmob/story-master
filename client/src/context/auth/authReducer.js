import {
  SIGN_IN,
  SIGN_OUT,
  AUTH_ERROR,
  EMAIL_SENT,
  SIGN_UP_REQ,
  SIGNED_IN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXP_TIME
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { token, refreshToken } = action.payload;
      const tokenExpTime = new Date().getTime() / 1000 + 3600;
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(TOKEN_EXP_TIME, tokenExpTime);
      return { ...state, authStatus: SIGNED_IN };
    case SIGN_OUT:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(TOKEN_EXP_TIME);
      return { ...state, authStatus: SIGN_IN };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    case SIGNED_IN:
      return { ...state, authStatus: SIGNED_IN };
    default:
      return state;
  }
};
