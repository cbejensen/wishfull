import React from 'react'
// import CategoryResults from './CategoryResults'
import UserResults from './UserResults'
import WishResults from './WishResults'
import {searchFriends,
        searchUsers,
        searchUsersNotFriends,
        searchWishes} from 'utils/firebaseHelpers'
import {makeCancelablePromise} from 'utils/functionHelpers'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {
        users: false,
        friends: false,
        wishes: false
      }
    }
    this.search = this.search.bind(this)
  }
  componentDidMount() {
    this.search(this.props.query)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.search(nextProps.query)
    }
  }
  componentWillUnmount() {
    this.friendsPromise && this.friendsPromise.cancel()
    this.usersPromise && this.usersPromise.cancel()
    this.wishesPromise && this.wishesPromise.cancel()
  }
  search(query) {
    // friends
    if (this.props.uid && !this.props.excludeFriends) {
      console.log('friends');
      this.friendsPromise = makeCancelablePromise(
        searchFriends(query, this.props.uid)
      )
      this.friendsPromise.promise.then(res => {
        this.reportResults(res, 'friends')
      }, err => {
        console.log(err)
      })
    }
    // users
    if (!this.props.excludeUsersNotFriends) {
      let search = () => {
        if (!this.props.uid) {
          return searchUsers(query)
        } else {
          return searchUsersNotFriends(query, this.props.uid)
        }
      }
      this.usersPromise = makeCancelablePromise(search())
      this.usersPromise.promise.then(res => {
        this.reportResults(res, 'users')
      }, err => {
        console.log(err)
      })
    }
    // wishes
    if (this.props.uid && !this.props.excludeWishes) {
      this.wishesPromise = makeCancelablePromise(
        searchWishes(query, this.props.uid)
      )
      this.wishesPromise.promise.then(res => {
        this.reportResults(res, 'wishes')
      }, err => {
        console.log(err)
      })
    }
  }
  reportResults(res, type) {
    this.setState((prevState, props) => {
      let newState = prevState
      console.log(res);
      newState.results[type] = res
      return newState
    })
  }
  render() {
    const styles = {
      msg: {
        textAlign: 'center',
        padding: '10px',
        fontSize: '1.5em',
        color: this.props.userNameColor || this.props.wishPrimaryColor
      }
    }
    const {users, friends, wishes} = this.state.results
    if (!users && !friends && !wishes) {
      return <div style={styles.msg}>Loading...</div>
    } else if (users.length < 1 && friends.length < 1 && wishes.length < 1) {
      return <div style={styles.msg}>No Results</div>
    } else {
      const {friends, users, wishes} = this.state.results
      return (
        <div>
          {friends && <UserResults
            results={this.state.results.friends}
            nameColor={this.props.userNameColor} />}
          {users &&<UserResults
            results={this.state.results.users}
            nameColor={this.props.userNameColor} />}
          {wishes && <WishResults
            results={this.state.results.wishes}
            uid={this.props.uid}
            primaryColor={this.props.wishPrimaryColor}
            secondaryColor={this.props.wishSecondaryColor} />}
        </div>

        // <div>
        //   {this.props.uid && !this.props.excludeFriends &&
        //     <CategoryResults
        //       search={this.getFriends}
        //       query={this.props.query}
        //       noResultsColor={this.props.userNameColor}
        //       reportResults={this.reportResults.bind(null, 'friends')}>
        //       <UserResults nameColor={this.props.userNameColor} />
        //     </CategoryResults>}
        //   {!this.props.excludeUsersNotFriends &&
        //     <CategoryResults
        //       search={this.getUsers}
        //       query={this.props.query}
        //       noResultsColor={this.props.userNameColor}
        //       reportResults={this.reportResults.bind(null, 'users')}>
        //       <UserResults nameColor={this.props.userNameColor} />
        //     </CategoryResults>}
        //   {this.props.uid && !this.props.excludeWishes &&
        //     <CategoryResults
        //       search={this.getWishes}
        //       query={this.props.query}
        //       noResultsColor={this.props.wishPrimaryColor}
        //       reportResults={this.reportResults.bind(null, 'wishes')}>
        //       <WishResults
        //         uid={this.props.uid}
        //         primaryColor={this.props.wishPrimaryColor}
        //         secondaryColor={this.props.wishSecondaryColor} />
        //     </CategoryResults>}
        // </div>
      )
    }
  }
}

SearchResults.propTypes = {
  uid: React.PropTypes.node,
  excludeFriends: React.PropTypes.bool,
  excludeUsersNotFriends: React.PropTypes.bool,
  excludeWishes: React.PropTypes.bool,
  userNameColor: React.PropTypes.string,
  wishPrimaryColor: React.PropTypes.string,
  wishSecondaryColor: React.PropTypes.string
}

export default SearchResults
