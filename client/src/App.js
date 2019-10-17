import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './context/Store';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Campaign from './components/campaign/Campaign';
import Auth from './components/auth/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

function App() {
  return (
    <Store>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/campaign/:id' component={Campaign} />
          <Route exact path='/sign-in' component={Auth} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
