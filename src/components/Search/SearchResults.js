import React from 'react';
import UserList from 'components/User/UserList';
import WishResults from './WishResults';
import {
  searchFriends,
  searchUsers,
  searchUsersNotFriends,
  searchWishes
} from 'utils/firebaseHelpers';
import { makeCancelablePromise } from 'utils/functionHelpers';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        users: false,
        friends: false,
        wishes: false
      }
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.search(this.props.query);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      if (this.props.query === '') {
        this.cancelPromises();
      } else {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log('timer ended');
          this.search(this.props.query);
        }, 500);
      }
    }
  }
  componentWillUnmount() {
    this.cancelPromises();
  }
  search(query) {
    // friends
    if (this.props.uid && !this.props.excludeFriends) {
      this.friendsPromise = makeCancelablePromise(
        searchFriends(query, this.props.uid)
      );
      this.friendsPromise.promise.then(
        res => {
          this.reportResults(res, 'friends');
        },
        err => {
          console.log(err);
        }
      );
    }
    // users
    if (!this.props.excludeUsersNotFriends) {
      let search = () => {
        if (!this.props.uid) {
          return searchUsers(query);
        } else {
          return searchUsersNotFriends(query, this.props.uid);
        }
      };
      this.usersPromise = makeCancelablePromise(search());
      this.usersPromise.promise.then(
        res => {
          this.reportResults(res, 'users');
        },
        err => {
          console.log(err);
        }
      );
    }
    // wishes
    if (this.props.uid && !this.props.excludeWishes) {
      this.wishesPromise = makeCancelablePromise(
        searchWishes(query, this.props.uid)
      );
      this.wishesPromise.promise.then(
        res => {
          this.reportResults(res, 'wishes');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  reportResults(res, type) {
    this.setState((prevState, props) => {
      let newState = prevState;
      newState.results[type] = res;
      return newState;
    });
  }
  cancelPromises = () => {
    if (this.friendsPromise) this.friendsPromise.cancel();
    if (this.usersPromise) this.usersPromise.cancel();
    if (this.wishesPromise) this.wishesPromise.cancel();
  };
  render() {
    const styles = {
      container: {
        padding: '10px 0'
      },
      msg: {
        textAlign: 'center',
        padding: '10px',
        fontSize: '1.5em',
        color: this.props.userNameColor || this.props.wishPrimaryColor
      }
    };
    const { users, friends, wishes } = this.state.results;
    if (!users && !friends && !wishes) {
      return <div style={styles.msg}>Loading...</div>;
    } else if (users.length < 1 && friends.length < 1 && wishes.length < 1) {
      return <div style={styles.msg}>No Results</div>;
    } else {
      const { friends, users, wishes } = this.state.results;
      return (
        <div style={styles.container}>
          {friends && (
            <UserList
              users={this.state.results.friends}
              uid={this.props.uid}
              luminosity={this.props.luminosity}
            />
          )}
          {users && (
            <UserList
              users={this.state.results.users}
              uid={this.props.uid}
              luminosity={this.props.luminosity}
            />
          )}
          {wishes && (
            <WishResults
              results={this.state.results.wishes}
              uid={this.props.uid}
              luminosity={this.props.luminosity}
            />
          )}
        </div>
      );
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
  wishSecondaryColor: React.PropTypes.string,
  luminosity: React.PropTypes.string
};

export default SearchResults;
