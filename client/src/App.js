import React from 'react';
import Store from './context/Store';

import Layout from './components/layout/Layout';
import Toast from './components/layout/Toast';
import TokenChecker from './components/auth/TokenChecker';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Store>
      <Layout />
      <TokenChecker />
      <Toast />
    </Store>
  );
}

export default App;
