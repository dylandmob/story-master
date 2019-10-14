import api from './api';

// Sign in user using email token from magic link
const signIn = emailToken =>
  api({
    path: '/api/auth',
    method: 'POST',
    data: {
      emailToken
    }
  });

// Sign up user
const signUp = (email, name) =>
  api({
    path: '/api/users',
    method: 'POST',
    data: {
      email,
      name
    }
  });

// Send user a magic link to sign in with
const sendMagicLink = email =>
  api({ path: '/api/email', method: 'POST', data: { email } });

export default {
  signIn,
  signUp,
  sendMagicLink
};
