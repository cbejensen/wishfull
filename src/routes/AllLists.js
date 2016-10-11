import React from 'react';
import * as firebase from 'firebase';
import { UserList } from '../components/List'

const AllListsContainer = React.createClass({
  getInitialState() {
    return {
      users: null
    }
  },
  componentDidMount() {
    const usersRef = firebase.database().ref('users')
    usersRef.on('value', snap => {
      const data = snap.val();
      const users = Object.keys(data).map(uid => {
        const user = data[uid];
        const name = user.firstName + ' ' + user.lastName;
        return {
          name: name,
          uid: uid
        }
      });
      this.setState({
        users: users
      })
    });
  },
  render() {
    if (!this.state.users) return <div>nothing</div>
    return <AllLists users={this.state.users}/>
  }
});

export function AllLists(props) {
  const users = props.users.map(user => {
    return (
      <div key={user.uid}>
        <h2>{user.name}</h2>
        <UserList uid={user.uid} />
      </div>

    )
  })
  return <div>{users}</div>
}

export default AllListsContainer;
