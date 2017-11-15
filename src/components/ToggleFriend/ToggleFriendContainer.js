import React from 'react';
import ToggleFriend from './ToggleFriend';
import { getFriendStatus, toggleFriend } from 'utils/firebaseHelpers';

class ToggleFriendContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friend: '' };
    this.toggleFriend = this.toggleFriend.bind(this);
  }
  componentDidMount() {
    getFriendStatus(this.props.uid, this.props.friendId).then(
      res => {
        this.setState({ friend: res });
      },
      err => {
        console.log(err);
      }
    );
  }
  toggleFriend(e) {
    if (this.props.handleToggle) this.props.handleToggle(e);
    toggleFriend(this.props.uid, this.props.friendId).then(
      res => {
        this.setState({ friend: res });
      },
      err => {
        console.log(err);
      }
    );
  }
  render() {
    if (typeof this.state.friend === 'string') return null;
    return (
      <ToggleFriend
        isFriend={this.state.friend}
        handleClick={this.toggleFriend}
      />
    );
  }
}

ToggleFriendContainer.propTypes = {
  uid: React.PropTypes.node,
  friendId: React.PropTypes.string,
  handleToggle: React.PropTypes.func
};

export default ToggleFriendContainer;
