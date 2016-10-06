import React from 'react';
import { createUser } from '../../utils/firebaseHelpers';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

// function FieldGroup({ id, label, help, ...props }) {
//   return (
//     <FormGroup controlId={id}>
//       <ControlLabel>{label}</ControlLabel>
//       <FormControl {...props} />
//       {help && <HelpBlock>{help}</HelpBlock>}
//     </FormGroup>
//   );
// };

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
  validateConfirmPassword() {
    const pwd = this.state.password;
    const confirmPwd = this.state.confirmPassword;
    if (confirmPwd.length === 0) return null;
    else if (pwd === confirmPwd) return 'success';
    else return 'error';
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
  handleConfirmPasswordChange(e) {
    this.setState({confirmPassword: e.target.value});
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
      validateConfirmPassword={this.validateConfirmPassword}
      handleFirstNameChange={this.handleFirstNameChange}
      handleLastNameChange={this.handleLastNameChange}
      handleEmailChange={this.handleEmailChange}
      handlePasswordChange={this.handlePasswordChange}
      handleConfirmPasswordChange={this.handleConfirmPasswordChange}
      handleSubmit={this.handleSubmit} />
  }
});

export function CreateAccount(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <ControlLabel>First Name</ControlLabel>
        <FormControl
          type="text"
          value={props.firstName}
          onChange={props.handleFirstNameChange} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Last Name</ControlLabel>
        <FormControl
          type="text"
          value={props.lastName}
          onChange={props.handleLastNameChange} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>E-mail</ControlLabel>
        <FormControl
          type="text"
          value={props.email}
          onChange={props.handleEmailChange} />
      </FormGroup>
      <FormGroup validationState={props.validatePassword()}>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="text"
          value={props.password}
          onChange={props.handlePasswordChange} />
      </FormGroup>
      <FormGroup validationState={props.validateConfirmPassword()}>
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl
          type="text"
          value={props.confirmPassword}
          onChange={props.handleConfirmPasswordChange} />
      </FormGroup>
      <Button type="submit">Create Account</Button>
    </form>
  );
}

export default CreateAccountContainer;
