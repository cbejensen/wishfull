import React from 'react';
import {FriendList} from '../components/User';
import {CheckAuth} from 'components/CheckAuth';
import {browserHistory} from 'react-router';
import {Grid} from 'react-bootstrap';
import * as firebase from 'firebase';

class Friends extends React.Component {
  render() {
    return (
      <Grid>
        <CheckAuth>
          <FriendList />
        </CheckAuth>
      </Grid>
    )
  }
}

export default Friends;
