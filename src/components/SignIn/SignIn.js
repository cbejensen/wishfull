import React from 'react';
import FormInput from '../FormInput';
import { browserHistory } from 'react-router';
import { Form, Button } from 'react-bootstrap'
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
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
      browserHistory.push('/home');
    }, error => {
      alert(error.message)
      console.log(error.code, error.message);
    });
  },
  render() {
    return <SignIn
      email={this.state.email}
      password={this.state.password}
      handleEmailChange={this.handleEmailChange}
      handlePasswordChange={this.handlePasswordChange}
      handleSubmit={this.handleSubmit} />
  }
});

export function SignIn(props) {
  return (
    <div>
      <Form inline onSubmit={props.handleSubmit}>
        <FormInput style={{marginLeft: '5px'}} label='E-mail'
          value={props.email}
          onChange={props.handleEmailChange}
          required />
        {' '}
        <FormInput style={{marginLeft: '5px'}} label='Password'
          type='password'
          value={props.password}
          onChange={props.handlePasswordChange}
          required />
        {' '}
        <Button type="submit">Sign In</Button>
      </Form>
      {/* <ForgotPassword /> */}
    </div>
  );
}

export function ForgotPassword(props) {
  return (
    <div>
      ... but I forgot my password
      {/* TODO: add forgot pwd function */}
    </div>
  )
}

export default SignInContainer;
