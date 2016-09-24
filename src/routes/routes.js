import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from '../app/App';
import Main from './Main';
import Home from './UserHome';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main}/>
      <Route path='/:user' component={Home}/>
    </Route>
  </Router>
)

export default routes;
