import api from './api';

// Get user
const getMe = () =>
  api({
    url: '/api/me',
    method: 'GET'
  });

// Edit user
const editMe = data =>
  api({
    url: '/api/me',
    method: 'PATCH',
    data
  });

// Delete user
const deleteMe = () =>
  api({
    url: `/api/me`,
    method: 'DELETE'
  });

// Get user for id
const getUserForId = userId =>
  api({
    url: `/api/users/${userId}`,
    method: 'GET'
  });

export default {
  getMe,
  editMe,
  deleteMe,
  getUserForId
};
