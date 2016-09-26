import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from '../app/App';
import Main from './Main';
import Home from './Home';
import SignIn from './SignIn';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main}/>
      <Route path='/home' component={Home}/>
      <Route path='/users/:user' component={Home}/>
      <Route path='/sign-in' component={SignIn}/>
    </Route>
  </Router>
)

export default routes;
