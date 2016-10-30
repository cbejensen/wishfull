import React from 'react';
import * as firebase from 'firebase';
import { getOtherUsers, getList } from '../../utils/firebaseHelpers';
import { UserList } from '../WishList';

const OtherListsContainer = React.createClass({
  getInitialState() {
    return {
      users: null
    }
  },
  componentDidMount() {
    getOtherUsers(this.props.uid).then(users => {
      this.setState({
        users: users
      })
    })
  },
  render() {
    if (!this.state.users) return <div>Loading...</div>
    return <OtherLists users={this.state.users}/>
  }
});

export function OtherLists(props) {
  const lists = props.users.map(user => {
    console.log(user)
    return <UserList uid={user.uid} />
  });
  console.log(lists)
  return <div>{lists}</div>
}

export default OtherListsContainer;
