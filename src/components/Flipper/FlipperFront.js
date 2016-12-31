import React from 'react';
import './index.css';

class FlipperFront extends React.Component {
  render() {
    return (
      <div className="FlipperFront">
        {this.props.children}
      </div>
    )
  }
};

export default FlipperFront;
