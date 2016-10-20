import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from '../app/App';
import Main from './Main';
import Home from './Home';
import SignIn from './SignIn';
import NewWish from './NewWish';
import AllLists from './AllLists';
import CreateAccount from './CreateAccount';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main}/>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/all-lists' component={AllLists} />
      <Route path='/create-account' component={CreateAccount} />
      <Route path='/:uid/new-wish' component={NewWish} />
      <Route path='/:uid/edit-wish/:wish' component={NewWish} />
      <Route path='/home' component={Home} />
    </Route>
  </Router>
)

export default routes;
