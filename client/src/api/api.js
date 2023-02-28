import axios from 'axios';

// Create an Axios Client with defaults
const client = axios.create({
  // baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  crossDomain: true,
});

const AUTH_HEADER = 'x-auth-token';
const ACCESS_TOKEN = 'storyMasterAccessToken';
const REFRESH_TOKEN = 'storyMasterRefreshToken';
const TOKEN_EXP_TIME = 'storyMasterAccessTokenExpTime';
const TOKEN_LIFE = 3600;
const REFRESH_TOKEN_LIFE = 7776000;

// Request Wrapper with default success/error actions
const api = async function (options) {
  const onSuccess = function (response) {
    console.log('Request Successful!', response);
    return response.data;
  };

  const onError = function (error) {
    console.error('Request Failed:', error.config);
    if (error.response) {
      // Request was made but server responded with something other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }
    return Promise.reject(error.response || error.message);
  };

  if (localStorage.getItem(ACCESS_TOKEN)) {
    await handleToken();
    client.defaults.headers.common[AUTH_HEADER] =
      localStorage.getItem(ACCESS_TOKEN);
  } else {
    client.defaults.headers.common[AUTH_HEADER] = String(null);
  }

  return client(options).then(onSuccess).catch(onError);
};

// Check the tokens to see if they aren't expired - refresh if so
async function handleToken() {
  const expiration = localStorage.getItem(TOKEN_EXP_TIME);
  const time = new Date().getTime() / 1000;
  const refreshTokenExpTime = expiration + (REFRESH_TOKEN_LIFE - TOKEN_LIFE);

  // If the refresh token is too old, clear local storage
  if (refreshTokenExpTime < time) {
    clearTokens();
  } else if (expiration < time) {
    await getNewToken();
  }
}

// Get new tokens when the token is expired
async function getNewToken() {
  try {
    const currentRefreshToken = localStorage.getItem(REFRESH_TOKEN);
    const response = await client({
      url: `/api/auth/token`,
      method: 'POST',
      data: {
        refreshToken: currentRefreshToken,
      },
    });
    const { token, refreshToken } = response.data;
    const tokenExpTime = new Date().getTime() / 1000 + TOKEN_LIFE;

    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_EXP_TIME, tokenExpTime);

    client.defaults.headers.common[AUTH_HEADER] =
      localStorage.getItem(ACCESS_TOKEN);
  } catch (err) {
    console.error('Error getting new tokens', err);
    if (err.status === 401) {
      clearTokens();
    }
  }
}

// Clear tokens from local storage
function clearTokens() {
  console.log('Removing the tokens');
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_EXP_TIME);
}

export default api;
