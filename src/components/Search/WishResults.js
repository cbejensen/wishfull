import React from 'react';
import CategoryHeading from './CategoryHeading';
import WishList from 'components/WishList/WishList/WishList';
import { searchWishes } from 'utils/firebaseHelpers';

class WishResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: null
    }
    this.getWishes = this.getWishes.bind(this);
  }
  componentDidMount() {
    this.getWishes();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.getWishes();
    }
  }
  getWishes() {
    searchWishes(this.props.query, this.props.uid)
    .then(wishes => {
      this.setState({wishes: wishes})
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.wishes) return null;
    return (
      <div>
        <CategoryHeading text="Wishes" />
        <WishList
          wishes={this.state.wishes}
          uid={this.props.uid}
          mutable />
      </div>
    )
  }
};

WishResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default WishResults;
