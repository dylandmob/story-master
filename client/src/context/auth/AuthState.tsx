import React, { useReducer } from 'react';
import AuthContext from '.';
import authReducer, { AuthState as IAuthState } from './authReducer';
import { SIGN_IN, SIGN_OUT, SIGNED_IN } from '../types';

const AuthState: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: IAuthState = {
    authStatus: SIGN_IN,
    authError: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (token: any, refreshToken: any) => {
    dispatch({ type: SIGN_IN, payload: { token, refreshToken } });
  };

  // Sign out user
  const signOut = () => dispatch({ type: SIGN_OUT });

  const setSignedInStatus = () => dispatch({ type: SIGNED_IN });

  return (
    <AuthContext.Provider
      value={{
        authStatus: state.authStatus,
        authError: state.authError,
        signIn,
        signOut,
        setSignedInStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
