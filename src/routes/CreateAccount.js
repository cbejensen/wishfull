import React from 'react'
import { CreateAccount as Form } from 'components/Login'
import {Grid} from 'react-bootstrap'

export default function CreateAccount(props) {
  const styles = {
    wrapper: {
      maxWidth: '500px',
      margin: '0 auto 20px'
    }
  }
  return (
    <Grid>
      <div style={styles.wrapper}>
        <h2>Create Account</h2>
        <Form />
      </div>
    </Grid>
  )
}
