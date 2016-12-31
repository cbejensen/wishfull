import React from 'react';
import './index.css';

class FlipperContainer extends React.Component {
  render() {
    const flipDirection = this.props.flipDirection
    ? this.props.flipDirection
    : 'right';
    const containerStyle = 'FlipperContainer-outer';
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       flipDirection: flipDirection
     })
    );
    return (
      <div className={this.props.flipped
        ? containerStyle + " flip-" + flipDirection
        : containerStyle}>
      	<div className="FlipperContainer-flipper">
      		{childrenWithProps}
      	</div>
      </div>
    )
  }
};

FlipperContainer.propTypes = {
  flipped: React.PropTypes.bool.isRequired,
  flipDirection: React.PropTypes.string
}

export default FlipperContainer;
