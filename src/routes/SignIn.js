import React from 'react';
import { Link } from 'react-router'

import { SignIn as Form } from '../components/SignIn'

export default function SignIn(props) {
  return (
    <div>
      <h2>I have an account </h2>
      <Form />
      <hr />
      <h2>I don't have an account</h2>
      <Link to="/create-account">
        <h5>...but I want one</h5>
      </Link>
    </div>
  )
};
