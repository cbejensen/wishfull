import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Grid } from 'react-bootstrap';
import { Login as LoginForm } from 'components/Login';
import CheckAuth from 'components/CheckAuth';

export default function LoginContainer(props) {
  return (
    <CheckAuth>
      <Login {...props} />
    </CheckAuth>
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.uid) {
      browserHistory.push('home');
    }
  }
  render() {
    const styles = {
      wrapper: {
        maxWidth: '500px',
        margin: 'auto'
      },
      hr: {
        backgroundColor: '#cccccc',
        color: '#cccccc',
        borderColor: '#cccccc'
      }
    };
    return (
      <Grid>
        <div style={styles.wrapper}>
          <h2>I have an account</h2>
          <Link to="password-reset">
            <h5>but I forgot my password</h5>
          </Link>
          <LoginForm />
          <hr style={styles.hr} />
          <h2>I don't have an account</h2>
          <Link to="/sign-up">
            <h5>but I want one</h5>
          </Link>
        </div>
      </Grid>
    );
  }
}
