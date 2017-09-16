import React from 'react';
import FormInput from 'components/FormInput';
import { browserHistory } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', reset: false };
    this.getButtonText = this.getButtonText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getButtonText() {
    if (!this.state.reset) {
      return 'Send E-mail';
    } else if (this.state.reset === 'loading') {
      return 'Loading...';
    } else {
      return 'E-mail Sent';
    }
  }
  handleChange(e) {
    this.setState({ email: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const setReset = val => {
      this.setState({ reset: val });
    };
    setReset('loading');
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function() {
        setReset(true);
        setTimeout(function() {
          browserHistory.push('sign-in');
        }, 2000);
      })
      .catch(function(error) {
        alert(error);
        console.error(error);
        setReset(false);
      });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInput
          label="E-mail"
          autoFocus
          value={this.state.email}
          onChange={this.handleChange}
          required
        />{' '}
        <Button
          type="submit"
          bsStyle={
            this.state.reset === true ? (
              'success'
            ) : (
              'primary'
            )
          }
          bsSize="large"
          disabled={!!this.state.reset}
        >
          {this.getButtonText()}
        </Button>
        {this.state.reset === true && (
          <h5>Redirecting to login page...</h5>
        )}
      </Form>
    );
  }
}

export default PasswordReset;
