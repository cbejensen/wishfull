import React from 'react';
import UserHeading from '../User/UserHeading';
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
    if (this.props.query !== prevProps.query) this.getResults();
  }
  getResults() {
    searchFriends(this.props.query, this.props.user.uid)
    .then(friends => {
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
        <ul>
          <li>{heading}</li>
        </ul>
        {this.state.friends.map((friend, i) => {
          return <UserHeading key={i}
            uid={friend.uid}
            name={friend.firstName + ' ' + friend.lastName} />
        })}
      </div>
    )
  }
};

FriendResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired
}

export default FriendResults;
