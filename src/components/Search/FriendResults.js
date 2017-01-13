import React from 'react';
import CategoryHeading from './CategoryHeading';
import { UserList } from 'components/User';
import { searchFriends } from 'utils/firebaseHelpers';

class FriendResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
    this.getFriends = this.getFriends.bind(this);
  }
  componentDidMount() {
    this.getFriends();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.getFriends();
    }
  }
  getFriends() {
    searchFriends(this.props.query, this.props.uid)
    .then(friends => {
      this.setState({friends: friends})
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.friends) return null;
    return (
      <div>
        <CategoryHeading text="Friends" />
        <UserList users={this.state.friends} nameColor='#ffffff' />
      </div>
    )
  }
};

FriendResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default FriendResults;
