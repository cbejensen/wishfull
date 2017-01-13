import React from 'react';
import CategoryHeading from './CategoryHeading';
import { UserList } from 'components/User';
import { searchUsers, getFriendIds } from 'utils/firebaseHelpers';

class UserResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
    this.getUsers = this.getUsers.bind(this);
  }
  componentDidMount() {
    this.getUsers();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.getUsers();
    }
  }
  getUsers() {
    getFriendIds(this.props.uid).then(friendIds => {
      const friendIdsArray = Object.keys(friendIds).map(id => id);
      searchUsers(this.props.query, this.props.uid, friendIdsArray)
      .then(users => {
        this.setState({users: users})
      }, err => {
        console.log(err);
      })
    })
  }
  render() {
    if (!this.state.users) return null;
    return (
      <div>
        <CategoryHeading text="Other Users" />
        <UserList users={this.state.users} nameColor='#ffffff' />
      </div>
    )
  }
};

UserResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default UserResults;
