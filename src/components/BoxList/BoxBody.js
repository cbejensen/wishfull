import React from 'react';

class BoxBody extends React.PureComponent {
  render() {
    const styles = {
      body: {
        visibility: this.props.selected ? 'visible' : 'hidden',
        opacity: this.props.selected ? '1' : '0',
        transition: '.3s'
      }
    };
    return (
      <div ref={body => this.props.setBody(body)} style={styles.body}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ...this.props
          })
        )}
      </div>
    );
  }
}

BoxBody.propTypes = {
  setBody: React.PropTypes.func,
  setBoxHeight: React.PropTypes.func,
  selected: React.PropTypes.bool
};

export default BoxBody;
