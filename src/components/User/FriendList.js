import React from 'react'
import {Search} from 'components/Search'
import {getFriends} from '../../utils/firebaseHelpers'
import UserList from './UserList'

class FriendList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: null,
      showUserList: true
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    getFriends(this.props.uid).then(friends => {
      this.setState({friends: friends})
    })
  }
  handleSearch(query) {
    this.setState({showUserList: query === ''})
  }
  render() {
    if (!this.state.friends) return <div style={{textAlign: 'center'}}>Loading...</div>
    if (this.state.friends.length < 1) return <div style={{textAlign: 'center'}}>You have no friends!</div>
    return (
      <div>
        <Search
          uid={this.props.uid}
          placeHolder='Search by name'
          handleQueryChange={this.handleSearch}
          excludeUsersNotFriends
          excludeWishes />
        {this.state.showUserList &&
          <UserList users={this.state.friends} />
        }
      </div>

    )
  }
}

export default FriendList
