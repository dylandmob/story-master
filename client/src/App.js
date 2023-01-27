import React from 'react';
import Store from './context/Store';
import ColorContext from './context/color';
import Layout from './components/layout/Layout';
import Toast from './components/layout/Toast';
import TokenChecker from './components/auth/TokenChecker';
import { MantineProvider } from '@mantine/core';
import { useWindowEvent, useLocalStorage } from '@mantine/hooks';

import 'react-toastify/dist/ReactToastify.css';
import './fonts.css';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
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
          backgroundColor:
            colorScheme === 'dark' ? 'rgb(29, 30, 48)' : '#f8f9fa',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -99999,
        }}
      ></div>
      <ColorContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
        <MantineProvider
          theme={{
            colorScheme,
            colors: {
              activeLinkTextColor:
                colorScheme === 'dark' ? '#d0ebff' : '#1971c2',
              activeLinkBackgroundColor:
                colorScheme === 'dark' ? 'rgba(24, 100, 171, 0.45)' : '#e7f5ff',
              activeLinkBorderColor: '#339af0',
              menuBorderColor: colorScheme === 'dark' ? '#4d4f66' : '#dee2e6',
              navBackgroundColor:
                colorScheme === 'dark' ? '#0c0d21' : '#007bff',
              navBorderColor:
                colorScheme === 'dark' ? '#0c0d21' : 'transparent',
              wikiBackgroundColor:
                colorScheme === 'dark'
                  ? 'rgb(29, 30, 48, 0.95)'
                  : 'rgb(248, 249, 250, 0.95)',
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
      </ColorContext.Provider>
    </Store>
  );
}

export default App;
