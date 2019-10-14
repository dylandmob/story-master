import React from 'react';
import AuthState from './auth/AuthState';

const Store = ({ children }) => {
  return <AuthState>{children}</AuthState>;
};

export default Store;
