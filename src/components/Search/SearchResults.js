import React from 'react';
import { CheckAuth } from '../CheckAuth';
import FriendResults from './FriendResults';
import UserResults from './UserResults';
import WishResults from './WishResults';

class SearchResults extends React.Component {
  render() {
    let showFriends,
        showUsers,
        showWishes;
    if (!this.props.categories || this.props.categories.length === 0) {
      // if no categories specified, apply all categories
      showFriends = showUsers = showWishes = true;
    } else {
      this.props.categories.forEach(category => {
        if (category === 'friends') showFriends = true;
        if (category === 'users') showUsers = true;
        if (category === 'wishes') showWishes = true;
      });
    }
    return (
      <div>
        <CheckAuth>
          {showFriends && <FriendResults query={this.props.query}
            category="friends" user={{}} /> }
          {/* {showUsers && <UserResults query={this.props.query}
            category="users" user={{}} /> }
          {showWishes && <WishResults query={this.props.query}
            category="wishes" user={{}} /> } */}
        </CheckAuth>
      </div>
    )
  }
};

SearchResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array
}

export default SearchResults;
