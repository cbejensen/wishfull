import React from 'react';
import UserHeading from '../User/UserHeading';
import { UserList } from 'components/User';
import { searchFriends } from 'utils/firebaseHelpers';

class FriendResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
    this.getResults = this.getResults.bind(this);
  }
  componentDidMount() {
    this.getResults();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.getResults(); }
  }
  getResults() {
    searchFriends(this.props.query, this.props.uid)
    .then(friends => {
      console.log('FRIENDS', friends)
      this.setState({friends: friends})
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.friends) return null;
    let heading = this.props.category;
    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
    return (
      <div>
        <div style={{
          color: 'white',
          borderBottom: 'white 1px solid'
        }}>{heading}</div>
        <UserList users={this.state.friends} />
        {/* {this.state.friends.map((friend, i) => {
          return <UserHeading key={i}
            uid={friend.uid}
            name={friend.firstName + ' ' + friend.lastName} />
        })} */}
      </div>
    )
  }
};

FriendResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired
}

export default FriendResults;
