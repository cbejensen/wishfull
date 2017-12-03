import React from 'react';

class ExpandingBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
      height: 'auto',
      showBody: false
    };
  }
  componentDidMount() {
    this.verticalPaddingAndBorder = 22;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      if (this.props.selected) {
        this.setState({ height: `${this.box.scrollHeight + 8}px` });
      } else {
        this.setState({
          height: `${this.header.offsetHeight +
            this.verticalPaddingAndBorder}px`
        });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected && this.state.showBody && !nextProps.selected) {
      this.setState({ height: `${this.box.scrollHeight + 8}px` });
    }
  }
  setHeaderHeight = header => {
    if (header) this.header = header;
  };
  handleClick = () => {
    this.setState(
      (prevState, props) => {
        if (props.selected) {
          // deselecting
          return { height: `${this.box.scrollHeight}px` };
        } else {
          // selecting
          return {
            height: `${this.header.offsetHeight +
              this.verticalPaddingAndBorder}px`,
            showBody: true
          };
        }
      },
      () => {
        this.props.handleClick(this.props.index);
      }
    );
  };
  handleTransitionEnd = e => {
    if (e.propertyName === 'height') {
      if (this.props.selected) {
        this.setState({ height: 'auto', transitioning: false });
      } else {
        this.setState({
          height: 'auto',
          transitioning: false,
          showBody: false
        });
      }
    }
  };
  openLink = e => {
    // just follow link, don't expand/contract wish
    e.stopPropagation();
  };
  handleMouseEnter = () => {
    this.setState({ highlighted: true });
  };
  handleMouseLeave = () => {
    this.setState({ highlighted: false });
  };
  handleTouchEnd = () => {
    if (!this.props.selected) {
      this.setState({ highlighted: false });
    }
  };
  render() {
    console.warn('rendered', this.state.height);
    const numChildren = React.Children.count(this.props.children);
    if (numChildren !== 2) {
      return null;
    } else {
      const childArray = React.Children.toArray(this.props.children);
      const color = this.props.color || '#353535';
      const borderColor =
        this.state.highlighted || this.props.selected ? color : '#d2d2d2';
      const styles = {
        default: {
          height: this.state.height,
          border: `4px solid ${borderColor}`,
          borderRadius: '15px',
          overflow: 'hidden',
          cursor: 'pointer',
          padding: '7px 10px',
          margin: 'auto',
          width: '100%',
          position: 'relative',
          transition: '1s'
        }
      };
      return (
        <div
          style={{ ...styles.default, ...this.props.style }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchEnd={this.handleTouchEnd}
          onClick={this.handleClick}
          onTransitionEnd={this.handleTransitionEnd}
          ref={e => (this.box = e)}
        >
          {React.cloneElement(childArray[0], {
            setHeader: this.setHeaderHeight
          })}
          {this.state.showBody &&
            React.cloneElement(childArray[1], {
              selected: this.props.selected
            })}
        </div>
      );
    }
  }
}

ExpandingBox.propTypes = {
  style: React.PropTypes.object,
  handleClick: React.PropTypes.func,
  color: React.PropTypes.string,
  selected: React.PropTypes.bool.isRequired
};

export default ExpandingBox;
