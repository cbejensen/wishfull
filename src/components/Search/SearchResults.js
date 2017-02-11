import React from 'react'
import CategoryResults from './CategoryResults'
import UserResults from './UserResults'
import WishResults from './WishResults'
import {searchFriends,
        searchUsers,
        searchUsersNotFriends,
        searchWishes} from 'utils/firebaseHelpers'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.getFriends = this.getFriends.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getWishes = this.getWishes.bind(this)
  }
  getFriends() {
    return searchFriends(this.props.query, this.props.uid)
  }
  getUsers() {
    if (!this.props.uid) {
      return searchUsers(this.props.query)
    } else {
      return searchUsersNotFriends(this.props.query, this.props.uid)
    }
  }
  getWishes() {
    return searchWishes(this.props.query, this.props.uid)
  }
  render() {
    return (
      <div>
        {this.props.uid && <CategoryResults
          search={this.getFriends}
          query={this.props.query}>
          <UserResults />
        </CategoryResults>}
        <CategoryResults
          search={this.getUsers}
          query={this.props.query}>
          <UserResults />
        </CategoryResults>
        {this.props.uid && <CategoryResults
          search={this.getWishes}
          query={this.props.query}>
          <WishResults uid={this.props.uid}/>
        </CategoryResults>}
      </div>
    )
  }
}

SearchResults.propTypes = {
  uid: React.PropTypes.node
}

export default SearchResults
