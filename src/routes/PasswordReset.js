import React from 'react';
import ResetForm from 'components/Login/PasswordReset';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router';

export default function PasswordReset(props) {
  const styles = {
    wrapper: {
      maxWidth: '500px',
      margin: 'auto'
    }
  };
  return (
    <Grid>
      <div style={styles.wrapper}>
        <h2>I forgot my password</h2>
        <Link to="/sign-in">
          <h5>wait, I remember it</h5>
        </Link>
        <ResetForm />
      </div>
    </Grid>
  );
}
