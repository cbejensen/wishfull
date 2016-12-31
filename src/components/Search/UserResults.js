import React from 'react';
import CategoryResults from './CategoryResults';
import { searchFriends } from 'utils/firebaseHelpers';

class FriendResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: null
    }
  }
  componentDidMount() {
    searchFriends(this.props.query, this.props.user.uid)
    .then(friends => {
      this.setState({
        friends: friends
      })
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.friends) return null;
    let heading = this.props.category;
    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
    return <CategoryResults heading={heading}
      results={this.state.results} />
  }
};

FriendResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired
}

export default FriendResults;
