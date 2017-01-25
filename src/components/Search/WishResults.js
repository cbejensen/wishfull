import React from 'react';
import WishList from 'components/WishList/WishList/WishList';

class WishResults extends React.Component {
  render() {
    if (!this.props.results) return null
    return <WishList
      wishes={this.props.results}
      uid={this.props.uid}
      primaryColor='#ffffff'
      secondaryColor='#5d5d5d'
      mutable />
  }
};

export default WishResults;
