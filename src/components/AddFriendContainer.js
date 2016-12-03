import React from 'react';
import { Button } from 'react-bootstrap';
import { updateFriend } from '../utils/firebaseHelpers';

class AddFriendContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changeFriend = this.changeFriend.bind(this);
  }
  changeFriend() {
    updateFriend(this.props.uid, this.props.friendId).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  render() {
    const name = this.props.user.firstName + ' ' + this.props.user.lastName
    return (
      <div style={{margin: '10px 0'}}>
        <Button onClick={this.changeFriend}>
          {name} {' '}
        </Button>
      </div>
    )
  }
};

export default AddFriendContainer;
