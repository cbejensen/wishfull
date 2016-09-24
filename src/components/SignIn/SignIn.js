import React from 'react';
import * as firebase from 'firebase';

const SignInContainer = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('signed in')
      } else {
        console.log('not signed in')
      }
    });
  },

  render() {
    return <SignIn />
  }
});

export function SignIn(props) {
  return (
    <form action="">
      Username: <input type="text"/>
      Password: <input type="text"/>
    </form>
  );
}

export default SignInContainer;
