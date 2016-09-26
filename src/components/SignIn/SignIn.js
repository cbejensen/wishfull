import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
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
    console.log(this.state.email, this.state.password);
    // firebase.auth().signInWithEmailAndPassword(
    // this.state.email, this.state.password).catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorCode, errorMessage)
    // });
    firebase.auth().signInWithEmailAndPassword(
    this.state.email, this.state.password).then(function() {
      const path = '/home/' + 'cbejensen';
      browserHistory.push(path);
    }, function(error) {
      console.log(error.code, error.message)
    });
  },
  handleSignOut() {
    firebase.auth().signOut().then(() => {
      console.log('success')
    }, error => {
      console.log(error)
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
      <button onClick={props.signOut}>Sign out</button>
    </div>
  );
}

export default SignInContainer;
