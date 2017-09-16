import React from 'react';
import FormInput from 'components/FormInput';
import { browserHistory, Link } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import * as firebase from 'firebase';

const LoginContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  },
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(
        user => {
          browserHistory.push('/home');
        },
        error => {
          alert(error.message);
          console.log(error.code, error.message);
        }
      );
  },
  render() {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
});

export function Login(props) {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <FormInput
          label="E-mail"
          autoFocus
          value={props.email}
          onChange={props.handleEmailChange}
          required
        />{' '}
        <FormInput
          label="Password"
          type="password"
          value={props.password}
          onChange={props.handlePasswordChange}
          required
        />{' '}
        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
        >
          Sign In
        </Button>
      </Form>
      <ForgotPassword />
    </div>
  );
}

export function ForgotPassword(props) {
  return (
    <div style={{ marginTop: '10px' }}>
      <Link to="password-reset">
        but I forgot my password
      </Link>
    </div>
  );
}

export default LoginContainer;
