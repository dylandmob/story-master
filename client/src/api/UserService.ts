import api from './api';

// Get user
const getMe = (): Promise<User> =>
  api({
    url: '/api/me',
    method: 'GET',
  });

// Edit user
const editMe = (data: Partial<User>): Promise<User> =>
  api({
    url: '/api/me',
    method: 'PATCH',
    data,
  });

// Delete user
const deleteMe = (): Promise<void> =>
  api({
    url: `/api/me`,
    method: 'DELETE',
  });

// Get user for id
const getUserForId = (userId: number): Promise<User> =>
  api({
    url: `/api/users/${userId}`,
    method: 'GET',
  });

const UserService = {
  getMe,
  editMe,
  deleteMe,
  getUserForId,
};

export default UserService;
