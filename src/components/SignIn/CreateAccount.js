import React from 'react';
import { createUser } from '../../utils/firebaseHelpers';
import { Button } from 'react-bootstrap';
import FormInput from '../FormInput'
import { browserHistory } from 'react-router';

const CreateAccountContainer = React.createClass({
  getInitialState() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  },
  validatePassword() {
    const length = this.state.password.length;
    if (length === 0) return null;
    else if (length < 6) return 'error';
    else return 'success';
  },
  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  },
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    createUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(user => {
      browserHistory.push('/home')
    }, err => {
      alert(err);
    });
  },
  render() {
    return <CreateAccount {...this.state}
      validatePassword={this.validatePassword}
      handleFirstNameChange={this.handleFirstNameChange}
      handleLastNameChange={this.handleLastNameChange}
      handleEmailChange={this.handleEmailChange}
      handlePasswordChange={this.handlePasswordChange}
      handleSubmit={this.handleSubmit}/>
  }
});

export function CreateAccount(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormInput label='First Name' required
        value={props.firstName}
        onChange={props.handleFirstNameChange} />
      <FormInput label='Last Name' required
        value={props.lastName}
        onChange={props.handleLastNameChange} />
      <FormInput label='E-mail' required
        value={props.email}
        onChange={props.handleEmailChange} />
      <FormInput label='Password' required
        type='password'
        help='Must be at least 6 characters'
        validationState={props.validatePassword()}
        value={props.password}
        onChange={props.handlePasswordChange} />
      <Button type="submit">Create Account</Button>
    </form>
  );
}

export default CreateAccountContainer;
