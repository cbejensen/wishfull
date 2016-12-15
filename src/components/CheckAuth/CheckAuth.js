import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';

class CheckAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
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
    if (!this.state.user) return <div>null</div>;
    return React.cloneElement(this.props.children, {
      user: this.state.user
    })
  }
};

export default CheckAuth;
