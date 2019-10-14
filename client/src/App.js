import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './context/Store';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Campaign from './components/campaign/Campaign';

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
          {/* <Route exact path='/applications/new' component={ApplicationForm} /> */}
          {/* <Route
              exact
              path='/applications/:id'
              component={ApplicationDetail}
            /> */}
          {/* <Route exact path='/admin/applications' component={AdminPortal} /> */}
          {/* <Route exact path='/admin/analytics' component={Analytics} /> */}
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
