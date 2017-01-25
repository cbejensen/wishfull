import React from 'react'
import {getFriends} from '../../utils/firebaseHelpers'
import UserList from './UserList'

class FriendList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: null
    }
  }
  componentDidMount() {
    getFriends(this.props.uid).then(friends => {
      this.setState({friends: friends})
    })
  }
  render() {
    if (!this.state.friends) return <div style={{textAlign: 'center'}}>Loading...</div>
    if (this.state.friends.length < 1) return <div style={{textAlign: 'center'}}>You have no friends!</div>
    return <UserList users={this.state.friends} />
  }
}

export default FriendList
