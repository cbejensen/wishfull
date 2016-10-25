import React from 'react';
import * as firebase from 'firebase';
import List from './List'

const UserListContainer = React.createClass({
  getInitialState() {
    return {
      list: {}
    }
  },
  componentDidMount() {
    const listRef = firebase.database().ref('lists/' + this.props.uid);
    listRef.on('value', snap => {
      this.setState({
        list: snap.val()
      })
    })
  },
  render() {
    if (!this.state.list) return <div>No wishes!</div>
    return <UserList list={this.state.list} />
  }
});

export function UserList(props) {
  return <List items={props.list} />
}

export default UserListContainer;
