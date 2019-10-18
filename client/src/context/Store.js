import React from 'react';
import AuthState from './auth/AuthState';
import UserState from './user/UserState';

const Store = ({ children }) => {
  return (
    <AuthState>
      <UserState>{children}</UserState>
    </AuthState>
  );
};

export default Store;
