import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from './Navbar';
import Campaign from '../campaign/edit/Campaign';
import Auth from '../auth/Auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import Profile from '../pages/Profile';
import CreateCampaign from '../campaign/CreateCampaign';
import Wiki from '../campaign/wiki/Wiki';

function Layout() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/campaign/new" component={CreateCampaign} />
        <Route path="/campaign/:id/edit" component={Campaign} />
        <Route path="/campaign/:id" component={Wiki} />
        <Route exact path="/sign-in" component={Auth} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default Layout;
