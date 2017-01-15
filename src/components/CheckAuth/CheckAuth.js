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
        const path = this.props.reroute ? this.props.reroute : '/sign-in';
        browserHistory.push(path);
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
        user: this.state.user,
        uid: this.state.user.uid
      })
    });
    return <div>{children}</div>
  }
};

CheckAuth.propTypes = {
  reroute: React.PropTypes.string
}

export default CheckAuth;
