import React from 'react';
import Store from './context/Store';

import Layout from './components/layout/Layout';
import Toast from './components/layout/Toast';
import TokenChecker from './components/auth/TokenChecker';
import { MantineProvider } from '@mantine/core';
import { useWindowEvent, useLocalStorageValue } from '@mantine/hooks';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyJ' && (event.ctrlKey || event.metaKey)) {
      setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
    }
  });

  return (
    <Store>
      <div
        style={{
          backgroundColor: colorScheme === 'dark' ? 'rgb(29, 30, 48)' : 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -99999,
        }}
      ></div>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            activeLinkTextColor: colorScheme === 'dark' ? '#d0ebff' : '#1971c2',
            activeLinkBackgroundColor:
              colorScheme === 'dark' ? 'rgba(24, 100, 171, 0.45)' : '#e7f5ff',
            activeLinkBorderColor: '#339af0',
            menuBorderColor: colorScheme === 'dark' ? '#4d4f66' : '#dee2e6',
          },
          shadows: {
            hover: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
          },
        }}
      >
        <Layout />
        <TokenChecker />
        <Toast />
      </MantineProvider>
    </Store>
  );
}

export default App;
