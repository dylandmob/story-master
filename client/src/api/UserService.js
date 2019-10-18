import api from './api';

// Get user
const getMe = () =>
  api({
    url: '/me',
    method: 'GET'
  });

// Edit user
const editMe = (name, imageUrl) =>
  api({
    url: '/me',
    method: 'PATCH',
    data: {
      name,
      imageUrl
    }
  });

// Delete user
const deleteMe = () =>
  api({
    url: `/me`,
    method: 'DELETE'
  });

// Get user for id
const getUserForId = userId =>
  api({
    url: `/users/${userId}`,
    method: 'GET'
  });

export default {
  getMe,
  editMe,
  deleteMe,
  getUserForId
};
