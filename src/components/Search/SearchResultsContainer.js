import React from 'react';
import { CheckAuth } from '../CheckAuth';
import { searchFriends, searchUsers, searchWishes } from 'utils/firebaseHelpers';
import FriendResults from './FriendResults';
import UserResults from './UserResults';
import WishResults from './WishResults';

class SearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: []}
  }
  componentDidMount() {
    // let showFriends,
    //     showUsers,
    //     showWishes;
    // if (!this.props.categories || this.props.categories.length === 0) {
    //   // if no categories specified, apply all categories
    //   showFriends = showUsers = showWishes = true;
    // } else {
    //   this.props.categories.forEach(category => {
    //     if (category === 'friends') showFriends = true;
    //     if (category === 'users') showUsers = true;
    //     if (category === 'wishes') showWishes = true;
    //   });
    // }
    searchFriends(this.props.query, this.props.uid).then(friends => {
      Promise.all([searchUsers(this.props.query, friends),
      searchWishes(this.props.query, this.props.uid)]).then(results => {
        console.log(friends, results);
      })
    })
  }
  render() {

    return (
      <div>
        working
        {/* {showFriends && <FriendResults query={this.props.query}
          uid={this.props.uid}
          category="friends" /> }

        {/* {showFriendsAndUsers &&}
        {showWishes && <WishResults query={this.props.query}
          uid={this.props.uid}
          category="wishes" /> } */}
      </div>
    )
  }
};

SearchResultsContainer.propTypes = {
  query: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array
}

export default SearchResultsContainer;
