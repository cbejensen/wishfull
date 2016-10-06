import React from 'react';

import { SignIn as SignInForm, CreateAccount } from '../components/SignIn'

export default function SignIn(props) {
  return (
    <div>
      <h2>I have an account </h2>
      <SignInForm />
      <h2>I don't have an account</h2>
      <h5>...but I want one</h5>
      <CreateAccount />
    </div>
  )
};
