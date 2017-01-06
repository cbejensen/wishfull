import React from 'react';

class ItemBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: this.props.highlighted ? this.props.highlighted : false,
      selected: this.props.selected ? this.props.selected : false,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleMouseEnter() {
    this.setState({highlighted: true})
  }
  handleMouseLeave() {
    this.setState({highlighted: false})
  }
  handleClick() {
    if (this.props.handleClick) this.props.handleClick();
    if (this.state.selected) {
      // if user deselects wish already selected
      this.setState({selected: false})
    } else {
      this.setState({selected: true})
    }
  }
  render() {
    let borderColor = 'rgba(181, 181, 181, 0.3';
    if (this.props.colorTheme && (this.state.highlighted || this.state.selected)) {
      borderColor = this.props.colorTheme;
    };
    const styles = {
      default: {
        border: '4px solid',
        borderRadius: '15px',
        borderColor: borderColor,
        overflow: 'hidden',
        cursor: 'pointer',
        padding: '7px 10px',
        margin: '5px auto',
        width: '100%',
        position: 'relative'
      }
    };
    return (
      <div style={{...styles.default, ...this.props.styles}}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}>

        {this.props.children}

      </div>
    )
  }
}

ItemBox.propTypes = {
  highlighted: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  colorTheme: React.PropTypes.string,
  styles: React.PropTypes.object,
  handleClick: React.PropTypes.func
}

export default ItemBox;
