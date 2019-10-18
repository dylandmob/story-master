import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from './Navbar';
import Campaign from '../campaign/Campaign';
import Auth from '../auth/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import Profile from '../pages/Profile';

function Layout() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/campaign/:id' component={Campaign} />
        <Route exact path='/sign-in' component={Auth} />
        <Route exact path='/profile' component={Profile} />
      </Switch>
    </Router>
  );
}

export default Layout;
