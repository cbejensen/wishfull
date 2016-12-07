import React from 'react';
import { getFriends } from '../../utils/firebaseHelpers';
import { Grid, Row } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import UserList from './UserList';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ''
    }
    this.handleClickUser = this.handleClickUser.bind(this);
  }
  componentDidMount() {
    getFriends(this.props.uid).then(friends => {
      this.setState({
        friends: friends
      })
    })
  }
  handleClickUser(uid, e) {
    const path = `/users/${uid}`
    browserHistory.push(path);
  }
  render() {
    if (typeof this.state.friends === 'string') return <div style={{textAlign: 'center'}}>Loading...</div>
    if (!this.state.friends) return <div style={{textAlign: 'center'}}>You have no friends!</div>
    return <UserList users={this.state.friends}
      handleClickUser={this.handleClickUser}/>
  }
};

export default FriendList;
