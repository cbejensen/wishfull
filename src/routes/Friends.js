import React from 'react';
import { FriendList } from '../components/User';
import { browserHistory } from 'react-router';
import { Grid } from 'react-bootstrap';
import * as firebase from 'firebase';

class Friends extends React.Component {
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
        browserHistory.push('sign-in')
      }
    });
  }
  componentWillUnmount() {
    this.removeAuthListener()
  }
  render() {
    if (!this.state.user) return <div>Loading...</div>
    return (
      <Grid>
        <FriendList uid={this.state.user.uid} />
      </Grid>
    )
  }
};

export default Friends;
