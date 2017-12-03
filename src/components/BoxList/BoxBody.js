import React from 'react';

class BoxBody extends React.PureComponent {
  componentDidMount() {
    console.log('BoxBody mounted');
  }
  componentWillUnmount() {
    console.log('BoxBody will unmount');
  }
  render() {
    const styles = {
      body: {
        visibility: this.props.selected ? 'visible' : 'hidden',
        opacity: this.props.selected ? '1' : '0',
        transition: '.6s'
      }
    };
    return (
      <div style={styles.body}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            selected: this.props.selected,
            setBoxHeight: () => console.log('old setbox body')
          })
        )}
      </div>
    );
  }
}

BoxBody.propTypes = {
  selected: React.PropTypes.bool
};

export default BoxBody;
