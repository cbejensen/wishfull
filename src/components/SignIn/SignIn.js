import React from 'react';
import * as firebase from 'firebase';

const SignInContainer = React.createClass({
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
    firebase.auth().signInWithEmailAndPassword(
      this.state.email, this.state.password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
    });
  },
  render() {
    return <SignIn
      email={this.state.email}
      password={this.state.password}
      changeEmail={this.handleEmailChange}
      changePassword={this.handlePasswordChange}
      submit={this.handleSubmit}/>
  }
});

export function SignIn(props) {
  console.log(props);
  return (
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
  );
}

export default SignInContainer;
