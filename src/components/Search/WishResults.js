import React from 'react';
import { WishList } from 'components/Wish/WishList';

const WishResults = props => {
  if (!props.results) return null;
  return (
    <WishList
      fromSearch={true}
      wishes={props.results}
      uid={props.uid}
      userId={props.uid}
      primaryColor={props.primaryColor}
      secondaryColor={props.secondaryColor}
      luminosity={props.luminosity}
      mutable
    />
  );
};

WishResults.propTypes = {
  results: React.PropTypes.array,
  uid: React.PropTypes.string,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  luminosity: React.PropTypes.string
};

export default WishResults;
