import React from 'react';
import { getFriends, getUser } from '../../utils/firebaseHelpers';
import { browserHistory } from 'react-router';
import UserList from './UserList';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
    this.handleClickUser = this.handleClickUser.bind(this);
  }
  componentDidMount() {
    let friends = [];
    getFriends(this.props.uid).then(friendIds => {
      Object.keys(friendIds).map(uid => {
        getUser(uid).then(user => {
          user.uid = uid;
          friends.push(user);
          this.setState({
            friends: friends
          })
        })
      })
    })
  }
  handleClickUser(uid, e) {
    const path = `/users/${uid}`
    browserHistory.push(path);
  }
  render() {
    if (!this.state.friends) return <div style={{textAlign: 'center'}}>Loading...</div>
    if (this.state.friends.length < 1) return <div style={{textAlign: 'center'}}>You have no friends!</div>
    return <UserList users={this.state.friends}
      handleClickUser={this.handleClickUser}/>
  }
};

export default FriendList;
