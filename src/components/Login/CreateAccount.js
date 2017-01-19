import React from 'react'
import {createUser, uploadFile, getFile} from '../../utils/firebaseHelpers'
import {Button} from 'react-bootstrap'
import FormInput from '../FormInput'
import {browserHistory} from 'react-router'

class CreateAccountContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: null
    }
    this.validatePassword = this.validatePassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAvatarChange = this.handleAvatarChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  validatePassword() {
    const length = this.state.password.length
    if (length === 0)
      return null
    else if (length < 6)
      return 'error'
    else
      return 'success'
    }
  handleChange(field, e) {
    const newState = {}
    newState[field] = e.target.value
    this.setState(newState)
  }
  handleAvatarChange(e) {
    var img = e.target.files[0]
    console.log(img)
    this.setState({avatar: img})
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password.length >= 6) {
      createUser(this.state).then(res => {
        browserHistory.push('/home')
      }, err => {
        alert(err)
      })
    } else {
      alert('Password must be at least 6 characters')
    }
  }
  render() {
    return <CreateAccount {...this.state} validatePassword={this.validatePassword} handleChange={this.handleChange} handleAvatarChange={this.handleAvatarChange} handleSubmit={this.handleSubmit}/>
  }
}

export function CreateAccount(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormInput label='First Name' required value={props.firstName} onChange={props.handleChange.bind(null, 'firstName')}/>
      <FormInput label='Last Name' required value={props.lastName} onChange={props.handleChange.bind(null, 'lastName')}/>
      <FormInput label='E-mail' required type='email' value={props.email} onChange={props.handleChange.bind(null, 'email')}/>
      <FormInput label='Password' required type='password' help='Must be at least 6 characters' pattern='.{6,}' title='Choose a password that is 6 characters or longer' getValidation={props.validatePassword()} value={props.password} onChange={props.handleChange.bind(null, 'password')}/>
      <FormInput label='Profile Picture' type='file' onChange={props.handleAvatarChange}/>
      <Button type="submit" bsStyle="primary" bsSize="large">
        Let's Do This!
      </Button>
    </form>
  )
}

export default CreateAccountContainer
