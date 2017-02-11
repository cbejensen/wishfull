import React from 'react';
import {WishList} from 'components/WishList';

const WishResults = props => {
  if (!props.results) return null
  return <WishList
    wishes={props.results}
    uid={props.uid}
    primaryColor='#ffffff'
    secondaryColor='#5d5d5d'
    mutable />
};

export default WishResults
