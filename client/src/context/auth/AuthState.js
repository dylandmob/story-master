import React, { useReducer } from 'react';
import AuthContext from '.';
import authReducer from './authReducer';

import api from '../../api/AuthService';

import {
  SIGN_IN,
  SIGN_OUT,
  EMAIL_SENT,
  AUTH_ERROR,
  SIGN_UP_REQ,
  SIGNED_IN
} from '../types';

const AuthState = props => {
  const initialState = {
    authStatus: SIGN_IN,
    authError: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Send user a magic link containing an email token
  // If no users exists for this email, they will need to sign up
  const sendMagicLink = async email => {
    try {
      await api.sendMagicLink(email);
      dispatch({ type: EMAIL_SENT });
    } catch (err) {
      // If user does not exist, 404 will return and the user will need to sign up with a name
      if (err.status === 404) {
        return dispatch({ type: SIGN_UP_REQ, payload: email });
      }

      handleError('Error trying to send magic link', err);
    }
  };

  // Sign up user and sends user a magic link containing an email token
  const signUp = async (email, name) => {
    try {
      await api.signUp(email, name);
      dispatch({ type: EMAIL_SENT });
    } catch (err) {
      handleError('Error signing up', err);
    }
  };

  // Sign in user using email token from magic link
  const signIn = async token => {
    try {
      const response = await api.signIn(token);
      dispatch({ type: SIGN_IN, payload: response });
    } catch (err) {
      handleError('Error trying to sign in', err);
    }
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
        signUp,
        signIn,
        signOut,
        sendMagicLink,
        setSignedInStatus
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
