import React from 'react';

class BoxHeader extends React.PureComponent {
  render() {
    const numChildren = React.Children.count(this.props.children);
    if (!numChildren) {
      throw Error(`Expected 1 child. Showing ${numChildren}`);
    }
    return (
      <div ref={header => this.props.setHeader(header)}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            setBoxHeight: () => {}
          })
        )}
      </div>
    );
  }
}

BoxHeader.propTypes = {
  // setBoxHeight: React.PropTypes.func,
  setHeader: React.PropTypes.func
};

export default BoxHeader;
