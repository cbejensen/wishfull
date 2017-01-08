import React from 'react';
import UserHeading from '../User/UserHeading';
import WishList from 'components/WishList/WishList/WishList';
import { searchWishes } from 'utils/firebaseHelpers';

class WishResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: null
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
    searchWishes(this.props.query, this.props.uid)
    .then(wishes => {
      console.log('WISHES:', wishes)
      this.setState({wishes: wishes})
    }, err => {
      console.log(err);
    })
  }
  render() {
    console.log(this.state.wishes)
    if (!this.state.wishes) return null;
    let heading = this.props.category;
    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
    return (
      <div>
        <div style={{
          color: 'white',
          borderBottom: 'white 1px solid'
        }}>{heading}</div>
        <WishList wishes={this.state.wishes}
          uid={this.props.uid}
          mutable />
      </div>
    )
  }
};

WishResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired
}

export default WishResults;
