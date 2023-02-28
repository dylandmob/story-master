import api from './api';

// Sign in user using email token from magic link
const signIn = (emailToken: string) =>
  api({
    url: '/api/auth',
    method: 'POST',
    data: {
      emailToken,
    },
  });

// Sign up user
const signUp = (email: string, name: string) =>
  api({
    url: '/api/users',
    method: 'POST',
    data: {
      email,
      name,
    },
  });

// Send user a magic link to sign in with
const sendMagicLink = (email: string) =>
  api({ url: '/api/auth/email', method: 'POST', data: { email } });

export default {
  signIn,
  signUp,
  sendMagicLink,
};
