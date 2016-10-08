import React from 'react';
import { createUser } from '../../utils/firebaseHelpers';
import { Button } from 'react-bootstrap';
import FormInput from '../FormInput'

const CreateAccountContainer = React.createClass({
  getInitialState() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
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
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
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
      <FormInput label='First Name'
        val={props.firstName}
        handleChange={props.handleFirstNameChange} />
      <FormInput label='Last Name'
        val={props.lastName}
        handleChange={props.handleLastNameChange} />
      <FormInput label='E-mail'
        val={props.email}
        handleChange={props.handleEmailChange} />
      <FormInput validationState={props.validatePassword()}
        label='Password'
        val={props.password}
        handleChange={props.handlePasswordChange} />
      <Button type="submit">Create Account</Button>
    </form>
  );
}

export default CreateAccountContainer;
