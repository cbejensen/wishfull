import React from 'react';
import { getUser } from '../../utils/firebaseHelpers';
import { Link } from 'react-router';

class FriendItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: null
    }
  }
  componentDidMount() {
    getUser(this.props.id).then(friend => {
      this.setState({
        friend: friend
      })
    })
  }
  render() {
    if (!this.state.friend) return null;
    return <FriendItem friend={this.state.friend} id={this.props.id}/>
  }
};

export function FriendItem(props) {
  const path = `users/${props.id}`;
  return (
    <h3>
      <Link to={path}>
        {props.friend.firstName + ' ' + props.friend.lastName}
      </Link>
    </h3>
  );
}

export default FriendItemContainer;
