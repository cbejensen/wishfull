import React from 'react'
import CategoryResults from './CategoryResults'
import UserResults from './UserResults'
import WishResults from './WishResults'
import {searchFriends,
        searchUsersNotFriends,
        searchWishes} from 'utils/firebaseHelpers'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.getFriends = this.getFriends.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getWishes = this.getWishes.bind(this)
  }
  componentDidMount() {
    if (!this.props.categories || this.props.categories.length < 1) {
      // if no categories specified search all categories
      this.showFriends = this.showUsers = this.showWishes = true
    } else {
      for (const category of this.props.categories) {
        if (category === 'friends') {
          this.showFriends = true
          return
        } else if (category === 'users') {
          this.showUsers = true
          return
        } else if (category === 'wishes') {
          this.showWishes = true
          return
        }
      }
    }
  }
  getFriends() {
    return searchFriends(this.props.query, this.props.uid)
  }
  getUsers() {
    return searchUsersNotFriends(this.props.query, this.props.uid)
  }
  getWishes() {
    return searchWishes(this.props.query, this.props.uid)
  }
  render() {
    return (
      <div>
        <CategoryResults
          search={this.getFriends}
          query={this.props.query}>
          <UserResults />
        </CategoryResults>
        <CategoryResults
          search={this.getUsers}
          query={this.props.query}>
          <UserResults />
        </CategoryResults>
        <CategoryResults
          search={this.getWishes}
          query={this.props.query}>
          <WishResults uid={this.props.uid}/>
        </CategoryResults>
      </div>
    )
  }
}

// SearchResults.propTypes = {
//   search: React.PropTypes.func.isRequired
// }

export default SearchResults
