// react
import React from 'react';
import { render } from 'react-dom';

// react-router
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

// styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

// firebase
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCcpmz6SLB1nWt3j4x7HwVFoiohdXSRRo4",
  authDomain: "wishfull.firebaseapp.com",
  databaseURL: "https://wishfull.firebaseio.com",
  storageBucket: "project-4729593249156139744.appspot.com",
};
firebase.initializeApp(config);

// componenets
import App from './components/App';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
      {/* <Route path="/list" component={WishList}/> */}
    </Route>
  </Router>
), document.getElementById('app'))
