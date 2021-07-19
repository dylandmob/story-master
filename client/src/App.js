import React from 'react';
import Store from './context/Store';

import Layout from './components/layout/Layout';
import Toast from './components/layout/Toast';
import TokenChecker from './components/auth/TokenChecker';
import { MantineProvider } from '@mantine/core';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Store>
      <MantineProvider theme={{
        colorScheme: 'dark',
        shadows: {
          hover: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px'
        }
      }}>
        <Layout />
        <TokenChecker />
        <Toast />
      </MantineProvider>
    </Store>
  );
}

export default App;
