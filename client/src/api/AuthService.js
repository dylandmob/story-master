import api from './api';

// Sign in user using email token from magic link
const signIn = emailToken =>
  api({
    url: '/auth',
    method: 'POST',
    data: {
      emailToken
    }
  });

// Sign up user
const signUp = (email, name) =>
  api({
    url: '/users',
    method: 'POST',
    data: {
      email,
      name
    }
  });

// Send user a magic link to sign in with
const sendMagicLink = email =>
  api({ url: '/auth/email', method: 'POST', data: { email } });

export default {
  signIn,
  signUp,
  sendMagicLink
};