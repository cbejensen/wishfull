import React from 'react';
import AddFriendContainer from '../components/AddFriendContainer';
import { getAllUsers } from '../utils/firebaseHelpers';

class GetFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    }
  }
  componentDidMount() {
    getAllUsers().then(users => {
      // remove logged in user
      for (var key in users) {
        if ({}.hasOwnProperty.call(users, key)) {
          if(key === this.props.params.uid) {
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
    return (
      <div style={{textAlign: 'center'}}>
        {Object.keys(this.state.users).map((uid, i) => {
          return <AddFriendContainer uid={this.props.params.uid}
            friendId={uid}
            user={this.state.users[uid]}
            key={i}/>
        })}
      </div>
    )
  }
};

export default GetFriends;
