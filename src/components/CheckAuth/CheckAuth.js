import React from 'react';
import { browserHistory } from 'react-router';
import { getUser } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class CheckAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        getUser(auth.uid).then(user => {
          user.uid = auth.uid;
          this.setState({
            user: user
          })
        }, err => {
          console.log(err);
        })
      } else {
        browserHistory.push('/sign-in')
      }
    });
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    if (!this.state.user) return null;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        user: this.state.user
      })
    });
    return <div>{children}</div>
  }
};

export default CheckAuth;
