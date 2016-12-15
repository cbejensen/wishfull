import React from 'react';
import { Link } from 'react-router'

import { Login as LoginForm } from '../components/Login'

export default function Login(props) {
  return (
    <div>
      <h2>I have an account </h2>
      <LoginForm />
      <hr />
      <h2>I don't have an account</h2>
      <Link to="/create-account">
        <h5>...but I want one</h5>
      </Link>
    </div>
  )
};
