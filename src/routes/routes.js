import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from 'components/App';
import Main from './Main';
import Home from './Home';
import Friends from './Friends';
import User from './User';
import Login from './Login';
import WishForm from './WishForm';
import CreateAccount from './CreateAccount';
import PasswordReset from './PasswordReset';
import Fulfillments from './Fulfillments';

const handleUpdate = () => {
  window.scrollTo(0, 0);
};

const routes = (
  <Router onUpdate={handleUpdate} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/home" component={Home} />
      <Route path="/friends" component={Friends} />
      <Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={CreateAccount} />
      <Route path="/users/:uid/wish-form" component={WishForm} />
      <Route path="/users/:uid/wish-form/:wishId" component={WishForm} />
      <Route path="/users/:uid" component={User} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/fulfilled-wishes" component={Fulfillments} />
    </Route>
  </Router>
);

export default routes;
