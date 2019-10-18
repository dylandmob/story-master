import React, { useReducer } from 'react';
import UserContext from '.';
import userReducer from './userReducer';

import api from '../../api/UserService';

import { GET_ME, EDIT_ME, DELETE_ME, USER_ERROR } from '../types';

const UserState = props => {
  const initialState = {
    user: null,
    userError: null
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

  const editMe = async (name, imageUrl) => {
    try {
      await api.editMe(name, imageUrl);
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

  const handleError = (type, err) =>
    dispatch({ type: USER_ERROR, payload: `${type}: ${err}` });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        getMe,
        editMe,
        deleteMe
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
