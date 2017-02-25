import React from 'react'
import {WishList} from 'components/Wish'

const WishResults = props => {
  if (!props.results) return null
  return <WishList
    wishes={props.results}
    uid={props.uid}
    primaryColor={props.primaryColor}
    secondaryColor={props.secondaryColor}
    mutable />
};

WishResults.propTypes = {
  results: React.PropTypes.array,
  uid: React.PropTypes.string,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
}

export default WishResults
