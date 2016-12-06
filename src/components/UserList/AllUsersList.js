import React from 'react';
import UserList from './UserList';
import { getAllUsers } from '../../utils/firebaseHelpers';

class AllUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
  }
  componentDidMount() {
    getAllUsers().then(users => {
      // remove logged in user from list
      for (var key in users) {
        if ({}.hasOwnProperty.call(users, key)) {
          if(key === this.props.uid) {
            delete users[key];
          }
        }
      }
      this.setState({users: users})
    }, err => {
      console.log(err)
    })
  }
  render() {
    if (!this.state.users) return <div>Loading...</div>
    return <UserList users={this.state.users} />
  }
};

export default AllUsersList;
