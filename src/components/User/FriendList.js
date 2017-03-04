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
    const styles = {
      textBox: {
        fontSize: '1.2em',
        paddingTop: '30px',
        textAlign: 'center'
      }
    }
    if (!this.props.uid) {
      return null
    } else if (!this.state.friends) {
      return <div style={styles.textBox}>Loading...</div>
    } else if (this.state.friends.length < 1) {
      return <div style={styles.textBox}>You have no friends!</div>
    } else {
      return (
        <div>
          <Search
            uid={this.props.uid}
            placeHolder='Search by name'
            handleQueryChange={this.handleSearch}
            focusInput={this.props.focusInput}
            excludeUsersNotFriends
            excludeWishes />
          {this.state.showUserList &&
            <UserList users={this.state.friends} />
          }
        </div>
      )
    }
  }
}

FriendList.propTypes = {
  uid: React.PropTypes.node,
  focusInput: React.PropTypes.bool
}

export default FriendList
