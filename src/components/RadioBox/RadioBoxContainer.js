import React from 'react'
import RadioBox from './RadioBox';

class RadioBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0}
    this.select = this.select.bind(this)
  }
  select(selected) {
    this.setState({selected: selected})
    this.props.handleSelect(selected)
  }
  render() {
    const {handleSelect, ...props} = this.props
    return <RadioBox
      {...props}
      {...this.state}
      select={this.select} />
  }
}

RadioBoxContainer.propTypes = {
  handleSelect: React.PropTypes.func.isRequired,
  textLeft: React.PropTypes.string,
  textRight: React.PropTypes.string,
  style: React.PropTypes.object
}

export default RadioBoxContainer
