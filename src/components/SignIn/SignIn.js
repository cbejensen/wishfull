import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';

const SignInContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState() {
    return {
      email: '',
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
    console.log(this.context)
  },
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(
    this.state.email, this.state.password).then(function() {
      const path = '/home'
      browserHistory.push(path);
    }, function(error) {
      console.log(error.code, error.message)
    });
  },
  render() {
    return <SignIn
      email={this.state.email}
      password={this.state.password}
      changeEmail={this.handleEmailChange}
      changePassword={this.handlePasswordChange}
      submit={this.handleSubmit}
      signOut={this.handleSignOut}/>
  }
});

export function SignIn(props) {
  return (
    <div>
      <form onSubmit={props.submit}>
        Email: <input
          type="text"
          value={props.email}
          onChange={props.changeEmail}/>
        Password: <input
          type="text"
          value={props.password}
          onChange={props.changePassword}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignInContainer;
