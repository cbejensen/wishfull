import React from 'react';

class BoxHeader extends React.PureComponent {
  render() {
    const numChildren = React.Children.count(this.props.children);
    if (!numChildren) {
      throw Error(`Expected 1 child. Showing ${numChildren}`);
    }
    return (
      <div ref={header => this.props.setHeader(header)}>
        {this.props.children}
      </div>
    );
  }
}

BoxHeader.propTypes = {
  setHeader: React.PropTypes.func
};

export default BoxHeader;
