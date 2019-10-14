import {
  SIGN_IN,
  SIGN_OUT,
  AUTH_ERROR,
  EMAIL_SENT,
  SIGN_UP_REQ
} from '../types';

const ACCESS_TOKEN = 'middleburgAccessToken';
const REFRESH_TOKEN = 'middleburgRefreshToken';
const TOKEN_EXP_TIME = 'middleburgAccessTokenExpTime';

export default (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { token, refreshToken } = action.payload;
      const tokenExpTime = new Date().getTime() / 1000 + 3600;
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(TOKEN_EXP_TIME, tokenExpTime);
      return { ...state, authStatus: null };
    case SIGN_UP_REQ:
      return {
        ...state,
        user: { email: action.payload },
        authStatus: SIGN_UP_REQ
      };
    case EMAIL_SENT:
      return { ...state, authStatus: EMAIL_SENT };
    case SIGN_OUT:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(TOKEN_EXP_TIME);
      return { ...state, authStatus: SIGN_IN };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
};
