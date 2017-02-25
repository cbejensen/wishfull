import React from 'react'
import { CreateAccount as Form } from 'components/Login'
import {Grid} from 'react-bootstrap'

export default function CreateAccount(props) {
  return (
    <Grid>
      <h2>Create Account</h2>
      <Form />
    </Grid>
  )
}
