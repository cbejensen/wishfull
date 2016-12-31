import React from 'react';
import './index.css';

class FlipperBack extends React.Component {
  render() {
        console.log(this.props.flipDirection)
    return (
      <div className={"FlipperBack flip-" + this.props.flipDirection}>
        {this.props.children}
      </div>
    )
  }
};

export default FlipperBack;
