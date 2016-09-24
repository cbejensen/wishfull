import { render } from 'react-dom';
import routes from './routes/routes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCcpmz6SLB1nWt3j4x7HwVFoiohdXSRRo4",
  authDomain: "wishfull.firebaseapp.com",
  databaseURL: "https://wishfull.firebaseio.com",
  storageBucket: "project-4729593249156139744.appspot.com",
};
firebase.initializeApp(config);

render(routes, document.getElementById('app'))
