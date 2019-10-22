import React from 'react';
import Store from './context/Store';

import Layout from './components/layout/Layout';
import TokenChecker from './components/auth/TokenChecker';

function App() {
  return (
    <Store>
      <Layout />
      <TokenChecker />
    </Store>
  );
}

export default App;
