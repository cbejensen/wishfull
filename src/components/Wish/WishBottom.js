import React from 'react';

export default function WishBody(props) {}

WishBody.propTypes = {
  wishId: React.PropTypes.string,
  userId: React.PropTypes.string,
  uid: React.PropTypes.node,
  fulfilled: React.PropTypes.string,
  handleFulfill: React.PropTypes.func,
  mutable: React.PropTypes.bool,
  setHeight: React.PropTypes.func,
  openLink: React.PropTypes.func,
  color: React.PropTypes.string,
  setBoxHeight: React.PropTypes.func
};
