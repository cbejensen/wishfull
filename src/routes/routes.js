import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from '../app/App';
import Main from './Main';
import Home from './Home';
import User from './User';
import SignIn from './SignIn';
import WishForm from './WishForm';
import CreateAccount from './CreateAccount';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main}/>
      <Route path='/home' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/create-account' component={CreateAccount} />
      <Route path='/users/:uid/wish-form' component={WishForm} />
      <Route path='/users/:uid/wish-form/:wishId' component={WishForm} />
      <Route path='/users/:uid' component={User} />
    </Route>
  </Router>
)

export default routes;
