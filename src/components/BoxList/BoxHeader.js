import React from 'react';

const BoxHeader = props => {
  const numChildren = React.Children.count(props.children);
  if (!numChildren) {
    throw Error(`Expected 1 child. Showing ${numChildren}`);
  }
  return <div ref={header => props.setHeader(header)}>{props.children}</div>;
};

export default BoxHeader;
