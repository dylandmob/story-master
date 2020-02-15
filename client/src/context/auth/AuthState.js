import React, { useReducer } from 'react';
import AuthContext from '.';
import authReducer from './authReducer';

import { SIGN_IN, SIGN_OUT, AUTH_ERROR, SIGNED_IN } from '../types';

const AuthState = props => {
  const initialState = {
    authStatus: SIGN_IN,
    authError: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (token, refreshToken) => {
    dispatch({ type: SIGN_IN, payload: { token, refreshToken } });
  };

  // Sign out user
  const signOut = () => dispatch({ type: SIGN_OUT });

  const setSignedInStatus = () => dispatch({ type: SIGNED_IN });

  const handleError = (type, err) =>
    dispatch({ type: AUTH_ERROR, payload: `${type}: ${err}` });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authStatus: state.authStatus,
        authError: state.authError,
        signIn,
        signOut,
        setSignedInStatus
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
