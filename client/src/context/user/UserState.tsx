import React, { useReducer } from 'react';
import UserContext from '.';
import userReducer, { UserState as UserStateType } from './userReducer';

import api from '../../api/UserService';

import { GET_ME, EDIT_ME, DELETE_ME, USER_ERROR } from '../types';

const UserState: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: UserStateType = {
    user: null,
    userError: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get current user using token
  const getMe = async () => {
    try {
      const response = await api.getMe();
      dispatch({ type: GET_ME, payload: response });
    } catch (err) {
      console.error('Erroring getting me', err);
      handleError('Error getting me', err);
    }
  };

  const editMe = async (name: string, imageUrl: string) => {
    try {
      let data: Partial<User> = {};
      if (name && name.length > 3 && name.length < 25) data.name = name;
      if (imageUrl) data.imageUrl = imageUrl;
      await api.editMe(data);
      dispatch({ type: EDIT_ME });
    } catch (err) {
      console.error('Erroring editing me', err);
      handleError('Error editing me', err);
    }
  };

  const deleteMe = async () => {
    try {
      await api.deleteMe();
      dispatch({ type: DELETE_ME });
    } catch (err) {
      console.error('Erroring editing me', err);
      handleError('Error editing me', err);
    }
  };

  const handleError = (type: string, err: any) =>
    dispatch({ type: USER_ERROR, payload: `${type}: ${err}` });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userError: state.userError,
        getMe,
        editMe,
        deleteMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
