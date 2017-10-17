import React from 'react';
import { browserHistory } from 'react-router';
import { getUser } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class CheckAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        // pass user info to children
        getUser(auth.uid).then(
          user => {
            user.uid = auth.uid;
            this.setState({
              user: user
            });
          },
          err => {
            console.log(err);
          }
        );
      } else if (!this.props.redirect) {
        // pass false to children
        this.setState({ user: false });
      } else {
        // if redirect is string path, go there
        // otherwise redirect to sign-in page
        const path =
          typeof this.props.redirect === 'string'
            ? this.props.redirect
            : '/sign-in';
        browserHistory.push(path);
      }
    });
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    if (this.state.user === null) {
      return null;
    } else if (this.props.noPass) {
      // do not pass a user prop,
      // just render children
      return <div>{this.props.children}</div>;
    } else {
      return (
        <div>
          {React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              user: this.state.user,
              uid: this.state.user.uid
            })
          )}
        </div>
      );
    }
  }
}

CheckAuth.propTypes = {
  redirect: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  noPass: React.PropTypes.bool
};

export default CheckAuth;
