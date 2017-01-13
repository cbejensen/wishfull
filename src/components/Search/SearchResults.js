import React from 'react';
import { CheckAuth } from '../CheckAuth';
import {UserList} from 'components/User';
import CategoryResults from './CategoryResults';
import FriendResults from './FriendResults';
import UserResults from './UserResults';
import WishResults from './WishResults';

class SearchResults extends React.Component {
  render() {
    let showFriends,
        showUsers,
        showWishes;
    if (!this.props.categories || this.props.categories.length < 1) {
      // if no categories specified search all categories
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
        {showFriends && <FriendResults
          query={this.props.query}
          uid={this.props.uid} />}
        {showUsers && <UserResults
          query={this.props.query}
          uid={this.props.uid} />}
        {showWishes && <WishResults
          query={this.props.query}
          uid={this.props.uid} />}
      </div>
    )
  }
};

SearchResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array
}

export default SearchResults;
