import React from 'react';
import BoxHeader from './BoxHeader';
import BoxBody from './BoxBody';

class ExpandingBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
      headerHeight: '',
      bodyHeight: ''
    };
  }
  componentDidMount() {
    this.setBoxHeight();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setBoxHeight();
    }
  }
  setBoxHeight = () => {
    this.setState({
      headerHeight: this.header.offsetHeight + 22,
      bodyHeight: this.body.offsetHeight
    });
  };
  setHeader = elem => {
    if (elem) this.header = elem;
  };
  setBody = elem => {
    if (elem) this.body = elem;
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
  render() {
    const numChildren = React.Children.count(this.props.children);
    if (numChildren !== 2) {
      return null;
    } else {
      const childArray = React.Children.toArray(this.props.children);
      const totalHeight = this.state.headerHeight + this.state.bodyHeight;
      const height = this.props.selected
        ? totalHeight
        : this.state.headerHeight;
      const highlightColor = this.props.color || '#353535';
      const borderColor =
        this.state.highlighted || this.props.selected
          ? highlightColor
          : '#d2d2d2';
      const styles = {
        default: {
          height,
          border: `4px solid ${borderColor}`,
          borderRadius: '15px',
          overflow: 'hidden',
          cursor: 'pointer',
          padding: '7px 10px',
          margin: 'auto',
          width: '100%',
          position: 'relative',
          transition: 'height .4s, border-color .7s'
        }
      };
      return (
        <div
          style={{ ...styles.default, ...this.props.styles }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={() => this.props.handleClick(this.props.index)}
        >
          {React.cloneElement(childArray[0], {
            setHeader: this.setHeader,
            setBoxHeight: this.setBoxHeight
          })}
          {React.cloneElement(childArray[1], {
            setBody: this.setBody,
            setBoxHeight: this.setBoxHeight,
            selected: this.props.selected
          })}
        </div>
      );
    }
  }
}

ExpandingBox.propTypes = {
  styles: React.PropTypes.object,
  handleClick: React.PropTypes.func
};

export default ExpandingBox;
